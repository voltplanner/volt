import { produce } from "immer"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { RoleStore } from "./types"

export const useRoleStore = create<RoleStore>()(devtools((set, get) => ({
    role: {
        id: '',
        editable: false,
        name: '',
        superuser: false,
        __typename: '',
        methods: []
    },
    methodsSeparated: [],
    methodsChanged: [],
    setRole: (role) => (
        set(
            produce((draft: RoleStore) => {
                draft.role = role
            }
            ),
        )),
    separateMethods: () => (
        set(
            produce((draft: RoleStore) => {
                if (!draft.role.methods?.length) {
                    return
                }
                const parts = new Set(draft.role?.methods.map(method => method.group))
                const methodsSeparated = Array.from(parts).map((part: string) => ({ name: part, rules: draft.role.methods.filter(method => method.group === part) }))
                draft.methodsSeparated = methodsSeparated
            })
        )),
    toggleMethod: (id) => set(produce((draft: RoleStore) => {
        const method = draft.role?.methods?.find(method => method.id === id)
        if (!method) {
            return
        }
        if (!draft.methodsChanged.some(obj => obj.id === method.id)) {
            draft.methodsChanged = [...draft.methodsChanged, { id: method.id, allowed: !method.allowed }]
        } else {
            draft.methodsChanged = draft.methodsChanged.filter(method => method.id !== id)
        }
    }))
})),
)