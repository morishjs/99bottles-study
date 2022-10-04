class BottleNumber {
    static registry = [BottleNumber];

    static for(number) {
        const bottleNumberClass = BottleNumber.registry.find(candidate => candidate.canHandle(number));
        return new bottleNumberClass(number);
    }

    static register(candidate) {
        BottleNumber.registry.unshift(candidate);
    }
}

class BottleNumber0 extends BottleNumber {}
BottleNumber.register(BottleNumber0);

class BottleNumber6 extends BottleNumber {
}
BottleNumber.register(BottleNumber6);

class BottleNumber12 extends BottleNumber {
}

console.log(BottleNumber.registry)