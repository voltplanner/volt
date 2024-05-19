import { Input } from 'shared'
import { useCreateProject } from '../api/useCreateProject'
import { useState } from 'react'

export const CreateProject = () => {
    const [state, setState] = useState({
        budget: 0,
        deadline: 0,
        description: '',
        name: '',
        members: [],
    })
    const { createProject } = useCreateProject({
        ...state,
    })
    return (
        <div>
            <Input />
            <textarea />
            <Input type="date" />
        </div>
    )
}
