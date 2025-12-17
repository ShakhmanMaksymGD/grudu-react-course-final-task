import React, { useEffect, useState } from "react";
import { Tweet, tweetService } from "../../services/tweetService";
import { TweetItem } from "../TweetItem";
import { useTweets } from "../../contexts/TweetsContext";
import "./TweetList.css";

const TweetList: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { refreshTrigger } = useTweets();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setLoading(true);
        setError(null);

        const tweetsData = await tweetService.getTweets();

        setTweets(tweetsData.reverse());
      } catch (err) {
        setError('Failed to load tweets');
        console.error('Error fetching tweets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, [refreshTrigger]);

  if (loading) {
    return <div>Loading tweets...</div>;
  }

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  if (!tweets.length) {
    return (
      <div className="tweet-list">
        <div className="tweet-list__empty">
          <h3 className="tweet-list__empty-message">No tweets yet</h3>
          <div className="tweet-list__empty-subtitle">Be the first to share something!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="tweet-list">
      {tweets.map((tweet) => (
        <TweetItem key={tweet.id} tweetData={tweet} />
      ))}
    </div>
  );
};

export default TweetList;