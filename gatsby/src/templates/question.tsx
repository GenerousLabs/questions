import * as React from "react"
import { graphql } from "gatsby"
import { Card, Button, Typography } from "@material-ui/core"
import { LocalDate, ChronoUnit, DateTimeFormatter } from "@js-joda/core"
import { Locale } from "@js-joda/locale_en"

import THEME from "../theme"
import config from "../config"

const { startDayStorageKey } = config

interface IContentAreaProps {
  children: React.ReactNode
  title: string
}

interface IBlogPostLayout {
  children: React.ReactNode
  title: string
}

interface IQuestion {
  data: {
    questionsYaml: {
      slug: string
      questions: string[]
    }
  }
}

const getDefaultDayIndex = (): number => {
  if (window && window.localStorage) {
    const maybe = window.localStorage.getItem(startDayStorageKey)
    if (typeof maybe === "string") {
      try {
        const start = LocalDate.parse(maybe)
        const today = LocalDate.now()
        return start.until(today, ChronoUnit.DAYS)
      } catch (e) {}
    }
  }
  return 0
}

const getDateFromDayIndex = (index: number): string => {
  return LocalDate.now()
    .plusDays(index)
    .format(DateTimeFormatter.ofPattern("d MMMM YYYY").withLocale(Locale.US))
}

export default ({ data }: IQuestion) => {
  const { questions } = data.questionsYaml
  const numberOfQuestions = questions.length

  const [dayIndex, setDayIndex] = React.useState(getDefaultDayIndex())

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 0" }}>
      <Card style={{ padding: 50 }}>
        <Typography variant="h2" component="h1" style={{ textAlign: "center" }}>
          {questions[dayIndex]}
        </Typography>
        <Typography style={{ textAlign: "center", margin: "50px 0 0" }}>
          {getDateFromDayIndex(dayIndex)}
        </Typography>
      </Card>
      <p>
        {dayIndex > 0 ? (
          <Button
            variant="contained"
            onClick={() => {
              setDayIndex(dayIndex - 1)
            }}
          >
            Yesterday
          </Button>
        ) : null}
        {dayIndex < numberOfQuestions - 1 ? (
          <Button
            variant="contained"
            onClick={() => {
              setDayIndex(dayIndex + 1)
            }}
          >
            Tomorrow
          </Button>
        ) : null}
      </p>
      <h1>All Questions</h1>
      <ul>
        {questions.map((question, i) => (
          <li key={i}>{question}</li>
        ))}
      </ul>
      <h1>Start</h1>
      <Button
        variant="contained"
        onClick={() => {
          window.localStorage.setItem(
            startDayStorageKey,
            LocalDate.now().toString()
          )
          alert("Today has been saved in your browser #Bm1MbR")
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
