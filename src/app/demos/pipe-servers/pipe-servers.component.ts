import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipe-servers',
  templateUrl: './pipe-servers.component.html',
  styleUrls: ['./pipe-servers.component.css']
})
export class PipeServersComponent implements OnInit {

  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(15, 1, 2019)
    },
    {
      instanceType: 'large',
      name: 'User Databaes',
      status: 'stable',
      started: new Date(15, 1, 2019)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 1, 2019)
    },
    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date(15, 1, 2019)
    },
  ];

  filteredStatus: string = '';

  appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    }, 2000);
  });

  constructor() { }

  ngOnInit(): void {
  }

  getStatusClasses(server){
    return '';
  }
}
