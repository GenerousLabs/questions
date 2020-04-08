import * as React from "react"
import { graphql } from "gatsby"
import { Button, Typography } from "@material-ui/core"
import { LocalDate, ChronoUnit } from "@js-joda/core"

import QuestionIntro from "../components/shared/QuestionIntro.component"
import QuestionCard from "../components/shared/QuestionCard.component"
import config from "../config"

const { startDayStorageKey } = config

interface IQuestion {
  data: {
    questionsYaml: {
      slug: string
      questions: string[]
    }
  }
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

export default ({ data }: IQuestion) => {
  const { questions } = data.questionsYaml
  const numberOfQuestions = questions.length

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
      <Typography variant="h3" component="h3">
        Today's question
      </Typography>
      <QuestionCard
        name={"John"}
        questions={questions}
        dayIndex={dayIndex}
        setDayIndex={setDayIndex}
        numberOfQuestions={numberOfQuestions}
      />
      <Typography>Start another question sequence</Typography>
      <Button variant="outlined">Click to start</Button>
    </Container>
  )
}

export const query = graphql`
  query QuestionTemplateQuery($slug: String!) {
    questionsYaml(slug: { eq: $slug }) {
      slug
      questions
    }
  }
`
