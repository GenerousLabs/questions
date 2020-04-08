import * as React from "react"
import { Typography, Button } from "@material-ui/core"
import { LocalDate, DateTimeFormatter, ChronoUnit } from "@js-joda/core"
import { Locale } from "@js-joda/locale_en"

import Card from "./Card.component"

interface Props {
  name: string
  questions: string[]
  startDate: string
  setStartDate: (startDate: string) => void
}

const getDateFromDayIndex = (index: number): string => {
  return LocalDate.now()
    .plusDays(index)
    .format(DateTimeFormatter.ofPattern("d MMMM YYYY").withLocale(Locale.US))
}

const QuestionCard = (props: Props) => {
  const { name, questions, startDate, setStartDate } = props
  const numberOfQuestions = questions.length

  const start = LocalDate.parse(startDate)
  const today = LocalDate.now()
  const dayIndex = start.until(today, ChronoUnit.DAYS)

  const moveStartDate = (days: number) => {
    setStartDate(start.plusDays(days).toString())
  }

  return (
    <Card>
      <Typography variant="h3" component="h3">
        For: {name}
      </Typography>
      {dayIndex > 0 ? (
        <Typography>Yesterday's question: {questions[dayIndex - 1]}</Typography>
      ) : null}
      <Typography variant="h2" component="h2" style={{ textAlign: "center" }}>
        {questions[dayIndex]}
      </Typography>

      <Typography style={{ textAlign: "center", margin: "50px 0 0" }}>
        {dayIndex > 0 ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              moveStartDate(1)
            }}
          >
            Back
          </Button>
        ) : null}
        {` ${getDateFromDayIndex(dayIndex)} `}
        {dayIndex < numberOfQuestions - 1 ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              moveStartDate(-1)
            }}
          >
            Skip
          </Button>
        ) : null}
      </Typography>
    </Card>
  )
}

export default QuestionCard
