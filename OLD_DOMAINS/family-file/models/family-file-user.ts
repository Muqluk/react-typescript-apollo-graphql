type FamilyFileUser = {
  createdAt: Date;
  createdBy: number;
  email: string;
  externalId: number;
  firstName: string;
  isActive: boolean;
  lastName: string;
  updateAt: Date;
  updatedBy: number;
  userId: number;
  username: string;
  userRoleId: number;
  workPhone: string;
  largeImageId: number;
  smallImageId: number;
  thumbnailImageId: number;
  phoneProviderUsername: string;
  positionId: number;
};

export default FamilyFileUser;
