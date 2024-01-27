import AppRouter from './routes/AppRouter'
import { Stack, ThemeProvider, createTheme } from '@mui/material'
import { ResponsiveAppBar } from 'widgets'

export function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#809da2',
            },
            secondary: {
                main: '#f50057',
            },
            background: {
                default: '#334749',
            },
        },
        typography: {
            allVariants: {
                color: '#e3e3e3',
            },
            h4: {
                fontSize: '26px',
            },
        },
    })
    return (
        <ThemeProvider theme={theme}>
            {/* <ResponsiveAppBar /> */}
            <Stack
                sx={{
                    backgroundColor: 'background.default',
                    height: '100%',
                }}
            >
                <AppRouter />
            </Stack>
        </ThemeProvider>
    )
}

export default App
