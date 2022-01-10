const array = ["Marta§", "Paolo§"];

console.log(array.includes("§"));

console.log("Paolo§".includes("§"));

for (let i = 0; i < array.length; i++) {
    var result = array[i].includes("§")
    if (result) {
        break;
    }
}

