import { useState } from 'react'
import { Button, Modal } from 'shared'
import { InviteModal } from './InviteModal/InviteModal'

export const InviteUser = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onClickModal = () => {
        setIsOpen((prev) => !prev)
    }
    return (
        <>
            <Button onClick={onClickModal}>+ Invite user</Button>
            <Modal children={<InviteModal onClose={onClickModal}/>} onClose={() => setIsOpen(false)} isOpen={isOpen} />
        </>
    )
}
