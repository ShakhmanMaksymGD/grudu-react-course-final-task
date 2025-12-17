import React, { createContext, useContext, useState, ReactNode } from 'react';

type TweetsContextType = {
  refreshTrigger: number;
  triggerRefresh: () => void;
};

const TweetsContext = createContext<TweetsContextType | undefined>(undefined);

export const useTweets = () => {
  const context = useContext(TweetsContext);
  if (context === undefined) {
    throw new Error('useTweets must be used within a TweetsProvider');
  }
  return context;
};

type TweetsProviderProps = {
  children: ReactNode;
};

export const TweetsProvider: React.FC<TweetsProviderProps> = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <TweetsContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </TweetsContext.Provider>
  );
};