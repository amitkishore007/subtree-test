import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LoanForgivCalcComponent } from './components/loan-forgiv-calc/loan-forgiv-calc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
let LoanForgivenessModule = class LoanForgivenessModule {
};
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
export { LoanForgivenessModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hbi1mb3JnaXZlbmVzcy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2FuLWZvcmdpdmVuZXNzLyIsInNvdXJjZXMiOlsibGliL2xvYW4tZm9yZ2l2ZW5lc3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDbkcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQVl6QyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtDQUFJLENBQUE7QUFBekIscUJBQXFCO0lBVmpDLFFBQVEsQ0FBQztRQUNSLFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO1FBQ3ZDLE9BQU8sRUFBRTtZQUNQLFlBQVk7WUFDWixtQkFBbUI7WUFDbkIsYUFBYSxDQUFDLE9BQU8sRUFBRTtTQUN4QjtRQUNELFNBQVMsRUFBQyxDQUFDLFFBQVEsQ0FBQztRQUNwQixPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztLQUNuQyxDQUFDO0dBQ1cscUJBQXFCLENBQUk7U0FBekIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IExvYW5Gb3JnaXZDYWxjQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvYW4tZm9yZ2l2LWNhbGMvbG9hbi1mb3JnaXYtY2FsYy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBOZ3hNYXNrTW9kdWxlIH0gZnJvbSAnbmd4LW1hc2snO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtMb2FuRm9yZ2l2Q2FsY0NvbXBvbmVudF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE5neE1hc2tNb2R1bGUuZm9yUm9vdCgpXHJcbiAgXSxcclxuICBwcm92aWRlcnM6W0RhdGVQaXBlXSxcclxuICBleHBvcnRzOiBbTG9hbkZvcmdpdkNhbGNDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2FuRm9yZ2l2ZW5lc3NNb2R1bGUgeyB9XHJcbiJdfQ==