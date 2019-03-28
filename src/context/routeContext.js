import React from 'react';

// creates a global state
export default React.createContext({
    isAuth: false,
    handleLogout: () => {},
    userData: {},
    isHidden: false,
    isMobileHidden: true,
    handleSidebar: () => {},
    handleMobileSidebar: () => {},
    handleMobileCollapse: () => {}
});