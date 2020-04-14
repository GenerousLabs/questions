import * as React from "react"
import { Typography, Button, makeStyles } from "@material-ui/core"

interface Props {
  title?: string
  numberOfQuestions: number
  setHideQuestions: (hideQuestions: boolean) => void
}

const QuestionIntro = (props: Props) => {
  const classes = useStyles()
  const { numberOfQuestions, setHideQuestions } = props

  const title =
    props.title.length > 0
      ? props.title
      : `${numberOfQuestions} day question challenge`

  return (
    <>
      <Typography variant="h2" className={classes.h2}>
        {title}
      </Typography>
      <Typography className={classes.p}>
        Here will be some introductory text explaining how this thing works..
      </Typography>
      <Typography className={classes.p}>
        For a{" "}
        <a
          onClick={() => {
            setHideQuestions(false)
          }}
        >
          sneak preview click here
        </a>
      </Typography>
    </>
  )
}

export default QuestionIntro

const useStyles = makeStyles((theme) => {
  return {
    h2: {
      fontSize: 21,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 40,
      marginBottom: 12,
    },
    p: {
      fontSize: 16,
      textAlign: "center",
      maxWidth: 500,
      margin: "0 auto",
    },
  }
})
