import React from 'react';
import { AddTweetForm } from '../components/AddTweetForm';
import { TweetList } from '../components/TweetList';
import { TweetsProvider } from '../contexts/TweetsContext';

const TweetsPage: React.FC = () => {
  return (
    <TweetsProvider>
      <div>
        <AddTweetForm />
        <div style={{ marginTop: '46px' }}>
          <TweetList />
        </div>
      </div>
    </TweetsProvider>
  );
};

export default TweetsPage;