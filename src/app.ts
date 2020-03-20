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

@WithTemplate('<h1>My person object</h1>', 'app')
class Person {
    name = 'JD';

    constructor() {
        console.log('Started!');
    }
}

const person = new Person();
console.log("person", person)