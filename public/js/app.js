"use strict";
const merge = (objA, objB) => {
    return Object.assign(objA, objB);
};
const addNums = (num1, num2) => {
    return (num1 + num2).toFixed(2);
};
const mergedObj = merge({ name: 'JD' }, { age: 37 });
console.log("mergedObj", mergedObj);
