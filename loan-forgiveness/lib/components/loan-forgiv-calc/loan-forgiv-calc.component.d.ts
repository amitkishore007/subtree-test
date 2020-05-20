import { OnInit, OnChanges, SimpleChanges, EventEmitter, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoanCalcFormValue } from './loanCalcFormValue.model';
import { Subscription } from 'rxjs';
import { DataConverterService } from '../../services/data-converter.service';
import { controlConfig } from '../../interfaces/control.config';
export declare class LoanForgivCalcComponent implements OnInit, AfterViewChecked, OnChanges, OnDestroy {
    private dataConverterService;
    covered_periods_start: any[];
    form_data: LoanCalcFormValue;
    payroll_source_data: Partial<LoanCalcFormValue>;
    offer_data: {
        'no_of_employees': number;
        'loan_amount': number;
    };
    result: {
        'loan_forgiven_amount'?: number;
        'percentage_of_fte'?: number;
        disabled: boolean;
    };
    etrans_pulled: boolean;
    styleConfig: any;
    labelConfig: any;
    onSubmitEventEmit: EventEmitter<any>;
    onPeriodSelected: EventEmitter<any>;
    onPullETrans: EventEmitter<any>;
    loanForgiven: number;
    percent: number;
    form: FormGroup;
    max_non_payroll_sum: number;
    formChangeSubs: Subscription;
    startDateChangeSubs: Subscription;
    controls_config: any[];
    defaulPeriodDates: string[];
    calcImgSvg: string;
    infoIconSvg: string;
    constructor(dataConverterService: DataConverterService);
    ngAfterViewChecked(): void;
    ngOnInit(): void;
    ngOnChanges(simpleChanges: SimpleChanges): void;
    convertAllObjects(simpleChanges: SimpleChanges): void;
    buildForm(): void;
    onFormChanges(): void;
    updateResultValues(values: any): void;
    updateExcessNonPyrlOf25(): void;
    setFormValues(values: Partial<LoanCalcFormValue>): void;
    disableForm(): void;
    resetForm(): void;
    onPullFromEtrans(): void;
    onSubmit(): void;
    /**
  * function to validate form fields
  * @param fields: formfields array
  * @param form: Formgroup object
  * @param validateArr: array to validate
  */
    validateAllFormFields(formGroup: FormGroup): void;
    get8WeekAhead(dateString: any): any;
    getControlsConfg(): controlConfig[];
    getTransformedDate(val: any, format: any): string;
    ngOnDestroy(): void;
}
