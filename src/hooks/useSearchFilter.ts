import { useEffect } from 'react';
import type { SortOrder, EmployeesList } from '../entities/Employees/types/index';

interface UseSearchFilterProps {
  setSortOrder: EmployeesList['setSortOrder'];
}

const useSearchFilter = ({ setSortOrder }: UseSearchFilterProps) => {
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sortFromUrl = searchParams.get('sort') as SortOrder;
    if (sortFromUrl && (sortFromUrl === 'name' || sortFromUrl === 'birthDate'))
      setSortOrder(sortFromUrl);
  }, [location.search, setSortOrder]);
};

export default useSearchFilter;
