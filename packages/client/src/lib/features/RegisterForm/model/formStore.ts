import { produce } from 'immer'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
type TData = {
    surname: string
    name: string
    middleName: string
    nickname: string
    email: string
    password: string
    passwordRepeat: string
}
interface FormState {
    data: TData
    step: number
    setStep: (value: number) => void
    setData: (value: Partial<TData>) => void
    resetStore: () => void
}
export const formStore = create<FormState>()(
    devtools((set, get) => ({
        data: {
            surname: '',
            middleName: '',
            name: '',
            nickname: '',
            email: '',
            password: '',
            passwordRepeat: '',
        },
        step: 1,
        setStep: (value) => set({ step: value }),
        setData: (value) =>
            set(
                produce((draft) => {
                    draft.data = { ...draft.data, ...value }
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
