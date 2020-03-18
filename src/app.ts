class Department {
    private employees: string[] = []

    constructor(private name: string) {}

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