export interface Sorter {
    sort<T>(arr: T[], mode: SortOrder): T[];
}

export enum SortOrder {
    Ascending = 'asc',
    Descending = 'desc',
}
