/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke errors messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      errors: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      errors: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      errors: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh errors.
 *      errors: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      errors: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      errors: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      errors: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "errors message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  
  const name = (formData.name ?? "").trim();
  const email = (formData.email ?? "").trim();
  const phone = (formData.phone ?? "").trim();
  const ageRaw = formData.age;
  const pincode = (formData.pincode ?? "").trim();
  const state = (formData.state ?? "").trim();
  const agreeTerms = formData.agreeTerms;

  // validation starts
  let isValid = true;
  let errors = {};

  // --name validation
  if(
    typeof name !== "string" ||
    name.length < 2 ||
    name.length > 50
  ){
    isValid = false;
    errors.name= "Name must be 2-50 characters";
  }
  
  // --email validation
  const atIndex = email.indexOf("@");
  const lastAtIndex = email.lastIndexOf("@");
  const dotAfterAt = email.indexOf(".", atIndex);

  if (
    typeof email !== "string" ||
    atIndex === -1 ||
    atIndex !== lastAtIndex ||
    dotAfterAt === -1
  ) {
    isValid = false;
    errors.email = "Invalid email format";
  }
  
  // --phone validation
  if(
    typeof phone !== "string" ||
    phone.length !== 10 ||
    !["6","7","8","9"].includes(phone.charAt(0)) ||
    !phone.split("").every((ch) => ch >= "0" && ch <= "9")
  ){
    isValid = false;
    errors.phone = "Invalid Indian phone number";
  }
  
  // --age validation
  const age = parseInt(ageRaw);
  if(
    isNaN(age) ||
    !Number.isInteger(Number(ageRaw)) ||
    age < 16 ||
    age > 100 
  ){
    isValid = false;
    errors.age = "Age must be an integer between 16 and 100";
  }
  
  // --pincode validation
  if(
    typeof pincode !== "string" ||
    pincode.length !== 6 ||
    pincode.startsWith("0") ||
    !pincode.split("").every(ch => ch >= "0" && ch <= "9")
  ){
    isValid = false;
    errors.pincode = "Invalid Indian pincode";
  }
  
  // --state validation
  if ((formData.state ?? "").trim() === "") {
    isValid = false;
    errors.state = "State is required";
  }
  
  // --agree Terms validation
  if(!Boolean(agreeTerms)){
    isValid = false;
    errors.agreeTerms = "Must agree to terms";
  }

  
  return{
    isValid,
    errors
  }

}
