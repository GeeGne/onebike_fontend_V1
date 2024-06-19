function handleAuthError (err, en) {
  const {code} = err;

  switch (code) {
    case 'auth/email-already-in-use':
      return en ? 'The email address is already in use by another account.' : 'عنوان البريد الإلكتروني مستخدم بالفعل من قبل حساب آخر';
    case 'auth/invalid-email':
      return en ? 'The email address is badly formatted.' : 'عنوان البريد الإلكتروني غير صحيح';
    case 'auth/operation-not-allowed':
      return en ? 'Email/password accounts are not enabled.' : 'حسابات البريد الإلكتروني/كلمة المرور غير مفعلة';
    case 'auth/weak-password':
      return en ? 'The password is too weak.' : 'كلمة المرور ضعيفة جداً';
    default:
      return en ? 'An unknown error occurred.' : 'حدث خطأ غير معروف';
  }
}

export default handleAuthError;