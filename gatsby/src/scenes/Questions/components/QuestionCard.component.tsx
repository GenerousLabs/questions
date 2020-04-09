import * as React from "react"
import { LocalDate, DateTimeFormatter, ChronoUnit } from "@js-joda/core"
import { Locale } from "@js-joda/locale_en"
import { Card, Typography, makeStyles, Divider } from "@material-ui/core"
import Delete from "@material-ui/icons/Delete"

import { Action } from "../Questions.reducer"

interface Props {
  name: string
  questions: string[]
  startDate: string
  dispatch: React.Dispatch<Action>
}

const getDateFromDayIndex = (index: number): string => {
  return LocalDate.now()
    .plusDays(index)
    .format(DateTimeFormatter.ofPattern("d MMMM YYYY").withLocale(Locale.US))
}

const QuestionCard = (props: Props) => {
  const classes = useStyles()

  const { name, questions, startDate, dispatch } = props
  const numberOfQuestions = questions.length

  const start = LocalDate.parse(startDate)
  const today = LocalDate.now()
  const dayIndex = start.until(today, ChronoUnit.DAYS)

  const moveStartDate = (days: number) => {
    dispatch({
      type: "SET_INSTANCE_DATE",
      payload: { name, startDate: start.plusDays(days).toString() },
    })
  }

  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <Typography className={classes.name}>
            Questions with {name}
          </Typography>
        </div>
        <div className={classes.headerRight}>
          <Typography
            className={classes.delete}
            onClick={() => {
              if (confirm("Are you sure you want to delete this instance?")) {
                dispatch({ type: "REMOVE_INSTANCE", payload: { name } })
              }
            }}
          >
            Delete
            <Delete className={classes.deleteIcon} />
          </Typography>
        </div>
      </div>
      <Card className={classes.card}>
        <Typography className={classes.cardHeader}>Today's Question</Typography>
        <Typography variant="h2" component="h2" className={classes.question}>
          {questions[dayIndex]}
        </Typography>
        <Typography className={classes.count}>
          {dayIndex + 1}/{numberOfQuestions}
        </Typography>
      </Card>
      <div className={classes.footer}>
        <div className={classes.footerLeft}>
          {dayIndex > 0 ? (
            <Typography
              className={classes.back}
              onClick={() => {
                moveStartDate(1)
              }}
            >
              &lt; Back
            </Typography>
          ) : null}
        </div>
        <div className={classes.footerRight}>
          {dayIndex < numberOfQuestions - 1 ? (
            <Typography
              className={classes.skip}
              onClick={() => {
                moveStartDate(-1)
              }}
            >
              Skip today's question
            </Typography>
          ) : null}
        </div>
      </div>
      <Divider className={classes.divider} />
    </>
  )
}

export default QuestionCard

const useStyles = makeStyles(theme => {
  return {
    header: {
      display: "flex",
    },
    headerLeft: {
      flex: 1,
    },
    headerRight: {
      textAlign: "right",
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: "bold",
    },
    delete: {
      fontSize: 10,
      lineHeight: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "row",
    },
    deleteIcon: {
      fontSize: 22,
      color: "#80848e",
    },
    card: {
      marginTop: 13,
      marginBottom: 13,
      paddingTop: 36,
      paddingBottom: 36,
    },
    cardHeader: {
      textAlign: "center",
      fontSize: 16,
    },
    question: {
      textAlign: "center",
      fontSize: 31,
      lineHeight: "42px",
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 20,
      maxWidth: 578,
      marginLeft: "auto",
      marginRight: "auto",
    },
    count: {
      textAlign: "center",
      fontSize: 16,
      color: "#80848e",
    },
    footer: {
      display: "flex",
    },
    footerLeft: {
      flex: 1,
    },
    back: {
      fontSize: 16,
      fontWeight: "bold",
      textDecoration: "underline",
    },
    footerRight: {
      textAlign: "right",
      flex: 1,
    },
    skip: {
      fontSize: 16,
      fontWeight: "bold",
      textDecoration: "underline",
    },
    divider: {
      marginTop: 40,
      marginBottom: 40,
    },
  }
})
