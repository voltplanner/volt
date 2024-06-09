import { useCreateProject } from 'features/CreateProject/api/useCreateProject'
import { projectStore } from 'features/CreateProject/model/projectStore'
import { Button, Input, Textarea } from 'shared'

export const CreateModal = () => {
    const { setField, project } = projectStore()
    const { createProject } = useCreateProject({
        ...project,
    })
    const onCreate = async () => {
        try {
            await createProject()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <Input
                label="Name"
                required
                onChange={(value) => setField('name', value)}
            />
            {/* <Input
                label="ID"
                required
                onChange={(value) => setField('id', value)}
            /> */}
            <Input
                label="Description"
                onChange={(value) => setField('description', value)}
            />
            <Input
                label="budget"
                onChange={(value) => setField('budget', +value)}
            />
            <Input
                label="deadline"
                onChange={(value) => setField('deadline', +value)}
            />
            {/* <Input type="date" /> */}
            <Button onClick={onCreate}>Create</Button>
        </div>
    )
}
