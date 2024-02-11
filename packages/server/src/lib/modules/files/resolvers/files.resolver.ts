import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AccessControl } from '../../../shared/decorators'
import { ACLGuard } from '../../../shared/guards/acl.guard'
import { GetFileInput, UploadFileInput } from '../interfaces/files.graphql'
import { FilesService } from '../services/files.service'

@Resolver()
export class FilesResolver {
    constructor(private readonly filesService: FilesService) {}

    @UseGuards(ACLGuard)
    @Query(() => String)
    @AccessControl({ group: 'files', description: 'Get file' })
    async getFile(@Args('input') input: GetFileInput): Promise<string> {
        return await this.filesService.getFile(input)
    }

    @UseGuards(ACLGuard)
    @Mutation(() => Boolean)
    @AccessControl({ group: 'files', description: 'Upload file' })
    async uploadFile(@Args('input') input: UploadFileInput): Promise<boolean> {
        return await this.filesService.uploadFile(input)
    }
}
