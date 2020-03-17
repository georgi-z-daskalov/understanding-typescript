const add = (n1: number, n2: number) => n1 + n2;

const printResult = (num: number) => console.log("printResult -> num", num);

const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
    const result = n1 + n2;
    cb(result);
}

printResult(add(5, 3));

let combineValues: (a: number, b: number) => number;
combineValues = add;

console.log("combineValues", combineValues(7, 5))

addAndHandle(10, 20, (result) => {
    console.log('Callback result', result)
})