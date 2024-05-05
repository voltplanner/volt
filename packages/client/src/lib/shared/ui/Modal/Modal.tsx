import { ReactNode } from 'react'
import { ModalContainerStyled, ModalOverlayStyled } from './styles'

export const Modal = ({
    children = null,
    isOpen,
    onClose,
}: {
    children: ReactNode
    isOpen: boolean
    onClose: () => void
}) => {

    const handleOverlayClick = (e: { target: any; currentTarget: any }) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
    if (!isOpen) {
        return null
    }

    return (
        <ModalOverlayStyled onClick={handleOverlayClick}>
            <button onClick={onClose}>EXIT</button>
            <ModalContainerStyled>{children}</ModalContainerStyled>
        </ModalOverlayStyled>
    )
}
