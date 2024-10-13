// Define Worker interface
export interface Worker {
  id: string;
  name: string;
  avatar: string;
  email: string;
  position: string;
  tag?: string;
  birthDate: string;
}

export type Workers = Worker[];

export interface WorkersState {
  loading: boolean;
  workers: Workers;
  error: string | null;
}

export type SortOrder = 'name' | 'birthDate';

export interface WorkersListProps {
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}
