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
  return 0
}

const saveToday = () => {
  localStorage.setItem(startDayStorageKey, LocalDate.now().toString())
  alert("Today has been saved in your browser #Bm1MbR")
}

const DayButtons = (props: {
  dayIndex: number
  setDayIndex: (dayIndex: number) => void
  numberOfQuestions: number
}) => {
  const { dayIndex, setDayIndex, numberOfQuestions } = props
  return (
    <p>
      {dayIndex > 0 ? (
        <Button
          variant="outlined"
          onClick={() => {
            setDayIndex(dayIndex - 1)
          }}
        >
          Yesterday
        </Button>
      ) : null}
      {dayIndex < numberOfQuestions - 1 ? (
        <Button
          variant="outlined"
          onClick={() => {
            setDayIndex(dayIndex + 1)
          }}
        >
          Tomorrow
        </Button>
      ) : null}
    </p>
  )
}

const Container = (props: { children: React.ReactNode }) => {
  const { children } = props
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 0" }}>
      {children}
    </div>
  )
}

export default ({ data }: IQuestion) => {
  const { questions } = data.questionsYaml
  const numberOfQuestions = questions.length

  const [dayIndex, setDayIndex] = React.useState(getDefaultDayIndex())
  const [name, setName] = React.useState("")

  if (name === "") {
    return (
      <Container>
        <QuestionIntro
          numberOfQuestions={numberOfQuestions}
          start={() => {
            setName(prompt("Who would you like to start with?"))
          }}
        />
      </Container>
    )
  }

  return (
    <Container>
      <Typography variant="h6" component="h2">
        Today's question
      </Typography>
      <QuestionCard name={name} questions={questions} dayIndex={dayIndex} />
      <DayButtons
        dayIndex={dayIndex}
        setDayIndex={setDayIndex}
        numberOfQuestions={numberOfQuestions}
      />
      <Typography variant="h2">All Questions</Typography>
      <ol>
        {questions.map((question, i) => (
          <li key={i}>{question}</li>
        ))}
      </ol>
      <Typography variant="h2">Start</Typography>
      <Button
        variant="outlined"
        onClick={() => {
          saveToday()
        }}
      >
        Start today
      </Button>
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
