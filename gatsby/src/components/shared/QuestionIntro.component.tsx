import * as React from "react"
import { Typography, Button } from "@material-ui/core"

import Card from "./Card.component"

interface Props {
  numberOfQuestions: number
}

const QuestionIntro = (props: Props) => {
  const { numberOfQuestions } = props

  return (
    <Card>
      <Typography variant="h2">
        {numberOfQuestions} day question challenge
      </Typography>
      <Typography>
        Here will be some introductory text explaining how this thing works..
      </Typography>
    </Card>
  )
}

export default QuestionIntro
