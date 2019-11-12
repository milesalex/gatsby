import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "./layout"
import SEO from "./seo"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

// const options = {
//   renderMark: {
//     [MARKS.BOLD]: text => <Bold>{text}</Bold>,
//   },
//   renderNode: {
//     [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
//   },
// }

const HelpCategory = ({ data }) => {
  const helpCategory = data.contentfulHelpCenterCategory

  return (
    <Layout>
      <SEO title={helpCategory.title} />
      <h1>{helpCategory.title}</h1>
      <ul>
        {helpCategory.articles.map(article => (
          <li key={article.id}>
            <Link to={`/help/${helpCategory.slug}/${article.slug}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
export default HelpCategory

export const pageQuery = graphql`
  query HelpCategoryBySlug($slug: String!) {
    contentfulHelpCenterCategory(slug: { eq: $slug }) {
      title
      slug
      articles {
        id
        title
        slug
      }
    }
  }
`
