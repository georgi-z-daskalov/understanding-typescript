"use strict";
class Department {
    constructor(n) {
        this.employees = [];
        this.name = n;
    }
    describe() {
        console.log('Department:', this.name);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeesInfo() {
        console.log("Department -> employees", this.employees);
    }
}
const finance = new Department('Finance');
finance.addEmployee('JD');
finance.addEmployee('Rali');
finance.describe();
finance.printEmployeesInfo();
