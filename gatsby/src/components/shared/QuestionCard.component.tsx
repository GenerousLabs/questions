import * as React from "react"
import { Card, Typography } from "@material-ui/core"
import { LocalDate, DateTimeFormatter } from "@js-joda/core"
import { Locale } from "@js-joda/locale_en"

interface Props {
  name: string
  questions: string[]
  dayIndex: number
}

const getDateFromDayIndex = (index: number): string => {
  return LocalDate.now()
    .plusDays(index)
    .format(DateTimeFormatter.ofPattern("d MMMM YYYY").withLocale(Locale.US))
}

const QuestionCard = (props: Props) => {
  const { name, questions, dayIndex } = props
  return (
    <>
      <Typography variant="h6" component="h2">
        Today's question
      </Typography>
      <Card style={{ padding: 50 }}>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="h2" component="h1" style={{ textAlign: "center" }}>
          {questions[dayIndex]}
        </Typography>

        <Typography style={{ textAlign: "center", margin: "50px 0 0" }}>
          {getDateFromDayIndex(dayIndex)}
        </Typography>
      </Card>
    </>
  )
}

export default QuestionCard
