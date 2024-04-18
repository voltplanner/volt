import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input } from 'shared'
import { FormStyled } from './styles'
import { useCompleteSignIn } from '../api/useCompleteSignIn'
import { useSearchParams } from 'react-router-dom'
type FormData = {
    password: string
    passwordRepeat: string
}
export const PasswordStep = () => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            password: '',
            passwordRepeat: '',
        },
    })
    const password = watch('password')
    // const { data, setStep } = useFormStore()
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // setData(data)
        try {
            await completeSignIn()
        } catch (e) {
            console.log(e)
        }
    }
    const [searchParams] = useSearchParams()
    console.log(searchParams.get('code')) // 'name'
    const { completeSignIn } = useCompleteSignIn({
        userId: searchParams.get('userId') ?? '',
        code: searchParams.get('code') ?? '',
        password: password,
    })
    // useEffect(() => {
    //     console.log('state', data)
    // }, [data])
    // const onBack = () => {
    //     setStep(1)
    // }
    return (
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Password"
                variant="primary"
                placeholder="password"
                register={register}
                type="password"
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
                type="password"
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
            {/* <Button onClick={onBack}>Back</Button> */}
            <Button type="submit">Save password</Button>
        </FormStyled>
    )
}
