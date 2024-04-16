import { useFormStore } from '../model/useFormStore'
import { AboutStep } from './AboutStep'
import { PasswordStep } from './PasswordStep'

export const RegisterForm = () => {
    const { setData, data, step } = useFormStore()
    return <div><PasswordStep /></div>
}
