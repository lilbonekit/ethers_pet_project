import { Dispatch, SetStateAction } from 'react'
import { providers } from 'ethers'

export enum STATUSES {
  success = 'success',
  error = 'error',
}

export enum EVENTS {
  chainChanged = 'chainChanged',
  accountsChanged = 'accountsChanged',
}

interface IEvents {
  on(event: EVENTS, listener: (...args: unknown[]) => void): void
  off(event: EVENTS, listener: (...args: unknown[]) => void): void
}

declare global {
  interface Window {
    ethereum: providers.ExternalProvider & IEvents
  }
}

export interface ISnackbar {
  snackbarStatus: STATUSES
  isSnackbarOpen: boolean
  setSnackbarStatus: Dispatch<SetStateAction<STATUSES>>
  setIsSnackbarOpen: Dispatch<SetStateAction<boolean>>
}

export interface IMessages {
  success: string
  error: string
}
