import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() tabChanged = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onLinkChanged(event: any) {
    this.tabChanged.emit(event);
  }

}
