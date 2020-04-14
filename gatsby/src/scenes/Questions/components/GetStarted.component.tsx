import * as React from "react"
import { Grid, makeStyles, Typography, Divider } from "@material-ui/core"

const GetStarted = () => {
  const classes = useStyles()

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item xs={4} className={classes.child}>
          <Typography className={classes.number}>1</Typography>
          <Typography className={classes.title}>Invite a friend</Typography>
          <Typography className={classes.p}>
            Find someone you'd like to know better, send them this page, invite
            them to play.
          </Typography>
        </Grid>
        <Grid item xs={4} className={classes.child}>
          <Typography className={classes.number}>2</Typography>
          <Typography className={classes.title}>Make the commitment</Typography>
          <Typography className={classes.p}>
            Swear a blood oath (or don't) that you will commit at least 10
            minutes a day for 28 days.
          </Typography>
        </Grid>
        <Grid item xs={4} className={classes.child}>
          <Typography className={classes.number}>3</Typography>
          <Typography className={classes.title}>
            Get started together
          </Typography>
          <Typography className={classes.p}>
            Make sure your question sets are synchronised by clicking 'add a
            person' at the same time.
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
