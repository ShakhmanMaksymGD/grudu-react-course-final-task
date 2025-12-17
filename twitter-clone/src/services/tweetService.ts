export type Tweet = {
  id?: string;
  author_id: string;
  text: string;
};

const BASE_URL = 'http://localhost:3001';

class TweetService {
  async createTweet(tweetData: Tweet): Promise<Tweet> {
    const response = await fetch(`${BASE_URL}/tweets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweetData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create tweet: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getTweets(): Promise<Tweet[]> {
    const response = await fetch(`${BASE_URL}/tweets`);

    if (!response.ok) {
      throw new Error(`Failed to get tweets: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

export const tweetService = new TweetService();