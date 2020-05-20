export interface LoanCalcFormValue {
    start_date: string;
    end_date: string;
    payroll_cost: number;
    mortgage_interest: number;
    office_rent: number;
    utilities: number;
    existing_eidl: number;
    additional_benefits: number;
    non_payroll_cost_in_excess_of_25: number;
    no_of_fte: number;
    no_of_fte_precovid: number;
    pay_cut_amount: number;
    action: 'head_count_analysis' | 'payroll_analysis' | 'fte_wage_reduced';
}
