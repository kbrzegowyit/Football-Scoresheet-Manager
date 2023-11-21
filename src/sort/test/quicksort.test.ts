import assert from "assert";
import { Quicksort } from "../quicksort";
import { SortOrder } from "../types";

describe('Quicksort', () => {
    it('should sort the array ASC', () => {
        const arr = [5,4,3,2,1];

        const quicksort = new Quicksort();
        quicksort.sort(arr, SortOrder.Ascending);

        assert.equal(arr, arr.reverse());
    });

    it('should sort the array DESC', () => {
        const arr = [1,2,3,4,5];

        const quicksort = new Quicksort();
        quicksort.sort(arr, SortOrder.Descending);

        assert.equal(arr, arr.reverse());
    })
});