export interface INewsletterDTO {
  _id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateNewsletterDTO {
  email: string;
}
