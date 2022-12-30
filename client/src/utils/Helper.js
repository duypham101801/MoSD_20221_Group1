export function formatCash(str) {
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ".") + prev;
    });
}

export const regexPhoneNumber = (phone) => {
  const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
  return phone.match(regexPhoneNumber) ? true : false;
};

/*

console.log(regexPhoneNumber('0966876806')) // true
console.log(regexPhoneNumber('096687680a')) // false
*/
