const array = ["hi", "lol", "LLL"]
let LLL = false;
array.forEach((item) => {
    if (item === "LLL") {
        LLL = true;
        return;
    }
})
console.log(LLL);
