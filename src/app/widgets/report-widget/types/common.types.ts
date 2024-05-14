export interface ReportColumn<T> {
    prop: keyof T;
    name: string;
    sortable?: boolean;
}

export interface Report<T> {
    columns: ReportColumn<T>[];
    rows: T[];
}