const add = (n1: number, n2: number, showResult: boolean, resultFormat: string) => {
    const result = n1 + n2;
    if(showResult) {
        console.log(`${resultFormat} ${result}`)
    }
    return result;
};
