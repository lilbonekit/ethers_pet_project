import { FC, useState, useMemo } from 'react'
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldErrors,
  Control,
} from 'react-hook-form'
import { CustomAlert } from '@/components/CustomAlert'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { useUserStore } from '@/store'

import abi from '@/abi/abi.json'
import { STATUSES, IMessages } from '@/types'
import { ethers } from 'ethers'

interface FormValues {
  address: string
  amount: string
}

interface ViewProps {
  handleSubmit: (
    callback: SubmitHandler<FormValues>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>
  onSubmit: SubmitHandler<FormValues>
  control: Control<FormValues>
  errors: FieldErrors<FormValues>
  isLoading: boolean
}

export const HomePageFormMint: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      address: '',
      amount: '',
    },
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [snackbarStatus, setSnackbarStatus] = useState<STATUSES>(
    STATUSES.success
  )
  const signer = useUserStore((state) => state.signer)

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      if (!signer) {
        throw new Error("Signer isn't defined!")
      }

      const contract = new ethers.Contract(
        import.meta.env.VITE_DEPLOYED_CONTRACT_ADDRESS,
        abi,
        signer
      )

      const tx = await contract.mint(
        data.address,
        ethers.utils.parseEther(data.amount)
      )

      tx.wait()

      setSnackbarStatus(STATUSES.success)
      reset({ amount: '', address: '' })
    } catch (error) {
      console.error(error)
      setSnackbarStatus(STATUSES.error)
    } finally {
      setIsLoading(false)
      setIsSnackbarOpen(true)
    }
  }

  const MESSAGES = useMemo<IMessages>(
    () => ({
      error: 'Error has occurred',
      success: 'You have successfully minted tokens!',
    }),
    []
  )

  return (
    <>
      <View
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        errors={errors}
        isLoading={isLoading}
      />
      <CustomAlert
        isSnackbarOpen={isSnackbarOpen}
        setIsSnackbarOpen={setIsSnackbarOpen}
        snackbarStatus={snackbarStatus}
        messages={MESSAGES}
      />
    </>
  )
}

const View: FC<ViewProps> = ({
  handleSubmit,
  onSubmit,
  control,
  errors,
  isLoading,
}) => {
  return (
    <>
      <Box
        noValidate
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Paper variant="outlined">
          <Stack
            useFlexGap
            direction="column"
            justifyContent="center"
            spacing={{ xs: 1, sm: 2 }}
            padding={5}
          >
            <Typography color="text.secondary" variant="h5">
              Mint token form
            </Typography>

            <Controller
              control={control}
              name="address"
              rules={{ required: 'Address is required!' }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                  id="address"
                  label="Address"
                  variant="standard"
                  value={value}
                  ref={ref}
                  error={!!errors.address}
                  disabled={isLoading}
                  onChange={onChange}
                  onBlur={onBlur}
                  helperText={errors.address?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="amount"
              rules={{
                required: 'Amount is required!',
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Amount must be a number!',
                },
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                  error={!!errors.amount}
                  id="amount"
                  label="Amount"
                  variant="standard"
                  value={value}
                  ref={ref}
                  disabled={isLoading}
                  onChange={onChange}
                  onBlur={onBlur}
                  helperText={errors.amount?.message}
                />
              )}
            />

            <Button
              disabled={isLoading}
              variant="contained"
              type="submit"
              size="large"
              sx={{ alignSelf: 'flex-end' }}
            >
              Confirm
            </Button>
          </Stack>
        </Paper>
      </Box>
    </>
  )
}
