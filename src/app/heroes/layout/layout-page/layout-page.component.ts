import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],
})
export class LayoutPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  public sidebarItems = [
    /* al hacerlo así como ./list va a navegar a la url list pero desde el path donde se encuentra, es decir, si me encuentro en heroes entonces sería heroes/list */
    { label: 'List', icon: 'label', url: './list' },
    { label: 'Add New', icon: 'add', url: './new-hero' },
    { label: 'Search', icon: 'search', url: './search' },
  ];

  get getUser(): User | undefined {
    return this.authService.getCurrentUser;
  }

  handleLogout(): void {
    this.authService.handleLogout();
    this.router.navigate(['/auth/login']);
  }
}
