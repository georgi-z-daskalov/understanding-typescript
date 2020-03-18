abstract class Department {
    private employees: string[] = []

    constructor(protected readonly id: number, private name: string) {}

    static createEmployee(name: string) {
        return {name}
    }
    
    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeesInfo() {
        console.log(`Department ${this.name} #${this.id} -> employees ${[...this.employees]}`)
    }
}

class ITDepartment extends Department {
    constructor(id: number, public admins: string[]) {
        super(id, 'IT');
    }

    describe() {
        console.log('IT Department')
    }

    printEmployeesInfo() {
        super.printEmployeesInfo();
        console.log(`Department #${this.id} admins: ${[...this.admins]}`);        
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    describe() {
        console.log('Accounting Department')
    }

    private constructor(id: number, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = this.reports[0];
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

    set mostRecentReport(report: string) {
        this.lastReport = report;
    }

    addReport(report: string) {
        this.reports.push(report);
        this.lastReport = report;
    }

    removeReport(report: string) {
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
console.log("employee1", employee1)

