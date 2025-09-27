import { Component, computed, inject } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { LoggedInUserStoreService } from '../../../auth/store/logged-in-user-store.service';
import { LogoutFacadeService } from '../../../auth/facades/logout-facade.service';

@Component({
  selector: 'app-header',
  imports: [Toolbar, AvatarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private readonly logoutFacadeService = inject(LogoutFacadeService);
  private readonly router = inject(Router);
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);

  isLoggedIn = computed(() => this.loggedInUserStoreService.isLoggedIn());

  logout() {
    this.logoutFacadeService.logout()
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        }
      });
  }
}
