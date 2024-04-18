import { DefaultError } from './default.error'

export class UnexpectedError extends DefaultError {
    code = 'UNEXPECTED__000'
    name = 'UNEXPECTED__ERROR'

    constructor(dto: string)
    constructor(dto: {
        context?: string
        message?: any
        metadata?: string | object
    })
    constructor(
        dto:
            | { context?: string; message?: any; metadata?: string | object }
            | string,
    ) {
        super(typeof dto === 'string' ? { message: dto } : dto)
    }
}
