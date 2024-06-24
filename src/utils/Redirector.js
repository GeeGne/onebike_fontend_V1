class Redirector {
  constructor(navigate) {
    this.navigate = navigate;
  }

  signin (pathname, user) {
    if (user && (pathname === '/account/login' || pathname === '/account/login/')) {
      this.navigate('/account');
    } 
    if (user && (pathname === '/checkouts/login' || pathname === '/checkouts/login/')) {
      this.navigate('/checkouts');
    } 
  }

  signup (pathname, user) {
    if (user && (pathname === '/account/register' || pathname === '/account/register/')) {
      this.navigate('/account');
    } 
  }

  account (pathname, user) {
    if (!user && (pathname === '/account' || pathname === '/account/')) {
      this.navigate('/account/login');
    } 
  }

  // checkout (pathname, user) {
  //   if (!user && (pathname === '/checkouts' || pathname === '/checkouts/')) {
  //     this.navigate('/account/login');
  //   } 
  // }

}

export default Redirector;