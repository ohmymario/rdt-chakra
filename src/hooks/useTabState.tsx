import { useState } from 'react';

/**
 * @desc Manages the state for active tab in the New Post Form.
 * @param {string} initialTab - The initial tab to be active.
 * @returns {Object} An object containing the active tab and a setter function.
 */

export type tabLabels = 'Post' | 'Image & Video' | 'Link' | 'Poll' | 'Talk';

export const useTabState = () => {
  const [activeTab, setActiveTab] = useState<tabLabels>('Post');

  return {
    activeTab,
    setActiveTab,
  };
};