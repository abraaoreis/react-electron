import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'

interface CardComponentProps {
  title: string
  content: string
  icon?: React.ReactNode
}

export const CardComponent: React.FC<CardComponentProps> = ({
  title,
  content,
  icon,
}) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        avatar={icon}
        title={title}
        sx={{ pb: 1 }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardComponent
