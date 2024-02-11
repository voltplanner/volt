import { produce } from 'immer'
import { AuthorizationResponse } from 'sdk'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface SessionStore {
    session: {
        userId: string
        accessToken: string
        expiresAt: number
        refreshToken: string
    }
    code: string
    getLocalSession: () => void
    login: (data: AuthorizationResponse) => void
    logout: () => void
}
export const useSessionStore = create<SessionStore>()(
    devtools((set, get) => ({
        code: '',
        session: {
            userId: '',
            accessToken: '',
            expiresAt: 0,
            refreshToken: '',
        },
        getUserProfile: () => console.log('1'),
        getLocalSession: () => set(
            produce((draft: SessionStore) => {
                draft.session.accessToken = localStorage.getItem('accessToken') ?? ''
                draft.session.expiresAt = Number(localStorage.getItem('expiresAt'))
                draft.session.refreshToken = localStorage.getItem('refreshToken') ?? ''
                draft.session.userId = localStorage.getItem('userId') ?? ''
            }),
        ),
        login: (data) => set(
            produce((draft: SessionStore) => {
                if (data) {
                    localStorage.setItem('accessToken', data.accessToken)
                    localStorage.setItem('expiresAt', data.expiresAt.toString())
                    localStorage.setItem('refreshToken', data.refreshToken)
                    localStorage.setItem('userId', data.userId)
                    draft.session.accessToken = data.accessToken
                    draft.session.expiresAt = data.expiresAt
                    draft.session.refreshToken = data.refreshToken
                    draft.session.userId = data.userId
                }
            }),
        ),
        logout: () => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('expiresAt')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('userId')
        }
    })),
)
