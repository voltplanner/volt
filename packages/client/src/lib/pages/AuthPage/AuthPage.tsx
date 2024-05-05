import { LoginForm, RegisterForm } from 'features'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

const AuthPage = () => {
    const { t } = useTranslation()
    const [isOwn, setIsOwn] = useState(false)
    const [searchParams] = useSearchParams()
    const handleBack = () => {
        setIsOwn(false)
    }

    const code = searchParams.get('code') // 'name'
    const userId = searchParams.get('userId')
    const email = searchParams.get('email')

    if (code && userId && email) {
        return <RegisterForm code={code} email={email} userId={userId} />
    }

    return <LoginForm title="Login to Volt" />
}
export default AuthPage
