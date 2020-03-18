"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeesInfo() {
        console.log(`Department ${this.name} #${this.id} -> employees ${[...this.employees]}`);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log('IT Department');
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
        this.lastReport = this.reports[0];
    }
    describe() {
        console.log('Accounting Department');
    }
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment(100, []);
        return this.instance;
    }
    get mostRecentReport() {
        return this.lastReport;
    }
    set mostRecentReport(report) {
        this.lastReport = report;
    }
    addReport(report) {
        this.reports.push(report);
        this.lastReport = report;
    }
    removeReport(report) {
        this.reports = this.reports.filter(r => r !== report);
        this.lastReport = this.reports[this.reports.length - 1];
    }
    printReports() {
        console.log("AccountingDepartment  reports", [...this.reports]);
    }
}
const itDepartment = new ITDepartment(2, ['JD']);
itDepartment.printEmployeesInfo();
const accountingDepartment1 = AccountingDepartment.getInstance();
const accountingDepartment2 = AccountingDepartment.getInstance();
accountingDepartment1.addReport('report1');
accountingDepartment1.printReports();
accountingDepartment2.printReports();
accountingDepartment1.addReport('report5');
accountingDepartment1.removeReport('report1');
accountingDepartment1.printReports();
console.log("accountingDepartment.mostRecentReport", accountingDepartment1.mostRecentReport);
accountingDepartment1.mostRecentReport = 'report2';
console.log("accountingDepartment.mostRecentReport", accountingDepartment1.mostRecentReport);
const employee1 = Department.createEmployee('JD');
console.log("employee1", employee1);
