const Logger = (constructor: Function) => {
    console.log('Logging');
    console.log(constructor);
}

@Logger
class Person {
    name = 'JD';

    constructor() {
        console.log('Started!');
    }
}

const person = new Person();
console.log("person", person)