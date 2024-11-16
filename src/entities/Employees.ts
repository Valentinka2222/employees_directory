export type Employees = Employer[];

export type SortOrder = 'name' | 'birthDate';

export interface EmployeesState {
  loading: boolean;
  employees: Employees;
  error: string | null;
}

export interface Employer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  position: string;
  tag: string;
  birthDate: string;
  phone: string;
}
export interface EmployeesList {
  sortOrder: SortOrder;
  searchTerm: string;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
export interface EmployeesListProps {
  sortOrder: SortOrder;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
