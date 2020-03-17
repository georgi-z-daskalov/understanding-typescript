let userInput: unknown;

userInput = 5;
userInput = 'Me';

const generateError = (message: string, code: number): never => {
    throw {message, errorCode: code }
}

const result = generateError('An error occurred!', 500);
console.log("result");