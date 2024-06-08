import { FC } from 'react'
import { useUserStore } from '@/store'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export const AddTokenAction: FC = () => {
  const provider = useUserStore((store) => store.provider)

  const addTokenToWallet = async () => {
    if (!provider) {
      throw new Error("Provider isn't defined!")
    }

    await provider.send('wallet_watchAsset', {
      // @ts-expect-error How to notate this?!
      type: 'ERC20',
      options: {
        address: import.meta.env.VITE_DEPLOYED_CONTRACT_ADDRESS,
        symbol: 'Mock',
        decimals: 18,
        image: import.meta.env.VITE_TOKEN_LOGO,
      },
    })
  }

  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
        flexWrap="wrap"
      >
        <Typography color="text.secondary" variant="body2">
          Add ERC20 Tokens to your wallet with the button
        </Typography>
        <Button onClick={addTokenToWallet}>Add ERC20 token</Button>
      </Stack>
    </>
  )
}
