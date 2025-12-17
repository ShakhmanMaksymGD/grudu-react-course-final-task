export type User = {
  id: string;
  name: string;
  email: string;
};

const BASE_URL = 'http://localhost:3001';

class UserService {
  async createUser(userData: User): Promise<User> {
    const response = await fetch(`${BASE_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getUser(id: string): Promise<User> {
    const response = await fetch(`${BASE_URL}/users/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to get user: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

export const userService = new UserService();