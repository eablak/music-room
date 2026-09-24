import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { router } from 'expo-router';
import { KeyRound, ArrowLeft, CheckCircle } from 'lucide-react-native';
import { AuthScreenWrapper } from '@/src/components/common/AuthScreenWrapper';
import { FormInput } from '@/src/components/common/FormInput';
import { Button } from '@/src/components/common/Button';
import { useThemeColors } from '@/src/theme/ThemeProvider';
import { useAuth } from '@/src/core/auth/AuthProvider';
import {
  forgotPasswordValidationSchema,
  forgotPasswordInitialValues,
  IForgotPasswordFormValues,
} from '@/src/utils/validation';
import { showToast } from '@/src/components/common/Toast';

export default function ForgotPasswordScreen() {
  const colors = useThemeColors();
  const { resetPassword } = useAuth();
  const [sent, setSent] = useState(false);

  const handleSubmit = async (values: IForgotPasswordFormValues) => {
    try {
      await resetPassword(values.email);
      setSent(true);
      showToast('Sıfırlama bağlantısı gönderildi.');
    } catch (error) {
      showToast((error as Error).message);
    }
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(auth)/login');
    }
  };

  return (
    <AuthScreenWrapper>
      <TouchableOpacity
        onPress={handleGoBack}
        style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <ArrowLeft size={20} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: colors.warning[50] }]}>
          {sent ? (
            <CheckCircle size={32} color={colors.success[600]} />
          ) : (
            <KeyRound size={32} color={colors.warning[600]} />
          )}
        </View>
        <Text style={[styles.title, { color: colors.text }]}>
          {sent ? 'E-posta Gönderildi' : 'Şifremi Unuttum'}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          {sent
            ? 'Sıfırlama bağlantısı e-posta adresinize gönderildi. Gelen kutunuzu kontrol edin.'
            : 'Şifrenizi sıfırlamak için e-posta adresinizi girin.'}
        </Text>
      </View>

      {sent ? (
        <View style={styles.successCard}>
          <Button
            label="Giriş Ekranına Dön"
            variant="primary"
            onPress={() => router.replace('/(auth)/login')}
          />
        </View>
      ) : (
        <Formik
          initialValues={forgotPasswordInitialValues}
          validationSchema={forgotPasswordValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.form}>
              <FormInput
                label="E-posta"
                placeholder="ornek@email.com"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
                autoComplete="email"
                returnKeyType="done"
              />
              <Button
                label="Sıfırlama Bağlantısı Gönder"
                onPress={() => handleSubmit()}
                loading={isSubmitting}
                style={styles.submitBtn}
              />
            </View>
          )}
        </Formik>
      )}

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textMuted }]}>
          Şifrenizi hatırladınız mı?{' '}
        </Text>
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={[styles.footerLink, { color: colors.primary[600] }]}>
            Giriş Yapın
          </Text>
        </TouchableOpacity>
      </View>
    </AuthScreenWrapper>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  header: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    gap: 16,
  },
  successCard: {
    gap: 16,
  },
  submitBtn: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 15,
  },
  footerLink: {
    fontSize: 15,
    fontWeight: '600',
  },
});
