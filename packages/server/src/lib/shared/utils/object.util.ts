export function getObjectKeys<T extends object>(o: T): (keyof T)[] {
    return Object.getOwnPropertyNames(o) as (keyof T)[]
}

export function getObjectValues<T extends object>(o: T): (T[(keyof T)])[] {
    return Object.getOwnPropertyNames(o) as (T[(keyof T)])[]
}
