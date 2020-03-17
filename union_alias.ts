type CombineType = number | string;
type CombineResultType = 'as-number' | 'as-text';

const combine = (input1: CombineType, input2: CombineType, resultType: CombineResultType) => {
    let result: CombineType;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultType === 'as-number') {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString()
    }
    
    return result;
};

const combineAges = combine(20, 42, 'as-number');
console.log("combineAges", combineAges);
const combineStringAges = combine('20', '42', 'as-number');
console.log("combineStringAges", combineStringAges);
const combineNames = combine('JD', 'Rali', 'as-text');
console.log("combineNames", combineNames);


