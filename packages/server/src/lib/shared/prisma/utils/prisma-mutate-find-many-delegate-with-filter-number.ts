export function mutateFindManyDelegateWithFilterNumber(
    delegate: any,
    field: string,
    filterBy?: null | number | number[],
) {
    if (!filterBy) {
        return undefined
    }

    if (typeof filterBy === 'number') {
        delegate[field] = filterBy
    } else if (filterBy.length) {
        delegate[field] = {
            in: filterBy,
        }
    }
}
