import { NgModule } from "@angular/core";
import { PipeServersComponent } from './pipe-servers/pipe-servers.component';
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: 'demos', component: PipeServersComponent }
];

@NgModule({
    declarations: [
        PipeServersComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class DemoModule {

}