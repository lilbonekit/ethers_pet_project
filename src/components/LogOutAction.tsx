import Button from '@mui/material/Button'
import { FC } from 'react'

import { useUserStore } from '@/store'

export const LogOutAction: FC = () => {
  const reset = useUserStore((store) => store.reset)

  return (
    <>
      <Button color="error" onClick={async () => await reset()}>
        Log out
      </Button>
    </>
  )
}
