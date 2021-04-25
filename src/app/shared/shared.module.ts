import { NgModule } from "@angular/core";
import { AlertComponent } from "./components/alert/alert.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { DropdownDirective } from "./directives/dropdown/dropdown.directive";
import { CommonModule } from "@angular/common";
import { BasicHighlightDirective } from './directives/basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './directives/better-highlight/better-highlight.directive';
import { UnlessDirective } from './directives/unless/unless.directive';
import { ShortenPipe } from './pipes/shorten.pipe';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        BasicHighlightDirective,
        BetterHighlightDirective,
        UnlessDirective,
        ShortenPipe,
        FilterPipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule,
        ShortenPipe,
        FilterPipe,
        BasicHighlightDirective,
        BetterHighlightDirective,
        UnlessDirective
    ]
})
export class SharedModule {

}