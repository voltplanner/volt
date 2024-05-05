import { useInvite } from 'features/InviteUser/api/useInvite'
import { ChangeEvent, useState } from 'react'
import { Button, Input } from 'shared'

export const InviteModal = ({ onClose }: { onClose: () => void }) => {
    const [state, setState] = useState({
        email: '',
        firstname: '',
        lastname: '',
        roleName: '',
    })
    const onInput = (key: string, value: string) => {
        setState((prev) => ({ ...prev, [key]: value }))
        console.log(value, state)
    }
    const onCreate = async () => {
        if (
            Object.values(state).every(
                (val) => val !== '' && typeof val === 'string',
            )
        )
            try {
                await createUser()
                onClose()
            } catch (e) {
                console.log(e)
            }
    }
    const { createUser, data, error, loading } = useInvite(state)
    return (
        <div>
            <Input
                label="email"
                value={state.email}
                onChange={(value) => onInput('email', value)}
                variant="primary"
            />
            <Input
                label="firstname"
                value={state.firstname}
                onChange={(value) => onInput('firstname', value)}
                variant="primary"
            />
            <Input
                label="lastname"
                value={state.lastname}
                onChange={(value) => onInput('lastname', value)}
                variant="primary"
            />
            <Input
                label="role"
                value={state.roleName}
                onChange={(value) => onInput('roleName', value)}
                variant="primary"
            />
            <Button onClick={onCreate}>Create</Button>
        </div>
    )
}
