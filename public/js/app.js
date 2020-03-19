"use strict";
const merge = (objA, objB) => {
    return Object.assign(objA, objB);
};
const addNums = (num1, num2) => {
    return (num1 + num2).toFixed(2);
};
const mergedObj = merge({ name: 'JD' }, { age: 37 });
console.log("mergedObj", mergedObj);
const countAndPrint = (element) => {
    let description = 'Got no value.';
    if (element.length === 1) {
        description = 'ELement has 1 element.';
    }
    else if (element.length > 0) {
        description = `Element has ${element.length} elements.`;
    }
    return [element, description];
};
console.log(countAndPrint('Helloe!'));
