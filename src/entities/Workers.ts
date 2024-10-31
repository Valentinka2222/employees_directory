export type Workers = Worker[];

export type SortOrder = 'name' | 'birthDate';

export interface WorkersState {
  loading: boolean;
  workers: Workers;
  error: string | null;
}

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  email: string;
  position: string;
  tag: string;
  birthDate: string;
  phone: string;
}
export interface WorkersList {
  sortOrder: SortOrder;
  searchTerm: string;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
export interface WorkersListProps {
  sortOrder: SortOrder;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
