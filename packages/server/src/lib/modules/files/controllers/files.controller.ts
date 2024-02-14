import 'multer'

import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { v4 as generateUuidV4 } from 'uuid'

import { FilesService } from '../services/files.service'

@Controller()
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.filesService.uploadFileRest(
            file,
            generateUuidV4(), // TODO add userId after implement ACL and @CurrentUser() decorator for REST
        )
    }
}
