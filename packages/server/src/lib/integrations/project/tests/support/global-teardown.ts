/* eslint-disable */

import { setup } from './global-setup'

export async function teardown(s: Awaited<ReturnType<typeof setup>>) {
    await s.app?.close()
    await s.containerDb?.stop({ remove: true, removeVolumes: true })
}
