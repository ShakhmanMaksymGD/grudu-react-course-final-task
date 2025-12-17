import React, { useEffect } from "react";
import { Tweet } from "../../services/tweetService";
import { userService } from "../../services/userService";
import { useFetch } from "../../hooks/useFetch";
import { Avatar } from "../ui/Avatar";
import Typography from "../ui/Typography";
import "./TweetItem.css";

type TweetItemProps = {
  tweetData: Tweet;
};

const TweetItem: React.FC<TweetItemProps> = ({ tweetData }) => {
  const { data: author, loading, error, execute } = useFetch(userService.getUser);

  useEffect(() => {
    execute(tweetData.author_id);
  }, [tweetData.author_id, execute]);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (error || !author) {
    return (
      <div>
        {error || 'Author not found'}
      </div>
    );
  }

  return (
    <div className="tweet-item">
      <div className="tweet-item__avatar">
        <Avatar name={author.name} />
      </div>
      <div className="tweet-item__content">
        <Typography el="h4" className="tweet-item__author">{author.name}</Typography>
        <Typography el="p" className="tweet-item__text">
          <div dangerouslySetInnerHTML={{ __html: tweetData.text }} />
        </Typography>
      </div>
    </div>
  );
};

export default TweetItem;