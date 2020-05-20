import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
let DataConverterService = class DataConverterService {
    constructor(datePipe) {
        this.datePipe = datePipe;
    }
    convertToData(key, value, self) {
        let data;
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
    }
    getTransformedDate(_date, formatWithoutYear) {
        let date = new Date(_date);
        try {
            let transformedDateStr = this.datePipe.transform(date, formatWithoutYear);
            let year = '' + date.getFullYear();
            if (~year.indexOf('-')) {
                return transformedDateStr + year;
            }
            return transformedDateStr + '-' + year;
        }
        catch (_a) {
            return '-';
        }
    }
};
DataConverterService.ctorParameters = () => [
    { type: DatePipe }
];
DataConverterService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DataConverterService_Factory() { return new DataConverterService(i0.ɵɵinject(i1.DatePipe)); }, token: DataConverterService, providedIn: "root" });
DataConverterService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DataConverterService);
export { DataConverterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb252ZXJ0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xvYW4tZm9yZ2l2ZW5lc3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGF0YS1jb252ZXJ0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQUszQyxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUU3QixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBRXRDLENBQUM7SUFDRCxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJO1FBQzFCLElBQUksSUFBSSxDQUFDO1FBQ1QsSUFBSTtZQUNBLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxJQUFJLFFBQVEsRUFBRTtnQkFDNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0gsSUFBSSxHQUFHLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQUMsV0FBSztZQUNILElBQUksR0FBRyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCO1FBQ3ZDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLElBQUk7WUFDQSxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQzFFLElBQUksSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3BCLE9BQU8sa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2FBQ3BDO1lBQ0QsT0FBTyxrQkFBa0IsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQzFDO1FBQUMsV0FBSztZQUNILE9BQU8sR0FBRyxDQUFDO1NBQ2Q7SUFDTCxDQUFDO0NBQ0osQ0FBQTs7WUE5QmlDLFFBQVE7OztBQUY3QixvQkFBb0I7SUFIaEMsVUFBVSxDQUFDO1FBQ1IsVUFBVSxFQUFFLE1BQU07S0FDckIsQ0FBQztHQUNXLG9CQUFvQixDQWdDaEM7U0FoQ1ksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFDb252ZXJ0ZXJTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb252ZXJ0VG9EYXRhKGtleSwgdmFsdWUsIHNlbGYpIHtcclxuICAgICAgICBsZXQgZGF0YTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoKHR5cGVvZiB2YWx1ZSkgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaHtcclxuICAgICAgICAgICAgZGF0YSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmW2tleV0gPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRyYW5zZm9ybWVkRGF0ZShfZGF0ZSwgZm9ybWF0V2l0aG91dFllYXIpIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKF9kYXRlKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNmb3JtZWREYXRlU3RyID0gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZGF0ZSwgZm9ybWF0V2l0aG91dFllYXIpO1xyXG4gICAgICAgICAgICBsZXQgeWVhciA9ICcnICsgZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICBpZiAofnllYXIuaW5kZXhPZignLScpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWREYXRlU3RyICsgeWVhcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWREYXRlU3RyICsgJy0nICsgeWVhcjtcclxuICAgICAgICB9IGNhdGNoe1xyXG4gICAgICAgICAgICByZXR1cm4gJy0nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==