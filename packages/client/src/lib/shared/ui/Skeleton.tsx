import styled, { keyframes } from 'styled-components'

const loadingAnimation = keyframes`
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
`

const SkeletonDiv = styled.div`
    height: 20px;
    background-color: #b5b5b5;
    border-radius: 5px;
    margin-bottom: 5px;
    animation: ${loadingAnimation} 1s infinite ease-in-out alternate;
`
interface SkeletonProps {
    width?: string
    height?: string
}
export const Skeleton = (props: SkeletonProps) => {
    const { width = '100%', height = '40px' } = props
    return <SkeletonDiv style={{ width, height }} />
}
