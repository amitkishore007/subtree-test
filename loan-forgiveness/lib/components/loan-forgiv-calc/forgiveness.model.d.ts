export interface IForgiveness {
    payroll_cost: number;
    mortgage_interest: number;
    office_rent: number;
    utilities: number;
    existing_eidl: number;
    no_of_fte?: number;
    no_of_fte_precovid?: number;
    pay_cut_amount?: number;
    action: string;
    loan_amount: number;
}
export declare class ForgivenessModel {
    payroll_cost: number;
    mortgage_interest: number;
    office_rent: number;
    utilities: number;
    existing_eidl: number;
    no_of_fte?: number;
    no_of_fte_precovid?: number;
    pay_cut_amount?: number;
    action: string;
    loan_amount: number;
    additional_benefits: number;
    constructor(params: IForgiveness);
    get calculateCommonParams(): number;
    get percentLeftOfFte(): number;
    get actualPercentLeftOfFte(): number;
    get loanForgiveness(): number;
    calculateHeadCountAnalysis(): number;
    calculatePayrollAnalysis(): number;
    calculateFTEWageReduce(): number;
}
