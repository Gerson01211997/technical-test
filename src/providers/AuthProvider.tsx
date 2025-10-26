'use client';

import type { User } from '@repository/hooks/auth/types';
import useGetUser from '@repository/hooks/auth/useGetUser';
import useLogout from '@repository/hooks/auth/useLogout';
import { usePathname } from 'next/navigation';
import { type ReactNode, createContext, useContext, useMemo } from 'react';
import { ROUTES } from 'utils/pageRoutes';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === ROUTES.LOGIN;

  const {
    data: user,
    isLoading,
    refetch,
  } = useGetUser({
    enabled: !isLoginPage,
  });

  const { mutate } = useLogout({
    onSuccess: () => {
      window.location.href = ROUTES.LOGIN;
    },
  });

  const value = useMemo(
    () => ({
      user: user ?? null,
      isAuthenticated: !!user,
      isLoading,
      logout: async () => mutate(),
      refetchUser: refetch,
    }),
    [user, isLoading, refetch, mutate],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
}
