import { Component, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';
import { sidenavData } from './sidenav-data';
import { SingleLevelMenuComponent } from "./single-level-menu/single-level-menu.component";
import { MultiLevelMenuComponent } from "./multi-level-menu/multi-level-menu.component";
import { ISidenavData } from '../../interfaces/ISidenavData';


@Component({
  selector: 'app-sidenav',
  imports: [DrawerModule, ButtonModule, Ripple, AvatarModule, StyleClass, SingleLevelMenuComponent, MultiLevelMenuComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  visible: boolean = true;

  sidenavData = sidenavData;

  shrinkItems(item: ISidenavData): void {
    for (let modelItem of this.sidenavData) {
      if (item !== modelItem && modelItem.expanded) {
        modelItem.expanded = false;
      }
    }
  }

}
