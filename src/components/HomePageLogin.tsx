import { FC, useState } from 'react'
import { useUserStore } from '@/store'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { STATUSES, ISnackbar } from '@/types'

type LoginType = Pick<ISnackbar, 'setSnackbarStatus' | 'setIsSnackbarOpen'>

interface ILoginView {
  isLoading: boolean
  logUser: () => Promise<void>
}

export const HomePageLogin: FC<LoginType> = ({
  setSnackbarStatus,
  setIsSnackbarOpen,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const setProvider = useUserStore((state) => state.setProvider)

  const logUser = async () => {
    try {
      setIsLoading(true)
      await setProvider()
      setSnackbarStatus(STATUSES.success)
    } catch (error) {
      setSnackbarStatus(STATUSES.error)
      console.error(error)
    } finally {
      setIsSnackbarOpen(true)
      setIsLoading(false)
    }
  }

  return (
    <>
      <View logUser={logUser} isLoading={isLoading} />
    </>
  )
}

const View: FC<ILoginView> = ({ logUser, isLoading }) => {
  return (
    <>
      <Paper square={false} variant="outlined">
        <Stack p={10} gap={3} alignItems="center">
          <Typography
            variant="h4"
            align="center"
            component="h1"
            color="text.secondary"
          >
            Connect your wallet
          </Typography>
          <Typography
            variant="body1"
            align="center"
            component="h1"
            color="text.secondary"
          >
            To send transactions, connect to any non-custodial wallet using the
            button below
          </Typography>
          <Button
            disabled={isLoading}
            variant="contained"
            size="large"
            sx={{ width: 'fit-content' }}
            onClick={logUser}
          >
            Connect wallet
          </Button>
        </Stack>
      </Paper>
    </>
  )
}
