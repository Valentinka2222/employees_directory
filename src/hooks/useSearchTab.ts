import { useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tab_names } from '../data/tab';

interface UseSearchTabProps {
  setSearchTerm: (term: string) => void;
  setCurrentTab: (tab: keyof typeof tab_names) => void;
  currentTab: keyof typeof tab_names;
}

const useSearchTab = ({ setSearchTerm, setCurrentTab, currentTab }: UseSearchTabProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  const updateUrlParams = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('tab', currentTab);
    navigate({ search: searchParams.toString() }, { replace: true });
  }, [currentTab, navigate, location.search]);

  useEffect(() => {
    if (isInitialMount.current) {
      const searchParams = new URLSearchParams(location.search);
      const searchFromUrl = searchParams.get('search');
      const tabFromUrl = searchParams.get('tab') as keyof typeof tab_names;

      if (searchFromUrl && searchFromUrl !== '') {
        setSearchTerm(searchFromUrl);
      }

      const validTab = tabFromUrl && tab_names[tabFromUrl] ? tabFromUrl : 'All';
      if (currentTab !== validTab) {
        setCurrentTab(validTab);
      }

      isInitialMount.current = false;
    } else {
      updateUrlParams();
    }
  }, [location.search, setSearchTerm, setCurrentTab, currentTab, updateUrlParams]);

  return { updateUrlParams };
};

export default useSearchTab;
