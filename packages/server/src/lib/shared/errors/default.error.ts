export abstract class DefaultError extends Error {
    abstract code: string // 'DEFAULT__000'
    abstract name: string // 'DEFAULT__ERROR'
    metadata?: string | object

    constructor(dto?: {
        context?: string
        message?: string | object
        metadata?: string | object,
    }) {
        let messageStr = ''

        if (typeof dto?.message === 'string') {
            messageStr = dto.message.trim()
        } else if (dto?.message instanceof Error) {
            messageStr = dto.message.message.trim()
        } else {
            messageStr = DefaultError._stringifyAny(dto?.message).trim()
        }

        const contextStr = (dto?.context?.trim() && messageStr) ? `(${dto.context.trim()}) ` : ''

        super(contextStr + messageStr)

        this.metadata = dto?.metadata
    }

    static _stringifyAny(obj: any): string {
        const startTimeMark = process.hrtime()

        if (obj === undefined || obj === null) {
            return ''
        }

        if (typeof obj === 'string') {
            return obj
        }

        if (typeof obj === 'number') {
            return String(obj)
        }

        if (typeof obj === 'boolean') {
            return String(obj)
        }

        let result = ''

        try {
            if (!result) {
                result = JSON.stringify(obj)
            }
        } catch {/*  */}

        try {
            if (!result) {
                result = String(obj)
            }
        } catch {/*  */}

        const [, elapsedNano] = process.hrtime(startTimeMark)

        if (elapsedNano >= 100 * 1000) {
            console.warn(`${Math.ceil(elapsedNano / 1000)} milliseconds taken to stringify any in ${DefaultError.name}:`, obj)
        }

        return result
    }
}
