const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
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
          frontmatter {
            slug
          }
        }
      }
    }
  `).then((result) => {
    const questionTemplate = path.resolve(`./src/templates/question.tsx`)

    result.data.allMarkdownRemark.nodes.forEach((node) => {
      const { id, frontmatter } = node
      const { slug } = frontmatter
      createPage({
        path: `/${slug}/`,
        component: questionTemplate,
        context: {
          id,
          slug,
        },
      })
    })
  })
}
