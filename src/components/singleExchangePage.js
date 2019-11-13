import React from "react"
import {  graphql } from "gatsby"
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

const SingleExchangePage = ({ data }) => {
  const exchange = data.contentfulExchanges
  return (
    <Layout>
      <SEO title="Exchange" />
      <h1>{exchange.name}</h1>
      {exchange.platformImage && (
        <img src={exchange.platformImage.file.url} alt={exchange.platformImage.title} />
      )}
      {exchange.showAdditionalCopy &&
        documentToReactComponents(exchange.additionalCopy.json, options)}
    </Layout>
  )
}
export default SingleExchangePage

export const pageQuery = graphql`
  query ExchangePageBySlug($contentfulid: String!) {
    contentfulExchanges(contentfulid: { eq: $contentfulid }) {
      id
      name
      platformImage {
        file {
          url
        }
        title
      }
      showAdditionalCopy
      additionalCopy {
        json
      }
      smallExchange
      metaDescription
      contentfulid
      instructions {
        json
      }
      csvInstructions {
        json
      }
    }
  }
`
