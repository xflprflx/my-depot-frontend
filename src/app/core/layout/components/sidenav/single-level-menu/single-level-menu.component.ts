import { Component, input } from '@angular/core';
import { ISidenavData } from '../../../interfaces/ISidenavData';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-single-level-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './single-level-menu.component.html',
  styleUrl: './single-level-menu.component.css'
})
export class SingleLevelMenuComponent {
  data = input.required<ISidenavData>();
  isChild = input.required<boolean>();
}
