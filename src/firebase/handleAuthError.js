function handleAuthError (err, en) {
  const { code } = err;

  switch (code) {
    case 'auth/user-disabled':
      return en ? 'The user account has been disabled by an administrator' : 'عنوان البريد الإلكتروني غير صحيح';
    case 'auth/user-not-found':
      return en ? 'There is no user corresponding to the given email' : 'لا يوجد مستخدم مطابق للبريد الإلكتروني المقدم';
    case 'auth/invalid-credential':
      return en ? 'The supplied authentication credential is invalid' : 'بيانات الاعتماد المقدمة غير صالحة. يرجى المحاولة مرة أخرى';
    case 'auth/email-already-in-use':
      return en ? 'The email address is already in use by another account' : 'عنوان البريد الإلكتروني مستخدم بالفعل من قبل حساب آخر';
    case 'auth/invalid-email':
      return en ? 'The email address is badly formatted' : 'عنوان البريد الإلكتروني غير صحيح';
    case 'auth/operation-not-allowed':
      return en ? 'Email/password accounts are not enabled' : 'حسابات البريد الإلكتروني/كلمة المرور غير مفعلة';
    case 'auth/weak-password':
      return en ? 'The password is too weak' : 'كلمة المرور ضعيفة جداً';
    case 'auth/wrong-password':
      return en ? 'The password is invalid for the given email' : 'كلمة المرور غير صحيحة للبريد الإلكتروني المعطىً';
    case 'auth/too-many-requests':
      return en ? 'Too many unsuccessful login attempts' : 'محاولات تسجيل دخول غير ناجحة كثيرة جدًا';
    case 'auth/network-request-failed':
      return en ? 'A network error occurred.' : 'حدث خطأ في الشبكة';
    default:
      return en ? 'An unknown error occurred' : 'حدث خطأ غير معروف';
  }
}

export default handleAuthError;