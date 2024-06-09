import { Button, Modal} from 'shared'
import { useCreateProject } from '../api/useCreateProject'
import { useState } from 'react'
import { CreateModal } from './CreateModal/CreateModal'

export const CreateProject = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onClickModal = () => {
        setIsOpen((prev) => !prev)
    }
    return (
        <>
            <Button onClick={onClickModal}>+ Create project</Button>
            <Modal
                children={<CreateModal />}
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
            />
            
        </>
    )
}
