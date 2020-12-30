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
    getCategories: [Categories]!
    getCategoriesByParentId(id: ID!): [Categories]!
    getMainCategories: [Categories]!
    _getCategories(paginate: Paginate!): Categories!
    _getCategory(id: ID!): Category!
  }
  extend type Mutation {
    _addCategory(id: ID!, category: CreateCategory!): Category!
    _deleteCategories(idArr: [ID!]!): Result!
    _updateCategory(id: ID!, category: UpdateCategory!): Category!
  }
`;
