import * as React from "react"
import { Button, Typography, Divider, makeStyles } from "@material-ui/core"
import { LocalDate } from "@js-joda/core"

import SEO from "../SEO/SEO.scene"
import { reducer } from "./Questions.reducer"
import QuestionIntro from "./components/QuestionIntro.component"
import QuestionCard from "./components/QuestionCard.component"
import QuestionsStorage from "./Questions.storage"
import GetStarted from "./components/GetStarted.component"

interface IQuestion {
  title: string
  intro: string
  author: string
  slug: string
  questions: string[]
  aboutHtml: string
}

const Container = (props: { children: React.ReactNode }) => {
  const { children } = props
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 10px" }}>
      {children}
    </div>
  )
}

const QuestionsScene = (props: IQuestion) => {
  const classes = useStyles()
  const { author, aboutHtml, slug, questions } = props
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

  const hasAtLeastOneInstance = state.instances.length > 0

  const title =
    props.title.length > 0
      ? props.title
      : `${numberOfQuestions} day question challenge`

  const intro = props.intro.length > 0 ? props.intro : `An alternate`

  return (
    <Container>
      <SEO title={title} />
      <QuestionIntro
        title={title}
        intro={intro}
        aboutHtml={aboutHtml}
        questions={questions}
      />
      <Divider className={classes.divider} />
      {hasAtLeastOneInstance ? (
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
      ) : (
        <GetStarted numberOfQuestions={numberOfQuestions} />
      )}
      <Typography className={classes.p}>
        {hasAtLeastOneInstance
          ? "Would you like to start these questions with someone else?"
          : `Who would you like to start the ${title} with?`}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        onClick={() => {
          const name = prompt("Enter name")
          if (name.length === 0) {
            return
          }
          dispatch({
            type: "CREATE_INSTANCE",
            payload: {
              name,
              startDate: LocalDate.now().toString(),
            },
          })
        }}
      >
        + {hasAtLeastOneInstance ? "Add another person" : "Add a person"}
      </Button>
    </Container>
  )
}

export default QuestionsScene

const useStyles = makeStyles((theme) => {
  return {
    divider: {
      marginTop: 40,
      marginBottom: 40,
    },
    p: {
      fontSize: 16,
      marginTop: 15,
      marginBottom: 15,
    },
  }
})
