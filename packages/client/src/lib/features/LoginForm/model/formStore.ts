import { produce } from 'immer'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface FormState {
    email: string
    password: string
    setEmail: (email: string) => void
    setPassword: (password: string) => void
    resetStore: () => void
}
export const formStore = create<FormState>()(
    devtools((set, get) => ({
        email: '',
        password: '',
        setEmail: (email) =>
            set(
                produce((draft) => {
                    draft.email = email
                }),
            ),
        setPassword: (password) =>
            set(
                produce((draft) => {
                    draft.password = password
                }),
            ),
        resetStore: () =>
            set(
                produce((draft) => {
                    draft.email = ''
                    draft.password = ''
                }),
            ),
    })),
)
