import * as AWS from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { Readable } from 'stream'
import { v4 as generateUuidV4 } from 'uuid'

import { PrismaService } from '../../../shared/prisma'
import { UploadFileDto } from '../dtos/upload-file.dto'
import { FILES_CONFIG, FilesConfig } from '../files.config'
import { GetFile } from '../interfaces/files.interfaces'

@Injectable()
export class FilesService {
    private logger = new Logger()
    private s3Client: AWS.S3

    constructor(
        @Inject(FILES_CONFIG)
        private readonly config: FilesConfig,
        private readonly prisma: PrismaService,
    ) {
        const s3ClientConfig: AWS.S3ClientConfig = {
            credentials: {
                accessKeyId: config.s3StorageAccessKeyId,
                secretAccessKey: config.s3StorageSecretAccessKey,
            },
            region: config.s3StorageRegion,
        }

        if (!config.production) {
            s3ClientConfig.endpoint = config.s3StorageUrl
            s3ClientConfig.forcePathStyle = true
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

        const fileKey = generateUuidV4()
        try {
            const uploadResult = await new Upload({
                client: this.s3Client,
                params: {
                    Bucket: this.config.s3StorageBucketName,
                    Key: fileKey,
                    Body: await FilesService.streamToBuffer(createReadStream()),
                    BucketKeyEnabled: false,
                },
            }).done()

            console.log(uploadResult)

            const savedFileData = await this.prisma.file.create({
                data: {
                    originalName: filename,
                    mimeType: mimetype,
                    size: 0,
                    bucket: this.config.s3StorageBucketName,
                    key: uploadResult.Key,
                    eTag: uploadResult.ETag,
                    location: uploadResult.Location,
                    userId,
                },
            })

            return savedFileData.id
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }

    async uploadFileRest(file: Express.Multer.File, userId: string) {
        const fileKey = generateUuidV4()
        try {
            const uploadResult = await new Upload({
                client: this.s3Client,
                params: {
                    Bucket: this.config.s3StorageBucketName,
                    Key: fileKey,
                    Body: file.buffer,
                    BucketKeyEnabled: false,
                },
            }).done()

            const savedFileData = await this.prisma.file.create({
                data: {
                    originalName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    bucket: this.config.s3StorageBucketName,
                    key: uploadResult.Key,
                    eTag: uploadResult.ETag,
                    location: uploadResult.Location,
                    userId,
                },
            })

            return savedFileData.id
        } catch (error) {
            this.logger.error(error)
            throw error
        }
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
