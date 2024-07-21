const validate = {
  register: {
    firstName (fname, en) {
      const re= /^[a-zA-Z\u0600-\u06FF]+$/;

      switch (false) {
        case fname !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case !fname.includes(' '):
          return en ? 'must not contain Spaces' : 'يجب أن لا يحتوي على مسافات';  
        case re.test(fname):
          return en ? 'must not contain Special Characters \'$%@..\' or Numbers' : 'يجب أن لا يحتوي على أحرف خاصة مثل \'$%@..\' أو أرقام'
        case fname.length > 2:
          return en ? 'must be at least 3 characters' : 'يجب أن يكون على الأقل 3 أحرف';
        case fname.length < 12:
          return en ? 'must not exceed 12 characters' : 'يجب ألا يتجاوز 12 حرفً';
        default:
          return true
      }
    },
    lastName (lname, en) {
      const re= /^[a-zA-Z\u0600-\u06FF]+$/;

      switch (false) {
        case lname !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case !lname.includes(' '):
          return en ? 'must not contain Spaces' : 'يجب أن لا يحتوي على مسافات';  
        case re.test(lname):
          return en ? 'must not contain Special Characters \'$%@..\' or Numbers' : 'يجب أن لا يحتوي على أحرف خاصة مثل \'$%@..\' أو أرقام'
        case lname.length > 2:
          return en ? 'must be at least 3 characters' : 'يجب أن يكون على الأقل 3 أحرف';
        case lname.length < 12:
          return en ? 'must not exceed 12 characters' : 'يجب ألا يتجاوز 12 حرفً';
        default:
          return true
      }
    },
    email (email, en) {
      const re= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      switch (false) {
        case email !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case !email.includes(' '):
          return en ? 'must not contain Spaces' : 'يجب أن لا يحتوي على مسافات';  
        case re.test(email):
            return en ? 'wrong email ex: example@email.com' : 'بريد الكتروني غير صحيح مثال: example@email.com'
        default:
          return true
      }
    },
    phone (phone, en) {
      const re= /^[0-9+]+$/;
      const re1= /^\+963/;

      switch (false) {
        case phone !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case !phone.includes(' '):
          return en ? 'must not contain Spaces' : 'يجب أن لا يحتوي على مسافات';
        case re1.test(phone):
          return en ? 'wrong phone number ex: +963936534080' : 'رقم هاتف خاطئ مثال: +963936534080';
        case phone.length === 13:
          return en ? 'wrong phone number ex: +963936534080' : 'رقم هاتف خاطئ مثال: +963936534080';
        default:
          return true;
      }
    },
    password (password, en) {
      const re= /^(?=.*[a-zA-Z])(?=.*[0-9])/;
      const re1= /^[a-zA-Z]+$/;
      const re2= /^[0-9]+$/;

      switch (false) {
        case password !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case !password.includes(' '):
          return en ? 'must not contain Spaces' : 'يجب أن لا يحتوي على مسافات';
        case password.length > 7:
          return en ? 'must be at least 8 characters' : 'يجب أن يكون على الأقل 8 أحرف';
        case (re.test(password)):
          if (!re1.test(password)) {
            return en ? 'must contain at least one alphabet': 'يجب أن يحتوي على حرف واحد على الأقل';
          } 
          if (!re2.test(password)) {
            return en ? 'must contain at least one number' : 'يجب أن يحتوي على رقم واحد على الأقل';
          };
        default:
          return true;
      }
    },
    confirmPassword (password, confirmedPassword, en) {
      switch (false) {
        case password !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case password === confirmedPassword:
          return en ? 'unmatched password': 'كلمة المرور غير مطابقة';
        default:
          return true;
      }
    },
  },
  login: {
    email (email, en) {
      const re= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      switch (false) {
        case email !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case !email.includes(' '):
          return en ? 'must not contain Spaces' : 'يجب أن لا يحتوي على مسافات';  
        case re.test(email):
            return en ? 'wrong email ex: example@email.com' : 'بريد الكتروني غير صحيح مثال: example@email.com'
        default:
          return true;
      }
    },
    password (password, en) {
      switch (false) {
        case password !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case !password.includes(' '):
          return en ? 'must not contain Spaces' : 'يجب أن لا يحتوي على مسافات';
        default:
          return true;
      }
    }
  },
  placeOrder: {
    phone (phone, en) {
      const re= /^[0-9+]+$/;
      const re1= /^\+963/;

      switch (false) {
        case phone !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case !phone.includes(' '):
          return en ? 'must not contain Spaces' : 'يجب أن لا يحتوي على مسافات';
        case re1.test(phone):
          return en ? 'wrong phone number ex: +963936534080' : 'رقم هاتف خاطئ مثال: +963936534080';
        case phone.length === 13:
          return en ? 'wrong phone number ex: +963936534080' : 'رقم هاتف خاطئ مثال: +963936534080';
        default:
          return true;
      }
    }, 
    addressDetails (addressDetails, en) {

      switch (false) {
        case addressDetails !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        default:
          return true;
      }
    }
  }
}

export default validate;