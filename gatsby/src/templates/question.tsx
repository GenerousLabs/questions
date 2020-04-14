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
      }
      fields: {
        slug: string
      }
    }
  }
}

export default ({ data }: IQuestion) => {
  const { html, frontmatter, fields } = data.markdownRemark
  const { title, intro, author, questions } = frontmatter
  const { slug } = fields
  return (
    <SEO title="Question challenge">
      <QuestionsScene slug={slug} questions={questions} />
    </SEO>
  )
}

export const query = graphql`
  query QuestionTemplateQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        intro
        author
        questions
      }
      fields {
        slug
      }
    }
  }
`
