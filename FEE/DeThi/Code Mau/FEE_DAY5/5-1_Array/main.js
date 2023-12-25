let initialNumbers = [2, 7, 5, 10, 15, 20, 8, 11];
let numbers = [...initialNumbers]; // Tạo một bản sao của mảng ban đầu


function displayEvenNumbers() {
  const evenNumbers = numbers.filter((num) => num % 2 === 0);
  const sumEvenNumbers = evenNumbers.reduce((acc, curr) => acc + curr, 0);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <p>Even Numbers: ${evenNumbers.join(", ")}</p>
    <p>Sum of Even Numbers: ${sumEvenNumbers}</p>
  `;
}

function displayOddNumbers() {
  const oddNumbers = numbers.filter((num) => num % 2 !== 0);
  const sumOddNumbers = oddNumbers.reduce((acc, curr) => acc + curr, 0);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <p>Odd Numbers: ${oddNumbers.join(", ")}</p>
    <p>Sum of Odd Numbers: ${sumOddNumbers}</p>
  `;
}

function displayNumbersInRange() {
  const lowerBound = parseInt(prompt("Enter the lower bound:"));
  const upperBound = parseInt(prompt("Enter the upper bound:"));

  if (isNaN(lowerBound) || isNaN(upperBound)) {
    alert("Invalid input!");
    return;
  }

  const numbersInRange = numbers.filter(
    (num) => num >= lowerBound && num <= upperBound
  );

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <p>Numbers in Range [${lowerBound}, ${upperBound}]: ${numbersInRange.join(
    ", "
  )}</p>
  `;
}

function sortArray(algorithm) {
  let sortedArray;

  switch (algorithm) {
    case "selection":
      sortedArray = selectionSort([...numbers]);
      break;
    case "insertion":
      sortedArray = insertionSort([...numbers]);
      break;
    case "merge":
      sortedArray = mergeSort([...numbers]);
      break;
    case "quick":
      sortedArray = quickSort([...numbers]);
      break;
    case "stooge":
      sortedArray = stoogeSort([...numbers]);
      break;
    default:
      alert("Invalid sort algorithm.");
      return;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<p>Sorted Array (${algorithm} sort): ${sortedArray.join(
    ", "
  )}</p>`;
}

function resetArray() {
  numbers = [...initialNumbers];
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
}

function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  return array;
}

function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
  return array;
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const pivot = array[array.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

function stoogeSort(array) {
  return stoogeSortHelper(array, 0, array.length - 1);
}

function stoogeSortHelper(array, low, high) {
  if (low >= high) {
    return array;
  }

  if (array[low] > array[high]) {
    [array[low], array[high]] = [array[high], array[low]];
  }

  if (high - low + 1 > 2) {
    const third = Math.floor((high - low + 1) / 3);

    stoogeSortHelper(array, low, high - third);
    stoogeSortHelper(array, low + third, high);
    stoogeSortHelper(array, low, high - third);
  }

  return array;
}
