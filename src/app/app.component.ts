import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe-book';
  visibleTabName: string = 'recipes';

  constructor(private authService: AuthService){

  }

  ngOnInit() {
    this.authService.autoLogin();
  }

  onTabChanged(event: any){
    this.visibleTabName = event;
  }

}
