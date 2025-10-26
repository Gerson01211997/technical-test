'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import useLogin from '@repository/hooks/auth/useLogin';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import { useTranslation } from 'hooks/useTranslation';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ROUTES } from 'utils/pageRoutes';
import { className as Styles } from './constants';
import { loginSchema } from './schema';
import type { LoginFormData } from './types';

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
    <div className={Styles.root}>
      <div className={Styles.container}>
        <div className={Styles.header}>
          <h2 className={Styles.title}>{t('login.title')}</h2>
          <p className={Styles.subtitle}>{t('login.subtitle')}</p>
        </div>

        <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={Styles.formGroup}>
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

          {errors.root && <div className={Styles.error}>{errors.root.message}</div>}

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

          <div className={Styles.textInfo}>
            <p>{t('login.subtitle')}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

LoginForm.displayName = 'loginForm';

export default LoginForm;
