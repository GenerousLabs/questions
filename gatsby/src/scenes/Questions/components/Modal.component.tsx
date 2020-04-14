import * as React from "react"
import { Modal, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const ModalComponent = (props: {
  title: string
  open: boolean
  setOpen: (hideQuestions: boolean) => void
  children: React.ReactNode
}) => {
  const { title, open, setOpen, children } = props
  const classes = useStyles()

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      aria-labelledby="question-list-title"
      aria-describedby="question-list-list"
    >
      <div className={classes.paper}>
        <Typography variant="h2" component="h2" id="question-list-title">
          {title}
        </Typography>
        {children}
      </div>
    </Modal>
  )
}

export default ModalComponent

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: 400,
      height: 450,
      maxWidth: "90vw",
      maxHeight: "90vh",
      transform: "translate(-50%, -50%)",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflowY: "scroll",
    },
  }
})
