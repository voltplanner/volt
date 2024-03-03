interface ParseMetaArgsPayload {
    curPage?: number
    perPage?: number
    defaults?: {
        curPage: number
        perPage: number
    }
}

export function parseMetaArgs(data: ParseMetaArgsPayload): {
    take: number
    skip: number
    curPage: number
    perPage: number
} {
    const { curPage, perPage } = data

    let { defaults } = data

    if (!defaults) {
        defaults = {
            curPage: 1,
            perPage: 10,
        }
    }
    const parsedCurrentPage = curPage || defaults.curPage
    const parsedPerPage = perPage || defaults.perPage
    const skip =
        parsedCurrentPage === 1
            ? 0
            : parsedPerPage * parsedCurrentPage - parsedPerPage

    return {
        take: parsedPerPage,
        skip,
        curPage: parsedCurrentPage,
        perPage: parsedPerPage,
    }
}
