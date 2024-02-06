
/* get user section */
export const userSession = JSON.parse(sessionStorage.getItem('user'));

/* check role users  */
export const adminCustomerRole = userSession?.role === 'admin' || userSession?.role === 'customer';
export const adminRole = userSession?.role === 'admin';
export const ptRole = userSession?.role === 'pt';
export const customerRole = userSession?.role === 'customer';

