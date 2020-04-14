import * as React from "react"
import { Link, graphql } from "gatsby"
import { makeStyles, Typography } from "@material-ui/core"

import SEO from "../scenes/SEO/SEO.scene"

type Props = {
  data: {
    allMarkdownRemark: {
      nodes: {
        id: string
        frontmatter: {
          title: string
          slug: string
        }
      }[]
    }
  }
}

const Index = (props: Props) => {
  const classes = useStyles()
  const pages = props.data.allMarkdownRemark.nodes

  return (
    <div className={classes.container}>
      <SEO title="Question Challenge" />
      <Typography variant="h1">Work in progress</Typography>
      <Typography>Try some of these questions to get started</Typography>
      {pages.map(({ id, frontmatter: { title, slug } }) => (
        <Typography key={id}>
          <Link to={`/${slug}/`}>{title.length > 0 ? title : slug}</Link>
        </Typography>
      ))}
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

export const query = graphql`
  query IndexPageQuery {
    allMarkdownRemark {
      nodes {
        id
        frontmatter {
          title
          slug
        }
      }
    }
  }
`
