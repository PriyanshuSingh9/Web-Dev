const passwords = [
  "Password123",     // ✅ valid — meets all criteria
  "password123",     // ❌ no uppercase letters
  "PASSWORD123",     // ❌ no lowercase letters
  "Password",        // ❌ no digit
  "Pass12",          // ❌ less than 8 characters
  "passWORD1",       // ✅ valid — has upper, lower, digit, >= 8
  "12345678",        // ❌ only digits
  "ValidPass1",      // ✅ valid
  "Va1",             // ❌ too short
  "StrongPass2025",  // ✅ valid — long, mixed, digits
  "weakpassword",    // ❌ only lowercase, no digit
  "MIXEDcase",       // ❌ no digit
  "Valid123",        // ✅ valid — exactly 8 chars, has all
  "NoDigitsHere",    // ❌ missing digit
  "Upperlower1"      // ✅ valid
];

function validator(password){
    let len=password.length;
    let num=0;
    let upper=0;
    let lower=0;
    for (const i in password) {
        const char = password[i];
        const code = char.charCodeAt(0);
        if(code >= 65 && code <= 90){upper+=1}
        else if(code >= 97 && code <= 122){lower+=1}
        else if(code >= 48 && code <= 57){num+=1}
    }
    if(len>=8 && num>0 &&upper>0&&lower>0){
        console.log(`${password} is valid`)
    }
    else{
        console.log(`${password} is invalid`)
    }
}

passwords.map(validator);