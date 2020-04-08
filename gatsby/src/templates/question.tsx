import * as React from "react"
import { graphql } from "gatsby"

import SEO from "../scenes/SEO/SEO.scene"
import QuestionsScene from "../scenes/Questions/Questions.scene"

interface IQuestion {
  data: {
    questionsYaml: {
      slug: string
      questions: string[]
    }
  }
}

export default ({ data }: IQuestion) => {
  const { slug, questions } = data.questionsYaml
  return (
    <SEO title="Question challenge">
      <QuestionsScene slug={slug} questions={questions} />
    </SEO>
  )
}

export const query = graphql`
  query QuestionTemplateQuery($slug: String!) {
    questionsYaml(slug: { eq: $slug }) {
      slug
      questions
    }
  }
`
