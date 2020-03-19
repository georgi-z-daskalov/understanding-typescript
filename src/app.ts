type Admin = {
    name: string;
    priviliges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmpliyee = Admin & Employee;

type UnknownEmployee = Admin | Employee;

const printEmployeeInfo = (employee: UnknownEmployee) => {
    console.log("printEmployeeInfo -> employee.name", employee.name);
    if('priviliges' in employee) {
        console.log("printEmployeeInfo -> employee.priviliges", ...employee.priviliges)
    }
    if('startDate' in employee) {
        console.log("printEmployeeInfo -> employee.startDate", employee.startDate)
    }
}

const e1: UnknownEmployee = {
    name: 'JD',
    priviliges: ['FE'],
    startDate: new Date(),
}
const e2: UnknownEmployee = {
    name: 'Rali',
    startDate: new Date(),
}

printEmployeeInfo(e1);
printEmployeeInfo(e2);

interface IAdmin {
    name: string;
    priviliges: string[];
}

interface IEmployee {
    name: string;
    startDate: Date;
}

interface IElevatedEmpliyee extends IAdmin, IEmployee {};


type Combinable = string | number;

const add = (a: Combinable, b: Combinable) => {
    if(typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString()
    }

    return a + b;
}

class Car {
    drive() {
        console.log('driving...');
    }
}

class Truck {
    drive() {
        console.log('driving...');
    }

    loadCargo(cargo: number) {
        console.log("Truck -> loadCargo -> cargo", cargo)
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
    vehicle.drive();
    if(vehicle instanceof Truck) {
        vehicle.loadCargo(100);
    }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
    type: 'bird'
    flyingSpeed: number;
}

interface Horse {
    type: 'horse'
    runningSpeed: number;
}

type Animal = Bird | Horse;

const moveAnimal = (animal: Animal) => {
    let speed: number;
    switch(animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
        }
            
    console.log("moveAnimal -> speed", speed)
}

const a1: Animal = {
    runningSpeed: 11,
    type: 'horse'
};

moveAnimal(a1);

// const userInput = <HTMLInputElement>document.getElementById('user-input')!;
const userInput = document.getElementById('user-input')! as HTMLInputElement;
userInput.value = 'Hey'