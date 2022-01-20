import gql from 'graphql-tag';

// TODO:  Remove me once data-grid card is fully implemented.
export default gql`
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
