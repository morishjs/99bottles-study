class BottleNumber {
    static for(number) {
        // const bottleNumberClass = [BottleNumber6, BottleNumber1, BottleNumber0, BottleNumber,].find(candidate => candidate.canHandle(number));

        const bottleNumberClass = eval(`BottleNumber${number}`);
        return new bottleNumberClass(number);
    }
    static canHandle(number) {
        return true;
    }
}

class BottleNumber0 extends BottleNumber {
    static canHandle(number) {
        return number === 0;
    }
}

class BottleNumber1 extends BottleNumber {
    static canHandle(number) {
        return number === 1;
    }
}

class BottleNumber6 extends BottleNumber {
    static canHandle(number) {
        return number === 6;
    }
}

console.log(BottleNumber.for(0))