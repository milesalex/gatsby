import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const BlogPage = ({ data }) => {
  // console.log(data)

  return (
    <Layout>
      <SEO title="Blog" />
      <h1>Blog</h1>
      <ul>
        {data.allContentfulBlogPost.edges.map(item => {
          const { slug, title, id } = item.node

          return (
            <li key={id}>
              <Link to={`/blog/${slug}`}>{title}</Link>
            </li>
          )
        })}
      </ul>

      <Link to="/blog/">Go to blog</Link>
    </Layout>
  )
}

export const query = graphql`
  query BlogPageQuery {
    allContentfulBlogPost(sort: { fields: [createdAt], order: DESC } ) {
      edges {
        node {
          id
          title
          slug
          heroImage {
            file {
              url
              fileName
            }
          }
        }
      }
    }
  }
`

export default BlogPage
