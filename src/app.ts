class Department {
    private name: string;
    private employees: string[] = []

    constructor(n: string) {
        this.name = n;
    }

    describe(this: Department) {
        console.log('Department:', this.name)
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeesInfo() {
        console.log("Department -> employees", this.employees)
    }
}

const finance = new Department('Finance');
finance.addEmployee('JD');
finance.addEmployee('Rali');

finance.describe();
finance.printEmployeesInfo();