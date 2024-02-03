import { applyDecorators, SetMetadata } from '@nestjs/common'

export const ACCESS_CONTROL_METAKEY = 'ACCESS_CONTROL_METAKEY'

export interface AccessControlPayload {
    description: string
    group: string
    editable?: boolean
}

export function AccessControl(data: AccessControlPayload) {
    return applyDecorators(SetMetadata(ACCESS_CONTROL_METAKEY, data))
}
