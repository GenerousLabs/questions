import * as React from "react"
import { Typography, Button } from "@material-ui/core"

import Card from "./Card.component"

interface Props {
  numberOfQuestions: number
  setHideQuestions: (hideQuestions: boolean) => void
}

const QuestionIntro = (props: Props) => {
  const { numberOfQuestions, setHideQuestions } = props

  return (
    <Card>
      <Typography variant="h2">
        {numberOfQuestions} day question challenge
      </Typography>
      <Typography>
        Here will be some introductory text explaining how this thing works..
      </Typography>
      <Typography>
        For a{" "}
        <a
          onClick={() => {
            setHideQuestions(false)
          }}
        >
          sneak preview click here
        </a>
      </Typography>
    </Card>
  )
}

export default QuestionIntro
