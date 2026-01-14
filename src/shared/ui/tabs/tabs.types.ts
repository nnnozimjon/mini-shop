export interface TabData {
  name: string;
  content: React.ReactNode;
}

export interface TabProps {
  tab: TabData;
  isActive: boolean;
  onClick: () => void;
}
export interface TabContentProps {
  content: React.ReactNode;
}

export interface TabsProps {
  tabsData: TabData[];
}