var ACTIONS = {
    HEAD_COUNT_ANALYSIS: 'head_count_analysis',
    PAYROLL_ANALYSIS: 'payroll_analysis',
    FTE_WAGE_REDUCE: 'fte_wage_reduced'
};
var ForgivenessModel = /** @class */ (function () {
    function ForgivenessModel(params) {
        var _this = this;
        Object.keys(params).forEach(function (key) {
            _this[key] = params[key];
            if (key !== 'action') {
                _this[key] = params[key] && !isNaN(+params[key]) ? +params[key] : 0;
            }
        });
    }
    Object.defineProperty(ForgivenessModel.prototype, "calculateCommonParams", {
        get: function () {
            return ((this.payroll_cost + this.utilities + this.office_rent + this.additional_benefits + this.mortgage_interest) - this.existing_eidl);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForgivenessModel.prototype, "percentLeftOfFte", {
        get: function () {
            // tslint:disable-next-line: radix
            var percent = (parseFloat(((this.no_of_fte / this.no_of_fte_precovid) * 100).toString()) / 100);
            if (isNaN(percent)) {
                return 0;
            }
            if (parseFloat(percent.toFixed(2)) > 1) {
                return 1;
            }
            return percent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForgivenessModel.prototype, "actualPercentLeftOfFte", {
        get: function () {
            return Math.round((parseFloat(this.percentLeftOfFte.toFixed(2))) * 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForgivenessModel.prototype, "loanForgiveness", {
        get: function () {
            switch (this.action) {
                case ACTIONS.HEAD_COUNT_ANALYSIS: return this.calculateHeadCountAnalysis();
                case ACTIONS.PAYROLL_ANALYSIS: return this.calculatePayrollAnalysis();
                case ACTIONS.FTE_WAGE_REDUCE: return this.calculateFTEWageReduce();
            }
        },
        enumerable: true,
        configurable: true
    });
    ForgivenessModel.prototype.calculateHeadCountAnalysis = function () {
        // tslint:disable-next-line: max-line-length
        // Loan Forgiveness = 	[(8 week covered payroll + Utilities + Rent + Mortgage interest) - (EIDL Amount)] * Percentage of FTE left in 8 week covered period
        return (this.calculateCommonParams * this.percentLeftOfFte);
    };
    ForgivenessModel.prototype.calculatePayrollAnalysis = function () {
        // tslint:disable-next-line: max-line-length
        // Loan Forgiveness = 	[(8 week covered payroll + Utilities + Rent + Mortgage interest) - (EIDL Amount)] - Total of Over 25% pay cut amount in employees salary in 8 week covered period
        var calcultedAmount = this.calculateCommonParams - this.pay_cut_amount;
        return calcultedAmount < this.loan_amount ? calcultedAmount : this.loan_amount;
    };
    ForgivenessModel.prototype.calculateFTEWageReduce = function () {
        // tslint:disable-next-line: max-line-length
        // Loan Forgiveness  = [(8 week covered payroll + Utilities + Rent + Mortgage interest) - (EIDL Amount) * Percentage of FTE left in 8 week covered period] - Total of Over 25% pay cut amount in emplyees salary in 8 week covered period
        var calcultedAmount = ((this.calculateCommonParams * this.percentLeftOfFte) - this.pay_cut_amount);
        return calcultedAmount < this.loan_amount ? calcultedAmount : this.loan_amount;
    };
    return ForgivenessModel;
}());
export { ForgivenessModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ2l2ZW5lc3MubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2FuLWZvcmdpdmVuZXNzLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbG9hbi1mb3JnaXYtY2FsYy9mb3JnaXZlbmVzcy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhQSxJQUFNLE9BQU8sR0FBRztJQUNaLG1CQUFtQixFQUFFLHFCQUFxQjtJQUMxQyxnQkFBZ0IsRUFBRSxrQkFBa0I7SUFDcEMsZUFBZSxFQUFFLGtCQUFrQjtDQUN0QyxDQUFDO0FBRUY7SUFZSSwwQkFBWSxNQUFvQjtRQUFoQyxpQkFRQztRQU5HLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUM1QixLQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLElBQUksR0FBRyxLQUFLLFFBQVEsRUFBRTtnQkFDbEIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RFO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsc0JBQUksbURBQXFCO2FBQXpCO1lBQ0ksT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5SSxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDhDQUFnQjthQUFwQjtZQUNJLGtDQUFrQztZQUNsQyxJQUFNLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2xHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNoQixPQUFPLENBQUMsQ0FBQzthQUNaO1lBQ0QsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDcEMsT0FBTyxDQUFDLENBQUM7YUFDWjtZQUVELE9BQU8sT0FBTyxDQUFBO1FBQ2xCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksb0RBQXNCO2FBQTFCO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVFLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNkNBQWU7YUFBbkI7WUFDSSxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pCLEtBQUssT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztnQkFFM0UsS0FBSyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2dCQUV0RSxLQUFLLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2FBQ3RFO1FBQ0wsQ0FBQzs7O09BQUE7SUFFRCxxREFBMEIsR0FBMUI7UUFDSSw0Q0FBNEM7UUFDNUMsMEpBQTBKO1FBQzFKLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELG1EQUF3QixHQUF4QjtRQUNJLDRDQUE0QztRQUM1Qyx3TEFBd0w7UUFDeEwsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDekUsT0FBTyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ25GLENBQUM7SUFFRCxpREFBc0IsR0FBdEI7UUFDSSw0Q0FBNEM7UUFDNUMseU9BQXlPO1FBQ3pPLElBQU0sZUFBZSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3JHLE9BQU8sZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUNuRixDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBeEVELElBd0VDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJRm9yZ2l2ZW5lc3Mge1xyXG4gICAgcGF5cm9sbF9jb3N0OiBudW1iZXI7XHJcbiAgICBtb3J0Z2FnZV9pbnRlcmVzdDogbnVtYmVyO1xyXG4gICAgb2ZmaWNlX3JlbnQ6IG51bWJlcjtcclxuICAgIHV0aWxpdGllczogbnVtYmVyO1xyXG4gICAgZXhpc3RpbmdfZWlkbDogbnVtYmVyO1xyXG4gICAgbm9fb2ZfZnRlPzogbnVtYmVyO1xyXG4gICAgbm9fb2ZfZnRlX3ByZWNvdmlkPzogbnVtYmVyO1xyXG4gICAgcGF5X2N1dF9hbW91bnQ/OiBudW1iZXI7XHJcbiAgICBhY3Rpb246IHN0cmluZztcclxuICAgIGxvYW5fYW1vdW50OiBudW1iZXI7XHJcbn1cclxuXHJcbmNvbnN0IEFDVElPTlMgPSB7XHJcbiAgICBIRUFEX0NPVU5UX0FOQUxZU0lTOiAnaGVhZF9jb3VudF9hbmFseXNpcycsXHJcbiAgICBQQVlST0xMX0FOQUxZU0lTOiAncGF5cm9sbF9hbmFseXNpcycsXHJcbiAgICBGVEVfV0FHRV9SRURVQ0U6ICdmdGVfd2FnZV9yZWR1Y2VkJ1xyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcmdpdmVuZXNzTW9kZWwge1xyXG4gICAgcGF5cm9sbF9jb3N0OiBudW1iZXI7XHJcbiAgICBtb3J0Z2FnZV9pbnRlcmVzdDogbnVtYmVyO1xyXG4gICAgb2ZmaWNlX3JlbnQ6IG51bWJlcjtcclxuICAgIHV0aWxpdGllczogbnVtYmVyO1xyXG4gICAgZXhpc3RpbmdfZWlkbDogbnVtYmVyO1xyXG4gICAgbm9fb2ZfZnRlPzogbnVtYmVyO1xyXG4gICAgbm9fb2ZfZnRlX3ByZWNvdmlkPzogbnVtYmVyO1xyXG4gICAgcGF5X2N1dF9hbW91bnQ/OiBudW1iZXI7XHJcbiAgICBhY3Rpb246IHN0cmluZztcclxuICAgIGxvYW5fYW1vdW50OiBudW1iZXI7XHJcbiAgICBhZGRpdGlvbmFsX2JlbmVmaXRzOm51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogSUZvcmdpdmVuZXNzKSB7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IHBhcmFtc1trZXldO1xyXG4gICAgICAgICAgICBpZiAoa2V5ICE9PSAnYWN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gcGFyYW1zW2tleV0gJiYgIWlzTmFOKCtwYXJhbXNba2V5XSkgPyArcGFyYW1zW2tleV0gOiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNhbGN1bGF0ZUNvbW1vblBhcmFtcygpIHtcclxuICAgICAgICByZXR1cm4gKCh0aGlzLnBheXJvbGxfY29zdCArIHRoaXMudXRpbGl0aWVzICsgdGhpcy5vZmZpY2VfcmVudCArIHRoaXMuYWRkaXRpb25hbF9iZW5lZml0cyArIHRoaXMubW9ydGdhZ2VfaW50ZXJlc3QpIC0gdGhpcy5leGlzdGluZ19laWRsKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGVyY2VudExlZnRPZkZ0ZSgpIHtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHJhZGl4XHJcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IChwYXJzZUZsb2F0KCgodGhpcy5ub19vZl9mdGUgLyB0aGlzLm5vX29mX2Z0ZV9wcmVjb3ZpZCkgKiAxMDApLnRvU3RyaW5nKCkpIC8gMTAwKTtcclxuICAgICAgICBpZiAoaXNOYU4ocGVyY2VudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJzZUZsb2F0KHBlcmNlbnQudG9GaXhlZCgyKSkgPiAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBlcmNlbnRcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWN0dWFsUGVyY2VudExlZnRPZkZ0ZSgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgocGFyc2VGbG9hdCh0aGlzLnBlcmNlbnRMZWZ0T2ZGdGUudG9GaXhlZCgyKSkpICogMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbG9hbkZvcmdpdmVuZXNzKCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5hY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBBQ1RJT05TLkhFQURfQ09VTlRfQU5BTFlTSVM6IHJldHVybiB0aGlzLmNhbGN1bGF0ZUhlYWRDb3VudEFuYWx5c2lzKCk7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEFDVElPTlMuUEFZUk9MTF9BTkFMWVNJUzogcmV0dXJuIHRoaXMuY2FsY3VsYXRlUGF5cm9sbEFuYWx5c2lzKCk7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEFDVElPTlMuRlRFX1dBR0VfUkVEVUNFOiByZXR1cm4gdGhpcy5jYWxjdWxhdGVGVEVXYWdlUmVkdWNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZUhlYWRDb3VudEFuYWx5c2lzKCkge1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgLy8gTG9hbiBGb3JnaXZlbmVzcyA9IFx0Wyg4IHdlZWsgY292ZXJlZCBwYXlyb2xsICsgVXRpbGl0aWVzICsgUmVudCArIE1vcnRnYWdlIGludGVyZXN0KSAtIChFSURMIEFtb3VudCldICogUGVyY2VudGFnZSBvZiBGVEUgbGVmdCBpbiA4IHdlZWsgY292ZXJlZCBwZXJpb2RcclxuICAgICAgICByZXR1cm4gKHRoaXMuY2FsY3VsYXRlQ29tbW9uUGFyYW1zICogdGhpcy5wZXJjZW50TGVmdE9mRnRlKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGVQYXlyb2xsQW5hbHlzaXMoKSB7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcclxuICAgICAgICAvLyBMb2FuIEZvcmdpdmVuZXNzID0gXHRbKDggd2VlayBjb3ZlcmVkIHBheXJvbGwgKyBVdGlsaXRpZXMgKyBSZW50ICsgTW9ydGdhZ2UgaW50ZXJlc3QpIC0gKEVJREwgQW1vdW50KV0gLSBUb3RhbCBvZiBPdmVyIDI1JSBwYXkgY3V0IGFtb3VudCBpbiBlbXBsb3llZXMgc2FsYXJ5IGluIDggd2VlayBjb3ZlcmVkIHBlcmlvZFxyXG4gICAgICAgIGNvbnN0IGNhbGN1bHRlZEFtb3VudCA9IHRoaXMuY2FsY3VsYXRlQ29tbW9uUGFyYW1zIC0gdGhpcy5wYXlfY3V0X2Ftb3VudDtcclxuICAgICAgICByZXR1cm4gY2FsY3VsdGVkQW1vdW50IDwgdGhpcy5sb2FuX2Ftb3VudCA/IGNhbGN1bHRlZEFtb3VudCA6IHRoaXMubG9hbl9hbW91bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlRlRFV2FnZVJlZHVjZSgpIHtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxyXG4gICAgICAgIC8vIExvYW4gRm9yZ2l2ZW5lc3MgID0gWyg4IHdlZWsgY292ZXJlZCBwYXlyb2xsICsgVXRpbGl0aWVzICsgUmVudCArIE1vcnRnYWdlIGludGVyZXN0KSAtIChFSURMIEFtb3VudCkgKiBQZXJjZW50YWdlIG9mIEZURSBsZWZ0IGluIDggd2VlayBjb3ZlcmVkIHBlcmlvZF0gLSBUb3RhbCBvZiBPdmVyIDI1JSBwYXkgY3V0IGFtb3VudCBpbiBlbXBseWVlcyBzYWxhcnkgaW4gOCB3ZWVrIGNvdmVyZWQgcGVyaW9kXHJcbiAgICAgICAgY29uc3QgY2FsY3VsdGVkQW1vdW50ID0gKCh0aGlzLmNhbGN1bGF0ZUNvbW1vblBhcmFtcyAqIHRoaXMucGVyY2VudExlZnRPZkZ0ZSkgLSB0aGlzLnBheV9jdXRfYW1vdW50KTtcclxuICAgICAgICByZXR1cm4gY2FsY3VsdGVkQW1vdW50IDwgdGhpcy5sb2FuX2Ftb3VudCA/IGNhbGN1bHRlZEFtb3VudCA6IHRoaXMubG9hbl9hbW91bnQ7XHJcbiAgICB9XHJcbn0iXX0=