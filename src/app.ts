interface Named {
    readonly name: string;
    outputName?: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    constructor(public name: string) {}

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`)
    }

    saySomethingMore() {
        console.log('bla bla');
    }
}

let user1: Greetable;
user1 = new Person('JD');

user1.greet('Hey');