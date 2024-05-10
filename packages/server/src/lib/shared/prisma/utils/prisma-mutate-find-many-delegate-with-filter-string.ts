export function mutateFindManyDelegateWithFilterString(
    delegate: any,
    field: string,
    filterBy?: null | string | string[],
) {
    if (!filterBy) {
        return undefined
    }

    if (typeof filterBy === 'string') {
        delegate[field] = { contains: filterBy, mode: 'insensitive' }
    } else if (filterBy.length) {
        delegate.OR = delegate.OR || []

        filterBy.forEach((i) => {
            delegate.OR.push({
                [field]: { contains: i, mode: 'insensitive' },
            })
        })
    }
}