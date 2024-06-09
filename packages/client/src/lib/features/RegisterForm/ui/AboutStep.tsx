import { SubmitHandler, UseFormHandleSubmit, useForm } from 'react-hook-form'
import { Button, Input } from 'shared'
import { FormStyled } from './styles'
import { formStore } from '../model/formStore'
import { useEffect } from 'react'
type FormData = {
    surname: string
    name: string
    middleName: string
    nickname: string
}
export const AboutStep = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            surname: '',
            name: '',
            middleName: '',
            nickname: '',
        },
    })
    const { setData, data, setStep } = formStore()
    const onSubmit: SubmitHandler<FormData> = (data) => {
        setData(data)
        setStep(2)
    }

    return (
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Surname"
                variant="primary"
                placeholder="surname"
                register={register}
                validationSchema={{
                    name: 'surname',
                    schema: {
                        required: true,
                        minLength: {
                            value: 3,
                            message: 'Please enter a minimum of 3 characters',
                        },
                    },
                }}
                error={errors?.surname?.message}
            />
            <Input
                label="Name"
                variant="primary"
                placeholder="name"
                register={register}
                validationSchema={{
                    name: 'name',
                    schema: {
                        required: true,
                        minLength: {
                            value: 3,
                            message: 'Please enter a minimum of 3 characters',
                        },
                    },
                }}
                error={errors?.name?.message}
            />
            <Input
                label="Middle name"
                variant="primary"
                placeholder="middlename"
                register={register}
                validationSchema={{
                    name: 'middleName',
                    schema: {
                        required: false,
                    },
                }}
            />
            <Input
                label="Nickname"
                variant="primary"
                placeholder="nickname"
                register={register}
                hint="This is how people will refer to you"
                validationSchema={{
                    name: 'nickname',
                    schema: {
                        required: true,
                        minLength: {
                            value: 3,
                            message: 'Please enter a minimum of 3 characters',
                        },
                    },
                }}
                error={errors?.nickname?.message}
            />
            <Input
                disabled
                label="Email"
                variant="primary"
                placeholder="example@example.ru"
            />
            <Button type="submit">Next</Button>
        </FormStyled>
    )
}
