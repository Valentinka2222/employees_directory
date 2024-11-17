import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface UseSearchInputProps {
  searchTerm: string;
  currentTab: string;
}

const useSearchInput = ({ searchTerm, currentTab }: UseSearchInputProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchTerm) searchParams.set('search', searchTerm);
    else searchParams.delete('search');

    searchParams.set('tab', currentTab);

    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    if (newUrl !== `${location.pathname}${location.search}`) navigate(newUrl, { replace: true });
  }, [searchTerm, currentTab, navigate, location.pathname, location.search]);
};

export default useSearchInput;
