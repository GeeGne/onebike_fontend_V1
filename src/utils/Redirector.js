class Redirector {
  constructor(navigate, headToCheckouts, setHeadToCheckouts) {
    this.navigate = navigate;
    this.setHeadToCheckouts = setHeadToCheckouts;
    this.headToCheckouts = headToCheckouts;
  }

  signin (user) {
    if (user && this.headToCheckouts) {
      this.setHeadToCheckouts(false);
      this.navigate('/checkouts');
      return;
    }

    if (user) {
      this.navigate('/account');
      return;
    }

  }

  signup (user) {
    // if (user && (pathname === '/account/register' || pathname === '/account/register/')) {
      // this.navigate('/account');
    // }
    if (user && this.headToCheckouts) {
      this.setHeadToCheckouts(false);
      this.navigate('/checkouts');
      return;
    }

    if (user) {
      this.navigate('/account');
      return;
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