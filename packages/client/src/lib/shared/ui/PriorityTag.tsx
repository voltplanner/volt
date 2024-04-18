import { HighPriorityIcon } from 'shared/assets/HighPriorityIcon'
import { LowPriorityIcon } from 'shared/assets/LowPriorityIcon'
import { MediumPriorityIcon } from 'shared/assets/MediumPriorityIcon'
import { VeryHighPriorityIcon } from 'shared/assets/VeryHighPriorityIcon'
import { VeryLowPriorityIcon } from 'shared/assets/VeryLowPriorityIcon'
import styled from 'styled-components'

export const PriorityTag = ({ priority }: { priority: string }) => {
    if (priority === '5') {
        return (
            <WrapperStyled>
                <VeryLowPriorityIcon /> <span>Very low</span>
            </WrapperStyled>
        )
    }
    if (priority === '4') {
        return (
            <WrapperStyled>
                <LowPriorityIcon /> <span>Low</span>
            </WrapperStyled>
        )
    }
    if (priority === '3') {
        return (
            <WrapperStyled>
                <MediumPriorityIcon /> <span>Medium</span>
            </WrapperStyled>
        )
    }
    if (priority === '2') {
        return (
            <WrapperStyled>
                <HighPriorityIcon /> <span>High</span>
            </WrapperStyled>
        )
    }
    return (
        <WrapperStyled>
            <VeryHighPriorityIcon /> <span>Very high</span>
        </WrapperStyled>
    )
}
const WrapperStyled = styled.div`
    display: flex;
    gap: 16px;
`
