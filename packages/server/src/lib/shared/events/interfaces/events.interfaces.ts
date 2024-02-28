export interface EventsServiceInterface {
    send: (event: any) => Promise<void>
    listen(
        pattern: string,
        callback: (event: any) => Promise<void>,
    ): Promise<void>
}

export interface EventsServiceInterfaceConstructor {
    new (): EventsServiceInterface
}
