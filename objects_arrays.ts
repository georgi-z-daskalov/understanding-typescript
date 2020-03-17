// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string]
// } = {
//     name: 'JD', 
//     age: 30,
//     hobbies: [
//         'Sports',
//         'Cooking'
//     ],
//     role: [2, 'author']
// }

// person.hobbies.forEach(hobby => console.log(hobby))

// console.log(person.name);

enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR
};

const person = {
    name: 'JD', 
    age: 30,
    hobbies: [
        'Sports',
        'Cooking'
    ],
    role: Role.ADMIN
}

if (person.role === Role.ADMIN) {
    console.log("person.role", person.role)
}