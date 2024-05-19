export function findOneByProperty<
    T extends Record<string, unknown>,
    P extends keyof T,
>(payload: T[] | undefined, prop: P, propValue: T[P]): T | undefined {
    const result = payload?.filter((item) => item[prop] === propValue)

    if (!result) {
        return
    }

    if (result.length > 1) {
        throw new Error(
            `Found multiple entities with [symbol] prop: ${JSON.stringify({
                prop,
                propValue,
                payload,
            })}`,
        )
    }

    return result[0]
}

export function findManyByProperty<
    T extends Record<string, unknown>,
    P extends keyof T,
>(payload: T[], prop: P, propValue: T[P]): T[] {
    const resultItems = payload.filter((item) => item[prop] === propValue)

    return resultItems
}

export function getManyByProperty<
    T extends Record<string, unknown>,
    P extends keyof T,
>(payload: T[], prop: P, propValue: T[P]): T[] {
    const resultItems = payload.filter((item) => item[prop] === propValue)

    if (resultItems.length === 0) {
        throw new Error(
            `Entity with [symbol] prop not found: ${JSON.stringify({
                prop,
                propValue,
                payload,
            })}`,
        )
    }

    return resultItems
}

export function getOneByProperty<T extends object, P extends keyof T>(
    payload: T[] | undefined,
    prop: P,
    propValue: T[P],
): T {
    const result = payload?.filter((item) => item[prop] === propValue)

    if (!result || result.length === 0) {
        throw new Error(
            `Entity with [symbol] prop not found: ${JSON.stringify({
                prop,
                propValue,
                payload,
            })}`,
        )
    }

    if (result.length > 1) {
        throw new Error(
            `Found multiple entities with [symbol] prop: ${JSON.stringify({
                prop,
                propValue,
                payload,
            })}`,
        )
    }

    return result[0]
}
