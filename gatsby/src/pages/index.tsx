import * as React from "react"
import { Link } from "gatsby"
import { makeStyles, Typography } from "@material-ui/core"

import SEO from "../scenes/SEO/SEO.scene"

const Index = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <SEO title="Question Challenge" />
      <Typography variant="h1">Work in progress</Typography>
      <Typography>Try some of these questions to get started</Typography>
      <Typography>
        <Link to="/sean/">Sean</Link>
      </Typography>
      <Typography>
        <Link to="/relationships/">Relationships</Link>
      </Typography>
    </div>
  )
}

export default Index

const useStyles = makeStyles((theme) => {
  return {
    container: {
      textAlign: "center",
      padding: 40,
    },
  }
})
