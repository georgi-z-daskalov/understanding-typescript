var add = function (n1, n2, showResult, resultFormat) {
    var result = n1 + n2;
    if (showResult) {
        console.log(resultFormat + " " + result);
    }
    return result;
};
