import * as React from "react"
import { graphql } from "gatsby"
import Card from "@material-ui/core/Card"
import Responsive from "react-responsive"

import Layout from "../components/layouts/question.layout"
import THEME from "../theme"

const Mobile = props => <Responsive {...props} maxWidth={767} />
const Default = props => <Responsive {...props} minWidth={768} />

interface IContentAreaProps {
  children: React.ReactNode
  title: string
}

interface IBlogPostLayout {
  children: React.ReactNode
  title: string
}

interface IQuestion {
  data: {
    questionsYaml: {
      slug: string
      questions: string[]
    }
  }
}

const getDefaultDayIndex = (): number => {
  if (window && window.localStorage) {
    const maybe = window.localStorage.getItem("__dayIndex")
    if (typeof maybe === "string") {
      return parseInt(maybe)
    }
  }
  return 0
}

export default ({ data }: IQuestion) => {
  const { questions } = data.questionsYaml

  const [dayIndex, setDayIndex] = React.useState(getDefaultDayIndex())

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 0" }}>
      <Card style={{ padding: 15 }}>
        <h1
          style={{
            marginBottom: 30,
            marginTop: 0,
            marginLeft: 70,
            marginRight: 70,
            textAlign: "center",
          }}
        >
          {questions[dayIndex]}
        </h1>
      </Card>
      <h1>All Questions</h1>
      <ul>
        {questions.map((question, i) => (
          <li key={i}>{question}</li>
        ))}
      </ul>
    </div>
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
