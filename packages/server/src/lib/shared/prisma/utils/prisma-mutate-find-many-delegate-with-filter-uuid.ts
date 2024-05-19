export function mutateFindManyDelegateWithFilterUuid(
    delegate: any,
    field: string,
    filterBy?: null | string | string[],
) {
    if (!filterBy) {
        return undefined
    }

    if (typeof filterBy === 'string') {
        delegate[field] = filterBy
    } else if (filterBy.length) {
        delegate[field] = {
            in: filterBy,
        }
    }
}