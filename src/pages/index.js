import React from "react"
import { Link } from "gatsby"
// import { graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  // console.log(data)

  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        <li>
          <a href="/users">users</a>
        </li>
        <li>
          <Link to="/blog">blog</Link>
        </li>
        <li>
          <Link to="/exchanges">exchanges</Link>
        </li>
        <li>
          <Link to="/help">help</Link>
        </li>
      </ul>

      <h1>Hi lighthouse</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>

      {/* <ul>
        {data.allContentfulHelpCenterCategory.edges.map(item => {
          return <li key={item.node.id}>{item.node.title}</li>
        })}
      </ul> */}
    </Layout>
  )
}

// export const query = graphql`
//   query HomePageQuery {
//     allContentfulHelpCenterCategory {
//       edges {
//         node {
//           id
//           title
//           slug
//           featuredArticles {
//             slug
//             title
//           }
//         }
//       }
//     }
//   }
// `

export default IndexPage
