const Logger = (logString: string) => {
    return (constructor: Function) => {
        console.log(logString);
        console.log(constructor);
    }
}

const WithTemplate = (template: string, hookId: string) =>{
    return (constructor: any) => {
        const element = document.getElementById(hookId);
        const p = new constructor();
        if (element) {
            element.innerHTML = template;
            element.querySelector('h1')!.textContent = p.name;
        }
    }
}

@Logger('Logging')
@WithTemplate('<h1>My person object</h1>', 'app')
class Person {
    name = 'JD';

    constructor() {
        console.log('Started!');
    }
}

const person = new Person();
console.log("person", person);

const Log = (target: any, propertyName: string | Symbol) => {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

const Log2 = (target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) => {
    console.log('Accessor decorator!');
    console.log('target', target);
    console.log('propertyName', propertyName);
    console.log('descriptor', descriptor);
}

const Log3 = (target: any, name: string | Symbol, descriptor: PropertyDescriptor) => {
    console.log('Method decorator!');
    console.log('target', target);
    console.log('name', name);
    console.log('descriptor', descriptor);
}

const Log4 = (target: any, name: string | Symbol, position: number) => {
    console.log('Parameter decorator!');
    console.log('target', target);
    console.log('name', name);
    console.log('position', position);
}

class Product {
    @Log
    title: string;
    private _price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        }
    }

    @Log3
    getPriceWithTax (@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}