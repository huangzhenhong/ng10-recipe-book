import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    { path: '', component: ShoppingListComponent },
];

@NgModule({
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class ShoppingListModule {
    
}