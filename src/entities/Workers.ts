export interface Workers {
  avatar: string;
  email: string;
  id: string;
  name: string;
  position: string;
  birthday: number;
  phone: string;
  tag: string;
}

export interface WorkersState {
  loading: boolean;
  workers: Workers[];
  error: string | null;
}
