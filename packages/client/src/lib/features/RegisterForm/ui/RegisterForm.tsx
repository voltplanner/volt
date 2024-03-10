import { useFormStore } from '../model/useFormStore'
import { AboutStep } from './AboutStep'
import { PasswordStep } from './PasswordStep'

export const RegisterForm = () => {
    const { setData, data, step } = useFormStore()
    return <div>{step === 1 ? <AboutStep /> : <PasswordStep />}</div>
}
