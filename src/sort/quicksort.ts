import { Sorter } from "./types";

export class Quicksort implements Sorter {
    public sort<T>(arr: T[]): T[] {
        const left = 0;
        const right = arr.length - 1;
        this.quicksort<T>(arr, left, right);
        return arr;
    }
    
    private quicksort<T>(arr: T[], left: number, right: number) {
        if (left < right) {
            const pivot = this.partition(arr, left, right);
            this.quicksort(arr, left, pivot - 1);
            this.quicksort(arr, pivot + 1, right);
        }
    };

    private partition<T>(arr: T[], left: number, right: number): number {
        const pivot = right;
        let limit = left - 1;
        for (let i = left; i < right; i++) {
            if (arr[i] > arr[pivot]) {
                limit++;
                this.swap(arr, limit, i);
            }
        }
        limit++;
        this.swap(arr, limit, pivot);
        return limit;
    }

    private swap<T>(arr: T[], firstIndex: number, secondIndex: number) {
        const tmp = arr[firstIndex];
        arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = tmp;
    }
}