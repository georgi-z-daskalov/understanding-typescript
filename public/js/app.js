"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    describe() {
        console.log(`Department #${this.id}: ${this.name}`);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeesInfo() {
        console.log(`Department #${this.id} -> employees ${[...this.employees]}`);
    }
}
const finance = new Department(1, 'Finance');
finance.addEmployee('JD');
finance.addEmployee('Rali');
finance.describe();
finance.printEmployeesInfo();
