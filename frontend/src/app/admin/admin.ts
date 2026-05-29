import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-wrapper">
      
      <nav class="top-nav">
        <div>
          <h2 class="nav-title">System Administrator - Admin Panel</h2>
          <p class="nav-subtitle">System Configuration | admin\@nsqtech.com</p>
        </div>
        <a href="/login" class="logout-btn">Logout</a>
      </nav>

      <div class="table-card">
        
        <div class="card-header">
          <div>
            <h3 class="page-title">User Records</h3>
            <p class="page-subtitle">Full system access - manage all personnel</p>
          </div>
          <button class="add-btn" (click)="openModal(null)">+ Add New User</button>
        </div>

        <div class="table-scroll-container">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let u of users">
                <td class="fw-bold text-dark">{{ u.id }}</td>
                <td class="text-muted fw-bold">{{ u.name }}</td>
                <td class="text-muted">{{ u.role }}</td>
                <td>
                  <span class="status-pill" [class.active-pill]="u.status === 'Active'">
                    {{ u.status }}
                  </span>
                </td>
                <td>
                  <button class="action-btn edit" (click)="openModal(u)">Edit</button>
                  <button class="action-btn delete" (click)="deleteUser(u.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="modal-overlay" *ngIf="isModalOpen">
      <div class="modal-content">
        <h3 class="modal-title">{{ isEditing ? 'Edit User' : 'Add New User' }}</h3>
        
        <label>User ID</label>
        <input #idInput type="text" [value]="currentUser?.id || ''" [disabled]="isEditing" placeholder="e.g. 116">
        
        <label>Full Name</label>
        <input #nameInput type="text" [value]="currentUser?.name || ''" placeholder="e.g. John Smith">
        
        <label>Role</label>
        <select #roleInput>
          <option value="General User" [selected]="currentUser?.role === 'General User'">General User</option>
          <option value="Administrator" [selected]="currentUser?.role === 'Administrator'">Administrator</option>
          <option value="Candidate" [selected]="currentUser?.role === 'Candidate'">Candidate</option>
        </select>
        
        <div class="modal-actions">
          <button class="cancel-btn" (click)="closeModal()">Cancel</button>
          <button class="save-btn" (click)="saveUser(idInput.value, nameInput.value, roleInput.value)">Save Changes</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /*  STYLING TO DASHBOARD */
    .dashboard-wrapper { padding: 40px; max-width: 1200px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; -webkit-font-smoothing: antialiased; }
    
    .top-nav { background-color: #1e1b4b; color: white; padding: 25px 40px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; box-shadow: 0 10px 15px -3px rgba(30, 27, 75, 0.3); }
    .nav-title { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }
    .nav-subtitle { margin: 6px 0 0 0; font-size: 14px; opacity: 0.9; }
    .logout-btn { background: transparent; border: 1px solid white; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600; transition: background 0.2s; }
    .logout-btn:hover { background: rgba(255,255,255,0.15); }

    .table-card { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); padding: 30px; border: 1px solid #e2e8f0; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
    .page-title { margin: 0; font-size: 22px; color: #0f172a; font-weight: 700; }
    .page-subtitle { margin: 6px 0 0 0; color: #64748b; font-size: 14px; }
    
    .add-btn { background: #3b82f6; color: white; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 700; border: none; cursor: pointer; transition: 0.2s; }
    .add-btn:hover { background: #2563eb; }

    .table-scroll-container { max-height: 600px; overflow-y: auto; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { padding: 16px 24px; color: #64748b; border-bottom: 2px solid #e2e8f0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; position: sticky; top: 0; background: white; }
    td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; font-size: 14px; vertical-align: middle; }
    tr:hover td { background-color: #f8fafc; }

    .fw-bold { font-weight: 600; }
    .text-dark { color: #0f172a; }
    .text-muted { color: #475569; }

    /* Pills & Actions */
    .status-pill { display: inline-block; text-align: center; min-width: 85px; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; color: white; background: #ef4444; }
    .active-pill { background: #16a34a; }

    .action-btn { border: 1px solid #e2e8f0; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; margin-right: 8px; background: white; transition: all 0.2s ease; }
    .action-btn.edit { color: #3b82f6; }
    .action-btn.edit:hover { border-color: #3b82f6; background: #eff6ff; }
    .action-btn.delete { color: #ef4444; }
    .action-btn.delete:hover { border-color: #ef4444; background: #fef2f2; }

    /* Modal Styling */
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; }
    .modal-content { background: white; padding: 32px; border-radius: 12px; width: 100%; max-width: 400px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
    .modal-title { margin: 0 0 20px 0; font-size: 20px; color: #0f172a; font-weight: 700; }
    .modal-content label { display: block; margin: 0 0 6px 0; font-size: 13px; font-weight: 600; color: #475569; }
    .modal-content input, .modal-content select { width: 100%; padding: 12px; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 20px; font-size: 14px; outline: none; transition: border-color 0.2s; }
    .modal-content input:focus, .modal-content select:focus { border-color: #3b82f6; }
    .modal-content input:disabled { background: #f8fafc; cursor: not-allowed; color: #94a3b8; }
    
    .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px; }
    .cancel-btn { padding: 10px 18px; border: 1px solid #e2e8f0; background: white; color: #475569; cursor: pointer; border-radius: 6px; font-size: 14px; font-weight: 600; transition: background 0.2s; }
    .cancel-btn:hover { background: #f8fafc; }
    .save-btn { padding: 10px 18px; border: none; background: #1e1b4b; color: white; cursor: pointer; border-radius: 6px; font-size: 14px; font-weight: 600; transition: background 0.2s; }
    .save-btn:hover { background: #312e81; }
  `]
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  isModalOpen = false;
  isEditing = false;
  currentUser: any = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.fetchUsers(); }

  async fetchUsers() {
    const res = await fetch('http://localhost:3000/api/users');
    this.users = await res.json();
    this.cdr.detectChanges();
  }

  openModal(user: any) {
    this.isEditing = !!user;
    this.currentUser = user;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentUser = null;
  }

  async saveUser(id: string, name: string, role: string) {
    if (!id || !name || !role) {
      alert("All fields are required.");
      return;
    }
    
    if (this.isEditing) {
      await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role })
      });
    } else {
      await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, role })
      });
    }
    
    await this.fetchUsers();
    this.closeModal();
  }

  async deleteUser(id: string) {
    if(confirm(`Are you sure you want to delete user ${id}?`)) {
      await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' });
      await this.fetchUsers();
    }
  }
}