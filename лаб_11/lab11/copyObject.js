function copyObj(input) {
   if (typeof input !== 'object' || input instanceof Date) {
      return input;
   }

   let output = Array.isArray(input) ? [] : {};

   for (let el in input) {
      if (typeof input[el] === 'object') {
         copyObj(input[el]);
      }
      output[el] = input[el];
   }

   return output;
}

let obj = { a: 1, b: () => 2 };
let obj2 = copyObj(obj);

console.log(obj === obj2, obj2);