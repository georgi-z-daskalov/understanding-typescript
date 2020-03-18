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
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
    printEmployeesInfo() {
        super.printEmployeesInfo();
        console.log(`Department #${this.id} admins: ${[...this.admins]}`);
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
    }
    addReport(report) {
        this.reports.push(report);
    }
    removeReport(report) {
        this.reports = this.reports.filter(r => r !== report);
    }
    printReports() {
        console.log("AccountingDepartment  reports", [...this.reports]);
    }
}
const finance = new Department(1, 'Finance');
finance.addEmployee('JD');
finance.addEmployee('Rali');
const itDepartment = new ITDepartment(2, ['JD']);
itDepartment.printEmployeesInfo();
const accountingDepartment = new AccountingDepartment(3, ['report1', 'report2']);
accountingDepartment.printReports();
accountingDepartment.removeReport('report1');
accountingDepartment.printReports();
