import React from 'react';
import {SocketProvider} from './SocketProvider';
import {BackupProvider} from './BackupProvider';

const AppContextProviders: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  return (
    <SocketProvider>
      <BackupProvider>{children}</BackupProvider>
    </SocketProvider>
  );
};

export default AppContextProviders;
