import * as React from "react"
import { graphql } from "gatsby"

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
  return <QuestionsScene slug={slug} questions={questions} />
}

export const query = graphql`
  query QuestionTemplateQuery($slug: String!) {
    questionsYaml(slug: { eq: $slug }) {
      slug
      questions
    }
  }
`
