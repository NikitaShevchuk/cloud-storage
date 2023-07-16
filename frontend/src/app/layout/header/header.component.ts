import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatToolbarModule, MatIconModule],
  standalone: true,
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  onProfileClick() {
    this.dialog.open(AuthComponent, { minWidth: '50vw' });
  }
}
