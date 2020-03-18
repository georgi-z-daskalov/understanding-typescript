"use strict";
class Person {
    constructor(name) {
        this.name = name;
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name}`);
    }
    saySomethingMore() {
        console.log('bla bla');
    }
}
let user1;
user1 = new Person('JD');
user1.greet('Hey');
