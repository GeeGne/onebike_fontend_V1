class Redirector {
  constructor(navigate, headToCheckouts, setHeadToCheckouts) {
    this.navigate = navigate;
    this.setHeadToCheckouts = setHeadToCheckouts;
    this.headToCheckouts = headToCheckouts;
    this.pathname = window.location.pathname;
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

  account (user) {
    if (!user && (this.pathname === '/account' || this.pathname === '/account/')) {
      this.navigate('/account/login');
    } 
  }

  admin (user, userData) {
    if (!user && (this.pathname === '/account/admin' || this.pathname === '/account/admin/')) {
      this.navigate('/account/login');
    } 
    if (user && !userData?.admin && (this.pathname === '/account/admin' || this.pathname === '/account/admin/')) {
      this.navigate('/account');
    } 
  }

  checkout (user) {
    if (!user && (this.pathname === '/checkouts' || this.pathname === '/checkouts/')) {
      this.navigate('/account/login');
    } 
  }

}

export default Redirector;