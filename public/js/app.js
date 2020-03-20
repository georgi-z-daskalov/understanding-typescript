"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const registerValidators = {};
const RequiredValue = (target, propertyName) => {
    console.log("RequiredValue -> propertyName", propertyName);
    registerValidators[target.constructor.name] = Object.assign(Object.assign({}, registerValidators[target.constructor.name]), { [propertyName]: ['required'] });
};
const PositiveNumber = (target, propertyName) => {
    registerValidators[target.constructor.name] = Object.assign(Object.assign({}, registerValidators[target.constructor.name]), { [propertyName]: ['positive'] });
};
const validate = (obj) => {
    const objValidatorConfig = registerValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    else {
        let result = true;
        Object.keys(objValidatorConfig).forEach((name) => {
            objValidatorConfig[name].forEach((validator) => {
                switch (validator) {
                    case 'required':
                        result = result && !!obj[name];
                        break;
                    case 'positive':
                        result = result && obj[name] > 0;
                        break;
                    default:
                        result = true;
                        break;
                }
            });
        });
        return result;
    }
};
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    RequiredValue
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
;
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    console.log("title", title);
    const price = +priceEl.value;
    const course = new Course(title, price);
    console.log("registerValidators", registerValidators);
    if (!validate(course)) {
        console.log('Validation error!');
        return;
    }
});
