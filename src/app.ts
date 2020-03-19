const merge = <T extends object, U extends object>(objA: T, objB: U) => {
    return Object.assign(objA, objB);
};

const addNums = <T extends number, U extends number>(num1: T, num2: U) => {
    return (num1 + num2).toFixed(2);
};

// function merge<T, U>(objA: T, objB: U) {
//     return Object.assign(objA, objB);
// }

const mergedObj = merge({name: 'JD'}, {age: 37});
console.log("mergedObj", mergedObj)

interface ILenghty {
    length: number;
}

const countAndPrint = <T extends ILenghty>(element: T): [T, string] => {
    let description = 'Got no value.';
    if (element.length === 1) {
        description = 'ELement has 1 element.'
    } else if (element.length > 0) {
        description = `Element has ${element.length} elements.`
    }
    return [element, description];
}

console.log(countAndPrint('Helloe!'))

const extractAndConvert = <T extends object, U extends keyof T>(obj: T, key: U) => {
    return 'Value: ' + obj[key];
}

extractAndConvert({name: 'JD'}, 'name')

class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();

textStorage.addItem('JD')

console.log(textStorage.getItems());

const objectStorage = new DataStorage<object>();
objectStorage.addItem({name: 'JD'});
objectStorage.addItem({name: 'Rali'});
objectStorage.removeItem({name: 'JD'});

console.log("objectStorage items", objectStorage.getItems())
