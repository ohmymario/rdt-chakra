import { useState } from 'react';

/**
 * @desc Manages the state for active tab in the New Post Form.
 * @param - The initial tab to be active.
 * @returns An object containing the active tab and a setter function.
 */

interface returnTabState {
  activeTab: tabLabel;
  setActiveTab: React.Dispatch<React.SetStateAction<tabLabel>>;
}

export type tabLabel = 'Post' | 'Image & Video' | 'Link' | 'Poll' | 'Talk';

export const useTabState = (): returnTabState => {
  const [activeTab, setActiveTab] = useState<tabLabel>('Post');

  return {
    activeTab,
    setActiveTab,
  };
};
