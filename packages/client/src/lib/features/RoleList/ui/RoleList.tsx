import styled from 'styled-components'
import { useRoles } from '../api/useRoles'
import { Group } from '../model/types'
import { RoleGroup } from './RoleGroup'
import { Skeleton } from 'shared'

export const RoleList = () => {
    const { data, loading, error } = useRoles()
    if (loading) {
        return (
            <WrapperStyled>
                <Skeleton height="56px" />
                <Skeleton height="56px" />
                <Skeleton height="56px" />
            </WrapperStyled>
        )
    }
    return (
        <WrapperStyled>
            {data?.map((group: Group) => (
                <RoleGroup group={group} />
            ))}
        </WrapperStyled>
    )
}
const WrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0;
`
