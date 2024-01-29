import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IAuthState {
    uid: string
    code: string
    getUserProfile: () => void
}
export const useAuthState = create<IAuthState>()(
    devtools((set, get) => ({
        code: '',
        uid: '',
        getUserProfile: () => console.log('1'),
    })),
)
