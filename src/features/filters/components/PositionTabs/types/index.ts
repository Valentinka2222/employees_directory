import { tab_names } from '../config';

export type TabComponentProps = {
  currentTab: keyof typeof tab_names;
  handleTabChange: (event: React.SyntheticEvent, newValue: keyof typeof tab_names) => void;
  tabNames: Record<string, string>;
};
