// const Logger = (logString: string) => {
//     return (constructor: Function) => {
//         console.log(logString);
//         console.log(constructor);
//     }
// }

// const WithTemplate = (template: string, hookId: string) =>{
//     return <T extends {new(...args: any[]): { name: string}}>(originalConstructor: T) => {
//         return class extends originalConstructor {
//             constructor(..._: any[]) {
//                 super();
//                 const element = document.getElementById(hookId);
//                 if (element) {
//                     element.innerHTML = template;
//                     element.querySelector('h1')!.textContent = this.name;
//                 }
//             }
//         }
//     }
// }

// @Logger('Logging')
// @WithTemplate('<h1>My person object</h1>', 'app')
// class Person {
//     name = 'JD';

//     constructor() {
//         console.log('Started!');
//     }
// }

// // const person = new Person();
// // console.log("person", person);

// const Log = (target: any, propertyName: string | Symbol) => {
//     console.log('Property decorator!');
//     console.log(target, propertyName);
// }

// const Log2 = (target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) => {
//     console.log('Accessor decorator!');
//     console.log('target', target);
//     console.log('propertyName', propertyName);
//     console.log('descriptor', descriptor);
// }

// const Log3 = (target: any, name: string | Symbol, descriptor: PropertyDescriptor): PropertyDescriptor => {
//     console.log('Method decorator!');
//     console.log('target', target);
//     console.log('name', name);
//     console.log('descriptor', descriptor);

//     return {

//     }
// }

// const Log4 = (target: any, name: string | Symbol, position: number) => {
//     console.log('Parameter decorator!');
//     console.log('target', target);
//     console.log('name', name);
//     console.log('position', position);
// }

// class Product {
//     @Log
//     title: string;
//     private _price: number;

//     constructor(t: string, p: number) {
//         this.title = t;
//         this._price = p;
//     }

//     @Log2
//     set price(val: number) {
//         if (val > 0) {
//             this._price = val;
//         }
//     }

//     @Log3
//     getPriceWithTax (@Log4 tax: number) {
//         return this._price * (1 + tax);
//     }
// }

// const AutoBind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
//     console.log('descriptor', descriptor);

//     const originalMethod = descriptor.value;
//     const adjustedDescriptor: PropertyDescriptor = {
//         configurable: true,
//         enumerable: false,
//         get() {
//             const boundFunction = originalMethod.bind(this);
//             return boundFunction;
//         },
//     };
//     return adjustedDescriptor;
// }

// class Printer {
//     message = 'This works!';

//     @AutoBind
//     showMessage() {
//         console.log(this.message);
//     }
// }

// const p = new Printer();

// const button = document.querySelector('button')!;
// button.addEventListener('click', p.showMessage);

interface IValidatorConfig {
    [property: string]: {
        [validateProp: string]: string[]
    }
}

const registerValidators: IValidatorConfig = {};

const RequiredValue = (target: any, propertyName: string) => {
    console.log("RequiredValue -> propertyName", propertyName)
    registerValidators[target.constructor.name] = {
        ...registerValidators[target.constructor.name],
        [propertyName]: ['required']
    }
};

const PositiveNumber = (target: any, propertyName: string) => {
    registerValidators[target.constructor.name] = {
        ...registerValidators[target.constructor.name],
        [propertyName]: ['positive']
    }
};

const validate = (obj: any) => {
    const objValidatorConfig = registerValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    } else {
        let result: boolean = true;
        Object.keys(objValidatorConfig).forEach((name: string) => {
            objValidatorConfig[name].forEach((validator: string) => {
                switch(validator) {
                    case 'required':
                        result = result && !!obj[name]
                        break;
                    case 'positive':
                        result = result && obj[name] > 0;
                        break;
                    default:
                        result = true;
                        break;
                }
            })
        })

        return result;
    }
};

class Course {
    @RequiredValue
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
};


const courseForm: HTMLFormElement = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    console.log("title", title)
    const price = +priceEl.value;
    const course = new Course(title, price);

    console.log("registerValidators", registerValidators)
    if(!validate(course)) {
        console.log('Validation error!');
        return;
    }
})