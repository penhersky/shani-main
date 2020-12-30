import { gql } from 'apollo-server-express';

export default gql`
  enum result {
    ERROR
    SUCCESS
  }
  enum userType {
    customer
    performer
  }
  enum sort {
    ASC
    DESC
  }
`;
