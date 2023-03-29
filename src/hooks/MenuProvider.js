import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const MenuContext = React.createContext(null);

MenuContext.Provider.propTypes = {
  value: PropTypes.shape({
    menu: PropTypes.array.isRequired,
  }),
};

export function MenuProvider({children}) {
  const [menu, setMenu] = useState([]);
  return <MenuContext.Provider value={{ menu, setMenu }}>{children}</MenuContext.Provider>;
}

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useMenu() {
  const context = React.useContext(MenuContext);

  if (context === undefined) {
    throw new Error('useMenu was used outside of its Provider -> MenuContext');
  }

  return context;
}
