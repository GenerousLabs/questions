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
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allQuestionsYaml {
        nodes {
          slug
        }
      }
    }
  `).then(result => {
    const questionTemplate = path.resolve(`./src/templates/question.tsx`)

    result.data.allQuestionsYaml.nodes.forEach(node => {
      const { slug } = node
      createPage({
        path: `/${slug}/`,
        component: questionTemplate,
        context: {
          slug,
        },
      })
    })
  })
}
