import * as React from "react"
import { Typography, Button } from "@material-ui/core"
import { LocalDate, DateTimeFormatter } from "@js-joda/core"
import { Locale } from "@js-joda/locale_en"

import Card from "./Card.component"

interface Props {
  name: string
  questions: string[]
  dayIndex: number
  setDayIndex: (dayIndex: number) => void
  numberOfQuestions: number
}

const getDateFromDayIndex = (index: number): string => {
  return LocalDate.now()
    .plusDays(index)
    .format(DateTimeFormatter.ofPattern("d MMMM YYYY").withLocale(Locale.US))
}

const QuestionCard = (props: Props) => {
  const { name, questions, dayIndex, setDayIndex, numberOfQuestions } = props
  return (
    <>
      <Typography variant="h1" component="h2">
        {name}
      </Typography>
      <Card>
        {dayIndex > 0 ? (
          <Typography>
            Yesterday's question: {questions[dayIndex - 1]}
          </Typography>
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
                setDayIndex(dayIndex - 1)
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
                setDayIndex(dayIndex + 1)
              }}
            >
              Skip
            </Button>
          ) : null}
        </Typography>
      </Card>
    </>
  )
}

export default QuestionCard
