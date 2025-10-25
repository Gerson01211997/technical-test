'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { ROUTES } from 'utils/pageRoutes';
import useLogin from 'services/repository/hooks/auth/useLogin';
import { loginSchema } from './schema';
import { LoginFormData } from './types';

function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || ROUTES.HOME;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending: isLoading } = useLogin({
    onSuccess: () => {
      router.push(redirectTo);
    },
    onError: (error) => {
      setError('root', {
        type: 'manual',
        message: error?.message || 'Error en el login',
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('login.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('login.subtitle')}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              id="email"
              type="email"
              label={t('login.email')}
              placeholder={t('login.emailPlaceholder')}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id="password"
              type="password"
              label={t('login.password')}
              placeholder={t('login.passwordPlaceholder')}
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          {errors.root && (
            <div className="text-red-600 text-sm text-center">
              {errors.root.message}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? t('login.loading') : t('login.submit')}
          </Button>

          <div className="text-center text-sm text-gray-600">
            <p>{t('login.subtitle')}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

LoginForm.displayName = "loginForm"

export default LoginForm;
