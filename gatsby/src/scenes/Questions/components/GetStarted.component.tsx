import * as React from "react"
import { Grid, makeStyles, Typography, Divider } from "@material-ui/core"

interface Props {
  numberOfQuestions: number
}

const GetStarted = (props: Props) => {
  const classes = useStyles()
  const { numberOfQuestions = 28 } = props

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.mainTitle}>
            Quick start guide
          </Typography>
        </Grid>
        <Grid item sm={4} xs={12} className={classes.child}>
          <Typography className={classes.number}>1</Typography>
          <Typography className={classes.title}>Start together</Typography>
          <Typography className={classes.p}>
            Pick someone you want to know better. Send them this link. Click
            'Add a Person' together on the same day.
          </Typography>
        </Grid>
        <Grid item sm={4} xs={12} className={classes.child}>
          <Typography className={classes.number}>2</Typography>
          <Typography className={classes.title}>Share your answer</Typography>
          <Typography className={classes.p}>
            Each day, share your answer with your question partner. Discuss over
            the phone, by text, or by carrier pigeon
          </Typography>
        </Grid>
        <Grid item sm={4} xs={12} className={classes.child}>
          <Typography className={classes.number}>3</Typography>
          <Typography className={classes.title}>Rinse and repeat</Typography>
          <Typography className={classes.p}>
            New questions will appear here each day. Come back to see what it is
            and share your next answer with your partner.
          </Typography>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </div>
  )
}

export default GetStarted

const useStyles = makeStyles((theme) => {
  return {
    container: {
      backgroundColor: "#e3e6eb",
    },
    child: {
      textAlign: "center",
      padding: 36,
    },
    number: {
      color: "#fff",
      backgroundColor: "#000",
      borderRadius: "50%",
      width: 20,
      height: 20,
      margin: "0 auto",
      fontSize: 14,
    },
    mainTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 12,
      marginBottom: -12,
      paddingTop: 12,
      textAlign: "center",
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 12,
    },
    p: {
      fontSize: 16,
    },
    divider: {
      marginTop: 40,
      marginBottom: 40,
    },
  }
})
