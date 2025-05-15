type User = {
  id: string;
  fullname: string;
  avatar: string;
  dob: string;
  gender: number;
  email: string;
  status: number;
  roleId: string;
  createdAt: string;
}

export enum UserStatus {
  'Vô hiệu hóa' = 0,
  'Hoạt động' = 1
}

export enum Role {
  'VT001' = 'Quản trị viên',
  'VT002' = 'Nhân viên kho',
  'VT003' = 'Nhân viên giao hàng'
}

export enum Gender {
  'Nữ' = 0,
  'Nam' = 1
}

type AccountUser = Pick<User, 'fullname' | 'avatar'>

type CustomerList = Pick<User, 'id' | 'fullname' | 'dob' | 'gender' | 'email' | 'status' | 'createdAt'>

type StaffList = Pick<User, 'id' | 'fullname' | 'dob' | 'gender' | 'roleId' | 'status' | 'createdAt'>

export type {
  AccountUser, CustomerList, StaffList
}
