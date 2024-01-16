import { useState } from 'react';

export type tabLabel = 'Post' | 'Image & Video' | 'Link' | 'Poll' | 'Talk';

interface ReturnTabState {
  activeTab: tabLabel;
  setActiveTab: React.Dispatch<React.SetStateAction<tabLabel>>;
}

/**
 * @desc Manages the state for active tab in the New Post Form.
 * @param initialTab - The initial tab to be active. Defaults to 'Post'.
 * @returns An object containing the active tab and a setter function.
 */

export const useTabState = (initialTab: tabLabel = 'Post'): ReturnTabState => {
  const [activeTab, setActiveTab] = useState<tabLabel>(initialTab);

  return {
    activeTab,
    setActiveTab,
  };
};
