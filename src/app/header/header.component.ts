import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() tabChanged = new EventEmitter<string>();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLinkChanged(event: any) {
    this.tabChanged.emit(event);
  }

  onLogin() {
    this.authService.logIn();
  }

  onLogout() {
    this.authService.logOut();
  }

}
