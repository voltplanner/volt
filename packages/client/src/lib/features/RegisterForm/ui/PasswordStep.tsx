import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input } from 'shared'
import { FormStyled } from './styles'
import { useEffect } from 'react'
import { useFormStore } from '../model/useFormStore'
type FormData = {
    password: string
    passwordRepeat: string
}
export const PasswordStep = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            password: '',
            passwordRepeat: '',
        },
    })
    const { setData, data, setStep } = useFormStore()
    const onSubmit: SubmitHandler<FormData> = (data) => {
        setData(data)
    }
    useEffect(() => {
        console.log('state', data)
    }, [data])
    const onBack = () => {
        setStep(1)
    }
    return (
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Password"
                variant="primary"
                placeholder="password"
                register={register}
                validationSchema={{
                    name: 'password',
                    schema: {
                        required: true,
                        minLength: {
                            value: 6,
                            message: 'Please enter a minimum of 3 characters',
                        },
                    },
                }}
                error={errors?.password?.message}
            />
            <Input
                label="Repeat password"
                variant="primary"
                placeholder="repeat password"
                register={register}
                validationSchema={{
                    name: 'passwordRepeat',
                    schema: {
                        required: true,
                        minLength: {
                            value: 6,
                            message: 'Please enter a minimum of 3 characters',
                        },
                    },
                }}
                error={errors?.passwordRepeat?.message}
            />
            <Button onClick={onBack}>Next</Button>
            <Button type="submit">Next</Button>
        </FormStyled>
    )
}
