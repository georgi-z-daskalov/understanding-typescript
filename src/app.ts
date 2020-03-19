type Admin = {
    name: string;
    priviliges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmpliyee = Admin & Employee;

interface IAdmin {
    name: string;
    priviliges: string[];
}

interface IEmployee {
    name: string;
    startDate: Date;
}

interface IElevatedEmpliyee extends IAdmin, IEmployee {};