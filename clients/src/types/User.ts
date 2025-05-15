type User = {
  id: string;
  fullname: string;
  avatar: string;
  dob: string;
  gender: number;
  email: string;
  status: number;
  createdAt: string;
}

export enum UserStatus {
  'Vô hiệu hóa' = 0,
  'Hoạt động' = 1
}

export enum Gender {
  'Nữ' = 0,
  'Nam' = 1
}

type AccountUser = Pick<User, 'fullname' | 'avatar'>

type CustomerList = Pick<User, 'id' | 'fullname' | 'dob' | 'gender' | 'email' | 'status' | 'createdAt'>

export type {
  AccountUser, CustomerList
}
