import { FC, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useUserStore } from '@/store'
import { router } from '@/router/index'
import { EVENTS } from '@/types'

import 'normalize.css'

const App: FC = () => {
  const setProvider = useUserStore((store) => store.setProvider)
  const reset = useUserStore((store) => store.reset)
  const provider = useUserStore((store) => store.provider)

  // keep session after reloading
  // but works with issues
  // TODO: ask about this approaching
  useEffect(() => {
    const init = async () => {
      await reset()
      await setProvider()
    }

    init()
  }, [setProvider, reset])

  useEffect(() => {
    const init = async () => {
      await setProvider()
      // window.location.reload()
    }

    if (provider) {
      // Why did I use window.ethereum instead of provider here?
      // https://github.com/ethers-io/ethers.js/discussions/1560#discussioncomment-730893
      window.ethereum.on(EVENTS.accountsChanged, init)
      window.ethereum.on(EVENTS.chainChanged, init)
    }

    return () => {
      if (provider) {
        window.ethereum.off(EVENTS.accountsChanged, init)
        window.ethereum.off(EVENTS.chainChanged, init)
      }
    }
  }, [provider, setProvider])

  return <RouterProvider router={router} />
}

export default App
