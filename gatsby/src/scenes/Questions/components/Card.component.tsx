import * as React from "react"
import { Typography, Button, Card } from "@material-ui/core"

interface Props {
  children: React.ReactNode
}

const CardComponent = (props: Props) => {
  const { children } = props
  return <Card style={{ padding: 50, margin: 20 }}>{children}</Card>
}

export default CardComponent
