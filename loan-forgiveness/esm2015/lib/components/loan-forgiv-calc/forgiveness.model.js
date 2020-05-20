const ACTIONS = {
    HEAD_COUNT_ANALYSIS: 'head_count_analysis',
    PAYROLL_ANALYSIS: 'payroll_analysis',
    FTE_WAGE_REDUCE: 'fte_wage_reduced'
};
export class ForgivenessModel {
    constructor(params) {
        Object.keys(params).forEach((key) => {
            this[key] = params[key];
            if (key !== 'action') {
                this[key] = params[key] && !isNaN(+params[key]) ? +params[key] : 0;
            }
        });
    }
    get calculateCommonParams() {
        return ((this.payroll_cost + this.utilities + this.office_rent + this.additional_benefits + this.mortgage_interest) - this.existing_eidl);
    }
    get percentLeftOfFte() {
        // tslint:disable-next-line: radix
        const percent = (parseFloat(((this.no_of_fte / this.no_of_fte_precovid) * 100).toString()) / 100);
        if (isNaN(percent)) {
            return 0;
        }
        if (parseFloat(percent.toFixed(2)) > 1) {
            return 1;
        }
        return percent;
    }
    get actualPercentLeftOfFte() {
        return Math.round((parseFloat(this.percentLeftOfFte.toFixed(2))) * 100);
    }
    get loanForgiveness() {
        switch (this.action) {
            case ACTIONS.HEAD_COUNT_ANALYSIS: return this.calculateHeadCountAnalysis();
            case ACTIONS.PAYROLL_ANALYSIS: return this.calculatePayrollAnalysis();
            case ACTIONS.FTE_WAGE_REDUCE: return this.calculateFTEWageReduce();
        }
    }
    calculateHeadCountAnalysis() {
        // tslint:disable-next-line: max-line-length
        // Loan Forgiveness = 	[(8 week covered payroll + Utilities + Rent + Mortgage interest) - (EIDL Amount)] * Percentage of FTE left in 8 week covered period
        return (this.calculateCommonParams * this.percentLeftOfFte);
    }
    calculatePayrollAnalysis() {
        // tslint:disable-next-line: max-line-length
        // Loan Forgiveness = 	[(8 week covered payroll + Utilities + Rent + Mortgage interest) - (EIDL Amount)] - Total of Over 25% pay cut amount in employees salary in 8 week covered period
        const calcultedAmount = this.calculateCommonParams - this.pay_cut_amount;
        return calcultedAmount < this.loan_amount ? calcultedAmount : this.loan_amount;
    }
    calculateFTEWageReduce() {
        // tslint:disable-next-line: max-line-length
        // Loan Forgiveness  = [(8 week covered payroll + Utilities + Rent + Mortgage interest) - (EIDL Amount) * Percentage of FTE left in 8 week covered period] - Total of Over 25% pay cut amount in emplyees salary in 8 week covered period
        const calcultedAmount = ((this.calculateCommonParams * this.percentLeftOfFte) - this.pay_cut_amount);
        return calcultedAmount < this.loan_amount ? calcultedAmount : this.loan_amount;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ2l2ZW5lc3MubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2FuLWZvcmdpdmVuZXNzLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbG9hbi1mb3JnaXYtY2FsYy9mb3JnaXZlbmVzcy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhQSxNQUFNLE9BQU8sR0FBRztJQUNaLG1CQUFtQixFQUFFLHFCQUFxQjtJQUMxQyxnQkFBZ0IsRUFBRSxrQkFBa0I7SUFDcEMsZUFBZSxFQUFFLGtCQUFrQjtDQUN0QyxDQUFDO0FBRUYsTUFBTSxPQUFPLGdCQUFnQjtJQVl6QixZQUFZLE1BQW9CO1FBRTVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLEdBQUcsS0FBSyxRQUFRLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0RTtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQUkscUJBQXFCO1FBQ3JCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDOUksQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2hCLGtDQUFrQztRQUNsQyxNQUFNLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2xHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7UUFDRCxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7UUFFRCxPQUFPLE9BQU8sQ0FBQTtJQUNsQixDQUFDO0lBRUQsSUFBSSxzQkFBc0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDZixRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDakIsS0FBSyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1lBRTNFLEtBQUssT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUV0RSxLQUFLLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQ3RFO0lBQ0wsQ0FBQztJQUVELDBCQUEwQjtRQUN0Qiw0Q0FBNEM7UUFDNUMsMEpBQTBKO1FBQzFKLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELHdCQUF3QjtRQUNwQiw0Q0FBNEM7UUFDNUMsd0xBQXdMO1FBQ3hMLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3pFLE9BQU8sZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUNuRixDQUFDO0lBRUQsc0JBQXNCO1FBQ2xCLDRDQUE0QztRQUM1Qyx5T0FBeU87UUFDek8sTUFBTSxlQUFlLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckcsT0FBTyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ25GLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSUZvcmdpdmVuZXNzIHtcclxuICAgIHBheXJvbGxfY29zdDogbnVtYmVyO1xyXG4gICAgbW9ydGdhZ2VfaW50ZXJlc3Q6IG51bWJlcjtcclxuICAgIG9mZmljZV9yZW50OiBudW1iZXI7XHJcbiAgICB1dGlsaXRpZXM6IG51bWJlcjtcclxuICAgIGV4aXN0aW5nX2VpZGw6IG51bWJlcjtcclxuICAgIG5vX29mX2Z0ZT86IG51bWJlcjtcclxuICAgIG5vX29mX2Z0ZV9wcmVjb3ZpZD86IG51bWJlcjtcclxuICAgIHBheV9jdXRfYW1vdW50PzogbnVtYmVyO1xyXG4gICAgYWN0aW9uOiBzdHJpbmc7XHJcbiAgICBsb2FuX2Ftb3VudDogbnVtYmVyO1xyXG59XHJcblxyXG5jb25zdCBBQ1RJT05TID0ge1xyXG4gICAgSEVBRF9DT1VOVF9BTkFMWVNJUzogJ2hlYWRfY291bnRfYW5hbHlzaXMnLFxyXG4gICAgUEFZUk9MTF9BTkFMWVNJUzogJ3BheXJvbGxfYW5hbHlzaXMnLFxyXG4gICAgRlRFX1dBR0VfUkVEVUNFOiAnZnRlX3dhZ2VfcmVkdWNlZCdcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JnaXZlbmVzc01vZGVsIHtcclxuICAgIHBheXJvbGxfY29zdDogbnVtYmVyO1xyXG4gICAgbW9ydGdhZ2VfaW50ZXJlc3Q6IG51bWJlcjtcclxuICAgIG9mZmljZV9yZW50OiBudW1iZXI7XHJcbiAgICB1dGlsaXRpZXM6IG51bWJlcjtcclxuICAgIGV4aXN0aW5nX2VpZGw6IG51bWJlcjtcclxuICAgIG5vX29mX2Z0ZT86IG51bWJlcjtcclxuICAgIG5vX29mX2Z0ZV9wcmVjb3ZpZD86IG51bWJlcjtcclxuICAgIHBheV9jdXRfYW1vdW50PzogbnVtYmVyO1xyXG4gICAgYWN0aW9uOiBzdHJpbmc7XHJcbiAgICBsb2FuX2Ftb3VudDogbnVtYmVyO1xyXG4gICAgYWRkaXRpb25hbF9iZW5lZml0czpudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IElGb3JnaXZlbmVzcykge1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcclxuICAgICAgICAgICAgaWYgKGtleSAhPT0gJ2FjdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHBhcmFtc1trZXldICYmICFpc05hTigrcGFyYW1zW2tleV0pID8gK3BhcmFtc1trZXldIDogMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYWxjdWxhdGVDb21tb25QYXJhbXMoKSB7XHJcbiAgICAgICAgcmV0dXJuICgodGhpcy5wYXlyb2xsX2Nvc3QgKyB0aGlzLnV0aWxpdGllcyArIHRoaXMub2ZmaWNlX3JlbnQgKyB0aGlzLmFkZGl0aW9uYWxfYmVuZWZpdHMgKyB0aGlzLm1vcnRnYWdlX2ludGVyZXN0KSAtIHRoaXMuZXhpc3RpbmdfZWlkbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBlcmNlbnRMZWZ0T2ZGdGUoKSB7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiByYWRpeFxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSAocGFyc2VGbG9hdCgoKHRoaXMubm9fb2ZfZnRlIC8gdGhpcy5ub19vZl9mdGVfcHJlY292aWQpICogMTAwKS50b1N0cmluZygpKSAvIDEwMCk7XHJcbiAgICAgICAgaWYgKGlzTmFOKHBlcmNlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyc2VGbG9hdChwZXJjZW50LnRvRml4ZWQoMikpID4gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwZXJjZW50XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFjdHVhbFBlcmNlbnRMZWZ0T2ZGdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoKHBhcnNlRmxvYXQodGhpcy5wZXJjZW50TGVmdE9mRnRlLnRvRml4ZWQoMikpKSAqIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxvYW5Gb3JnaXZlbmVzcygpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQUNUSU9OUy5IRUFEX0NPVU5UX0FOQUxZU0lTOiByZXR1cm4gdGhpcy5jYWxjdWxhdGVIZWFkQ291bnRBbmFseXNpcygpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBBQ1RJT05TLlBBWVJPTExfQU5BTFlTSVM6IHJldHVybiB0aGlzLmNhbGN1bGF0ZVBheXJvbGxBbmFseXNpcygpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBBQ1RJT05TLkZURV9XQUdFX1JFRFVDRTogcmV0dXJuIHRoaXMuY2FsY3VsYXRlRlRFV2FnZVJlZHVjZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGVIZWFkQ291bnRBbmFseXNpcygpIHtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxyXG4gICAgICAgIC8vIExvYW4gRm9yZ2l2ZW5lc3MgPSBcdFsoOCB3ZWVrIGNvdmVyZWQgcGF5cm9sbCArIFV0aWxpdGllcyArIFJlbnQgKyBNb3J0Z2FnZSBpbnRlcmVzdCkgLSAoRUlETCBBbW91bnQpXSAqIFBlcmNlbnRhZ2Ugb2YgRlRFIGxlZnQgaW4gOCB3ZWVrIGNvdmVyZWQgcGVyaW9kXHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmNhbGN1bGF0ZUNvbW1vblBhcmFtcyAqIHRoaXMucGVyY2VudExlZnRPZkZ0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlUGF5cm9sbEFuYWx5c2lzKCkge1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgLy8gTG9hbiBGb3JnaXZlbmVzcyA9IFx0Wyg4IHdlZWsgY292ZXJlZCBwYXlyb2xsICsgVXRpbGl0aWVzICsgUmVudCArIE1vcnRnYWdlIGludGVyZXN0KSAtIChFSURMIEFtb3VudCldIC0gVG90YWwgb2YgT3ZlciAyNSUgcGF5IGN1dCBhbW91bnQgaW4gZW1wbG95ZWVzIHNhbGFyeSBpbiA4IHdlZWsgY292ZXJlZCBwZXJpb2RcclxuICAgICAgICBjb25zdCBjYWxjdWx0ZWRBbW91bnQgPSB0aGlzLmNhbGN1bGF0ZUNvbW1vblBhcmFtcyAtIHRoaXMucGF5X2N1dF9hbW91bnQ7XHJcbiAgICAgICAgcmV0dXJuIGNhbGN1bHRlZEFtb3VudCA8IHRoaXMubG9hbl9hbW91bnQgPyBjYWxjdWx0ZWRBbW91bnQgOiB0aGlzLmxvYW5fYW1vdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZUZURVdhZ2VSZWR1Y2UoKSB7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcclxuICAgICAgICAvLyBMb2FuIEZvcmdpdmVuZXNzICA9IFsoOCB3ZWVrIGNvdmVyZWQgcGF5cm9sbCArIFV0aWxpdGllcyArIFJlbnQgKyBNb3J0Z2FnZSBpbnRlcmVzdCkgLSAoRUlETCBBbW91bnQpICogUGVyY2VudGFnZSBvZiBGVEUgbGVmdCBpbiA4IHdlZWsgY292ZXJlZCBwZXJpb2RdIC0gVG90YWwgb2YgT3ZlciAyNSUgcGF5IGN1dCBhbW91bnQgaW4gZW1wbHllZXMgc2FsYXJ5IGluIDggd2VlayBjb3ZlcmVkIHBlcmlvZFxyXG4gICAgICAgIGNvbnN0IGNhbGN1bHRlZEFtb3VudCA9ICgodGhpcy5jYWxjdWxhdGVDb21tb25QYXJhbXMgKiB0aGlzLnBlcmNlbnRMZWZ0T2ZGdGUpIC0gdGhpcy5wYXlfY3V0X2Ftb3VudCk7XHJcbiAgICAgICAgcmV0dXJuIGNhbGN1bHRlZEFtb3VudCA8IHRoaXMubG9hbl9hbW91bnQgPyBjYWxjdWx0ZWRBbW91bnQgOiB0aGlzLmxvYW5fYW1vdW50O1xyXG4gICAgfVxyXG59Il19