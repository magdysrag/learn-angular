export interface IUser {
  fullName: string;
  email: string;
  phoneNo: string[];
  address: { city: string; postelCode: number; street: string };
  password: string;
  conformPassword: string;
}
