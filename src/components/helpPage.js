import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "./layout"
import SEO from "./seo"
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

const HelpPage = ({ data }) => {
  const helpArticle = data.contentfulHelpArticle;

  return (
    <Layout>
      <SEO title="Help Page" />
      <h1>{helpArticle.title}</h1>
      <div className="post">
        {documentToReactComponents(helpArticle.body.json, options)}
        <Link to="/">Go back to the homepage</Link>
      </div>
    </Layout>
  )
}
export default HelpPage

export const pageQuery = graphql`
  query HelpPageBySlug($articleSlug: String!) {
    contentfulHelpArticle(
      slug: { eq: $articleSlug }
    ) {
      title
      body {
        json
      }
      slug
      updatedAt
      description {
        description
      }
    }
  }
`
