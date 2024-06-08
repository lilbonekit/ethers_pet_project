import { FC } from 'react'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

interface IRow {
  title: string
  value: string
}

export const Row: FC<IRow> = ({ title, value }) => {
  return (
    <>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        flexWrap="wrap"
        gap={1}
      >
        <Typography
          color="text.secondary"
          variant="body2"
          textOverflow="ellipsis"
        >
          {title}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body1"
          fontWeight="700"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {value}
        </Typography>
      </Stack>
    </>
  )
}
