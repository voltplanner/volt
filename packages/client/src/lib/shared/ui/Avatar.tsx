import { NoAvatarIcon } from 'shared/assets/NoAvatarIcon'
import styled from 'styled-components'
interface AvatarProps {
    imageUrl?: string
    altText: string
    size?: string
}
export const Avatar = (props: AvatarProps) => {
    const { imageUrl, size = '37px', altText } = props
    return (
        <AvatarStyled $size={size}>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={altText}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            ) : (
                <NoAvatarIcon
                    width={'20px'}
                    height={'20px'}
                    objectFit={'cover'}
                />
            )}
        </AvatarStyled>
    )
}
const AvatarStyled = styled.div<{ $size: string }>`
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    width: ${({ $size }) => $size};
    height: ${({ $size }) => $size};
    overflow: hidden;
    background: #d9d9d9;
`
