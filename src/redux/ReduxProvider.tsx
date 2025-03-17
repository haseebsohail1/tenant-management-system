import { Provider } from 'react-redux';
import { store,persistor } from './store';
import { AuthHandler } from '@/pages/_app';
import { PersistGate } from "redux-persist/integration/react";

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return (<Provider store={store}>
     <PersistGate loading={<div>Loading...</div>} persistor={persistor}> 
     {/* need to replace this loading */}
    <AuthHandler>
   {children}
   </AuthHandler>
   </PersistGate>

   </Provider>);
};

export default ReduxProvider;
