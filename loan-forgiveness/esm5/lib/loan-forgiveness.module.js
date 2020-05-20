import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LoanForgivCalcComponent } from './components/loan-forgiv-calc/loan-forgiv-calc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
var LoanForgivenessModule = /** @class */ (function () {
    function LoanForgivenessModule() {
    }
    LoanForgivenessModule = __decorate([
        NgModule({
            declarations: [LoanForgivCalcComponent],
            imports: [
                CommonModule,
                ReactiveFormsModule,
                NgxMaskModule.forRoot()
            ],
            providers: [DatePipe],
            exports: [LoanForgivCalcComponent]
        })
    ], LoanForgivenessModule);
    return LoanForgivenessModule;
}());
export { LoanForgivenessModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hbi1mb3JnaXZlbmVzcy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2FuLWZvcmdpdmVuZXNzLyIsInNvdXJjZXMiOlsibGliL2xvYW4tZm9yZ2l2ZW5lc3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDbkcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQVl6QztJQUFBO0lBQXFDLENBQUM7SUFBekIscUJBQXFCO1FBVmpDLFFBQVEsQ0FBQztZQUNSLFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO1lBQ3ZDLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLG1CQUFtQjtnQkFDbkIsYUFBYSxDQUFDLE9BQU8sRUFBRTthQUN4QjtZQUNELFNBQVMsRUFBQyxDQUFDLFFBQVEsQ0FBQztZQUNwQixPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNuQyxDQUFDO09BQ1cscUJBQXFCLENBQUk7SUFBRCw0QkFBQztDQUFBLEFBQXRDLElBQXNDO1NBQXpCLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBMb2FuRm9yZ2l2Q2FsY0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2FuLWZvcmdpdi1jYWxjL2xvYW4tZm9yZ2l2LWNhbGMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTmd4TWFza01vZHVsZSB9IGZyb20gJ25neC1tYXNrJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbTG9hbkZvcmdpdkNhbGNDb21wb25lbnRdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBOZ3hNYXNrTW9kdWxlLmZvclJvb3QoKVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOltEYXRlUGlwZV0sXHJcbiAgZXhwb3J0czogW0xvYW5Gb3JnaXZDYWxjQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9hbkZvcmdpdmVuZXNzTW9kdWxlIHsgfVxyXG4iXX0=