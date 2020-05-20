import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable, EventEmitter, Input, Output, Component, NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

const ACTIONS = {
    HEAD_COUNT_ANALYSIS: 'head_count_analysis',
    PAYROLL_ANALYSIS: 'payroll_analysis',
    FTE_WAGE_REDUCE: 'fte_wage_reduced'
};
class ForgivenessModel {
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

const defaultConfigStyle = {
    'el_period_chooser': {
        'classes': ['rpanel1'],
        'el_title': { 'classes': ["fs18", "fwsb", "pt-3"] },
        'el_radio_items_wrapper': { 'classes': ['choosRadio', 'pt-3'] },
        'el_radio_item_wrapper': { 'classes': ['md-radio', 'md-radio-inline', 'm-0'] },
        'el_radio_item_label': { 'classes': ['form-check-label', 'bt', 'fwsb'] },
        'el_radio_item_input': { 'classes': ['form-check-input'] },
        'el_end_date_wrapper': { 'classes': ['pt-3'] },
        'el_end_date_label': { 'classes': ['fs14', 'd-inline'] },
        'el_end_date_span': { 'classes': ['fs14', 'fwsb'] },
        'el_calc_img_wrapper': { 'classes': ['clcimg'] },
        'el_calc_img': { 'classes': [] }
    },
    'el_calc_form': {
        'classes': ['rpanel2'],
        'el_form': { 'classes': [] },
        'el_period_chooser_title': { 'classes': ['fs18 fwsb pt-3'] },
        'el_period_label_wrapper': { 'classes': ['pt-3', 'pb-3'] },
        'el_period_start_label': { 'classes': ['fs14', 'd-inline', 'pr-5'] },
        'el_period_start_val': { 'classes': ['fs14', 'fwsb'] },
        'el_period_end_label': { 'classes': ['fs14', 'd-inline'] },
        'el_period_end_val': { 'classes': ['fs14', 'fwsb'] },
        'el_form_inner_wrapper': { 'classes': ['rightBluebg', 'formCalc'] },
        'el_form_title_wrap': { 'classes': ['px-4', 'pt-4'] },
        'el_form_title': { 'classes': ['fs18', 'fwsb'] },
        'el_controls_wrap': { 'classes': ['px-4'] },
        'el_payroll_cost': {
            'classes': ['row', 'pt-4', 'mb-5', 'firstRow'],
            'label_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'label': { 'classes': ['payrolTitle', 'pt-2'] },
            'control_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'control': { 'classes': ['form-group', 'mb-2'] },
            'control_label': { 'classes': ['sr-only'] },
            'control_input': { 'classes': ['form-control'] },
            'error_wrapper': { 'classes': ['error-msg'] },
            'error_label': { 'classes': ['error'] }
        },
        'el_bnk_acnt': {
            'title': { 'classes': ['bstext', 'fs12', 'fwsb', 'pb-4'] }
        },
        'el_mortgage_interest': {
            'classes': ['row'],
            'label_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'label': { 'classes': ['fs14', 'pt-1'] },
            'control_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'control': { 'classes': ['form-group'] },
            'control_label': { 'classes': ['sr-only'] },
            'control_input': { 'classes': ['form-control'] },
            'error_wrapper': { 'classes': ['error-msg'] },
            'error_label': { 'classes': ['error'] }
        },
        'el_office_rent': {
            'classes': ['row'],
            'label_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'label': { 'classes': ['fs14', 'pt-1'] },
            'control_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'control': { 'classes': ['form-group'] },
            'control_label': { 'classes': ['sr-only'] },
            'control_input': { 'classes': ['form-control'] },
            'error_wrapper': { 'classes': ['error-msg'] },
            'error_label': { 'classes': ['error'] }
        },
        'el_utilities': {
            'classes': ['row'],
            'label_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'label': { 'classes': ['fs14', 'pt-1'] },
            'control_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'control': { 'classes': ['form-group'] },
            'control_label': { 'classes': ['sr-only'] },
            'control_input': { 'classes': ['form-control'] },
            'error_wrapper': { 'classes': ['error-msg'] },
            'error_label': { 'classes': ['error'] },
            'tool_tip_wrap': { 'classes': ['info', 'ml-2'] },
            'tool_tip_anch': { 'classes': [] },
            'tool_tip_img': { 'classes': ['info-i'] }
        },
        "el_existing_eidl": {
            'classes': ['row'],
            'label_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'label': { 'classes': ['fs14', 'pt-1'] },
            'label_span': { 'classes': ['d-inline-block', 'pt-2'] },
            'control_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'control': { 'classes': ['form-group'] },
            'control_label': { 'classes': ['sr-only'] },
            'control_input': { 'classes': ['form-control'] },
            'error_wrapper': { 'classes': ['error-msg'] },
            'error_label': { 'classes': ['error'] },
            'tool_tip_wrap': { 'classes': ['info', 'ml-2'] },
            'tool_tip_anch': { 'classes': [] },
            'etran_btn': { 'classes': ['btn', 'btn-secondary', 'px-3', 'float-right'] },
            'tool_tip_img': { 'classes': ['info-i'] }
        },
        "el_additional_benefits": {
            'classes': ['row'],
            'label_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'label': { 'classes': ['fs14', 'pt-1'] },
            'label_span': { 'classes': ['d-inline-block', 'pt-2'] },
            'control_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'control': { 'classes': ['form-group'] },
            'control_label': { 'classes': ['sr-only'] },
            'control_input': { 'classes': ['form-control'] },
            'error_wrapper': { 'classes': ['error-msg'] },
            'error_label': { 'classes': ['error'] },
            'tool_tip_wrap': { 'classes': ['info', 'ml-2'] },
            'tool_tip_anch': { 'classes': [] },
            'tool_tip_img': { 'classes': ['info-i'] }
        },
        "el_non_payroll_cost_in_excess_of_25": {
            'classes': ['row'],
            'label_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'label': { 'classes': ['fs14', 'pt-1'] },
            'control_wrapper': { 'classes': ['col-12', 'col-lg-6'] },
            'control': { 'classes': ['form-group'] },
            'control_label': { 'classes': ['sr-only'] },
            'control_input': { 'classes': ['form-control'] },
            'error_wrapper': { 'classes': ['error-msg'] },
            'error_label': { 'classes': ['error'] }
        },
        "el_action": {
            "classes": ['row'],
            "action_type": {
                'classes': ['form-group', 'col-12', 'pt-3'],
                'title': { 'classes': ['fs18', 'fwsb', 'mb-0'] },
                'inputs_wrapper': { 'classes': ['row'] },
                'head_count_input_wrp': { 'classes': ['col-4', 'form-check', 'md-radio', 'pl-3'] },
                'head_count_input': { 'classes': ['form-check-input'] },
                'head_count_label': { 'classes': ['form-label', 'm-0', 'fs14', 'fwsb'] },
                'payroll_analysis_wrp': { 'classes': ['col-4', 'form-check', 'md-radio'] },
                'payroll_analysis_input': { 'classes': ['form-input', 'mr-1'] },
                'payroll_analysis_label': { 'classes': ['form-label', 'm-0', 'fs14', 'fwsb'] },
                'fte_wage_reduced_wrp': { 'classes': ['col-4', 'form-check', 'md-radio'] },
                'fte_wage_reduced_input': { 'classes': ['form-check-input'] },
                'fte_wage_reduced_label': { 'classes': ['form-label', 'm-0', 'fs14', 'fwsb', 'pr-0'] }
            },
            "no_of_fte_precovid": {
                'classes': ['row'],
                'label': { 'classes': ['fs14', 'pt-1'] },
                'control_wrapper': { 'classes': ['col-6'] },
                'control': { 'classes': ['form-group'] },
                'control_label': { 'classes': ['fs14'] },
                'control_input': { 'classes': ['form-control'] }
            },
            "el_no_of_fte": {
                'classes': ['row'],
                'label': { 'classes': ['fs14'] },
                'control_wrapper': { 'classes': ['col-6'] },
                'control': { 'classes': ['form-group'] },
                'control_label': { 'classes': ['fs14'] },
                'control_input': { 'classes': ['form-control'] },
                'error_wrapper': { 'classes': ['error-msg'] },
                'error_label': { 'classes': ['error'] }
            },
            "el_pay_cut_amount": {
                'classes': ['row'],
                'label': { 'classes': ['fs14'] },
                'control_wrapper': { 'classes': ['col-6'] },
                'control': { 'classes': ['form-group'] },
                'control_label': { 'classes': ['fs14'] },
                'control_input': { 'classes': ['form-control'] },
                'error_wrapper': { 'classes': ['error-msg'] },
                'error_label': { 'classes': ['error'] },
                'tool_tip_wrap': { 'classes': ['info', 'ml-2'] },
                'tool_tip_anch': { 'classes': [] },
                'tool_tip_img': { 'classes': ['info-i'] }
            }
        },
        "el_result": {
            "classes": ['botBlue'],
            "wrapper": { 'classes': ['row'] },
            "icon_wrapper": { 'classes': ['col-2'] },
            "icon": { 'classes': ['Fundiconimg'] },
            "values_wrapper": { 'classes': ['col-10'] },
            "percent_wrapper": { 'classes': ['row'] },
            "percent_label_wrp": { 'classes': ['col-6', 'text-left'] },
            "percent_label": { 'classes': ['fs20', 'wt'] },
            "percent_value_wrp": { 'classes': ['col-6', 'text-left'] },
            "percent_value": { 'classes': ['fs36', 'wt'] },
            "forgiven_wrapper": { 'classes': ['row', 'py-4'] },
            "forgiven_label_wrp": { 'classes': ['col-6', 'text-left'] },
            "forgiven_label": { 'classes': ['fs20', 'wt', 'fwsb'] },
            "forgiven_value_wrp": { 'classes': ['col-6', 'text-left'] },
            "forgiven_value": { 'classes': ['fs36', 'wt', 'fwsb'] },
            "payback_wrapper": { 'classes': ['row'] },
            "payback_label_wrp": { 'classes': ['col-6', 'text-left'] },
            "payback_label": { 'classes': ['fs20', 'wt', 'fwsb'] },
            "payback_value_wrp": { 'classes': ['col-6', 'text-left'] },
            "payback_value": { 'classes': ['fs36', 'wt', 'fwsb'] }
        },
        "btn_submit": {
            'classes': { 'classes': ['row', 'py-3'] },
            'wrapper': { 'classes': ['col', 'text-right'] },
            'button': { 'classes': ['rounded', 'btn', 'btn-success', 'saveButton'] }
        }
    }
};

const defaultConfigLabel = {
    choose_period_title: "Choose covered period start date for Forgiveness",
    covered_period_title: "Covered period for Forgiveness",
    start_date_label: "Start Date:",
    end_date_label: "End Date:",
    forgiv_form_title: "Forgiveness computations",
    fogiv_form_subtitle: "Connect with bank account to get non payroll costs",
    etran_btn_label: "Pull from E-Tran",
    req_field_label: "This field is required",
    action_title: "Estimate how much of your Paycheck Protection Program (PPP) loan is forgivable.",
    head_count_label: "Headcount analysis",
    payroll_reduc_label: "Payroll reduction analysis",
    reduc_plus_analy_label: "Headcount + Payroll reduction analysis",
    fte_pre_covid_label: "Number of FTE in Pre-Covid 19 Period",
    fte_cover_period_label: "Number of FTE in covered Period",
    pay_cut_label: "Total of Over 25% pay cut amount in employees salary",
    perc_fte_left_label: "Percentage of FTE left in covered period",
    amt_forgiven_label: "Total loan amount forgiven",
    amt_payback_label: "Loan amount to payback",
    submit_label: "Save & Submit"
};

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
DataConverterService.ɵprov = ɵɵdefineInjectable({ factory: function DataConverterService_Factory() { return new DataConverterService(ɵɵinject(DatePipe)); }, token: DataConverterService, providedIn: "root" });
DataConverterService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DataConverterService);

let LoanForgivCalcComponent = class LoanForgivCalcComponent {
    constructor(dataConverterService) {
        this.dataConverterService = dataConverterService;
        this.onSubmitEventEmit = new EventEmitter();
        this.onPeriodSelected = new EventEmitter();
        this.onPullETrans = new EventEmitter();
        this.percent = 0;
        this.max_non_payroll_sum = 0;
        this.controls_config = [];
        this.defaulPeriodDates = ['May-01-2020', 'May-16-2020'];
        this.calcImgSvg = '';
        this.infoIconSvg = '';
    }
    ngAfterViewChecked() {
        $('[data-toggle="popover"]').popover();
    }
    ngOnInit() {
        this.controls_config = this.getControlsConfg();
        if (!this.styleConfig || (typeof this.styleConfig) != "object") {
            this.styleConfig = defaultConfigStyle;
        }
        if (!this.labelConfig || (typeof this.labelConfig) != "object") {
            this.labelConfig = defaultConfigLabel;
        }
        if (!this.covered_periods_start || (typeof this.covered_periods_start) != "object") {
            this.covered_periods_start = this.defaulPeriodDates;
        }
        this.buildForm();
        this.updateResultValues(this.form.getRawValue());
    }
    ngOnChanges(simpleChanges) {
        this.convertAllObjects(simpleChanges);
        this.buildForm();
        if (simpleChanges.result && simpleChanges.result.currentValue) {
            if (this.result.disabled) {
                this.disableForm();
            }
            else {
                this.onFormChanges();
            }
            if (this.result.loan_forgiven_amount) {
                this.loanForgiven = this.result.loan_forgiven_amount;
            }
            if (this.result.percentage_of_fte) {
                this.percent = this.result.percentage_of_fte;
            }
        }
        if (simpleChanges.form_data && simpleChanges.form_data.currentValue) {
            this.setFormValues(this.form_data);
        }
        if (simpleChanges.payroll_source_data && simpleChanges.payroll_source_data.currentValue) {
            this.setFormValues(this.payroll_source_data);
        }
        if (simpleChanges.offer_data && simpleChanges.offer_data.currentValue) {
            let offer_data = this.offer_data;
            if (offer_data.loan_amount) {
                this.max_non_payroll_sum = +((+offer_data.loan_amount) * 0.25).toFixed(2);
            }
        }
        if (simpleChanges.styleConfig) {
            if (!simpleChanges.styleConfig.currentValue || (typeof this.styleConfig) != "object") {
                this.styleConfig = defaultConfigStyle;
            }
        }
        if (simpleChanges.labelConfig) {
            if (!simpleChanges.labelConfig.currentValue || (typeof this.labelConfig) != "object") {
                this.labelConfig = defaultConfigLabel;
            }
        }
        if (simpleChanges.covered_periods_start) {
            if (!simpleChanges.covered_periods_start.currentValue) {
                this.covered_periods_start = this.defaulPeriodDates;
            }
        }
    }
    convertAllObjects(simpleChanges) {
        for (let key in simpleChanges) {
            if (simpleChanges[key] && simpleChanges[key].currentValue) {
                this.dataConverterService.convertToData(key, simpleChanges[key].currentValue, this);
            }
        }
    }
    buildForm() {
        if (this.form) {
            return;
        }
        this.form = new FormGroup({
            start_date: new FormControl('', [Validators.required]),
            end_date: new FormControl('', [Validators.required]),
            payroll_cost: new FormControl('', [Validators.required]),
            mortgage_interest: new FormControl('', [Validators.required]),
            office_rent: new FormControl('', [Validators.required]),
            utilities: new FormControl('', [Validators.required]),
            existing_eidl: new FormControl('', [Validators.required]),
            additional_benefits: new FormControl('', [Validators.required]),
            non_payroll_cost_in_excess_of_25: new FormControl({ value: 0, disabled: true }),
            no_of_fte: new FormControl('', [Validators.required]),
            no_of_fte_precovid: new FormControl({ value: '', disabled: true }, [Validators.required]),
            pay_cut_amount: new FormControl(''),
            action: new FormControl('head_count_analysis', [Validators.required])
        });
    }
    onFormChanges() {
        this.form.get('no_of_fte_precovid').setValue(this.offer_data.no_of_employees);
        if (this.formChangeSubs) {
            return;
        }
        if (this.result && !this.result.disabled) {
            this.startDateChangeSubs = this.form.get('start_date').valueChanges.subscribe((start_date) => {
                let end_date = this.get8WeekAhead(start_date);
                let end_date_string = this.dataConverterService.getTransformedDate(end_date, 'MMMM-dd');
                let start_date_string = this.dataConverterService.getTransformedDate(start_date, 'MMMM-dd');
                this.onPeriodSelected.emit({ start_date: start_date_string, end_date: end_date_string });
                this.form.get('end_date').setValue(end_date_string, { onlySelf: true, emitEvent: false });
                this.form.get('start_date').setValue(start_date_string, { onlySelf: true, emitEvent: false });
            });
            this.formChangeSubs = this.form.valueChanges.subscribe((values) => {
                if (this.offer_data && this.offer_data.no_of_employees) {
                    values.no_of_fte_precovid = this.offer_data.no_of_employees;
                }
                if (this.offer_data.loan_amount) {
                    values.loan_amount = this.offer_data.loan_amount;
                }
                this.updateExcessNonPyrlOf25();
                if (values.action == 'payroll_analysis') {
                    if (values.no_of_fte) {
                        this.form.get('no_of_fte').reset();
                    }
                    this.form.get('no_of_fte').clearValidators();
                    if (this.form.get('no_of_fte').invalid)
                        this.form.get('no_of_fte').updateValueAndValidity();
                }
                else {
                    this.form.get('no_of_fte').setValidators([Validators.required]);
                }
                if (values.action == 'head_count_analysis') {
                    if (values.pay_cut_amount) {
                        this.form.get('pay_cut_amount').reset();
                    }
                    this.form.get('pay_cut_amount').clearValidators();
                    if (this.form.get('pay_cut_amount').invalid)
                        this.form.get('pay_cut_amount').updateValueAndValidity();
                }
                else {
                    this.form.get('pay_cut_amount').setValidators([Validators.required]);
                }
                this.updateResultValues(values);
            });
        }
    }
    updateResultValues(values) {
        if (!this.result || this.result.disabled) {
            return;
        }
        const forgivenessModel = new ForgivenessModel(Object.assign(Object.assign({}, values), { action: this.form.get('action').value }));
        this.loanForgiven = forgivenessModel.loanForgiveness;
        this.percent = forgivenessModel.actualPercentLeftOfFte;
    }
    updateExcessNonPyrlOf25() {
        let controlNames = ['mortgage_interest', 'office_rent', 'utilities'];
        let non_payroll_sum = 0;
        for (let controlName of controlNames) {
            if (this.form.get(controlName)) {
                non_payroll_sum += (+this.form.get(controlName).value);
            }
        }
        let extra_amount = 0;
        if (non_payroll_sum > this.max_non_payroll_sum) {
            extra_amount = (+(non_payroll_sum - this.max_non_payroll_sum).toFixed(2));
        }
        if (extra_amount != +this.form.get('non_payroll_cost_in_excess_of_25').value) {
            this.form.get('non_payroll_cost_in_excess_of_25').setValue(extra_amount, {
                onlySelf: true
            });
        }
    }
    setFormValues(values) {
        let _values = {};
        for (let key in values) {
            if ((typeof values[key]) == 'number') {
                _values[key] = '' + values[key];
            }
            else {
                _values[key] = values[key];
            }
        }
        this.form.patchValue(Object.assign({}, _values));
    }
    disableForm() {
        if (this.form) {
            this.form.disable();
        }
        if (this.formChangeSubs) {
            this.formChangeSubs.unsubscribe();
        }
    }
    resetForm() {
        this.form.get('mortgage_interest').reset();
        this.form.get('office_rent').reset();
        this.form.get('utilities').reset();
        this.form.get('existing_eidl').reset();
        this.form.get('non_payroll_cost_in_excess_of_25').reset();
        this.form.get('no_of_fte').reset();
        this.form.get('pay_cut_amount').reset();
        this.form.get('action').setValue('head_count_analysis');
    }
    onPullFromEtrans() {
        this.onPullETrans.emit();
    }
    onSubmit() {
        if (!this.result || this.result.disabled) {
            return;
        }
        if (!this.form.invalid) {
            let loan_forgiven_amount = (this.loanForgiven !== undefined ? this.loanForgiven : 0);
            let percent = this.percent;
            let loan_amount_to_payback = ((loan_forgiven_amount == 0 || loan_forgiven_amount) && this.offer_data.loan_amount ? this.offer_data.loan_amount - loan_forgiven_amount : 0);
            if (loan_forgiven_amount < 0 || loan_amount_to_payback < 0) {
                this.onSubmitEventEmit.emit({ error: { invalid_loan_forgiven_amount: loan_forgiven_amount, invalid_loan_amount_to_payback: loan_amount_to_payback } });
            }
            else {
                this.onSubmitEventEmit.emit({ form_data: this.form.getRawValue(), result: { loan_forgiven_amount, percent, loan_amount_to_payback } });
            }
        }
        else {
            this.validateAllFormFields(this.form);
        }
    }
    /**
  * function to validate form fields
  * @param fields: formfields array
  * @param form: Formgroup object
  * @param validateArr: array to validate
  */
    validateAllFormFields(formGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            control.markAsTouched({ onlySelf: true });
        });
        const formGroupInvalid = document.body.querySelectorAll('input.ng-invalid');
        formGroupInvalid[0].focus();
    }
    get8WeekAhead(dateString) {
        let date;
        date = new Date(dateString);
        date.setDate(date.getDate() + 8 * 7);
        return date;
    }
    getControlsConfg() {
        return [
            { is_group: false, control_name: 'payroll_cost', el_name: 'el_payroll_cost', label: 'Pay roll costs', label_info: '(during covered period)', placeholder: 'Pay roll costs', titleBold: true },
            {
                is_group: true, el_name: 'el_bnk_acnt', label: 'Connect with bank account to get non payroll costs', control_name: 'el_sources',
                controls: [
                    { is_group: false, control_name: 'mortgage_interest', el_name: 'el_mortgage_interest', label: 'Mortgage interest payment', label_info: '(during covered period)', placeholder: 'Mortgage Interest' },
                    { is_group: false, control_name: 'office_rent', el_name: 'el_office_rent', label: 'Office rent paid', label_info: '(during covered period)', placeholder: 'Office Rent' },
                    {
                        is_group: false, control_name: 'utilities', el_name: 'el_utilities', label: 'Utilities paid', label_info: '(during covered period)', placeholder: 'Utilities',
                        tooltip: {
                            isHtml: false,
                            data_content: 'Including Gas, electricity and water, telephone and internet including mobile, transportation including fuel, and vehicle related costs'
                        }
                    }
                ]
            },
            {
                is_group: false, control_name: 'existing_eidl', el_name: 'el_existing_eidl', label: 'Existing EIDL limit', placeholder: 'Existing EIDL limit', showETran: true,
                tooltip: {
                    isHtml: false,
                    data_content: 'If Economic Injury Disaster Loan (EIDL) advance grant is taken for Covid 19 between Jan 31 2020 and April 3 2020 then this amount will be reduced from forgiveness amount'
                }
            },
            {
                is_group: false, control_name: 'additional_benefits', el_name: 'el_additional_benefits', label: 'Additional benefits', placeholder: 'Additional benefits',
                tooltip: {
                    isHtml: true,
                    data_content: `<ul>
            <li>Payments for provision of Group Healthcare benefits</li>
            <li>Payment of Retirement benefits</li>
            <li>Payment of insurance premium in benefit of employee</li>
          </ul>`
                }
            },
            {
                is_group: false, control_name: 'non_payroll_cost_in_excess_of_25', el_name: 'el_non_payroll_cost_in_excess_of_25',
                label: 'Non Payroll Cost in Excess of 25%', placeholder: 'Non Payroll Cost in Excess of 25%', error_message: 'Sum of Non-Payroll costs is more than 25% of PPP Loan Amount'
            }
        ];
    }
    getTransformedDate(val, format) {
        return this.dataConverterService.getTransformedDate(val, format);
    }
    ngOnDestroy() {
        if (this.formChangeSubs) {
            this.formChangeSubs.unsubscribe();
        }
        if (this.startDateChangeSubs) {
            this.startDateChangeSubs.unsubscribe();
        }
    }
};
LoanForgivCalcComponent.ctorParameters = () => [
    { type: DataConverterService }
];
__decorate([
    Input('covered_periods_start')
], LoanForgivCalcComponent.prototype, "covered_periods_start", void 0);
__decorate([
    Input('form_data')
], LoanForgivCalcComponent.prototype, "form_data", void 0);
__decorate([
    Input('payroll_source_data')
], LoanForgivCalcComponent.prototype, "payroll_source_data", void 0);
__decorate([
    Input('offer_data')
], LoanForgivCalcComponent.prototype, "offer_data", void 0);
__decorate([
    Input('result')
], LoanForgivCalcComponent.prototype, "result", void 0);
__decorate([
    Input('etrans_pulled')
], LoanForgivCalcComponent.prototype, "etrans_pulled", void 0);
__decorate([
    Input('style_config')
], LoanForgivCalcComponent.prototype, "styleConfig", void 0);
__decorate([
    Input('label_config')
], LoanForgivCalcComponent.prototype, "labelConfig", void 0);
__decorate([
    Output('onsubmit')
], LoanForgivCalcComponent.prototype, "onSubmitEventEmit", void 0);
__decorate([
    Output('onperiodselected')
], LoanForgivCalcComponent.prototype, "onPeriodSelected", void 0);
__decorate([
    Output('onpulletrans')
], LoanForgivCalcComponent.prototype, "onPullETrans", void 0);
LoanForgivCalcComponent = __decorate([
    Component({
        selector: 'rubicon-loan-forgiv-calc, [rubicon-loan-forgiv-calc]',
        template: "<ng-template #calcImgSvgTemp>\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"400\" viewBox=\"0 0 400 400\">\r\n        <path fill=\"#DFEFFA\" fill-rule=\"evenodd\"\r\n            d=\"M166.98 0c11.071 0 20.029 8.951 20.029 19.99v6.675h82.928L354 110.581v102.763h-13.363v-93.345H260.49V39.992H187.01V206.67c0 11.04-8.958 20.002-20.029 20.002H60.107v160.002h280.53v-80.007H354V400H46.755V226.67H20.039C8.957 226.67 0 217.709 0 206.67V19.99C0 8.952 8.957 0 20.04 0zM153.5 240c36.7.044 66.456 29.8 66.5 66.5 0 36.734-29.777 66.5-66.5 66.5S87 343.234 87 306.5c0-36.723 29.777-66.5 66.5-66.5zm212.251-27.345c7.944-7.54 20.434-7.54 28.366 0 7.844 7.794 7.844 20.434 0 28.24L279.483 354.998c-.568.544-1.226.998-1.939 1.33l-35.073 16.067c-2.53 1.153-5.538.632-7.51-1.342-1.972-1.973-2.518-4.956-1.359-7.484l16.155-34.893c.323-.72.78-1.364 1.337-1.918zM153.5 253.315c-29.378 0-53.207 23.807-53.207 53.185 0 29.4 23.829 53.207 53.207 53.207 29.356-.034 53.162-23.829 53.196-53.207 0-29.378-23.818-53.184-53.196-53.184zm193.377-3.073L261.4 335.329l-8.066 17.43 17.514-8.028 85.5-85.076-9.47-9.413zM160.133 267v7.33c11.534 2.198 19.867 9.872 19.867 19.344h-13.256c0-2.732-5.154-6.674-13.244-6.674s-13.256 3.942-13.256 6.674c0 2.72 5.166 6.663 13.256 6.663 14.867 0 26.5 8.773 26.5 20 0 9.473-8.333 17.157-19.867 19.323V347h-13.266v-7.34C135.333 337.483 127 329.798 127 320.337h13.244c0 2.72 5.166 6.674 13.256 6.674s13.244-3.953 13.244-6.674c0-2.72-5.154-6.674-13.244-6.674-14.867 0-26.5-8.773-26.5-19.989 0-9.495 8.333-17.157 19.867-19.345V267h13.266zm200.916-30.85l-4.69 4.656 9.47 9.403 4.68-4.657-9.46-9.402zm23.631-14.115c-2.64-2.517-6.796-2.517-9.447 0l-4.736 4.701 9.46 9.425 4.723-4.713c2.608-2.594 2.608-6.807 0-9.413zM227 220v13h-13v-13h13zm93 0v13h-80v-13h80zM166.98 13.338H20.04c-3.695 0-6.688 2.977-6.688 6.653v186.678c0 3.676 2.993 6.675 6.687 6.675H166.98c3.694 0 6.676-2.999 6.676-6.675V19.991c0-3.676-2.982-6.653-6.676-6.653zM99.663 167c7.363 0 13.337 5.963 13.337 13.326v13.337c0 7.351-5.974 13.337-13.337 13.337H86.337C78.974 207 73 201.014 73 193.663v-13.337C73 172.963 78.974 167 86.337 167zm46.993 0c7.36 0 13.344 5.963 13.344 13.326v13.337c0 7.351-5.984 13.337-13.344 13.337h-13.323c-7.36 0-13.333-5.986-13.333-13.337v-13.337c0-7.363 5.973-13.326 13.333-13.326zm-92.997 0C61.024 167 67 172.963 67 180.326v13.337C67 201.014 61.024 207 53.66 207H40.33C32.965 207 27 201.014 27 193.663v-13.337C27 172.963 32.965 167 40.33 167zM320 194v13h-80v-13h80zm-93 0v13h-13v-13h13zM53.66 180.326H40.33v13.337h13.33v-13.337zm92.996 0h-13.323v13.337h13.323v-13.337zm-46.993 0H86.337v13.337h13.326v-13.337zM227 167v13h-13v-13h13zm93 0v13h-80v-13h80zM99.663 120c7.363 0 13.337 5.965 13.337 13.33v13.34c0 7.365-5.974 13.33-13.337 13.33H86.337C78.974 160 73 154.035 73 146.67v-13.34c0-7.365 5.974-13.33 13.337-13.33zm-46.004 0C61.024 120 67 125.965 67 133.33v13.34c0 7.365-5.976 13.33-13.34 13.33H40.33C32.965 160 27 154.035 27 146.67v-13.34c0-7.365 5.965-13.33 13.33-13.33zm92.997 0c7.36 0 13.344 5.965 13.344 13.33v13.34c0 7.365-5.984 13.33-13.344 13.33h-13.323c-7.36 0-13.333-5.965-13.333-13.33v-13.34c0-7.365 5.973-13.33 13.333-13.33zM227 140v13h-13v-13h13zm93 0v13h-80v-13h80zm-266.34-6.67H40.33v13.34h13.33v-13.34zm46.003 0H86.337v13.34h13.326v-13.34zm46.993 0h-13.323v13.34h13.323v-13.34zM53.659 73C61.024 73 67 78.965 67 86.33v13.34c0 7.365-5.976 13.33-13.34 13.33H40.33C32.965 113 27 107.035 27 99.67V86.33C27 78.965 32.965 73 40.33 73zm46.004 0C107.026 73 113 78.965 113 86.33v13.34c0 7.365-5.974 13.33-13.337 13.33H86.337C78.974 113 73 107.035 73 99.67V86.33C73 78.965 78.974 73 86.337 73zm46.993 0C154.016 73 160 78.965 160 86.33v13.34c0 7.365-5.984 13.33-13.344 13.33h-13.323c-7.36 0-13.333-5.965-13.333-13.33V86.33c0-7.365 5.973-13.33 13.333-13.33zm127.186-23.568v57.229h57.348l-57.348-57.229zM53.66 86.33H40.33v13.34h13.33V86.33zm46.004 0H86.337v13.34h13.326V86.33zm46.993 0h-13.323v13.34h13.323V86.33zM167 20v47H20V20h147zm-13.358 13.433H33.358v20.145h120.284V33.433z\" />\r\n    </svg>\r\n</ng-template>\r\n<ng-template #infoIconSvgTmp>\r\n    <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\"\r\n        y=\"0px\" width=\"16px\" height=\"16px\" viewBox=\"-16.2 12.2 30 30\" style=\"enable-background:new -16.2 12.2 30 30;\"\r\n        xml:space=\"preserve\">\r\n        <style type=\"text/css\">\r\n            .st0 {\r\n                fill: #3498db;\r\n            }\r\n        </style>\r\n        <g>\r\n            <path class=\"st0\"\r\n                d=\"M-1.2,12.2c-8.3,0-15,6.7-15,15s6.7,15,15,15s15-6.7,15-15S7.1,12.2-1.2,12.2z M1.9,35.4   c-0.8,0.3-1.4,0.5-1.8,0.7c-0.5,0.2-1,0.2-1.6,0.2c-0.9,0-1.7-0.2-2.2-0.7c-0.5-0.5-0.8-1-0.8-1.7c0-0.3,0-0.6,0.1-0.8   c0-0.3,0.1-0.6,0.2-1l1-3.4c0.1-0.3,0.2-0.6,0.2-0.9C-3,27.5-3,27.2-3,27c0-0.4-0.1-0.7-0.3-0.9c-0.2-0.2-0.5-0.3-1-0.3   c-0.2,0-0.5,0-0.8,0.1c-0.3,0.1-0.5,0.2-0.7,0.2l0.3-1.1c0.6-0.3,1.2-0.5,1.8-0.7c0.6-0.2,1.1-0.3,1.6-0.3c0.9,0,1.6,0.2,2.1,0.7   c0.5,0.4,0.8,1,0.8,1.7c0,0.1,0,0.4-0.1,0.8c0,0.4-0.1,0.7-0.2,1l-1,3.4c-0.1,0.3-0.1,0.6-0.2,0.9c-0.1,0.3-0.1,0.6-0.1,0.8   c0,0.5,0.1,0.8,0.3,0.9c0.2,0.2,0.6,0.2,1.1,0.2c0.2,0,0.5,0,0.8-0.1c0.3-0.1,0.5-0.2,0.6-0.2L1.9,35.4z M1.8,21.6   c-0.4,0.4-1,0.6-1.6,0.6c-0.6,0-1.2-0.2-1.6-0.6c-0.4-0.4-0.7-0.9-0.7-1.5c0-0.6,0.2-1.1,0.7-1.5c0.5-0.4,1-0.6,1.6-0.6   c0.6,0,1.2,0.2,1.6,0.6c0.4,0.4,0.7,0.9,0.7,1.5C2.4,20.7,2.2,21.2,1.8,21.6z\" />\r\n        </g>\r\n    </svg>\r\n</ng-template>\r\n<ng-template #fundIconSvgTmp>\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"78\" height=\"88\" viewBox=\"0 0 78 88\">\r\n        <path fill=\"#FFF\" d=\"M2.234 58.745l11.419.314c.795.022 1.421.684 1.4 1.48l-.067 2.4c5.42-2.84 11.887-2.846 17.312-.018l1.06.549c1.466.757 3.084 1.175 4.732 1.222l10.414.286c3.287.093 6.275 1.936 7.832 4.833l11.28-5.33c3.47-1.745 7.7-.457 9.607 2.927.375.664.168 1.504-.472 1.918L51.067 85.939c-.057.038-.117.07-.179.099-2.518 1.156-5.256 1.753-8.026 1.751-1.308.001-2.613-.133-3.893-.401-.032-.007-.063-.014-.094-.023l-17.714-4.972c-1.272-.36-2.634-.211-3.798.415l-2.967 1.589-.033 1.199c-.02.78-.66 1.4-1.44 1.4h-.039l-11.419-.314c-.795-.022-1.421-.684-1.4-1.48l.69-25.057c.022-.796.684-1.422 1.479-1.4zm28.74 6.733c-5.116-2.666-11.277-2.337-16.08.858l-.406 14.746 1.516-.812c1.819-.978 3.947-1.21 5.936-.649l17.666 4.96c3.363.686 6.857.297 9.985-1.115l24.283-15.709c-1.35-1.25-3.334-1.527-4.975-.696l-.034.016-11.57 5.467c.11.615.157 1.242.14 1.868-.022.779-.66 1.4-1.44 1.4h-.04l-17.118-.47c-.794-.023-1.422-.685-1.4-1.48.023-.795.684-1.422 1.48-1.4l15.511.428c-.593-2.866-3.077-4.948-6.002-5.033l-10.414-.286c-2.084-.06-4.126-.588-5.978-1.544zm-27.38-3.815l-.61 22.18 8.54.235.61-22.18-8.54-.235zM39.637 19.17c11.532 0 20.881 9.348 20.881 20.881s-9.349 20.881-20.881 20.881c-11.533 0-20.882-9.348-20.882-20.881.014-11.527 9.355-20.869 20.882-20.881zm0 2.88c-9.938.01-17.99 8.064-18.002 18.001 0 9.942 8.06 18.001 18.002 18.001 9.942 0 18.001-8.059 18.001-18.001 0-9.942-8.06-18.001-18.001-18.001zm-.18 4.411c.795 0 1.44.645 1.44 1.44v1.31c2.847.601 4.885 3.11 4.89 6.02 0 .795-.646 1.44-1.44 1.44-.796 0-1.44-.645-1.44-1.44 0-1.806-1.465-3.27-3.27-3.27-1.806 0-3.27 1.464-3.27 3.27s1.464 3.27 3.27 3.27c3.15 0 5.79 2.382 6.115 5.516.324 3.133-1.772 6.006-4.855 6.651v1.353c0 .795-.645 1.44-1.44 1.44-.796 0-1.44-.645-1.44-1.44v-1.44c-2.672-.733-4.526-3.16-4.53-5.932 0-.795.645-1.44 1.44-1.44.795 0 1.44.645 1.44 1.44.003 1.66 1.247 3.055 2.896 3.247.164-.025.33-.019.493.017 1.78-.065 3.181-1.544 3.148-3.325-.032-1.781-1.486-3.208-3.267-3.208-3.08 0-5.686-2.278-6.095-5.331-.41-3.053 1.503-5.938 4.475-6.75V27.9c0-.795.644-1.44 1.44-1.44zM39.637 0c.795 0 1.44.645 1.44 1.44v13.68c0 .795-.645 1.44-1.44 1.44-.796 0-1.44-.645-1.44-1.44V1.44c0-.795.644-1.44 1.44-1.44zm10.8 7.2c.795 0 1.44.645 1.44 1.44v6.48c0 .795-.645 1.44-1.44 1.44-.796 0-1.44-.645-1.44-1.44V8.64c0-.795.644-1.44 1.44-1.44zm-21.6 0c.795 0 1.44.645 1.44 1.44v6.48c0 .795-.645 1.44-1.44 1.44-.796 0-1.44-.645-1.44-1.44V8.64c0-.795.644-1.44 1.44-1.44z\"/>\r\n    </svg>\r\n</ng-template>\r\n<ng-container *ngIf=\"form && result\">\r\n    <div [attr.el_name]=\"'el_period_chooser'\" [ngStyle]=\"styleConfig?.el_period_chooser?.styles\"\r\n        [ngClass]=\"styleConfig?.el_period_chooser?.classes\" *ngIf=\"!form.get('start_date').value && !form.disabled\">\r\n        <div [attr.el_name]=\"'el_period_chooser.el_title'\" [ngStyle]=\"styleConfig?.el_period_chooser?.el_title?.styles\"\r\n            [ngClass]=\"styleConfig?.el_period_chooser?.el_title?.classes\">{{labelConfig?.choose_period_title}}</div>\r\n        <div [attr.el_name]=\"'el_period_chooser.el_radio_items_wrapper'\"\r\n            [ngStyle]=\"styleConfig?.el_period_chooser?.el_radio_items_wrapper?.styles\"\r\n            [ngClass]=\"styleConfig?.el_period_chooser?.el_radio_items_wrapper?.classes\">\r\n            <div [attr.el_name]=\"'el_period_chooser.el_radio_item_wrapper'\"\r\n                [ngStyle]=\"styleConfig?.el_period_chooser?.el_radio_item_wrapper?.styles\"\r\n                [ngClass]=\"styleConfig?.el_period_chooser?.el_radio_item_wrapper?.classes\"\r\n                *ngFor=\"let start_date_val of covered_periods_start;let i=index;\">\r\n                <input [attr.el_name]=\"'el_period_chooser.el_radio_item_input'\"\r\n                    [ngStyle]=\"styleConfig?.el_period_chooser?.el_radio_item_input?.styles\"\r\n                    [ngClass]=\"styleConfig?.el_period_chooser?.el_radio_item_input?.classes\" type=\"radio\"\r\n                    name=\"covered_start_date\" [attr.id]=\"'covered_start_date'+(i+1)\"\r\n                    [formControl]=\"form.get('start_date')\" [value]=\"start_date_val\">\r\n                <label [attr.el_name]=\"'el_period_chooser.el_radio_item_label'\"\r\n                    [ngStyle]=\"styleConfig?.el_period_chooser?.el_radio_item_label?.styles\"\r\n                    [ngClass]=\"styleConfig?.el_period_chooser?.el_radio_item_label?.classes\"\r\n                    [attr.for]=\"'covered_start_date'+(i+1)\">{{ getTransformedDate(start_date_val, 'dd-MMMM') }}</label>\r\n            </div>\r\n        </div>\r\n        <div [attr.el_name]=\"'el_period_chooser.el_end_date_wrapper'\"\r\n            [ngStyle]=\"styleConfig?.el_period_chooser?.el_end_date_wrapper?.styles\"\r\n            [ngClass]=\"styleConfig?.el_period_chooser?.el_end_date_wrapper?.classes\" *ngIf=\"form.get('end_date').value\">\r\n            <div [attr.el_name]=\"'el_period_chooser.el_end_date_label'\"\r\n                [ngStyle]=\"styleConfig?.el_period_chooser?.el_end_date_label?.styles\"\r\n                [ngClass]=\"styleConfig?.el_period_chooser?.el_end_date_label?.classes\">{{labelConfig?.end_date_label}} <span\r\n                    [ngStyle]=\"styleConfig?.el_period_chooser?.el_end_date_span?.styles\"\r\n                    [ngClass]=\"styleConfig?.el_period_chooser?.el_end_date_span?.classes\">{{ getTransformedDate(form.get('end_date').value, 'dd-MMMM') }}</span>\r\n            </div>\r\n        </div>\r\n        <div [attr.el_name]=\"'el_period_chooser.el_calc_img_wrapper'\"\r\n            [ngStyle]=\"styleConfig?.el_period_chooser?.el_calc_img_wrapper?.styles\"\r\n            [ngClass]=\"styleConfig?.el_period_chooser?.el_calc_img_wrapper?.classes\">\r\n            <ng-container *ngTemplateOutlet=\"calcImgSvgTemp\"></ng-container>\r\n        </div>\r\n    </div>\r\n    <div [attr.el_name]=\"'el_calc_form'\" [ngStyle]=\"styleConfig?.el_calc_form?.styles\"\r\n        [ngClass]=\"styleConfig?.el_calc_form?.classes\" *ngIf=\"form.get('end_date').value || form.disabled\">\r\n        <form [attr.el_name]=\"'el_calc_form.el_form'\" [ngStyle]=\"styleConfig?.el_calc_form?.el_form?.styles\"\r\n            [ngClass]=\"styleConfig?.el_calc_form?.el_form?.classes\" [formGroup]=\"form\">\r\n            <div [attr.el_name]=\"'el_calc_form.el_period_chooser_title'\"\r\n                [ngStyle]=\"styleConfig?.el_calc_form?.el_period_chooser_title?.styles\"\r\n                [ngClass]=\"styleConfig?.el_calc_form?.el_period_chooser_title?.classes\">{{ labelConfig?.covered_period_title }}\r\n            </div>\r\n            <div [attr.el_name]=\"'el_calc_form.el_period_label_wrapper'\"\r\n                [ngStyle]=\"styleConfig?.el_calc_form?.el_period_label_wrapper?.styles\"\r\n                [ngClass]=\"styleConfig?.el_calc_form?.el_period_label_wrapper?.classes\">\r\n                <div [attr.el_name]=\"'el_calc_form.el_period_start_label'\"\r\n                    [ngStyle]=\"styleConfig?.el_calc_form?.el_period_start_label?.styles\"\r\n                    [ngClass]=\"styleConfig?.el_calc_form?.el_period_start_label?.classes\">{{ labelConfig?.start_date_label }} <span\r\n                        [attr.el_name]=\"'el_calc_form.el_period_start_val'\"\r\n                        [ngStyle]=\"styleConfig?.el_calc_form?.el_period_start_val?.styles\"\r\n                        [ngClass]=\"styleConfig?.el_calc_form?.el_period_start_val?.classes\">\r\n                        {{ getTransformedDate(form.get('start_date').value, 'dd-MMMM') }}</span>\r\n                </div>\r\n                <div [attr.el_name]=\"'el_calc_form.el_period_end_label'\"\r\n                    [ngStyle]=\"styleConfig?.el_calc_form?.el_period_end_label?.styles\"\r\n                    [ngClass]=\"styleConfig?.el_calc_form?.el_period_end_label?.classes\">{{labelConfig?.end_date_label}} <span\r\n                        [attr.el_name]=\"'el_calc_form.el_period_end_val'\"\r\n                        [ngStyle]=\"styleConfig?.el_calc_form?.el_period_end_val?.styles\"\r\n                        [ngClass]=\"styleConfig?.el_calc_form?.el_period_end_val?.classes\">{{ getTransformedDate(form.get('end_date').value, 'dd-MMMM') }}</span>\r\n                </div>\r\n            </div>\r\n            <div [attr.el_name]=\"'el_calc_form.el_form_inner_wrapper'\"\r\n                [ngStyle]=\"styleConfig?.el_calc_form?.el_form_inner_wrapper?.styles\"\r\n                [ngClass]=\"styleConfig?.el_calc_form?.el_form_inner_wrapper?.classes\">\r\n                <div [attr.el_name]=\"'el_calc_form.el_form_title_wrap'\"\r\n                    [ngStyle]=\"styleConfig?.el_calc_form?.el_form_title_wrap?.styles\"\r\n                    [ngClass]=\"styleConfig?.el_calc_form?.el_form_title_wrap?.classes\">\r\n                    <div [attr.el_name]=\"'el_calc_form.el_form_title'\"\r\n                        [ngStyle]=\"styleConfig?.el_calc_form?.el_form_title?.styles\"\r\n                        [ngClass]=\"styleConfig?.el_calc_form?.el_form_title?.classes\">{{ labelConfig?.forgiv_form_title }}  </div>\r\n                </div>\r\n                <div [attr.el_name]=\"'el_calc_form.el_controls_wrap'\"\r\n                    [ngStyle]=\"styleConfig?.el_calc_form?.el_controls_wrap?.styles\"\r\n                    [ngClass]=\"styleConfig?.el_calc_form?.el_controls_wrap?.classes\">\r\n                    <ng-container *ngFor=\"let config of controls_config\" [ngSwitch]=\"config.is_group\">\r\n                        <div *ngSwitchCase=\"true\" [attr.el_name]=\"'el_calc_form.'+config.el_name\"\r\n                            [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.styles\"\r\n                            [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.classes\">\r\n                            <div *ngIf=\"config.label\" [attr.el_name]=\"'el_calc_form.'+config.el_name+'.title'\"\r\n                                [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.title?.styles\"\r\n                                [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.title?.classes\">{{ labelConfig?.fogiv_form_subtitle }}\r\n                            </div>\r\n                            <ng-container *ngFor=\"let config of config.controls\">\r\n                                <ng-container>\r\n                                    <div [attr.el_name]=\"'el_calc_form.'+config.el_name\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.classes\">\r\n                                        <div [attr.el_name]=\"'el_calc_form.'+config.el_name+'.label_wrapper'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.label_wrapper?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.label_wrapper?.classes\">\r\n                                            <div [attr.el_name]=\"'el_calc_form.'+config.el_name+'.label'\"\r\n                                                [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.label?.styles\"\r\n                                                [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.label?.classes\">\r\n                                                <span [attr.el_name]=\"'el_calc_form.'+config.el_name+'.label_span'\"\r\n                                                    [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.label_span?.styles\"\r\n                                                    [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.label_span?.classes\">{{config?.label}}</span>\r\n                                                <span *ngIf=\"config.tooltip\"\r\n                                                    [attr.el_name]=\"'el_calc_form.'+config.el_name+'.tool_tip_wrap'\"\r\n                                                    [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.tool_tip_wrap?.styles\"\r\n                                                    [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.tool_tip_wrap?.classes\">\r\n                                                    <a [attr.el_name]=\"'el_calc_form.'+config.el_name+'.tool_tip_anch'\"\r\n                                                        [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.tool_tip_anch?.styles\"\r\n                                                        [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.tool_tip_anch?.classes\"\r\n                                                        data-toggle=\"popover\" href=\"javscript:void()\"\r\n                                                        data-placement=\"right\" data-trigger=\"hover\"\r\n                                                        [attr.data-content]=\"config.tooltip.data_content\"\r\n                                                        data-original-title=\"\" title=\"\">\r\n                                                        <span [attr.el_name]=\"'el_calc_form.'+config.el_name+'.tool_tip_img'\"\r\n                                                        [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.tool_tip_img?.styles\"\r\n                                                        [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.tool_tip_img?.classes\">\r\n                                                            <ng-container *ngTemplateOutlet=\"infoIconSvgTmp\"></ng-container>\r\n                                                        </span>\r\n                                                        </a></span>\r\n                                                <ng-container *ngIf=\"config?.label_info\"><br /> {{config?.label_info}}\r\n                                                </ng-container>\r\n                                                <button *ngIf=\"config.showETran && !form.disabled && !etrans_pulled\"\r\n                                                    [attr.el_name]=\"'el_calc_form.'+config.el_name+'.etran_btn'\"\r\n                                                    [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.etran_btn?.styles\"\r\n                                                    [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.etran_btn?.classes\"\r\n                                                    class=\"btn btn-secondary px-3 float-right\"\r\n                                                    (click)=\"onPullFromEtrans()\">{{ labelConfig?.etran_btn_label }}\r\n                                                </button>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div [attr.el_name]=\"'el_calc_form.'+config.el_name+'.control_wrapper'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.control_wrapper?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.control_wrapper?.classes\">\r\n                                            <div [attr.el_name]=\"'el_calc_form.'+config.control_name+'.control'\"\r\n                                                [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.control?.styles\"\r\n                                                [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.control?.classes\">\r\n                                                <label [attr.el_name]=\"'el_calc_form.'+config.el_name+'.control_label'\"\r\n                                                    [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.control_label?.styles\"\r\n                                                    [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.control_label?.classes\"\r\n                                                    [attr.for]=\"config.control_name\">{{config?.label}}</label>\r\n                                                <input [attr.el_name]=\"'el_calc_form.'+config.el_name+'.control_input'\"\r\n                                                    [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.control_input?.styles\"\r\n                                                    [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.control_input?.classes\"\r\n                                                    [attr.id]=\"config.control_name\" [placeholder]=\"config.placeholder\"\r\n                                                    type=\"text\" [formControlName]=\"config.control_name\"\r\n                                                    mask=\"separator.2\" thousandSeparator=\",\" maxlength=\"19\"\r\n                                                    prefix=\"$ \" />\r\n                                                <div [attr.el_name]=\"'el_calc_form.'+config.el_name+'.error_wrapper'\"\r\n                                                    [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.error_wrapper?.styles\"\r\n                                                    [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.error_wrapper?.classes\"\r\n                                                    *ngIf=\"form.get(config.control_name).invalid && (form.get(config.control_name).dirty || form.get(config.control_name).touched)\">\r\n                                                    <label\r\n                                                        [attr.el_name]=\"'el_calc_form.'+config.el_name+'.error_label'\"\r\n                                                        [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.error_label?.styles\"\r\n                                                        [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.error_label?.classes\"\r\n                                                        *ngIf=\"form.get(config.control_name).hasError('required')\">\r\n                                                        {{ labelConfig?.req_field_label }}\r\n                                                    </label>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </ng-container>\r\n                            </ng-container>\r\n                        </div>\r\n                        <ng-container *ngSwitchCase=\"false\">\r\n                            <div *ngIf=\"(config.control_name == 'non_payroll_cost_in_excess_of_25' && form.get('non_payroll_cost_in_excess_of_25').value > 0) || config.control_name != 'non_payroll_cost_in_excess_of_25'\"\r\n                                [attr.el_name]=\"'el_calc_form.'+config.el_name\"\r\n                                [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.styles\"\r\n                                [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.classes\">\r\n                                <div [attr.el_name]=\"'el_calc_form.'+config.el_name+'.label_wrapper'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.label_wrapper?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.label_wrapper?.classes\">\r\n                                    <div [attr.el_name]=\"'el_calc_form.'+config.el_name+'.label'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.label?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.label?.classes\">\r\n                                        <b [attr.el_name]=\"'el_calc_form.'+config.el_name+'.label_span'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.label_span?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.label_span?.classes\"\r\n                                            *ngIf=\"config.titleBold\">{{config?.label}}</b>\r\n                                        <span *ngIf=\"!config.titleBold\"\r\n                                            [attr.el_name]=\"'el_calc_form.'+config.el_name+'.label_span'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.label_span?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.label_span?.classes\">{{config?.label}}</span>\r\n                                        <span *ngIf=\"config.tooltip\"\r\n                                            [attr.el_name]=\"'el_calc_form.'+config.el_name+'.tool_tip_wrap'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.tool_tip_wrap?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.tool_tip_wrap?.classes\">\r\n                                            <a [attr.el_name]=\"'el_calc_form.'+config.el_name+'.tool_tip_anch'\"\r\n                                                [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.tool_tip_anch?.styles\"\r\n                                                [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.tool_tip_anch?.classes\"\r\n                                                data-toggle=\"popover\" href=\"javscript:void()\" data-placement=\"right\"\r\n                                                [attr.data-html]=\"config.tooltip.isHtml\" data-trigger=\"hover\"\r\n                                                [attr.data-content]=\"config.tooltip.data_content\" data-original-title=\"\"\r\n                                                title=\"\">\r\n                                                <span [attr.el_name]=\"'el_calc_form.'+config.el_name+'.tool_tip_img'\"\r\n                                                [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.tool_tip_img?.styles\"\r\n                                                [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.tool_tip_img?.classes\">\r\n                                                    <ng-container *ngTemplateOutlet=\"infoIconSvgTmp\"></ng-container>\r\n                                                </span>\r\n                                            </a>\r\n                                        </span>\r\n                                        <ng-container *ngIf=\"config?.label_info\"><br /> {{config?.label_info}}\r\n                                        </ng-container>\r\n                                        <button *ngIf=\"config.showETran && !form.disabled && !etrans_pulled\"\r\n                                            [attr.el_name]=\"'el_calc_form.'+config.el_name+'.etran_btn'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.etran_btn?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.etran_btn?.classes\"\r\n                                            class=\"btn btn-secondary px-3 float-right\" (click)=\"onPullFromEtrans()\">{{labelConfig?.etran_btn_label}}\r\n                                        </button>\r\n                                    </div>\r\n                                </div>\r\n                                <div [attr.el_name]=\"'el_calc_form.'+config.el_name+'.control_wrapper'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.control_wrapper?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.control_wrapper?.classes\">\r\n                                    <div [attr.el_name]=\"'el_calc_form.'+config.control_name+'.control'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.control?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.control?.classes\">\r\n                                        <label [attr.el_name]=\"'el_calc_form.'+config.el_name+'.control_label'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.control_label?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.control_label?.classes\"\r\n                                            [attr.for]=\"config.control_name\">{{config?.label}}</label>\r\n                                        <input [attr.el_name]=\"'el_calc_form.'+config.el_name+'.control_input'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.control_input?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.control_input?.classes\"\r\n                                            [attr.id]=\"config.control_name\" type=\"text\"\r\n                                            [placeholder]=\"config.placeholder\" [formControlName]=\"config.control_name\"\r\n                                            mask=\"separator.2\" thousandSeparator=\",\" maxlength=\"19\" prefix=\"$ \" />\r\n                                        <div *ngIf=\"config.error_message && config.control_name == 'non_payroll_cost_in_excess_of_25'\"\r\n                                            [attr.el_name]=\"'el_calc_form.'+config.el_name+'.error_wrapper'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.error_wrapper?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.error_wrapper?.classes\">\r\n                                            <label [attr.el_name]=\"'el_calc_form.'+config.el_name+'.error_label'\"\r\n                                                [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.error_label?.styles\"\r\n                                                [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.error_label?.classes\">\r\n                                                {{config.error_message}}\r\n                                            </label>\r\n                                        </div>\r\n\r\n                                        <div [attr.el_name]=\"'el_calc_form.'+config.el_name+'.error_wrapper'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.error_wrapper?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.error_wrapper?.classes\"\r\n                                            *ngIf=\"form.get(config.control_name).invalid && (form.get(config.control_name).dirty || form.get(config.control_name).touched)\">\r\n                                            <label [attr.el_name]=\"'el_calc_form.'+config.el_name+'.error_label'\"\r\n                                                [ngStyle]=\"styleConfig?.el_calc_form[config.el_name]?.error_label?.styles\"\r\n                                                [ngClass]=\"styleConfig?.el_calc_form[config.el_name]?.error_label?.classes\"\r\n                                                *ngIf=\"form.get(config.control_name).hasError('required')\">\r\n                                                {{ labelConfig?.req_field_label }}\r\n                                            </label>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </ng-container>\r\n                    </ng-container>\r\n                    <div [attr.el_name]=\"'el_calc_form.el_action'\"\r\n                        [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.styles\"\r\n                        [ngClass]=\"styleConfig?.el_calc_form?.el_action?.classes\">\r\n                        <div [attr.el_name]=\"'el_calc_form.el_action.action_type'\"\r\n                            [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.action_type?.styles\"\r\n                            [ngClass]=\"styleConfig?.el_calc_form?.el_action?.action_type?.classes\">\r\n                            <h6 [attr.el_name]=\"'el_calc_form.el_action.action_type.title'\"\r\n                                [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.action_type?.title?.styles\"\r\n                                [ngClass]=\"styleConfig?.el_calc_form?.el_action?.action_type?.title?.classes\">{{ labelConfig?.action_title }}\r\n                            </h6>\r\n                            <div [attr.el_name]=\"'el_calc_form.el_action.action_type.inputs_wrapper'\"\r\n                                [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.action_type?.inputs_wrapper?.styles\"\r\n                                [ngClass]=\"styleConfig?.el_calc_form?.el_action?.action_type?.inputs_wrapper?.classes\">\r\n                                <div [attr.el_name]=\"'el_calc_form.el_action.action_type.head_count_input_wrp'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.action_type?.head_count_input_wrp?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_action?.action_type?.head_count_input_wrp?.classes\">\r\n                                    <input [attr.el_name]=\"'el_calc_form.el_action.action_type.head_count_input'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.action_type?.head_count_input?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_action?.action_type?.head_count_input?.classes\"\r\n                                        type=\"radio\" [formControlName]=\"'action'\" id=\"head_count_check\"\r\n                                        value=\"head_count_analysis\">\r\n                                    <label [attr.el_name]=\"'el_calc_form.el_action.action_type.head_count_label'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.action_type?.head_count_label?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_action?.action_type?.head_count_label?.classes\"\r\n                                        for=\"head_count_check\">{{ labelConfig?.head_count_label }}</label>\r\n                                </div>\r\n                                <div [attr.el_name]=\"'el_calc_form.el_action.action_type.payroll_analysis_wrp'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.action_type?.payroll_analysis_wrp?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_action?.action_type?.payroll_analysis_wrp?.classes\">\r\n                                    <input [attr.el_name]=\"'el_calc_form.el_action.action_type.payroll_analysis_input'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.action_type?.payroll_analysis_input?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_action?.action_type?.payroll_analysis_input?.classes\"\r\n                                        type=\"radio\" id=\"pyrl_reduc_check\" [formControlName]=\"'action'\"\r\n                                        value=\"payroll_analysis\">\r\n                                    <label [attr.el_name]=\"'el_calc_form.el_action.action_type.payroll_analysis_label'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.action_type?.payroll_analysis_label?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_action?.action_type?.payroll_analysis_label?.classes\"\r\n                                        for=\"pyrl_reduc_check\">{{ labelConfig?.payroll_reduc_label }}\r\n                                    </label>\r\n                                </div>\r\n                                <div [attr.el_name]=\"'el_calc_form.el_action.action_type.fte_wage_reduced_wrp'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.action_type?.fte_wage_reduced_wrp?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_action?.action_type?.fte_wage_reduced_wrp?.classes\">\r\n                                    <input [attr.el_name]=\"'el_calc_form.el_action.action_type.fte_wage_reduced_input'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.action_type?.fte_wage_reduced_input?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_action?.action_type?.fte_wage_reduced_input?.classes\"\r\n                                        type=\"radio\" id=\"reduc_analy_check\" [formControlName]=\"'action'\"\r\n                                        value=\"fte_wage_reduced\">\r\n                                    <label [attr.el_name]=\"'el_calc_form.el_action.action_type.fte_wage_reduced_label'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.action_type?.fte_wage_reduced_label?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_action?.action_type?.fte_wage_reduced_label?.classes\"\r\n                                        for=\"reduc_analy_check\">{{ labelConfig?.reduc_plus_analy_label }}</label>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div [attr.el_name]=\"'el_calc_form.el_action.el_no_of_fte'\"\r\n                        [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.styles\"\r\n                        [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.classes\">\r\n                        <div [attr.el_name]=\"'el_calc_form.el_action.no_of_fte_precovid.control_wrapper'\"\r\n                            [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.no_of_fte_precovid?.control_wrapper?.styles\"\r\n                            [ngClass]=\"styleConfig?.el_calc_form?.el_action?.no_of_fte_precovid?.control_wrapper?.classes\"\r\n                            *ngIf=\"form.get('action').value!='payroll_analysis'\">\r\n                            <div [attr.el_name]=\"'el_calc_form.el_action.no_of_fte_precovid.control'\"\r\n                                [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.no_of_fte_precovid?.control?.styles\"\r\n                                [ngClass]=\"styleConfig?.el_calc_form?.el_action?.no_of_fte_precovid?.control?.classes\">\r\n                                <label [attr.el_name]=\"'el_calc_form.el_action.no_of_fte_precovid.control_label'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.no_of_fte_precovid?.control_label?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_action?.no_of_fte_precovid?.control_label?.classes\"\r\n                                    for=\"NumberFTEinPreCovid19_cal\" class=\"fs14\">{{ labelConfig?.fte_pre_covid_label }}</label>\r\n                                <input [attr.el_name]=\"'el_calc_form.el_action.no_of_fte_precovid.control_input'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.no_of_fte_precovid?.control_input?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_action?.no_of_fte_precovid?.control_input?.classes\"\r\n                                    id=\"NumberFTEinPreCovid19_cal\" type=\"text\" placeholder=\"\" mask=\"0*\"\r\n                                    [formControlName]=\"'no_of_fte_precovid'\" />\r\n                            </div>\r\n                        </div>\r\n                        <div [attr.el_name]=\"'el_calc_form.el_action.el_no_of_fte.control_wrapper'\"\r\n                            [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.control_wrapper?.styles\"\r\n                            [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.control_wrapper?.classes\"\r\n                            class=\"col-6\" *ngIf=\"form.get('action').value!='payroll_analysis'\">\r\n                            <div [attr.el_name]=\"'el_calc_form.el_action.el_no_of_fte.control'\"\r\n                                [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.control?.styles\"\r\n                                [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.control?.classes\">\r\n                                <label for=\"NumberoveredPeriod_cal\"\r\n                                    [attr.el_name]=\"'el_calc_form.el_action.el_no_of_fte.label'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.label?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.label?.classes\">{{ labelConfig?.fte_cover_period_label }}</label>\r\n                                <input [attr.el_name]=\"'el_calc_form.el_action.el_no_of_fte.control_input'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.control_input?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.control_input?.classes\"\r\n                                    id=\"NumberoveredPeriod_cal\" type=\"text\" placeholder=\"\" mask=\"0*\"\r\n                                    [formControlName]=\"'no_of_fte'\" />\r\n                                <div [attr.el_name]=\"'el_calc_form.el_action.el_no_of_fte.error_wrapper'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.error_wrapper?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.error_wrapper?.classes\"\r\n                                    *ngIf=\"form.get('no_of_fte').invalid && (form.get('no_of_fte').dirty || form.get('no_of_fte').touched)\"\r\n                                    class=\"error-msg\">\r\n                                    <label [attr.el_name]=\"'el_calc_form.el_action.el_no_of_fte.error_label'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.error_label?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_no_of_fte?.error_label?.classes\"\r\n                                        class=\"error\" *ngIf=\"form.get('no_of_fte').hasError('required')\">\r\n                                        {{ labelConfig?.req_field_label }}\r\n                                    </label>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div [attr.el_name]=\"'el_calc_form.el_action.el_pay_cut_amount.control_wrapper'\"\r\n                            [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.control_wrapper?.styles\"\r\n                            [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.control_wrapper?.classes\"\r\n                            *ngIf=\"form.get('action').value!='head_count_analysis'\">\r\n                            <div [attr.el_name]=\"'el_calc_form.el_action.el_pay_cut_amount.control'\"\r\n                                [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.control?.styles\"\r\n                                [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.control?.classes\">\r\n                                <label [attr.el_name]=\"'el_calc_form.el_action.el_pay_cut_amount.label'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.label?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.label?.classes\"\r\n                                    for=\"AvgNumerEmployees_cal\">{{ labelConfig?.pay_cut_label }} <span\r\n                                        [attr.el_name]=\"'el_calc_form.el_action.el_pay_cut_amount.tool_tip_wrap'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.tool_tip_wrap?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.tool_tip_wrap?.classes\"><a\r\n                                            [attr.el_name]=\"'el_calc_form.el_action.el_pay_cut_amount.tool_tip_anch'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.tool_tip_anch?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.tool_tip_anch?.classes\"\r\n                                            data-toggle=\"popover\" href=\"javscript:void()\" data-placement=\"right\"\r\n                                            data-trigger=\"hover\" data-html=\"true\"\r\n                                            data-content=\"<ul style='padding-left:10px; margin-left:15px;'><li>For every other employee, calculate any pay reduction that is greater than 25%.</li><li>Total all those \u201Cover 25% pay cuts\u201D.</li></ul><p style='padding-left:10px; margin-bottom:10px; font-size:12px;'>Here\u2019s an example based on an 8-week period starting Apr 27.</p><table class='table'><thead><tr><th scope='col'>Example</th><th scope='col' style='white-space: nowrap;'>8-week period amount</th></thead><tbody><tr><td>8 weeks of Darlene\u2019s pre-reduction pay</td><td>$8,000</td></tr><tr><td>75% of Darlene's pre-reduction pay</td><td>$6,000</td></tr><tr><td>Darlene\u2019s actual Apr 27 - Jun 28 (8-week) pay</td><td>$5,000</td></tr><tr><td>The \u201Cover 25% pay cut\u201D in Darlene\u2019s pay</td><td>$1,000</td></tr><tr><td colspan='2'><b>Total the 'over 25% pay cuts' and enter that amount.</b></td></tr></tbody></table>\"\r\n                                            data-original-title=\"\" title=\"\">\r\n                                            <span \r\n                                                [attr.el_name]=\"'el_calc_form.el_action.el_pay_cut_amount.tool_tip_img'\"\r\n                                                [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.tool_tip_img?.styles\"\r\n                                                [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.tool_tip_img?.classes\">\r\n                                                <ng-container *ngTemplateOutlet=\"infoIconSvgTmp\"></ng-container>\r\n                                            </span>\r\n                                            </a></span>\r\n                                </label>\r\n                                <input [attr.el_name]=\"'el_calc_form.el_action.el_pay_cut_amount.control_input'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.control_input?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.control_input?.classes\"\r\n                                    type=\"text\" id=\"AvgNumerEmployees_cal\" placeholder=\"\" mask=\"separator.2\"\r\n                                    thousandSeparator=\",\" maxlength=\"19\" prefix=\"$ \"\r\n                                    [formControlName]=\"'pay_cut_amount'\">\r\n                                <div [attr.el_name]=\"'el_calc_form.el_action.el_pay_cut_amount.error_wrapper'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.error_wrapper?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.error_wrapper?.classes\"\r\n                                    *ngIf=\"form.get('pay_cut_amount').invalid && (form.get('pay_cut_amount').dirty || form.get('pay_cut_amount').touched)\">\r\n                                    <label [attr.el_name]=\"'el_calc_form.el_action.el_pay_cut_amount.control_wrapper'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.control_wrapper?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_action?.el_pay_cut_amount?.control_wrapper?.classes\"\r\n                                        *ngIf=\"form.get('pay_cut_amount').hasError('required')\">\r\n                                        {{ labelConfig?.req_field_label }}\r\n                                    </label>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div [attr.el_name]=\"'el_calc_form.el_result'\"\r\n                        [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.styles\"\r\n                        [ngClass]=\"styleConfig?.el_calc_form?.el_result?.classes\">\r\n                        <div [attr.el_name]=\"'el_calc_form.el_result.wrapper'\"\r\n                            [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.wrapper?.styles\"\r\n                            [ngClass]=\"styleConfig?.el_calc_form?.el_result?.wrapper?.classes\">\r\n                            <div [attr.el_name]=\"'el_calc_form.el_result.icon_wrapper'\"\r\n                                [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.icon_wrapper?.styles\"\r\n                                [ngClass]=\"styleConfig?.el_calc_form?.el_result?.icon_wrapper?.classes\">\r\n                                <div [attr.el_name]=\"'el_calc_form.el_result.icon'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.icon?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_result?.icon?.classes\">\r\n                                    <span [attr.el_name]=\"'el_calc_form.el_result.icon_img'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.icon_img?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_result?.icon_img?.classes\">\r\n                                        <ng-container *ngTemplateOutlet=\"fundIconSvgTmp\"></ng-container>\r\n                                    </span>\r\n                                </div>\r\n                            </div>\r\n                            <div [attr.el_name]=\"'el_calc_form.el_result.values_wrapper'\"\r\n                                [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.values_wrapper?.styles\"\r\n                                [ngClass]=\"styleConfig?.el_calc_form?.el_result?.values_wrapper?.classes\">\r\n                                <div [attr.el_name]=\"'el_calc_form.el_result.percent_wrapper'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.percent_wrapper?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_result?.percent_wrapper?.classes\">\r\n                                    <div [attr.el_name]=\"'el_calc_form.el_result.percent_label_wrp'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.percent_label_wrp?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_result?.percent_label_wrp?.classes\">\r\n                                        <div [attr.el_name]=\"'el_calc_form.el_result.percent_label'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.percent_label?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form?.el_result?.percent_label?.classes\">\r\n                                            {{ labelConfig?.perc_fte_left_label }}\r\n                                        </div>\r\n                                    </div>\r\n                                    <div [attr.el_name]=\"'el_calc_form.el_result.percent_value_wrp'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.percent_value_wrp?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_result?.percent_value_wrp?.classes\">\r\n                                        <div [attr.el_name]=\"'el_calc_form.el_result.percent_value'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.percent_value?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form?.el_result?.percent_value?.classes\">\r\n                                            {{ percent !== undefined && form.get('action').value!='payroll_analysis' ? percent + '%' : 'N/A' }}\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div [attr.el_name]=\"'el_calc_form.el_result.forgiven_wrapper'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.forgiven_wrapper?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_result?.forgiven_wrapper?.classes\">\r\n                                    <div [attr.el_name]=\"'el_calc_form.el_result.forgiven_label_wrp'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.forgiven_label_wrp?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_result?.forgiven_label_wrp?.classes\">\r\n                                        <div [attr.el_name]=\"'el_calc_form.el_result.forgiven_label'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.forgiven_label?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form?.el_result?.forgiven_label?.classes\">\r\n                                            {{ labelConfig?.amt_forgiven_label }}</div>\r\n                                    </div>\r\n                                    <div [attr.el_name]=\"'el_calc_form.el_result.forgiven_value_wrp'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.forgiven_value_wrp?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_result?.forgiven_value_wrp?.classes\">\r\n                                        <div [attr.el_name]=\"'el_calc_form.el_result.forgiven_value'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.forgiven_value?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form?.el_result?.forgiven_value?.classes\">\r\n                                            {{ (loanForgiven !== undefined ? loanForgiven : 0) | currency}}</div>\r\n                                    </div>\r\n                                </div>\r\n                                <div [attr.el_name]=\"'el_calc_form.el_result.payback_wrapper'\"\r\n                                    [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.payback_wrapper?.styles\"\r\n                                    [ngClass]=\"styleConfig?.el_calc_form?.el_result?.payback_wrapper?.classes\">\r\n                                    <div [attr.el_name]=\"'el_calc_form.el_result.payback_label_wrp'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.payback_label_wrp?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_result?.payback_label_wrp?.classes\">\r\n                                        <div [attr.el_name]=\"'el_calc_form.el_result.payback_label'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.payback_label?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form?.el_result?.payback_label?.classes\">\r\n                                            {{ labelConfig?.amt_payback_label }}</div>\r\n                                    </div>\r\n                                    <div [attr.el_name]=\"'el_calc_form.el_result.payback_value_wrp'\"\r\n                                        [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.payback_value_wrp?.styles\"\r\n                                        [ngClass]=\"styleConfig?.el_calc_form?.el_result?.payback_value_wrp?.classes\">\r\n                                        <div [attr.el_name]=\"'el_calc_form.el_result.payback_value'\"\r\n                                            [ngStyle]=\"styleConfig?.el_calc_form?.el_result?.payback_value?.styles\"\r\n                                            [ngClass]=\"styleConfig?.el_calc_form?.el_result?.payback_value?.classes\">\r\n                                            {{ ((loanForgiven==0 || loanForgiven)  && offer_data.loan_amount ? offer_data.loan_amount - loanForgiven : 0) | currency}}\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </form>\r\n        <div [attr.el_name]=\"'el_calc_form.btn_submit'\" [ngStyle]=\"styleConfig?.el_calc_form?.btn_submit?.styles\"\r\n            [ngClass]=\"styleConfig?.el_calc_form?.btn_submit?.classes\">\r\n            <div [attr.el_name]=\"'el_calc_form.btn_submit.wrapper'\"\r\n                [ngStyle]=\"styleConfig?.el_calc_form?.btn_submit?.wrapper?.styles\"\r\n                [ngClass]=\"styleConfig?.el_calc_form?.btn_submit?.wrapper?.classes\">\r\n                <button type=\"button\" [attr.el_name]=\"'el_calc_form.btn_submit.button'\"\r\n                    [ngStyle]=\"styleConfig?.el_calc_form?.btn_submit?.button?.styles\"\r\n                    [ngClass]=\"styleConfig?.el_calc_form?.btn_submit?.button?.classes\"\r\n                    [disabled]=\"!result || result.disabled\" (click)=\"onSubmit()\">{{ labelConfig?.submit_label }}</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</ng-container>",
        styles: [".blockBorder{border:1px solid #979797;border-radius:8px;padding:30px 20px;text-align:center}.blockBorder.active{background:#dfeef9;border-color:#dfeef9;position:relative;padding-right:0}.blockBorder.active:before{background:#dfeef9;content:\"\";position:absolute;top:-1px;z-index:0;right:-64px;width:100%;height:101%}.firstRow .form-control{border-color:#0577cd;color:#0577cd}.blockTitle .md-radio label{color:#0577cd;font-size:14px;font-weight:600;cursor:pointer}.blockTitle{text-align:left}.clcimg{text-align:center;padding:20px}.clcimg img{margin-top:50px}.rightBluebg{background:#dff1fd;padding:0;border-radius:10px 0}.lfcWrap{border-radius:10px;box-shadow:0 2px 10px 0 rgba(0,0,0,.09);background-color:#fff;margin:30px 0;padding:30px 0 0 40px}.fs20{font-size:20px!important;color:#001e5d}.fs36{font-size:36px!important;color:#001e5d}.btn-green{border:1px solid #6dd400;background:#fff;font-size:1rem;color:#6dd400}.btn-orange{border:1px solid #f7b500;background:#fff;font-size:1rem;color:#f7b500}.btn-green:focus,.btn-orange:focus,.btn-secondary:focus{box-shadow:none!important}.btn-green:hover,.btn-orange:hover{opacity:.8}.dockforgiv{padding-top:120px}.border-b{border-bottom:1px solid #666}.lbluebg{background:#dff0fb;margin-top:20px}.payrolTitle{color:#0577cd;font-size:14px;font-weight:600}.blueInput{background:#0577cd;border:1px solid #0577cd}.blueInput .form-control{font-size:15px;color:#0577cd;font-weight:600;padding:6px 12px 9px;height:auto!important}.greenInput{background:#6dd400;border:1px solid #6dd400}.greenInput .form-control{font-size:12px;color:#6dd400;font-weight:600;height:auto!important;padding:2px}.orangeInput{background:#f7b500;border:1px solid #f7b500}.orangeInput .form-control{font-size:12px;color:#f7b500;font-weight:600;height:auto!important;padding:2px}.fliename{font-size:10px;font-weight:500;color:#0577cd}.redvalue{font-size:10px;color:#e02020;font-weight:600}.greenInput .fs10,.orangeInput .fs10{font-size:10px;color:#fff}.pr{position:relative}.fileTypein{position:absolute;opacity:0;width:100%;height:100%;left:0;top:0}.orangeFieldBlock{background:rgba(247,181,0,.13);margin:0 -25px 15px;padding:0 25px}.orangeFieldBlock .bstext{background:#f7b500;margin:0 -25px 20px;padding:0 25px}.orangeFieldBlock .fs10{font-size:10px}.botBlue{background:#f7b500;border-radius:0 0 10px;background-image:linear-gradient(130deg,#00a2ff -8%,#0577cd 62%);margin:10px -25px 0;padding:40px 50px}#LoanForgiveness{padding-bottom:30px}"]
    })
], LoanForgivCalcComponent);

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

/*
 * Public API Surface of loan-forgiveness
 */

/**
 * Generated bundle index. Do not edit.
 */

export { LoanForgivenessModule, LoanForgivCalcComponent as ɵa, DataConverterService as ɵb };
//# sourceMappingURL=loan-forgiveness.js.map
