import * as React from "react"
import { Button, Typography, Divider, makeStyles } from "@material-ui/core"
import { LocalDate } from "@js-joda/core"

import { reducer } from "./Questions.reducer"
import QuestionIntro from "./components/QuestionIntro.component"
import QuestionsList from "./components/QuestionsList.component"
import QuestionCard from "./components/QuestionCard.component"
import QuestionsStorage from "./Questions.storage"

interface IQuestion {
  slug: string
  questions: string[]
}

const Container = (props: { children: React.ReactNode }) => {
  const { children } = props
  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 0" }}>
      {children}
    </div>
  )
}

const QuestionsScene = (props: IQuestion) => {
  const classes = useStyles()
  const { slug, questions } = props
  const numberOfQuestions = questions.length

  const { get, save } = React.useMemo(() => {
    return QuestionsStorage(slug)
  }, [slug])

  const [state, dispatch] = React.useReducer(reducer, get())

  React.useEffect(() => {
    dispatch({ type: "INIT", payload: get() })
  }, [slug])

  React.useEffect(() => {
    save(state)
  }, [state])

  const [hideIntro, setHideIntro] = React.useState(false)
  const [hideQuestions, setHideQuestions] = React.useState(true)

  return (
    <Container>
      <QuestionIntro
        numberOfQuestions={numberOfQuestions}
        setHideQuestions={setHideQuestions}
      />
      <QuestionsList
        questions={questions}
        hideQuestions={hideQuestions}
        setHideQuestions={setHideQuestions}
      />
      <Divider className={classes.divider} />
      <Typography variant="h2">Today's questions</Typography>
      {state.instances.length === 0 ? (
        <Typography style={{ padding: 100, textAlign: "center" }}>
          You haven't started yet. Click start to get something going.
        </Typography>
      ) : (
        state.instances.map(({ name, startDate }) => {
          return (
            <QuestionCard
              key={name}
              name={name}
              questions={questions}
              startDate={startDate}
              dispatch={dispatch}
            />
          )
        })
      )}
      <Typography>Start another question sequence</Typography>
      <Button
        variant="outlined"
        onClick={() => {
          dispatch({
            type: "CREATE_INSTANCE",
            payload: {
              name: prompt("Enter name"),
              startDate: LocalDate.now().toString(),
            },
          })
        }}
      >
        Click to start
      </Button>
    </Container>
  )
}

export default QuestionsScene

const useStyles = makeStyles(theme => {
  return {
    divider: {
      marginTop: 40,
      marginBottom: 40,
    },
  }
})
