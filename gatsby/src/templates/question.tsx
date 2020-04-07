import * as React from "react"
import { graphql } from "gatsby"
import { Card, Button, Typography } from "@material-ui/core"
import { LocalDate, ChronoUnit, DateTimeFormatter } from "@js-joda/core"
import { Locale } from "@js-joda/locale_en"

import THEME from "../theme"
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

const getDateFromDayIndex = (index: number): string => {
  return LocalDate.now()
    .plusDays(index)
    .format(DateTimeFormatter.ofPattern("d MMMM YYYY").withLocale(Locale.US))
}

const saveToday = () => {
  localStorage.setItem(startDayStorageKey, LocalDate.now().toString())
  alert("Today has been saved in your browser #Bm1MbR")
}

const QuestionCard = (props: { questions: string[]; dayIndex: number }) => {
  const { questions, dayIndex } = props
  return (
    <Card style={{ padding: 50 }}>
      <Typography variant="h2" component="h1" style={{ textAlign: "center" }}>
        {questions[dayIndex]}
      </Typography>

      <Typography style={{ textAlign: "center", margin: "50px 0 0" }}>
        {getDateFromDayIndex(dayIndex)}
      </Typography>
    </Card>
  )
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

export default ({ data }: IQuestion) => {
  const { questions } = data.questionsYaml
  const numberOfQuestions = questions.length

  const [dayIndex, setDayIndex] = React.useState(getDefaultDayIndex())

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 0" }}>
      <QuestionCard questions={questions} dayIndex={dayIndex} />
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
    </div>
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
