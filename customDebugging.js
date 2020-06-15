class InputError extends Error { }

function promptDdirection(question) {
    let result = "left";
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R";
    throw new InputError("Invalid direction: " + result);
}
for (; ;) {
    try {
        let dir = promptDdirection("Where?");
        console.log("You chose ", dir);
        break;
    } catch (e) {
        if (e instanceof InputError) {
            console.log("Not a valid direction. Try again.");
        } else {
            throw e;
        }
    }
}

class MultiplicatorUnitFailure extends Error { }

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}



function reliableMultiply(a, b) {
    for (;;){
        try {
            let dir = primitiveMultiply(a, b)
            console.log(dir);
            break;
        }
        catch (e){
            if (!(e instanceof MultiplicatorUnitFailure)){
                throw e;
            }
        }
    }
}

console.log(reliableMultiply(8, 8));