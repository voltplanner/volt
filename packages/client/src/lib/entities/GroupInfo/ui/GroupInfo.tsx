import { Avatar, Button } from 'shared'
import styled from 'styled-components'
interface GroupInfoProps {
    group: {
        avatar?: string
        avatarAlt?: string
        title: string
        users?: number
        permissons?: number
    }
    isAvatar: boolean
}
export const GroupInfo = (props: GroupInfoProps) => {
    const { group, isAvatar } = props
    const {
        avatar = '',
        avatarAlt = 'Group avatar',
        title,
        users,
        permissons,
    } = group
    return (
        <WrapperStyled>
            {!!isAvatar && <Avatar imageUrl={avatar} altText={avatarAlt} />}
            <InfoStyled>
                <TitleStyled>{title}</TitleStyled>
                <TextStyled>
                    {!!users && `${users} users`}{' '}
                    {!!permissons && `, ${permissons} permissions`}{' '}
                </TextStyled>
            </InfoStyled>
        </WrapperStyled>
    )
}
const WrapperStyled = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    height: fit-content;
    width: fit-content;
    align-items: center;
`
const InfoStyled = styled.div``
const TitleStyled = styled.p`
    text-transform: capitalize;
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    color: #000;
    margin: 0;
`
const TextStyled = styled.p`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #c4c4c4;
    margin: 0;
`
