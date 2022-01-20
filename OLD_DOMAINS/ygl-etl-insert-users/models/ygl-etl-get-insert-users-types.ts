export type DateRange = {
  From: Date;
  To: Date;
};

export type YglEtlGetInsertUsersMeta = {
  AllYglUsersInRangeRows: number;
  UsersRemovedDuringDedupeRows: number;
  UsersAfterDedupeRows: number;
  RemovedAsExistingInFfRows: number;
  UsersToInsertRows: number;
  DateRange: DateRange;
};

export type YglUser = {
  userId: number;
  username: string;
  fname: string;
  lname: string;
  email: string;
  updatedOn: Date;
  createdBy: number;
  userCreatedOn: Date;
  updatedBy: Date;
  status: number;
  title: string;
  userRoleId: number;
  phoneW: string;
  five9username: string;
};

export type YglEtlGetInsertUsers = {
  AllYglUsersInRange: YglUser[];
  UsersRemovedDuringDedupe: YglUser[];
  UsersAfterDedupe: YglUser[];
  RemovedAsExistingInFf: YglUser[];
  UsersToInsert: YglUser[];
  Meta: YglEtlGetInsertUsersMeta;
};

export default YglEtlGetInsertUsers;
