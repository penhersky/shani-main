import { gql } from 'apollo-server-express';

export default gql`
  input Paginate {
    page: Int = 1
    limit: Int = 10
    sort: sort = DESC
    sortKey: String = createdAt
  }
`;
