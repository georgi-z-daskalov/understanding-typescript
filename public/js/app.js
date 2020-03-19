"use strict";
const printEmployeeInfo = (employee) => {
    console.log("printEmployeeInfo -> employee.name", employee.name);
    if ('priviliges' in employee) {
        console.log("printEmployeeInfo -> employee.priviliges", ...employee.priviliges);
    }
    if ('startDate' in employee) {
        console.log("printEmployeeInfo -> employee.startDate", employee.startDate);
    }
};
const e1 = {
    name: 'JD',
    priviliges: ['FE'],
    startDate: new Date(),
};
const e2 = {
    name: 'Rali',
    startDate: new Date(),
};
printEmployeeInfo(e1);
printEmployeeInfo(e2);
;
const add = (a, b) => {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
};
