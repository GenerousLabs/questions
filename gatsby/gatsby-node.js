const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    // Copy `collection` value from parent to markdown
    const parent = getNode(node.parent)
    createNodeField({
      node,
      name: "collection",
      value: parent.sourceInstanceName,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { collection: { eq: "questions" } } }
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `).then((result) => {
    const questionTemplate = path.resolve(`./src/templates/question.tsx`)

    result.data.allMarkdownRemark.nodes.forEach((node) => {
      const { id, fields } = node
      const { slug } = fields
      createPage({
        path: slug,
        component: questionTemplate,
        context: {
          id,
          slug,
        },
      })
    })
  })
}
