export function addLeadingZeros(num, totalLength) {
   return String(num).padStart(totalLength, '0');

   //console.log(addLeadingZeros(3, 2)); // 👉️ "03"
   //console.log(addLeadingZeros(3, 3)); // 👉️ "003"
   //console.log(addLeadingZeros(3, 4)); // 👉️ "0003"
   //console.log(addLeadingZeros(100, 2)); // 👉️ "100"

   // 👇️ Alternatively, simply use the Addition (+) operator
   //const num = '00' + 3;
   //console.log(num); // 👉️ "003"
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++

export function thousands_separators(num) {
   var num_parts = num.toString().split('.');
   num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   return num_parts.join('.');

   //console.log(thousands_separators(1000));
   //console.log(thousands_separators(10000.23));
   //console.log(thousands_separators(100000));
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export function capitalizeWord(str) {
   //convert the string to lowercase
   const lower = str.toLowerCase();

   // converting first letter to uppercase
   const capitalized = str.charAt(0).toUpperCase() + lower.slice(1);

   return capitalized;
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export function getFormattedPrice(price) {
   const formattedPrice = `${price.toFixed(2)}`;
   return formattedPrice;
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export function shortenText(str, n) {
   if (str.length > n) {
      //cut out the first n characters from the string and append 3 dots to the end of the trimmed string
      const shortenedText = str.substring(0, n).concat('...');

      return shortenedText;
   }

   return str;
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const serverBaseURL = 'https://perfumery-back.onrender.com'; //when we deploy the app, the value should be changed to the url that we deployed the server to.

//Make a fetch request to the stripe backend
export async function fetchFromAPI(endpoint, options) {
   //default values - method=POST, body=null
   const { method, body } = { method: 'POST', body: null, ...options };
   //default body value is null, but if body has some options passed to it, the options will overwrite the default null value

   const res = await fetch(`${serverBaseURL}/${endpoint}`, {
      method,
      ...(body && { body: JSON.stringify(body) }),
      headers: {
         'Content-Type': 'application/json',
      },
   });

   return res.json();
}
