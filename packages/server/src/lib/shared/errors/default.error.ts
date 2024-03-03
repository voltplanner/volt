export abstract class DefaultError extends Error {
    abstract code: string // 'DEFAULT__000'
    abstract name: string // 'DEFAULT__ERROR'
    metadata?: string | object

    constructor(dto?: {
        context?: string
        message?: string
        metadata?: string | object,
    }) {
        const contextStr = (dto?.context && dto?.message) ? `(${dto.context}) ` : ''

        super(contextStr + dto?.message)

        this.metadata = dto?.metadata
    }
}
