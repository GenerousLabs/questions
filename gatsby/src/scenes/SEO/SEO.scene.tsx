import * as React from "react"
import { Helmet } from "react-helmet"

type Props = {
  title: string
  children: React.ReactNode
}

const SEO = (props: Props) => {
  const { title, children } = props
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  )
}

export default SEO
