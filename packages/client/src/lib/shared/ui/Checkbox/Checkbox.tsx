import {
    CheckboxContainer,
    CheckboxLabel,
    CheckboxInput,
    CheckboxCheckmark,
} from './styles'

interface CheckboxProps {
    label: string
    isChecked: boolean
    id: string
    onChange: (id: string) => void
}
export const Checkbox = (props: CheckboxProps) => {
    const { label, onChange, isChecked, id } = props
    const handleChange = () => {
        onChange(id)
    }
    return (
        <CheckboxContainer>
            <CheckboxLabel>
                <CheckboxInput
                    type="checkbox"
                    defaultChecked={isChecked}
                    onChange={handleChange}
                />
                <CheckboxCheckmark />
                <span>{label}</span>
            </CheckboxLabel>
        </CheckboxContainer>
    )
}
