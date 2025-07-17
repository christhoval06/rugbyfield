import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';

export function useStore(mapStateToProps) {
  const context = useContext(MobXProviderContext);

  if (context === undefined) {
    throw new Error('useStore was used outside of its Provider -> MobXProviderContext');
  }

  if (!context.store) {
    throw new Error("Provider -> MobXProviderContext haven't prop store");
  }

  if (typeof mapStateToProps === 'function') {
    return mapStateToProps(context.store);
  }

  return context.store;
}
