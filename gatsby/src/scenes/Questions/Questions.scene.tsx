import * as React from "react"
import { graphql } from "gatsby"
import { Button, Typography } from "@material-ui/core"
import { LocalDate, ChronoUnit } from "@js-joda/core"

import { reducer, Action } from "./Questions.reducer"
import QuestionIntro from "./components/QuestionIntro.component"
import QuestionCard from "./components/QuestionCard.component"
import config from "../../../config"
import QuestionsStorage from "./Questions.storage"

const { startDayStorageKey } = config

interface IQuestion {
  slug: string
  questions: string[]
}

const getDefaultDayIndex = (): number => {
  try {
    const maybe = localStorage.getItem(startDayStorageKey)
    if (typeof maybe === "string") {
      const start = LocalDate.parse(maybe)
      const today = LocalDate.now()
      return start.until(today, ChronoUnit.DAYS)
    }
  } catch (e) {}
  // TODO Change this back to 0 for deployment
  // return 0
  return 1
}

const saveToday = () => {
  localStorage.setItem(startDayStorageKey, LocalDate.now().toString())
  alert("Today has been saved in your browser #Bm1MbR")
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
  const [dayIndex, setDayIndex] = React.useState(getDefaultDayIndex())
  const [name, setName] = React.useState("")

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
      <Typography style={{ padding: 100, textAlign: "center" }}>
        You haven't started yet. Click start to get something going.
      </Typography>
      {state.instances.map(({ name, startDate }) => {
        return (
          <QuestionCard
            key={name}
            name={name}
            questions={questions}
            startDate={startDate}
            dispatch={dispatch}
          />
        )
      })}
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
