import Box from '@mui/material/Box'
import { FC, useState, useMemo, useEffect } from 'react'
import { HomePageFormMint } from '@/components/HomePageFormMint'
import { HomePageLogin } from '@/components/HomePageLogin'
import { useUserStore } from '@/store/index'
import { CustomAlert } from '@/components/CustomAlert'
import { SepoliaAlert } from '@/components/SepoliaAlert'
import { AddTokenAction } from '@/components/AddTokenAction'
import Stack from '@mui/material/Stack'

import { STATUSES, IMessages } from '@/types'

export const HomePage: FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [snackbarStatus, setSnackbarStatus] = useState<STATUSES>(
    STATUSES.success
  )
  const [isSepolia, setIsSepolia] = useState<boolean>(false)

  const network = useUserStore((store) => store.network)
  const provider = useUserStore((store) => store.provider)

  useEffect(() => {
    provider ? setIsConnected(true) : setIsConnected(false)
  }, [provider])

  useEffect(() => {
    network &&
    String(network.chainId) === String(import.meta.env.VITE_SEPOLIA_CHAIN_ID_BG)
      ? setIsSepolia(true)
      : setIsSepolia(false)
  }, [network])

  const MESSAGES = useMemo<IMessages>(
    () => ({
      error: 'Error has occurred',
      success: 'You have successfully connect your wallet!',
    }),
    []
  )

  return (
    <>
      <Box>
        {isConnected ? (
          <Stack spacing={2} mt={3}>
            {!isSepolia && <SepoliaAlert />}
            <HomePageFormMint />
            {isSepolia && <AddTokenAction />}
          </Stack>
        ) : (
          <HomePageLogin
            setSnackbarStatus={setSnackbarStatus}
            setIsSnackbarOpen={setIsSnackbarOpen}
          />
        )}
      </Box>
      <CustomAlert
        setIsSnackbarOpen={setIsSnackbarOpen}
        isSnackbarOpen={isSnackbarOpen}
        snackbarStatus={snackbarStatus}
        messages={MESSAGES}
      />
    </>
  )
}
