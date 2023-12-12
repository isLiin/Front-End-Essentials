// random number between 0 and 100 inclusive
const listAll = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));

function getAllValueOdd() {
    return listAll.filter((numb) => numb % 2 != 0);
}

function getAllValueEven() {
    return listAll.filter((numb) => numb % 2 == 0);
}

function show(className, list) {
    list.filter((numb, index) =>
        (index == list.length - 1) ?
            $(`.${className}`).append(`<div>${numb}</div>`)
            : $(`.${className}`).append(`<div class="mx-2">${numb}</div>`));
}

function fillter() {
    let valStart = 0;
    let valEnd = 0;
    let val1 = parseInt($("#input-start").val());
    let val2 = parseInt($("#input-end").val());

    if (val1 > val2) {
        valStart = val2;
        valEnd = val1;
    } else {
        valStart = val1;
        valEnd = val2;
    }

    let listFilter = listAll.filter((numb) => numb >= valStart && numb <= valEnd);
    $(".result-filter").html("");
    show("result-filter", listFilter);
}

function selectionSort(arr) {
    let n = arr.length;
        
    for(let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for(let j = i + 1; j < n; j++){
            if(arr[j] < arr[min]) {
                min=j; 
            }
         }
         if (min != i) {
             // Swapping the elements
             let tmp = arr[i]; 
             arr[i] = arr[min];
             arr[min] = tmp;      
        }
    }
    return arr;
}

function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    // Concatenate values into resultArray in order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++; // move left array cursor
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++; // move right array cursor
        }
    }

    // We need to concat here because there will be one element remaining
    // from either left OR the right
    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
}

function mergeSort(arr) {
    // No need to sort the array if the array only has one element or is empty
    if (arr.length <= 1) {
        return arr;
    }
    
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(arr.length / 2);

    // This is where we will be dividing the array into left and right
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    // Using recursion to combine the left and right
    return merge(
        mergeSort(left), mergeSort(right)
    );
}

function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = arr[i];
        // The last element of our sorted subarray
        let j = i-1; 
        while ((j > -1) && (current < arr[j])) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}

function quickSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    const pivot = arr[Math.floor(Math.random() * arr.length)]; // using random pivot to avoid worst case scenario
    let left = [];
    let right = [];
    let equal = [];

    for (let element of arr) {
        if (element < pivot) {
            left.push(element);
        } else if (element > pivot) {
            right.push(element);
        } else {
            equal.push(element);
        }
    }

    return quickSort(left).concat(equal).concat(quickSort(right));
}


$(document).ready(function () {
    show("result-all", listAll);
    show("result-chan", getAllValueEven());
    show("result-le", getAllValueOdd());
    fillter();

    show("result-Selection", selectionSort(listAll));
    show("result-Insertion", insertionSort(listAll));
    show("result-Merge", mergeSort(listAll));
    show("result-Quick", quickSort(listAll));
})