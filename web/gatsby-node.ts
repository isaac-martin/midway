
import { GatsbyNode } from "gatsby";

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query Pages
  const pagesQuery = await graphql(`
    {
      allSanityPage {
        edges {
          node {
            _rawContent(resolveReferences: {maxDepth: 9})
          }
        }
      }
    }
  `)

  if (pagesQuery.errors) {
    throw pagesQuery.errors
  }
  // @ts-ignore
  const pages = pagesQuery.data.allSanityPage.edges || []
  pages.forEach((edge: any, index: number) => {
    const path = `/${edge.node._rawContent.main.slug.current === 'home' ? '' : edge.node._rawContent.main.slug.current}`

    createPage({
      path,
      component: require.resolve('./src/templates/page.tsx'),
      context: { ...edge.node._rawContent },
    })
  })

  // Query Products
  const productsQuery = await graphql(`
  {
    allSanityProduct {
      edges {
        node {
          _rawContent(resolveReferences: {maxDepth: 9})
        }
      }
    }
  }
`)

  if (productsQuery.errors) {
    throw productsQuery.errors
  }


  // @ts-ignore
  const products = productsQuery.data.allSanityProduct.edges || []
  products.forEach((edge: any, index: number) => {
    const path = `/products/${edge.node._rawContent.main.slug.current}`

    createPage({
      path,
      component: require.resolve('./src/templates/product.tsx'),
      context: { ...edge.node._rawContent },
    })
  })

  // Query Collections
  const collectionsQuery = await graphql(`
  {
    allSanityCollection {
      edges {
        node {
          _rawContent(resolveReferences: {maxDepth: 9})
        }
      }
    }
  }
`)

  if (collectionsQuery.errors) {
    throw collectionsQuery.errors
  }
  // @ts-ignore
  const collections = collectionsQuery.data.allSanityCollection.edges || []
  collections.forEach((edge: any, index: number) => {
    const path = `/collection/${edge.node._rawContent.main.slug.current}`

    createPage({
      path,
      component: require.resolve('./src/templates/page.tsx'),
      context: { ...edge.node._rawContent },
    })
  })
}
