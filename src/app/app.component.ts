import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as authActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe-book';
  visibleTabName: string = 'recipes';

  constructor(private store: Store<fromApp.AppState>){

  }

  ngOnInit() {
    this.store.dispatch(new authActions.AutoLogin());
  }

  onTabChanged(event: any){
    this.visibleTabName = event;
  }

}
