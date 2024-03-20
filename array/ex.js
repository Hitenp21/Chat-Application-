// // const arr = [1,{age:21},7,9,{name:"Hiten"},12]
// // // console.log(arr[0])
// // // console.log(arr[Math.floor(arr.length/2)])
// // // console.log(arr[arr.length -1])

// // console.log(arr.length)

// // const itCompanies = ["Facebook", "Google", "Microsoft" ,"Apple","IBM" ,"Oracle" , "Amazon"]
// // // const totale = companies.length
// // // console.log(companies.length)

// // // console.log(companies[0])
// // // console.log(companies[Math.floor(totale/2)])
// // // console.log(companies[totale - 1])

// // // companies.forEach(e=> {
// // //     console.log(e.toUpperCase())
// // // });

// // // const sentence = companies.slice(0,-1).join(", ") + " and " + companies[totale -1] +" are big it companies";

// // // console.log(sentence)

// // // function ifCompanies(companie){
// // //     if(companies.includes(companie)){
// // //         return `${companie} are exist`
// // //     }else{
// // //         return " companie not found!"
// // //     }
// // // }

// // // console.log(ifCompanies('Microsofts'))

// // // function findCompanieWithmorethanOneO(companies) {
// // //     let totale = [];
// // //     for( let company of companies){
// // //         let firstIndexO = company.toLowerCase().indexOf('o');
// // //         let secondIndexOfO = company.toLowerCase().indexOf('o',firstIndexO+1)

// // //         if(secondIndexOfO === -1){
// // //             totale.push(company)
// // //         }
// // //     }
// // //     return totale
// // // }

// // // const findCompanies = findCompanieWithmorethanOneO(itCompanies)
// // // console.log(findCompanies)

// // // console.log(itCompanies.reverse())

// // // function reverseArr (companies){
// // //     for(let i=0 ; i<=Math.floor(companies.length/2) ; i++){
// // //         let tmp = companies [i];
// // //         companies[i] = companies[companies.length-1-i];
// // //         companies[companies.length-1-i]=tmp;
// // //     }
// // // }

// // // reverseArr(itCompanies);
// // // console.log(itCompanies)

// // // console.log(itCompanies.slice(-3))

// // let mindleIndex = Math.floor(itCompanies.length/2);
// // let middleIndices = itCompanies.length % 2 === 0 ? [mindleIndex - 1,mindleIndex] : mindleIndex;

// // let middleCompanie = itCompanies.slice(...middleIndices);
// // console.log(middleCompanie)

// let itCompanies = ["Facebook", "Google", "Microsoft", "Apple", "IBM", "Oracle", "Amazon"];

// // Calculate the middle index or indices
// let middleIndex = Math.floor(itCompanies.length / 2);
// let middleIndices = itCompanies.length % 2 === 0 ? [middleIndex - 1, middleIndex] : [middleIndex];

// // Use slice to get the middle company or companies
// let middleCompanies = itCompanies.slice(...middleIndices);

// // Display the result
// console.log(middleCompanies);

let itCompanies = ["Facebook", "Google", "Microsoft", "Apple", "IBM", "Oracle", "Amazon","plutomen"];

// // Calculate the middle index

// let middleIndex = Math.floor(itCompanies.length / 2);

// // Use slice to get the middle company or companies
// let middleCompanies = itCompanies.slice(middleIndex, middleIndex + 1);

// // Display the result
// console.log(middleCompanies);

// let removefirst = itCompanies.shift();
// let removeLast = itCompanies.pop();
// console.log(itCompanies)


// // Calculate the middle index
// let middleIndex = Math.floor(itCompanies.length / 2);

// // Remove the middle company or companies
// if (itCompanies.length % 2 === 0) {
//     // Even length: remove two middle companies
//     itCompanies.splice(middleIndex - 1, 2);
// } else {
//     // Odd length: remove one middle company
//     itCompanies.splice(middleIndex, 1);
// }

// // Display the modified array
// console.log("Modified Array:", itCompanies);

itCompanies.splice(0,itCompanies.length);

console.log(itCompanies)

// Remove all IT companies
itCompanies.splice(0, itCompanies.length);

// Display the modified array
console.log("Modified Array:", itCompanies);
