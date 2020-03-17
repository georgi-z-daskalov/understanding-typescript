var add = function (n1, n2) { return n1 + n2; };
var printResult = function (num) { return console.log("printResult -> num", num); };
var addAndHandle = function (n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
};
printResult(add(5, 3));
var combineValues;
combineValues = add;
console.log("combineValues", combineValues(7, 5));
addAndHandle(10, 20, function (result) {
    console.log('Callback result', result);
});
