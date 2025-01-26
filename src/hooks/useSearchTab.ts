import { useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tab_names } from '../features/filters/components/PositionTabs/config/index';

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

    const newSearch = `?${searchParams.toString()}`;

    if (location.search !== newSearch) navigate({ search: newSearch }, { replace: true });
  }, [currentTab, location.search, navigate]);

  useEffect(() => {
    if (isInitialMount.current) {
      const searchParams = new URLSearchParams(location.search);

      const searchFromUrl = searchParams.get('search') || '';
      setSearchTerm(searchFromUrl);

      const tabFromUrl = searchParams.get('tab') as keyof typeof tab_names;
      const validTab = tabFromUrl && tab_names[tabFromUrl] ? tabFromUrl : 'All';
      if (currentTab !== validTab) setCurrentTab(validTab);

      if (!tabFromUrl || !searchParams.get('tab')) {
        searchParams.set('tab', validTab);
        if (searchFromUrl) searchParams.set('search', searchFromUrl);

        navigate({ search: searchParams.toString() }, { replace: true });
      }

      isInitialMount.current = false;
    } else updateUrlParams();
  }, [currentTab, location.search, navigate, setSearchTerm, setCurrentTab, updateUrlParams]);

  return { updateUrlParams };
};

export default useSearchTab;
