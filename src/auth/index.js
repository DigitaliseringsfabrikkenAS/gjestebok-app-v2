// jshint esversion: 6

export default {
  userData: {
    isLoggedIn: false,
  },

  userHasRole(roleCheck) {
    try {
      if (!roleCheck) return false;
      const roles = JSON.parse(localStorage.userData).roles;
      const err = {};
      if (!roles || roles.length === 0) throw err;
      return roles.some(r => roleCheck.includes(r))
    } catch (err) {
      return false;
    }
  },

  // Check if uuid exists
  isLoggedIn() {
      const user = localStorage.userData ? JSON.parse(localStorage.userData) : null
    if (user) {
      this.userData.isLoggedIn = true;
    } else {
      this.userData.isLoggedIn = false;
    }
    return this.userData.isLoggedIn;
  },
};
