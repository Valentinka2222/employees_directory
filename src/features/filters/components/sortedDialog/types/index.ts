export type SortedModalProps = {
  isSortOpened: boolean;
  isExpanded: boolean;
  setisSortOpened: (isSortOpened: boolean) => void;
  setExpanded: (isExpanded: boolean) => void;
  handleClear: () => void;
};
