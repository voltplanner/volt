import { Input } from 'shared'
import { FormStyled, RowStyled } from './styles'
import { Select, SelectOption } from 'shared/ui/Select'
import { useTicketType } from '../model/useTicketType'
import { useState } from 'react'

export const CreateTicket = () => {
    const { getAll } = useTicketType()
    const [ticketType, setTicketType] = useState<SelectOption>()

    return (
        <FormStyled>
            <Select
                placeholder="Type"
                options={getAll()}
                value={ticketType}
                onChange={(type) => setTicketType(type)}
            ></Select>
            <Input
                variant="primary"
                onChange={undefined}
                placeholder="Password"
                type="password"
            />
            <Input
                variant="primary"
                onChange={undefined}
                placeholder="Password"
                type="password"
            />
            <RowStyled>
                <Input
                    variant="primary"
                    onChange={undefined}
                    placeholder="Password"
                    type="password"
                />
                <Input
                    variant="primary"
                    onChange={undefined}
                    placeholder="Password"
                    type="password"
                />
            </RowStyled>
            <RowStyled>
                <Input
                    variant="primary"
                    onChange={undefined}
                    placeholder="Password"
                    type="password"
                />
                <Input
                    variant="primary"
                    onChange={undefined}
                    placeholder="Password"
                    type="password"
                />
            </RowStyled>
            <Input
                variant="primary"
                onChange={undefined}
                placeholder="Password"
                type="password"
            />
        </FormStyled>
    )
}
