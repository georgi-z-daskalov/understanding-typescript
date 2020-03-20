"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const Logger = (logString) => {
    return (constructor) => {
        console.log(logString);
        console.log(constructor);
    };
};
const WithTemplate = (template, hookId) => {
    return (constructor) => {
        const element = document.getElementById(hookId);
        const p = new constructor();
        if (element) {
            element.innerHTML = template;
            element.querySelector('h1').textContent = p.name;
        }
    };
};
let Person = class Person {
    constructor() {
        this.name = 'JD';
        console.log('Started!');
    }
};
Person = __decorate([
    Logger('Logging'),
    WithTemplate('<h1>My person object</h1>', 'app')
], Person);
const person = new Person();
console.log("person", person);
const Log = (target, propertyName) => {
    console.log('Property decorator!');
    console.log(target, propertyName);
};
const Log2 = (target, propertyName, descriptor) => {
    console.log('Accessor decorator!');
    console.log('target', target);
    console.log('propertyName', propertyName);
    console.log('descriptor', descriptor);
};
const Log3 = (target, name, descriptor) => {
    console.log('Method decorator!');
    console.log('target', target);
    console.log('name', name);
    console.log('descriptor', descriptor);
};
const Log4 = (target, name, position) => {
    console.log('Parameter decorator!');
    console.log('target', target);
    console.log('name', name);
    console.log('position', position);
};
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
