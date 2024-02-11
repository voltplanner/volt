import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetFileInput {
    @Field()
    id: string
}

@InputType()
export class UploadFileInput {
    @Field()
    id: string
}
