import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth/auth.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
    { path: 'auth', component: AuthComponent},
];

@NgModule({
    declarations: [AuthComponent],
    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AuthModule {

}