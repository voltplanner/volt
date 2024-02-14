import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { ValidatePromise } from 'class-validator'
import { GraphQLUpload } from 'graphql-upload'

import { UploadFileDto } from '../dtos/upload-file.dto'

@InputType()
export class GetFileInput {
    @Field()
    id: string
}

@InputType()
export class UploadFileInput {
    @Field(() => GraphQLUpload)
    @ValidatePromise()
    @Type(() => UploadFileDto)
    file: Promise<UploadFileDto>
}
