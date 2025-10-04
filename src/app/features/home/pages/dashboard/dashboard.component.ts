import { Component, inject, OnInit } from '@angular/core';
import { LoggedInUserStoreService } from '../../../../core/auth/stores/logged-in-user-store.service';

import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  as = inject(AuthService);
  ngOnInit(): void {
  }

  log = inject(LoggedInUserStoreService);
 
  teste() {
    this.as.teste();
  }
}
