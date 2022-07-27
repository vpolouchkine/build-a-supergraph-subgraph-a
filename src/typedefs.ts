import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0",
       import: ["@key", "@shareable", "@tag", "@inaccessible"])

type Query {
  allProducts: [ProductItf]
  product(id: ID!): ProductItf
}

interface ProductItf implements SkuItf {
  id: ID!
  sku: String
  package: String
  variation: ProductVariation
  dimensions: ProductDimension
  createdBy: User
  hidden: String @inaccessible
}

interface SkuItf {
  sku: String
}

type Product implements ProductItf & SkuItf @key(fields: "id") @key(fields: "sku package") @key(fields: "sku variation { id }"){
  id: ID! @tag(name: "hi-from-products")
  sku: String
  package: String
  variation: ProductVariation
  dimensions: ProductDimension
  createdBy: User
  hidden: String
}
enum ShippingClass {
  STANDARD
  EXPRESS
}
type ProductVariation {
  id: ID!
}
type ProductDimension @shareable {
  size: String
  weight: Float
}
type User @key(fields: "email") {
  email: ID!
  totalProductsCreated: Int @shareable
}
`;
