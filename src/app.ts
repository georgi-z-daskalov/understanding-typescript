class Department {
    private employees: string[] = []

    constructor(private readonly id: number, private name: string) {}

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

const finance = new Department(1, 'Finance');
finance.addEmployee('JD');
finance.addEmployee('Rali');

finance.describe();
finance.printEmployeesInfo();