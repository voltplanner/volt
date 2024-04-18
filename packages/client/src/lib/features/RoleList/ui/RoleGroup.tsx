import { Button } from 'shared'
import { EditIcon } from 'shared'
import PeopleIcon from '../../../shared/assets/PeopleIcon.svg'
import { TrashIcon } from 'shared'
import { GroupInfo } from 'entities'
import styled from 'styled-components'
import { RoleGroups } from '../model/types'
import { useNavigate } from 'react-router-dom'

export const RoleGroup = ({ group }: RoleGroups) => {
    const { editable, id, methods, name, superuser } = group
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/roles/' + name)
    }
    return (
        <WrapperStyled>
            <GroupInfo
                group={{
                    avatar: undefined,
                    avatarAlt: undefined,
                    title: name,
                }}
                isAvatar={false}
            />
            <ContainerStyled>
                <Button
                    variant="image"
                    image={<EditIcon color={!editable ? '#BCBCBC' : '#000'} />}
                    onClick={handleNavigate}
                    disabled={!editable}
                />
                <Button variant="image" image={<PeopleIcon />} />
                <Button
                    variant="image"
                    image={<TrashIcon color={superuser ? '#BCBCBC' : '#000'} />}
                    disabled={superuser}
                />
            </ContainerStyled>
        </WrapperStyled>
    )
}
const WrapperStyled = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 0;
    border-bottom: 1px solid #e1e1e1;
    &:last-of-type {
        border-bottom: 0;
    }
`
const ContainerStyled = styled.div`
    display: flex;
    gap: 16px;
`
