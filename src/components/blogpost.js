import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

const BlogPost = ({ data }) => {
  // console.log(data)
  const blogPost = data.contentfulBlogPost

  return (
    <Layout>
      <SEO title="Blog posts" />
      <h1>{blogPost.title}</h1>

      <div className="post">
        {documentToReactComponents(blogPost.body.json, options)}
        <Link to="/">Go back to the homepage</Link>
      </div>
    </Layout>
  )
}
export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      heroImage {
        file {
          url
          fileName
        }
      }
      body {
        json
      }
    }
  }
`
