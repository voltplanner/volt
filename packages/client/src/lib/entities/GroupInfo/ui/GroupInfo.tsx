import { Avatar, Button } from 'shared'
import { InfoStyled, TextStyled, TitleStyled, WrapperStyled } from './styles'
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
