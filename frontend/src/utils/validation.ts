import * as Yup from 'yup';

const emailSchema = Yup.string()
  .email('Geçerli bir e-posta adresi girin.')
  .required('E-posta adresi zorunludur.');

const passwordSchema = Yup.string()
  .min(6, 'Şifre en az 6 karakter olmalıdır.')
  .required('Şifre zorunludur.');

export const loginValidationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Ad en az 2 karakter olmalıdır.')
    .required('Ad zorunludur.'),
  lastName: Yup.string()
    .min(2, 'Soyad en az 2 karakter olmalıdır.')
    .required('Soyad zorunludur.'),
  username: Yup.string()
    .min(2, 'Kullanıcı adı en az 2 karakter olmalıdır.')
    .required('Kullanıcı adı zorunludur.'),
  birth_date: Yup.string()
    .required('Doğum tarihi zorunludur.'),
  email: emailSchema,
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır.')
    .matches(/[a-z]/, 'Şifre en az bir küçük harf içermelidir.')
    .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir.')
    .matches(/[0-9]/, 'Şifre en az bir rakam içermelidir.')
    .required('Şifre zorunludur.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor.')
    .required('Şifre tekrarı zorunludur.'),
  acceptTerms: Yup.boolean()
    .isTrue('Devam etmek için sözleşmeleri kabul etmelisiniz.'),
});

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: emailSchema,
});

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IRegisterFormValues {
  firstName: string;
  lastName: string;
  username: string;
  birth_date: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface IForgotPasswordFormValues {
  email: string;
}

export const loginInitialValues: ILoginFormValues = {
  email: '',
  password: '',
};

export const registerInitialValues: IRegisterFormValues = {
  firstName: '',
  lastName: '',
  username: '',
  birth_date: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

export const forgotPasswordInitialValues: IForgotPasswordFormValues = {
  email: '',
};
