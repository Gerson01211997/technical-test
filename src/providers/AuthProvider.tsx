'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import useGetUser from 'services/repository/hooks/auth/useGetUser';
import type { User } from 'services/repository/hooks/auth/types';
import { usePathname } from 'next/navigation';
import { ROUTES } from 'utils/pageRoutes';
import useLogout from 'services/repository/hooks/auth/useLogout';

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

  const { data: user, isLoading, refetch } = useGetUser({
    enabled: !isLoginPage,
  });

  const { mutate } = useLogout({
    onSuccess: () => {
      window.location.href = ROUTES.LOGIN;
    }
  });

  const logout = async () => mutate();

  const value = useMemo(
    () => ({
      user: user ?? null,
      isAuthenticated: !!user,
      isLoading,
      logout,
      refetchUser: refetch,
    }),
    [user, isLoading, refetch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
}
