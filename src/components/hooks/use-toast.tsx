import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

type RootLayoutProps = {
  children: ReactNode;
};

export default function useToast({ children }: RootLayoutProps) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}