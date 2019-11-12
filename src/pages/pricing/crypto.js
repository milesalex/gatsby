import React from "react"
import { Link } from "gatsby"
// import { graphql } from "gatsby"

import Layout from "../../components/layout"
// import Image from "../components/image"
import SEO from "../../components/seo"

const CryptoPricing = ({ data }) => {
  // console.log(data)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>crypto pricing</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        {/* <Image /> */}
      </div>

      {/* <ul>
        {data.allContentfulHelpCenterCategory.edges.map(item => {
          return <li key={item.node.id}>{item.node.title}</li>
        })}
      </ul> */}

      <Link to="/blog/">Go to the blog</Link>
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

export default CryptoPricing
