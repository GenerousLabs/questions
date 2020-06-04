import * as React from "react"
import { Typography, Button, makeStyles } from "@material-ui/core"
import ModalComponent from "./Modal.component"

interface Props {
  title: string
  intro: string
  aboutHtml: string
  questions: string[]
}

const QuestionList = ({ questions }: { questions: string[] }) => {
  const classes = useStyles()

  const [showCount, setShowCount] = React.useState(4)
  const showQuestions = questions.slice(0, showCount)

  return (
    <>
      <ol id="question-list-list">
        {showQuestions.map((question, i) => (
          <Typography component="li" key={i} className={classes.li}>
            {question}
          </Typography>
        ))}
      </ol>
      {showCount < questions.length ? (
        <p className={classes.showMoreP}>
          <Button
            className={classes.showMore}
            variant="outlined"
            size="small"
            onClick={() => {
              setShowCount(showCount + 4)
            }}
          >
            Show more
          </Button>
        </p>
      ) : null}
    </>
  )
}

const QuestionIntro = (props: Props) => {
  const { title, intro, aboutHtml, questions } = props
  const classes = useStyles()

  const [modalOpen, setModalOpen] = React.useState(false)
  const [modalView, setModalView] = React.useState("questions")

  const showQuestions = () => {
    setModalView("questions")
    setModalOpen(true)
  }

  const showInfo = () => {
    setModalView("info")
    setModalOpen(true)
  }

  return (
    <>
      <Typography variant="h2" className={classes.h2}>
        {title}
      </Typography>
      <Typography className={classes.p}>{intro}</Typography>
      <Typography className={classes.links}>
        <a
          onClick={() => {
            showInfo()
          }}
        >
          Tell me more
        </a>{" "}
        |{" "}
        <a
          onClick={() => {
            showQuestions()
          }}
        >
          Sneak peak at questions
        </a>
      </Typography>
      <ModalComponent
        title={modalView === "questions" ? "Questions" : ""}
        open={modalOpen}
        setOpen={setModalOpen}
      >
        {modalView === "questions" ? (
          <QuestionList questions={questions} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: aboutHtml }} />
        )}
      </ModalComponent>
    </>
  )
}

export default QuestionIntro

const useStyles = makeStyles((theme) => {
  return {
    h2: {
      fontSize: 21,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 40,
      marginBottom: 12,
    },
    p: {
      fontSize: 16,
      textAlign: "center",
      maxWidth: 700,
      margin: "0 auto",
    },
    links: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 12,
    },
    li: {
      fontSize: 16,
    },
    showMoreP: {
      textAlign: "center",
      marginTop: 20,
    },
    showMore: {
      fontSize: 16,
    },
  }
})
