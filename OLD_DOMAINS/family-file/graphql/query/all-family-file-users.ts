import gql from 'graphql-tag';

export default gql`
  query AllFamilyFileUsers {
    AllFamilyFileUsers {
      createdAt
      createdBy
      email
      externalId
      firstName
      isActive
      lastName
      updateAt
      updatedBy
      userId
      username
      userRoleId
      workPhone
      largeImageId
      smallImageId
      thumbnailImageId
      phoneProviderUsername
      positionId
    }
  }
`;
