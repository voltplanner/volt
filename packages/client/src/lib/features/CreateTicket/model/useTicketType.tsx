const ticketTypes = [
    {
        value: '1',
        label: 'Type 1',
    },
    {
        value: '2',
        label: 'Type 2',
    },
    {
        value: '3',
        label: 'Type 3',
    },
]

export const useTicketType = () => {
    const getAll = () => ticketTypes

    const getByName = (name: string) => {
        return ticketTypes.find((item) => item.label === name)
    }

    return {
        getAll,
        getByName,
    }
}
