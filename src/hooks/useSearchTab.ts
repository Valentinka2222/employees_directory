import { useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tab_names } from '../features/filters/components/PositionTabs/config/index';

interface UseSearchTabProps {
  setSearchTerm: (term: string) => void;
  setCurrentTab: (tab: keyof typeof tab_names) => void;
  currentTab: keyof typeof tab_names;
}

const useSearchTab = ({ setSearchTerm, setCurrentTab, currentTab }: UseSearchTabProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialMount = useRef(true);

  const updateUrlParams = useCallback(() => {
    setSearchParams(
      prev => {
        const params = new URLSearchParams(prev);
        params.set('tab', currentTab);
        return params;
      },
      { replace: true },
    );
  }, [currentTab, setSearchParams]);

  useEffect(() => {
    if (isInitialMount.current) {
      const searchFromUrl = searchParams.get('search') || '';
      setSearchTerm(searchFromUrl);

      const tabFromUrl = searchParams.get('tab') as keyof typeof tab_names;
      const validTab = tabFromUrl && tab_names[tabFromUrl] ? tabFromUrl : 'all';
      if (currentTab !== validTab) setCurrentTab(validTab);

      if (!tabFromUrl || !searchParams.get('tab')) {
        setSearchParams(
          prev => {
            const params = new URLSearchParams(prev);
            params.set('tab', validTab);
            if (searchFromUrl) params.set('search', searchFromUrl);
            return params;
          },
          { replace: true },
        );
      }

      isInitialMount.current = false;
    } else {
      updateUrlParams();
    }
  }, [currentTab, searchParams, setSearchTerm, setCurrentTab, setSearchParams, updateUrlParams]);

  return { updateUrlParams };
};

export default useSearchTab;
