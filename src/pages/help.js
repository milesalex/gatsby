import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  // console.log(data)

  return (
    <Layout>
      <SEO title="Help" />
      <h1>Blog</h1>
      <ul>
        {data.allContentfulHelpCenter.edges[0].node.category.map(item => {
          const { slug, title, id, featuredArticles } = item

          // console.log(item.node)

          return (
            <li key={id}>
              <h3>{title}</h3>
              <ul>
                {featuredArticles.map(article => (
                  <li key={article.id}>
                    <Link to={`/help/${slug}/${article.slug}`}>
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>

      <Link to="/blog/">Go to blog</Link>
    </Layout>
  )
}

export const query = graphql`
  query HelpPageQuery {
    allContentfulHelpCenter {
      edges {
        node {
          id
          category {
            id
            title
            slug
            featuredArticles {
              slug
              title
              id
            }
          }
        }
      }
    }
  }
`

export default IndexPage
