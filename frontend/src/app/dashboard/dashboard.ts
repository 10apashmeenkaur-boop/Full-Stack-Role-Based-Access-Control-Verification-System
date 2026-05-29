import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-wrapper">
      
      <nav class="top-nav">
        <div>
          <h2 class="nav-title">{{ user?.name || 'User' }} - {{ user?.role || 'General User' }}</h2>
          <p class="nav-subtitle">Engineering | {{ user?.id || 'user' }}@nsqtech.com</p>
        </div>
        
        <div class="nav-actions" style="display: flex; gap: 15px; align-items: center;">
          <a *ngIf="user?.role === 'Admin'" href="/admin" class="admin-btn">Manage Users</a>
          <a href="/login" class="logout-btn">Logout</a>
        </div>
      </nav>

      <div class="table-card">
        
        <div class="card-header">
          <div>
            <h3 class="page-title">User Records</h3>
            <p class="page-subtitle">Standard access - viewing assigned records only</p>
          </div>
          <div class="record-badge">{{ records.length }} Total Records</div>
        </div>

        <div *ngIf="loading" class="loading-bar">
          Loading system tasks from server...
        </div>

        <div class="table-scroll-container" *ngIf="!loading">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assigned To</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let record of records">
                <td class="fw-bold text-dark">{{ record.title }}</td>
                <td class="text-muted">{{ record.description }}</td>
                <td>
                  <span class="status-pill" [class.active-pill]="record.status === 'Active'" [class.completed-pill]="record.status === 'Completed'">
                    {{ record.status }}
                  </span>
                </td>
                <td>
                  <span class="priority-pill" 
                        [class.high]="record.priority === 'High'" 
                        [class.medium]="record.priority === 'Medium'" 
                        [class.low]="record.priority === 'Low'">
                    {{ record.priority }}
                  </span>
                </td>
                <td class="text-muted fw-bold">{{ record.assignedTo }}</td>
                <td class="text-muted">{{ record.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-wrapper { padding: 40px; max-width: 1200px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; -webkit-font-smoothing: antialiased; }
    
    .top-nav { background-color: #1e1b4b; color: white; padding: 25px 40px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; box-shadow: 0 10px 15px -3px rgba(30, 27, 75, 0.3); }
    .nav-title { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }
    .nav-subtitle { margin: 6px 0 0 0; font-size: 14px; opacity: 0.9; }
    
    .admin-btn { background: #3b82f6; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600; transition: background 0.2s; }
    .admin-btn:hover { background: #2563eb; }
    .logout-btn { background: transparent; border: 1px solid rgba(255,255,255,0.4); color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600; transition: all 0.2s; }
    .logout-btn:hover { background: rgba(255,255,255,0.15); border-color: white; }

    .table-card { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); padding: 30px; border: 1px solid #e2e8f0; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
    .page-title { margin: 0; font-size: 22px; color: #0f172a; font-weight: 700; }
    .page-subtitle { margin: 6px 0 0 0; color: #64748b; font-size: 14px; }
    .record-badge { background: #1e1b4b; color: white; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 700; }

    .loading-bar { background: #f8fafc; color: #475569; padding: 20px; text-align: center; border-radius: 8px; font-size: 15px; font-weight: 600; border: 1px solid #e2e8f0; margin-bottom: 10px; }

    .table-scroll-container { max-height: 600px; overflow-y: auto; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { padding: 16px 24px; color: #64748b; border-bottom: 2px solid #e2e8f0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; position: sticky; top: 0; background: white; white-space: nowrap; }
    td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; font-size: 14px; vertical-align: middle; }
    tr:hover td { background-color: #f8fafc; }

    .fw-bold { font-weight: 600; }
    .text-dark { color: #0f172a; }
    .text-muted { color: #475569; }

    /* Solid Figma Pills */
    .status-pill { display: inline-block; text-align: center; min-width: 85px; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; color: white; background: #f97316; }
    .active-pill { background: #15803d; }
    .completed-pill { background: #0284c7; }

    .priority-pill { display: inline-block; text-align: center; min-width: 70px; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; background: white; }
    .priority-pill.high { color: #dc2626; border: 1px solid #fca5a5; }
    .priority-pill.medium { color: #ea580c; border: 1px solid #fdba74; }
    .priority-pill.low { color: #0284c7; border: 1px solid #bae6fd; }
  `]
})
export class DashboardComponent implements OnInit {
  user: any = null;
  records: any[] = [];
  loading = true;

  constructor(
    private cdr: ChangeDetectorRef, 
    private userService: UserService
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) { this.user = JSON.parse(storedUser); }
    this.fetchRecords();
  }

  async fetchRecords() {
    this.loading = true;
    try {
      // Calls the dummy API
      this.records = await this.userService.getRecordsWithDelay(2000, this.user?.role);
      this.loading = false;
      this.cdr.detectChanges();
    } catch (error) {
      console.error("Failed to fetch records", error);
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}