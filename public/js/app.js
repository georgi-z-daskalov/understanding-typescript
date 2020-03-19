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
const extractAndConvert = (obj, key) => {
    return 'Value: ' + obj[key];
};
extractAndConvert({ name: 'JD' }, 'name');
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('JD');
console.log(textStorage.getItems());
const objectStorage = new DataStorage();
objectStorage.addItem({ name: 'JD' });
objectStorage.addItem({ name: 'Rali' });
objectStorage.removeItem({ name: 'JD' });
console.log("objectStorage items", objectStorage.getItems());
