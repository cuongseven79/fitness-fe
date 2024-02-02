
// !Password format
// 1. Chuỗi phải chứa ít nhất một ký tự chữ (A-Z, a-z).
// 2. Chuỗi phải chứa ít nhất một ký tự số (0-9).
// 3. Độ dài của chuỗi phải ít nhất là 8 ký tự.
// 4. Chuỗi chỉ có thể chứa các ký tự chữ và số.

// !Phone number format
// 1. Độ dài của chuỗi phải là 10 ký tự.
// 2. Chuỗi chỉ có thể chứa các ký tự số.

// !Email format
// 1. Chuỗi phải chứa một ký tự @.
// 2. Chuỗi phải chứa một ký tự .
// 3. Chuỗi phải chứa ít nhất một ký tự chữ (A-Z, a-z).
// 4. Chuỗi phải chứa ít nhất một ký tự số (0-9).
// 5. Chuỗi chỉ có thể chứa các ký tự chữ, số, @ và .

export function validPassword(password) { 
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters. Example: Teonguyen2023@ ');
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(password)) {
        throw new Error('Password must be at least 8 characters, include at least one letter, one number, and one special character. Example: Teonguyen2023@');
    }
}

export function validPhoneNumber(phoneNumber) {
     if (!/^\d{10}$/.test(phoneNumber)) {
        throw new Error('Phone number can only contain digits. Example: 0123456789');
    }
     if (!/^0\d{9}$/.test(phoneNumber)) {
        throw new Error('Phone number must start with 0. Example: 0123456789');
     }
     
    
}

export function validEmail(email) {
    if (!/\./.test(email)) {
        throw new Error('Email must contain ("."). Example: teonguyen@gmail.com');
    }
   if (!/^([a-zA-Z0-9].*){8,}@[^@]*$/.test(email)) {
    throw new Error('Email must contain at least 8 characters (letters or digits). Example: teonguyen@gmail.com');
    }
}