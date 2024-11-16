import { useEffect } from 'react';
import type { SortOrder } from '../entities/Employees';
import { EmployeesList } from '../entities/Employees';

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
