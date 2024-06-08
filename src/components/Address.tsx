import { FC, useEffect, useState } from 'react'
import { useUserStore } from '@/store'
import { Row } from '@/components/Row'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export const Address: FC = () => {
  const signer = useUserStore((state) => state.signer)
  const [address, setAddress] = useState<string>('')

  useEffect(() => {
    const fetchAddress = async () => {
      if (signer) {
        try {
          const address = await signer.getAddress()
          setAddress(address)
        } catch (error) {
          console.error('Failed to get address:', error)
          setAddress('')
        }
      } else {
        setAddress('')
      }
    }

    fetchAddress()
  }, [signer])

  return (
    <>
      <Stack mt={10}>
        {address ? (
          <Row title="Your address" value={address} />
        ) : (
          <Typography textAlign="center" color="text.secondary">
            Not authorized
          </Typography>
        )}
      </Stack>
    </>
  )
}
