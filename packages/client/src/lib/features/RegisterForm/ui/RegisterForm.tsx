import { useFormStore } from '../model/useFormStore'
import { AboutStep } from './AboutStep'
import { PasswordStep } from './PasswordStep'

export type RegisterData = {
    code: string
    userId: string
    email: string
}

export const RegisterForm = ({ code, userId, email }: RegisterData) => {
    return (
        <div>
            <PasswordStep code={code} email={email} userId={userId} />
        </div>
    )
}
