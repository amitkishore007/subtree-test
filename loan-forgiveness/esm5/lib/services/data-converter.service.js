import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
var DataConverterService = /** @class */ (function () {
    function DataConverterService(datePipe) {
        this.datePipe = datePipe;
    }
    DataConverterService.prototype.convertToData = function (key, value, self) {
        var data;
        try {
            if ((typeof value) == "string") {
                data = JSON.parse(value);
            }
            else {
                data = value;
            }
        }
        catch (_a) {
            data = value;
        }
        self[key] = data;
    };
    DataConverterService.prototype.getTransformedDate = function (_date, formatWithoutYear) {
        var date = new Date(_date);
        try {
            var transformedDateStr = this.datePipe.transform(date, formatWithoutYear);
            var year = '' + date.getFullYear();
            if (~year.indexOf('-')) {
                return transformedDateStr + year;
            }
            return transformedDateStr + '-' + year;
        }
        catch (_a) {
            return '-';
        }
    };
    DataConverterService.ctorParameters = function () { return [
        { type: DatePipe }
    ]; };
    DataConverterService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DataConverterService_Factory() { return new DataConverterService(i0.ɵɵinject(i1.DatePipe)); }, token: DataConverterService, providedIn: "root" });
    DataConverterService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], DataConverterService);
    return DataConverterService;
}());
export { DataConverterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb252ZXJ0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xvYW4tZm9yZ2l2ZW5lc3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGF0YS1jb252ZXJ0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQUszQztJQUVJLDhCQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBRXRDLENBQUM7SUFDRCw0Q0FBYSxHQUFiLFVBQWMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJO1FBQzFCLElBQUksSUFBSSxDQUFDO1FBQ1QsSUFBSTtZQUNBLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxJQUFJLFFBQVEsRUFBRTtnQkFDNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0gsSUFBSSxHQUFHLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQUMsV0FBSztZQUNILElBQUksR0FBRyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpREFBa0IsR0FBbEIsVUFBbUIsS0FBSyxFQUFFLGlCQUFpQjtRQUN2QyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJO1lBQ0EsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUMxRSxJQUFJLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNwQixPQUFPLGtCQUFrQixHQUFHLElBQUksQ0FBQzthQUNwQztZQUNELE9BQU8sa0JBQWtCLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztTQUMxQztRQUFDLFdBQUs7WUFDSCxPQUFPLEdBQUcsQ0FBQztTQUNkO0lBQ0wsQ0FBQzs7Z0JBN0I2QixRQUFROzs7SUFGN0Isb0JBQW9CO1FBSGhDLFVBQVUsQ0FBQztZQUNSLFVBQVUsRUFBRSxNQUFNO1NBQ3JCLENBQUM7T0FDVyxvQkFBb0IsQ0FnQ2hDOytCQXRDRDtDQXNDQyxBQWhDRCxJQWdDQztTQWhDWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YUNvbnZlcnRlclNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlKXtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGNvbnZlcnRUb0RhdGEoa2V5LCB2YWx1ZSwgc2VsZikge1xyXG4gICAgICAgIGxldCBkYXRhO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICgodHlwZW9mIHZhbHVlKSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoe1xyXG4gICAgICAgICAgICBkYXRhID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGZba2V5XSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VHJhbnNmb3JtZWREYXRlKF9kYXRlLCBmb3JtYXRXaXRob3V0WWVhcikge1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoX2RhdGUpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1lZERhdGVTdHIgPSB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShkYXRlLCBmb3JtYXRXaXRob3V0WWVhcik7XHJcbiAgICAgICAgICAgIGxldCB5ZWFyID0gJycgKyBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgIGlmICh+eWVhci5pbmRleE9mKCctJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZERhdGVTdHIgKyB5ZWFyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZERhdGVTdHIgKyAnLScgKyB5ZWFyO1xyXG4gICAgICAgIH0gY2F0Y2h7XHJcbiAgICAgICAgICAgIHJldHVybiAnLSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19