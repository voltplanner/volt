import { Checkbox, Header } from 'shared'
import { RulesStyled, WrapperStyled } from './styles'

type TGroup = {
    allowed: boolean
    description: string
    editable: boolean
    group: string
    id: string
    name: string
    __typename: string
}
interface GroupPermissionsProps {
    name: string
    methods: TGroup[]
    onChange: (id: string) => void
}

export const GroupPermissions = (props: GroupPermissionsProps) => {
    const { methods, name, onChange } = props
    return (
        <WrapperStyled>
            <Header subtitle={name} />
            <RulesStyled>
                {methods?.map((method) => (
                    <Checkbox
                        label={method.description}
                        isChecked={method.allowed}
                        onChange={onChange}
                        id={method.id}
                        key={method.id}
                    />
                ))}
            </RulesStyled>
        </WrapperStyled>
    )
}
