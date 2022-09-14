export interface IUserDTO {
  _id: string;
  name: string;
  email: string;
  profilePath?: string;
  trashed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
