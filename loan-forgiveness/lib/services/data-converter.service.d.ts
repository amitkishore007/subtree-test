import { DatePipe } from '@angular/common';
export declare class DataConverterService {
    private datePipe;
    constructor(datePipe: DatePipe);
    convertToData(key: any, value: any, self: any): void;
    getTransformedDate(_date: any, formatWithoutYear: any): string;
}
