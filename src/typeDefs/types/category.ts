import { gql } from 'apollo-server-express';

export default gql`
  type Category {
    id: ID!
    name: String!
    icon: String
    image: String
    description: String
    parent: String
    children: [Category]
    visible: Boolean
    createdAt: String
    updatedAt: String
  }
  input CreateCategory {
    name: String!
    icon: String
    image: String
    description: String
    parent: String
    visible: Boolean
  }
  input UpdateCategory {
    name: String!
    icon: String
    image: String
    description: String
    parent: String
    visible: Boolean
  }
  type Categories {
    result: result
    totalItems: Int
    page: Int
    limit: Int
    totalPages: Int
    categories: [Category]
  }

  extend type Query {
    getCategories: [Categories]! @cacheControl(maxAge: 3600000)
    getCategoriesByParentId(id: ID!): [Categories]!
      @cacheControl(maxAge: 3600000)
    getMainCategories: [Categories]! @cacheControl(maxAge: 3600000)
    _getCategories(paginate: Paginate!): Categories!
      @cacheControl(maxAge: 60000)
    _getCategory(id: ID!): Category! @cacheControl(maxAge: 60000)
  }
  extend type Mutation {
    _addCategory(category: CreateCategory!): Category!
    _deleteCategories(idArr: [ID!]!): Result!
    _updateCategory(id: ID!, category: UpdateCategory!): Category!
  }
`;
