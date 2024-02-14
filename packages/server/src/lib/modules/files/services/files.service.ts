import * as AWS from '@aws-sdk/client-s3'
import {
    Inject,
    Injectable,
    Logger,
    OnApplicationBootstrap,
} from '@nestjs/common'
import { Readable } from 'stream'
import { v4 as generateUuidV4 } from 'uuid'

import { PrismaService } from '../../../shared/prisma'
import { UploadFileDto } from '../dtos/upload-file.dto'
import { FILES_CONFIG, FilesConfig } from '../files.config'
import { GetFile } from '../interfaces/files.interfaces'

@Injectable()
export class FilesService implements OnApplicationBootstrap {
    private logger = new Logger()
    private s3Client: AWS.S3

    constructor(
        @Inject(FILES_CONFIG)
        private readonly config: FilesConfig,
        private readonly prisma: PrismaService,
    ) {}

    async onApplicationBootstrap(): Promise<void> {
        const s3ClientConfig: AWS.S3ClientConfig = {
            endpoint: this.getEndpoint(),
            credentials: {
                accessKeyId: this.config.awsS3AccessKeyId,
                secretAccessKey: this.config.awsS3SecretAccessKey,
            },
            region: this.config.awsS3Region,
            forcePathStyle: this.config.awsS3ForcePathStyle,
        }

        this.s3Client = new AWS.S3(s3ClientConfig)
    }

    async getFile(data: GetFile): Promise<string> {
        const file = await this.prisma.file.findUnique({
            where: {
                id: data.id,
            },
        })

        return file.location
    }

    async uploadFileGraphql(file: Promise<UploadFileDto>, userId: string) {
        const { filename, mimetype, createReadStream } = await file

        try {
            const key = generateUuidV4()
            const body = await FilesService.streamToBuffer(createReadStream())

            const uploadResult = await this.s3Client.putObject({
                ACL: this.config.awsS3Acl,
                Bucket: this.config.awsS3BucketName,
                Key: key,
                ContentType: mimetype,
                Body: body,
                BucketKeyEnabled: false,
            })

            const locationEndpoint = this.getPublicEndpoint(true)

            const savedFileData = await this.prisma.file.create({
                data: {
                    originalName: filename,
                    mimeType: mimetype,
                    size: body.byteLength,
                    bucket: this.config.awsS3BucketName,
                    key,
                    eTag: uploadResult.ETag,
                    location: `${locationEndpoint}/${key}`,
                    userId,
                },
            })

            this.logger.log(`File uploaded: ${JSON.stringify(savedFileData)}`)

            return savedFileData.id
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }

    async uploadFileRest(file: Express.Multer.File, userId: string) {
        try {
            const key = generateUuidV4()

            const uploadResult = await this.s3Client.putObject({
                ACL: this.config.awsS3Acl,
                Bucket: this.config.awsS3BucketName,
                Key: key,
                ContentType: file.mimetype,
                Body: file.buffer,
                BucketKeyEnabled: false,
            })

            const locationEndpoint = this.getPublicEndpoint(true)

            const savedFileData = await this.prisma.file.create({
                data: {
                    originalName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    bucket: this.config.awsS3BucketName,
                    key: key,
                    eTag: uploadResult.ETag,
                    location: `${locationEndpoint}/${key}`,
                    userId,
                },
            })

            this.logger.log(`File uploaded: ${JSON.stringify(savedFileData)}`)

            return savedFileData.id
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }

    private getEndpoint() {
        if (this.config.awsS3AccelerateUrl) {
            return this.config.awsS3AccelerateUrl
        }

        // support old path-style S3 uploads and new virtual host uploads by
        // checking for the bucket name in the endpoint url.
        if (this.config.awsS3BucketName) {
            const url = new URL(this.config.awsS3UploadBucketUrl)
            if (url.hostname.startsWith(this.config.awsS3BucketName + '.')) {
                return undefined
            }
        }

        return this.config.awsS3UploadBucketUrl
    }

    private getPublicEndpoint(isServerUpload?: boolean) {
        if (this.config.awsS3AccelerateUrl) {
            return this.config.awsS3AccelerateUrl
        }

        // lose trailing slash if there is one and convert fake-s3 url to localhost
        // for access outside of docker containers in local development
        const isDocker = this.config.awsS3UploadBucketUrl.match(/http:\/\/s3:/)

        const host = this.config.awsS3UploadBucketUrl
            .replace('s3:', 'localhost:')
            .replace(/\/$/, '')

        // support old path-style S3 uploads and new virtual host uploads by checking
        // for the bucket name in the endpoint url before appending.
        const isVirtualHost = host.includes(this.config.awsS3BucketName)

        if (isVirtualHost) {
            return host
        }

        return `${host}/${isServerUpload && isDocker ? 's3/' : ''}${
            this.config.awsS3BucketName
        }`
    }

    private static async streamToBuffer(stream: Readable): Promise<Buffer> {
        const buffer: Uint8Array[] = []

        return new Promise((resolve, reject) =>
            stream
                .on('error', (error) => reject(error))
                .on('data', (data) => buffer.push(data))
                .on('end', () => resolve(Buffer.concat(buffer))),
        )
    }
}
