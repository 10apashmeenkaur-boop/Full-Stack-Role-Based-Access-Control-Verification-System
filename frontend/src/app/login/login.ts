import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  errorMessage = '';
  showPassword = false;

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onLogin(userIdValue: string, passwordValue: string, roleValue: string) {
    try {
      // BULLETPROOFING: Trim the inputs on the frontend too
      const cleanUserId = (userIdValue || '').trim();
      const cleanRole = (roleValue || '').trim();

      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: cleanUserId, password: passwordValue, role: cleanRole })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = data.message;
      }
    } catch (error) {
      this.errorMessage = 'Cannot connect to server. Is backend running?';
    }
  }
}