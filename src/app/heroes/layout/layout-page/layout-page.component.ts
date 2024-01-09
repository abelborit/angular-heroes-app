import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],
})
export class LayoutPageComponent {
  public sidebarItems = [
    /* al hacerlo así como ./list va a navegar a la url list pero desde el path donde se encuentra, es decir, si me encuentro en heroes entonces sería heroes/list */
    { label: 'List', icon: 'label', url: './list' },
    { label: 'Add New', icon: 'add', url: './new-hero' },
    { label: 'Search', icon: 'search', url: './search' },
  ];
}
