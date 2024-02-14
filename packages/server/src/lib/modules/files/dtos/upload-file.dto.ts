import { ReadStream } from 'fs'

export abstract class UploadFileDto {
    public filename: string
    public mimetype: string
    public encoding: string
    public createReadStream: () => ReadStream
}
