import * as React from "react"
import { graphql } from "gatsby"

import SEO from "../scenes/SEO/SEO.scene"
import QuestionsScene from "../scenes/Questions/Questions.scene"

interface IQuestion {
  data: {
    markdownRemark: {
      id: string
      html: string
      frontmatter: {
        title: string
        intro: string
        author: string
        questions: string[]
        slug: string
      }
    }
  }
}

export default ({ data }: IQuestion) => {
  const { html, frontmatter } = data.markdownRemark
  const { slug, title, intro, author, questions } = frontmatter

  const sceneProps = {
    title,
    intro,
    author,
    slug,
    questions,
    aboutHtml: html,
  }

  return (
    <SEO title="Question challenge">
      <QuestionsScene {...sceneProps} />
    </SEO>
  )
}

export const query = graphql`
  query QuestionTemplateQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        slug
        title
        intro
        author
        questions
      }
    }
  }
`
