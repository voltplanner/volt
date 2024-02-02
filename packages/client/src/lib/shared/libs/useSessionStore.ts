import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface SessionState {
    uid: string
    code: string
    getUserProfile: () => void
}
export const useSessionState = create<SessionState>()(
    devtools((set, get) => ({
        code: '',
        uid: '',
        getUserProfile: () => console.log('1'),
    })),
)
