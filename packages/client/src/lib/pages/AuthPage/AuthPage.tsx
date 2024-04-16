import { LoginForm, RegisterForm } from 'features'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
const AuthPage = () => {
    const { t } = useTranslation()
    const [isOwn, setIsOwn] = useState(false)
    const handleBack = () => {
        setIsOwn(false)
    }
    if (true) {
        return <RegisterForm />
    }

    return <LoginForm title="Login to Volt" />
}
export default AuthPage
