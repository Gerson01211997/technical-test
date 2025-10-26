import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El email es requerido' })
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Formato de email inválido',
    }),
  password: z.string().min(4, { message: 'La contraseña debe tener al menos 4 caracteres' }),
});
