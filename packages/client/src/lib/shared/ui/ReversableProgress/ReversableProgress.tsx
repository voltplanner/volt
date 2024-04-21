import {
    ChangeEventHandler,
    KeyboardEventHandler,
    ProgressHTMLAttributes,
    useEffect,
    useRef,
    useState,
} from 'react'
import {
    ButtonCancelStyled,
    ButtonSaveStyled,
    InputStyled,
    PopupStyled,
    ProgressStyled,
} from './styles'
type HTMLProgressProps = Omit<
    ProgressHTMLAttributes<HTMLProgressElement>,
    'value' | 'onChange' | 'readOnly'
>
interface IReversableProps extends HTMLProgressProps {
    color?: string
    background?: string
    hover?: string
    value: string
    isReversable?: boolean
    callback?: (value: string) => void
}
export const ReversableProgress = (props: IReversableProps) => {
    const { isReversable, callback, value, ...other } = props
    const [isReversed, setIsReversed] = useState(false)
    const [inputValue, setInputValue] = useState(value)
    const ref = useRef<HTMLInputElement>(null)
    const refSave = useRef<HTMLButtonElement>(null)
    const refCancel = useRef<HTMLButtonElement>(null)
    const handleReverse = () => {
        setIsReversed((prev) => !prev)
    }
    const handleChange: ChangeEventHandler<HTMLInputElement> | undefined = (
        e,
    ) => {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        if (isReversed) {
            ref.current?.focus()
            ref.current?.select()
        }
    }, [isReversed])
    if (isReversable && callback) {
        const handleSave = () => {
            callback(inputValue)
            handleReverse()
        }
        const handleCancel = () => {
            setInputValue(value)
            handleReverse()
        }
        const handleEnter:
            | KeyboardEventHandler<HTMLInputElement>
            | undefined = (e) => {
            if (e.key === 'Enter') {
                callback(inputValue)
                handleReverse()
            }
            if (e.key === 'Escape') {
                setInputValue(value)
                handleReverse()
            }
        }
        const handleBlur = () => {
            if (
                document.activeElement === refSave.current ||
                document.activeElement === refCancel.current
            ) {
                return
            }
            setInputValue(value)
            handleReverse()
        }
        return isReversed ? (
            <div style={{ position: 'relative' }}>
                <InputStyled
                    ref={ref}
                    value={inputValue}
                    onChange={handleChange}
                    type="text"
                    onKeyDown={handleEnter}
                    onBlur={handleBlur}
                />
                <PopupStyled>
                    <ButtonSaveStyled onMouseDown={handleSave} ref={refSave}>
                        save
                    </ButtonSaveStyled>
                    <ButtonCancelStyled
                        onMouseDown={handleCancel}
                        ref={refCancel}
                    >
                        cancel
                    </ButtonCancelStyled>
                </PopupStyled>
            </div>
        ) : (
            <ProgressStyled
                onClick={handleReverse}
                value={inputValue}
                {...other}
            />
        )
    }
    return <ProgressStyled {...other} value={value} />
}
