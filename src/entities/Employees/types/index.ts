export type Employees = Employer[];

export type SortOrder = 'name' | 'birthDate';

export type EmployeesState = {
  loading: boolean;
  employees: Employees;
  error: string | null;
};

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

export type EmployeesList = {
  sortOrder: SortOrder;
  searchTerm: string;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};
