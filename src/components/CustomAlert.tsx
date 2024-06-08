import { FC } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { ISnackbar, STATUSES, IMessages } from '@/types'

type CustomAlertType = Omit<ISnackbar, 'setSnackbarStatus'> & {
  messages: IMessages
}

export const CustomAlert: FC<CustomAlertType> = ({
  isSnackbarOpen,
  setIsSnackbarOpen,
  snackbarStatus,
  messages,
}) => {
  return (
    <>
      <Snackbar
        autoHideDuration={6000}
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert
          variant="filled"
          sx={{ width: '100%' }}
          onClose={() => setIsSnackbarOpen(false)}
          severity={snackbarStatus}
        >
          {snackbarStatus === STATUSES.success
            ? messages.success
            : messages.error}
        </Alert>
      </Snackbar>
    </>
  )
}
