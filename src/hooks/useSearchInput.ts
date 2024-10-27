import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface UseSearchInputProps {
  searchTerm: string | undefined;
  currentTab: string;
}

const useSearchInput = ({ searchTerm, currentTab }: UseSearchInputProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    searchTerm ? searchParams.set('search', searchTerm) : searchParams.delete('search');
    searchParams.set('tab', currentTab);

    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [searchTerm, currentTab, navigate, location.pathname]);

  return { currentTab };
};

export default useSearchInput;
