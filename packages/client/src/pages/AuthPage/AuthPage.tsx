import { Button, Container, Typography } from '@mui/material'
import { AuthForm } from 'features'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
const AuthPage = () => {
    const { t } = useTranslation()
    const [isOwn, setIsOwn] = useState(false)
    const handleBack = () => {
        setIsOwn(false)
    }
    if (isOwn) {
        return (
            <Container
                maxWidth="xs"
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '12px',
                    height: '100%',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom margin={0}>
                    {t('Login to Volt')}
                </Typography>
                <Button variant="contained">Continue with Gitlab</Button>
                <Button variant="contained" onClick={() => setIsOwn(true)}>
                    Continue with Email
                </Button>
            </Container>
        )
    }
    return (
        <Container
            maxWidth="xs"
            sx={{
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '12px',
                height: '100%',
            }}
        >
            <Typography variant="h4" align="center" gutterBottom margin={0}>
                {t('Login to Volt')}
            </Typography>
            <Button variant="contained">Continue with Gitlab</Button>
            <Button variant="contained" onClick={() => setIsOwn(true)}>
                Continue with Email
            </Button>
            <AuthForm handleBack={handleBack} />
        </Container>
    )
}
export default AuthPage
