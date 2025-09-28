import { Component, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ISidenavData } from '../../../interfaces/ISidenavData';
import { CommonModule } from '@angular/common';
import { SingleLevelMenuComponent } from '../single-level-menu/single-level-menu.component';
import { Ripple } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-multi-level-menu',
  imports: [CommonModule, RouterModule, SingleLevelMenuComponent, Ripple, StyleClassModule],
  templateUrl: './multi-level-menu.component.html',
  styleUrl: './multi-level-menu.component.css'
})
export class MultiLevelMenuComponent {
  data = input.required<ISidenavData>();
  isChild = input.required<boolean>();

  router = inject(Router);

  getActiveClass(routeLink: string): string {
    return this.router.url.includes(routeLink) ? 'active' : '';
  }
}
