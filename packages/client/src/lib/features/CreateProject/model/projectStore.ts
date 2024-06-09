import { produce } from 'immer'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
type TMembers = {
    userId: string,
    roleCode: string
}
type TProject = {
    name: string
    // id: string
    description: string
    deadline: number
    budget: number
    members: TMembers[]
}
interface ProjectState {
    project: TProject,
    setField: (key: keyof TProject, value: string | number) => void
    resetStore: () => void
}
export const projectStore = create<ProjectState>()(
    devtools((set, get) => ({
        project: {
            name: '',
            // id: '',
            description: '',
            deadline: 0,
            budget: 0,
            members: [],
        },
        setField: (key, value) => {
            set(
                produce((draft) => {
                    draft.project = { ...draft.project, [key]: value }
                }),
            )
        },
        resetStore: () =>
            set(
                produce((draft) => {
                    draft.project = {
                        name: '',
                        // id: '',
                        description: '',
                        deadline: '',
                        budget: '',
                        members: [],
                    }
                }),
            ),
    })),
)
