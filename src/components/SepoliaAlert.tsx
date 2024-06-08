import { FC, useState } from 'react'
import { Stack } from '@mui/material'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

import { useUserStore } from '@/store'

export const SepoliaAlert: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const switchToSepolia = useUserStore((store) => store.switchToSepolia)
  const addSepolia = useUserStore((store) => store.addSepolia)

  const chooseSepolia = async () => {
    setIsLoading(true)
    try {
      await switchToSepolia()
    } catch (error) {
      console.error(error)
      await addSepolia()
      await switchToSepolia()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Alert
        severity="error"
        variant="outlined"
        action={
          <Button size="small" onClick={chooseSepolia} disabled={isLoading}>
            Connect to Sepolia
          </Button>
        }
      >
        <Stack>You're not connected to Sepolia Testnet!</Stack>
      </Alert>
    </>
  )
}
