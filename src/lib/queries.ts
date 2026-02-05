export const GET_PRODUCTS = `
  query GetProducts($search: String) {
    products(first: 20, where: { search: $search }) {
      nodes {
        id
        databaseId
        name
        slug
        shortDescription
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
        }
      }
    }
  }
`;
