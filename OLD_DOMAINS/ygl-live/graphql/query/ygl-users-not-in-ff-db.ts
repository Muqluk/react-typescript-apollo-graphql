import gql from 'graphql-tag';
import YglUser from '../../models/ygl-user';

export type QueryResult = {
  YglUsersNotInFamilyFileDb: YglUser[];
};

export default gql`
  query YglUsersNotInFamilyFileDb {
    YglUsersNotInFamilyFileDb {
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
