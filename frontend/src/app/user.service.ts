import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api';

  // Fetch Users
  async getUsers() {
    const res = await fetch(`${this.baseUrl}/users`);
    return await res.json();
  }

  // Add User
  async addUser(id: string, name: string, role: string) {
    await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, role })
    });
  }

  // Edit User
  async updateUser(id: string, name: string, role: string) {
    await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role })
    });
  }

  // Delete User
  async deleteUser(id: string) {
    await fetch(`${this.baseUrl}/users/${id}`, { method: 'DELETE' });
  }

  // Fetch Records (WITH THE REQUIRED DELAY PARAMETER)
 async getRecordsWithDelay(delayMs: number, role: string) {
    // Passes both the delay parameter AND the user's role for access level checks
    const res = await fetch(`${this.baseUrl}/records?delay=${delayMs}&role=${role}`);
    return await res.json();
  }
}