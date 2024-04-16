import { useEffect } from 'react'
import { useRoles } from '../api/useRoles'
import { useRoleStore } from '../model/useRoleStore'
import { GroupPermissions } from 'entities'
import { Button } from 'shared'
import { useChangePermissions } from '../api/useChangePermissions'
import { FormStyled } from './styles'
interface EditRoleProps {
    name: string
}
export const EditRole = ({ name = '' }: EditRoleProps) => {
    const { data, loading, error } = useRoles(name)
    const {
        methodsSeparated,
        methodsChanged,
        role,
        setRole,
        separateMethods,
        toggleMethod,
    } = useRoleStore()
    const { changePermissions } = useChangePermissions({
        roleId: role?.id,
        permissions: methodsChanged?.map((method) => ({
            methodId: method.id,
            allow: method.allowed,
        })),
    })
    useEffect(() => {
        if (data?.[0]) {
            setRole(data[0])
            separateMethods()
        }
    }, [data])
    const onSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await changePermissions()
        } catch (e) {
            console.error('error => ', e)
        }
    }
    return (
        <FormStyled onSubmit={onSave}>
            {methodsSeparated?.map((method) => (
                <GroupPermissions
                    methods={method?.rules}
                    name={method?.name}
                    onChange={toggleMethod}
                />
            ))}
            <Button
                type="submit"
                variant="primary"
                disabled={!methodsChanged.length}
            >
                Save
            </Button>
        </FormStyled>
    )
}
