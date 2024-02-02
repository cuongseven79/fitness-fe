
/* get user section */
export const userSection = JSON.parse(sessionStorage.getItem('user'));

/* check role users  */
export const adminCustomerRole = userSection?.role === 'admin' || userSection?.role === 'customer';
export const adminRole = userSection?.role === 'admin';
export const ptRole = userSection?.role === 'pt';
export const customerRole = userSection?.role === 'customer';

