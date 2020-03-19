"use strict";
var _a;
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
const add = ((a, b) => {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
});
console.log(add('JD', 'Rali').toUpperCase());
console.log(add(1, 16).toFixed(2));
class Car {
    drive() {
        console.log('driving...');
    }
}
class Truck {
    drive() {
        console.log('driving...');
    }
    loadCargo(cargo) {
        console.log("Truck -> loadCargo -> cargo", cargo);
    }
}
const v1 = new Car();
const v2 = new Truck();
const useVehicle = (vehicle) => {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(100);
    }
};
useVehicle(v1);
useVehicle(v2);
const moveAnimal = (animal) => {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log("moveAnimal -> speed", speed);
};
const a1 = {
    runningSpeed: 11,
    type: 'horse'
};
moveAnimal(a1);
const userInput = document.getElementById('user-input');
userInput.value = 'Hey';
const errorBag = {
    email: 'Not a valid email',
    name: 'Name a valid name'
};
const fetchedUserData = {
    id: 'u1',
    name: 'JD',
    job: { title: 'FE dev', description: 'Some description' }
};
console.log('Job title', (_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
