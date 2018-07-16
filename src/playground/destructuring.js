
// const person = {
//    name:'Johnny',
//    age: 26,
//    location: {
//       city:'Brooklyn',
//       temp: 92
//    }
// }

// const { name = 'Anonymous', age, location } = person;
// const { city, temp:temperature } = location;

// console.log(`${name} is ${age}`);
// console.log(`He live in ${city} and today it is ${temperature}`);

// const book = {
//    title: 'Ego is the Enemy',
//    author: 'Ryan Holiday',
//    publisher: {
//       name: 'Penguin'
//    }
// };

// const { name:publisherName = 'Self-Published' } = book.publisher;
// console.log(`${publisherName}`);

const address = ['1299 S Juniper Street', 'Philidelph', 'PA','19147'];
const [, city, state, zip] = address;
console.log(`You are in ${city} ${state}.`);