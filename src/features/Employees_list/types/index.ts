export type Employees = Employer[];

export type SortOrder = 'name' | 'birthDate';

export type Employer = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  position: string;
  tag: string;
  birthDate: string;
  phone: string;
};
