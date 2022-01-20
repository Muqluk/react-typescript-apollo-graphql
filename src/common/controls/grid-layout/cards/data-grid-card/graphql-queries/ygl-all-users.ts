import gql from 'graphql-tag';

export const AllYglUsers = gql`
  query AllYglUsers {
    AllYglUsers {
      username
      userId
      userRoleId
      status
      role
      mgr
      email
      hiredate
      termdate
      userCreatedOn
      startDate
      transferDate
    }
  }
`;
