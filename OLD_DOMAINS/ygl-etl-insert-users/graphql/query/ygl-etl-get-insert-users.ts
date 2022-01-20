import gql from 'graphql-tag';

// TODO:  Remove me once data-grid card is fully implemented.
export default gql`
  query YglGetUsersForInsert(
    $startDate: Date
    $endDate: Date
  ) {
    YglGetUsersForInsert(
        startDate: $startDate
        endDate: $endDate
    ) {
      AllYglUsersInRange {
        userId
        username
        fname
        lname
        email
        updatedOn
        createdBy
        userCreatedOn
        updatedBy
        status
        title
        userRoleId
        phoneW
        five9username
      }
      UsersRemovedDuringDedupe {
        userId
        username
        fname
        lname
        email
        updatedOn
        createdBy
        userCreatedOn
        updatedBy
        status
        title
        userRoleId
        phoneW
        five9username
      }
      UsersAfterDedupe {
        userId
        username
        fname
        lname
        email
        updatedOn
        createdBy
        userCreatedOn
        updatedBy
        status
        title
        userRoleId
        phoneW
        five9username
      }
      RemovedAsExistingInFf {
        userId
        username
        fname
        lname
        email
        updatedOn
        createdBy
        userCreatedOn
        updatedBy
        status
        title
        userRoleId
        phoneW
        five9username
      }
      UsersToInsert {
        userId
        username
        fname
        lname
        email
        updatedOn
        createdBy
        userCreatedOn
        updatedBy
        status
        title
        userRoleId
        phoneW
        five9username
      }
      Meta {
        AllYglUsersInRangeRows
        UsersRemovedDuringDedupeRows
        UsersAfterDedupeRows
        RemovedAsExistingInFfRows
        UsersToInsertRows
        DateRange {
          From
          To
        }
      }
    }
  }
`;
