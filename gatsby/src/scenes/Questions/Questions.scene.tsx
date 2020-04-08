import * as React from "react"
import { Button, Typography } from "@material-ui/core"
import { LocalDate } from "@js-joda/core"

import { reducer } from "./Questions.reducer"
import QuestionIntro from "./components/QuestionIntro.component"
import QuestionCard from "./components/QuestionCard.component"
import QuestionsStorage from "./Questions.storage"

interface IQuestion {
  slug: string
  questions: string[]
}

const Container = (props: { children: React.ReactNode }) => {
  const { children } = props
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "20px 0" }}>
      {children}
    </div>
  )
}

export default (props: IQuestion) => {
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
  const [hideQuestions, setHideQuestions] = React.useState(false)

  return (
    <Container>
      {hideIntro ? (
        <p style={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            onClick={() => {
              setHideIntro(false)
            }}
          >
            Show intro
          </Button>
        </p>
      ) : (
        <>
          <Typography variant="h2" component="h2">
            Intro
          </Typography>
          <QuestionIntro numberOfQuestions={numberOfQuestions} />
          <p style={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setHideIntro(true)
              }}
            >
              Hide intro
            </Button>
          </p>
        </>
      )}
      {hideQuestions ? (
        <p style={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            onClick={() => {
              setHideQuestions(false)
            }}
          >
            Show questions
          </Button>
        </p>
      ) : (
        <>
          <Typography variant="h2" component="h2">
            Questions
          </Typography>
          <ol>
            {questions.map((question, i) => (
              <li key={i}>{question}</li>
            ))}
          </ol>
          <p style={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setHideQuestions(true)
              }}
            >
              Hide questions
            </Button>
          </p>
        </>
      )}
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
