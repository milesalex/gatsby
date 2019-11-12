const path = require(`path`)
const slash = require(`slash`)

const createBlogPages = async (graphql, actions) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve("./src/components/blogpost.js")

  // we use the provided allContentfulBlogPost query to fetch the data from Contentful
  const result = await graphql(
    `
      {
        allContentfulBlogPost(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  )

  // Resolve the paths to our template
  // Then for each result we create a page.
  result.data.allContentfulBlogPost.edges.forEach(edge => {
    createPage({
      path: `/blog/${edge.node.slug}`,
      component: slash(blogPostTemplate),
      context: {
        slug: edge.node.slug,
        id: edge.node.id,
      },
    })
  })
}

const createHelpPages = async (graphql, actions) => {
  const { createPage } = actions
  const helpPageTemplate = path.resolve("./src/components/helpPage.js")

  const result = await graphql(
    `
      {
        allContentfulHelpCenterCategory {
          edges {
            node {
              id
              title
              slug
              articles {
                id
                slug
                title
              }
            }
          }
        }
      }
    `
  )

  result.data.allContentfulHelpCenterCategory.edges.forEach(edge => {
    if (edge.node.slug) {
      const { slug, id, articles } = edge.node

      articles.forEach(article => {
        createPage({
          path: `/help/${slug}/${article.slug}`,
          component: slash(helpPageTemplate),
          context: {
            categorySlug: slug,
            categoryId: id,
            articleSlug: article.slug,
            articleId: article.id,
          },
        })
        // console.log(page)
      })
    }
  })
}

const createHelpCategoryPages = async (graphql, actions) => {
  const { createPage } = actions
  const helpCategoryTemplate = path.resolve("./src/components/helpCategory.js")
  const result = await graphql(
    `
      {
        allContentfulHelpCenterCategory {
          edges {
            node {
              id
              title
              slug
              featuredArticles {
                id
                slug
                title
              }
            }
          }
        }
      }
    `
  )

  result.data.allContentfulHelpCenterCategory.edges.forEach(edge => {
    createPage({
      path: `/help/${edge.node.slug}`,
      component: slash(helpCategoryTemplate),
      context: {
        slug: edge.node.slug,
        id: edge.node.id,
      },
    })
  })
}

const createExchangePages = async (graphql, actions) => {
  const { createPage } = actions
  const exchangePageTemplate = path.resolve(
    "./src/components/singleExchangePage.js"
  )

  const result = await graphql(
    `
      query ExchangePageQuery {
        allContentfulExchanges(sort: { fields: [contentfulid], order: ASC }) {
          edges {
            node {
              id
              logoColor {
                file {
                  url
                }
                title
                id
              }
              name
              contentfulid
              smallExchange
            }
          }
        }
      }
    `
  )

  result.data.allContentfulExchanges.edges.forEach(edge => {
    createPage({
      path: `/exchanges/${edge.node.contentfulid}`,
      component: slash(exchangePageTemplate),
      context: {
        id: edge.node.id,
        contentfulid: edge.node.contentfulid
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  try {
    await createBlogPages(graphql, actions)
    await createHelpCategoryPages(graphql, actions)
    await createHelpPages(graphql, actions)
    await createExchangePages(graphql, actions)
  } catch (err) {
    console.log(err)
  }
}
