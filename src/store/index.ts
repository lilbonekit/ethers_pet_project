import { create } from 'zustand'
import { providers } from 'ethers'

interface State {
  provider: providers.Web3Provider | null
  signer: providers.JsonRpcSigner | null
  network: providers.Network | null
}

interface Actions {
  switchToSepolia: () => Promise<void>
  setProvider: () => Promise<void>
  addSepolia: () => Promise<void>
  reset: () => Promise<void>
}

const initialState: State = {
  provider: null,
  signer: null,
  network: null,
}

export const useUserStore = create<State & Actions>()((set, get) => ({
  ...initialState,

  setProvider: async () => {
    if (!window.ethereum) {
      throw new Error(
        '"window.ethereum" is not injected! Allow Metamask extension in your browser!'
      )
    }
    const provider = new providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const network = await provider.getNetwork()

    set(() => ({ provider, signer, network }))
  },

  switchToSepolia: async () => {
    const provider = get().provider

    if (!provider) {
      throw new Error("Can't switch to sepolia! Provider is not defined")
    }

    await provider.send('wallet_switchEthereumChain', [{ chainId: '0xaa36a7' }])

    const network = await provider.getNetwork()
    set(() => ({ network }))
  },

  addSepolia: async () => {
    const provider = get().provider
    const switchToSepolia = get().switchToSepolia

    if (!provider) {
      throw new Error("Can't add sepolia! Provider is not defined")
    }

    await provider.send('wallet_addEthereumChain', [
      {
        chainId: '0xaa36a7',
        chainName: 'Sepolia Test Network',
        rpcUrls: ['https://rpc.sepolia.org/'],
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
        },
      },

      await switchToSepolia(),
    ])
  },

  reset: async () => {
    const provider = get().provider
    if (provider) {
      await provider.send('wallet_revokePermissions', [
        {
          eth_accounts: {},
        },
      ])
    }

    set(initialState)
  },
}))
