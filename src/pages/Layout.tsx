import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { LogOutAction } from '@/components/LogOutAction'
import { Address } from '@/components/Address'
import { Outlet } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'

import { useUserStore } from '@/store'

export const Layout: FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const provider = useUserStore((store) => store.provider)

  useEffect(() => {
    provider ? setIsConnected(true) : setIsConnected(false)
  }, [provider])
  return (
    <>
      <Grid container>
        <Grid
          item
          p={5}
          xs={12}
          md={5}
          bgcolor="grey.50"
          minHeight={{ s: 'unset', md: '100vh' }}
          borderRight={{ xs: 0, md: 1 }}
          borderColor={{ xs: 'none', md: 'grey.300' }}
        >
          <Stack
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            height="100%"
            spacing={5}
          >
            <Stack>
              <Typography
                variant="h2"
                align="center"
                component="h1"
                color="text.secondary"
              >
                ERC20 Simple Interface
              </Typography>
              <Address />
            </Stack>
            {isConnected && <LogOutAction />}
          </Stack>
        </Grid>
        <Grid item xs={12} md={7} p={{ xs: 4, lg: 10 }}>
          <Container>
            <Outlet />
          </Container>
        </Grid>
      </Grid>
    </>
  )
}
