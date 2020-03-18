class Department {
    private employees: string[] = []

    constructor(readonly id: number, private name: string) {}

    describe(this: Department) {
        console.log(`Department #${this.id}: ${this.name}`)
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeesInfo() {
        console.log(`Department #${this.id} -> employees ${[...this.employees]}`)
    }
}

class ITDepartment extends Department {
    constructor(id: number, public admins: string[]) {
        super(id, 'IT');
    }

    printEmployeesInfo() {
        super.printEmployeesInfo();
        console.log(`Department #${this.id} admins: ${[...this.admins]}`);        
    }
}

class AccountingDepartment extends Department {
    constructor(id: number, private reports: string[]) {
        super(id, 'Accounting');
    }

    addReport(report: string) {
        this.reports.push(report);
    }

    removeReport(report: string) {
        this.reports = this.reports.filter(r => r !== report);
    }
    
    printReports() {
        console.log("AccountingDepartment  reports", [...this.reports]);
    }
}

const finance = new Department(1, 'Finance');
finance.addEmployee('JD');
finance.addEmployee('Rali');

// finance.describe();
// finance.printEmployeesInfo();

const itDepartment = new ITDepartment(2, ['JD']);
itDepartment.printEmployeesInfo();

const accountingDepartment = new AccountingDepartment(3, ['report1', 'report2']);
accountingDepartment.printReports();
accountingDepartment.removeReport('report1');
accountingDepartment.printReports();
