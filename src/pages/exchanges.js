import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const ExchangePage = ({ data }) => {
  const mainExchanges = data.allContentfulExchanges.edges.filter(
    item => !item.node.smallExchange
  )
  const smallExchanges = data.allContentfulExchanges.edges.filter(
    item => item.node.smallExchange
  )

  return (
    <Layout>
      <SEO title="Exchanges" />
      <h1>Exchanges</h1>
      <ul>
        {mainExchanges.map(item => {
          // console.log(item.node)

          return (
            <li key={item.node.id}>
              {item.node.logoColor ? (
            
                <picture>
                  <source srcSet={item.node.logoColor.fixed.srcWebp} type="image/webp" />
                  <img src={item.node.logoColor.file.url} alt={item.node.title} />
                </picture>
            
              ) : (
                <code>placeholder {item.node.name} img</code>
              )}

              <Link to={`/exchanges/${item.node.contentfulid}`}>
                {item.node.name}
              </Link>
            </li>
          )
        })}
      </ul>

      <h2>Others</h2>
      {smallExchanges.map(item => {
        return (
          <li key={item.node.id}>
            <Link to={`/exchanges/${item.node.contentfulid}`}>
              {item.node.name}
            </Link>
          </li>
        )
      })}

      <Link to="/blog/">Go to blog</Link>
    </Layout>
  )
}

export const query = graphql`
  query ExchangePageQuery {
    allContentfulExchanges(sort: { fields: [contentfulid], order: ASC }) {
      edges {
        node {
          id
          logoColor {
            file {
              url
            }
            fixed(width: 600) {
              srcWebp
              srcSetWebp
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

export default ExchangePage
