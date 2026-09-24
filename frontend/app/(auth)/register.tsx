import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { router } from 'expo-router';
import { UserPlus } from 'lucide-react-native';
import { AuthScreenWrapper } from '@/src/components/common/AuthScreenWrapper';
import { FormInput } from '@/src/components/common/FormInput';
import { Button } from '@/src/components/common/Button';
import { Checkbox } from '@/src/components/common/Checkbox';
import { useThemeColors } from '@/src/theme/ThemeProvider';
import { useAuth } from '@/src/core/auth/AuthProvider';
import {
  registerValidationSchema,
  registerInitialValues,
  IRegisterFormValues,
} from '@/src/utils/validation';
import { showToast } from '@/src/components/common/Toast';

export default function RegisterScreen() {
  const colors = useThemeColors();
  const { signUp } = useAuth();

  const handleSubmit = async (values: IRegisterFormValues) => {
    try {
      await signUp(values.email, values.password);
      showToast('Hesabınız oluşturuldu.');
    } catch (error) {
      showToast((error as Error).message);
    }
  };

  return (
    <AuthScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={[styles.iconWrap, { backgroundColor: colors.secondary[50] }]}>
            <UserPlus size={32} color={colors.secondary[600]} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Hesap Oluştur</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Hemen kayıt olun ve başlayın
          </Text>
        </View>

        <Formik
          initialValues={registerInitialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
            <View style={styles.form}>
              <View style={styles.row}>
                <View style={styles.flex1}>
                  <FormInput
                    label="Ad"
                    placeholder="Adınız"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    error={errors.firstName}
                    touched={touched.firstName}
                    returnKeyType="next"
                  />
                </View>
                <View style={styles.flex1}>
                  <FormInput
                    label="Soyad"
                    placeholder="Soyadınız"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    error={errors.lastName}
                    touched={touched.lastName}
                    returnKeyType="next"
                  />
                </View>
              </View>

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
                returnKeyType="next"
              />

              <FormInput
                label="Şifre"
                placeholder="••••••••"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                secureTextEntry
                returnKeyType="next"
              />

              <FormInput
                label="Şifre Tekrar"
                placeholder="••••••••"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                secureTextEntry
                returnKeyType="done"
              />

              <View style={styles.termsRow}>
                <Checkbox
                  checked={values.acceptTerms}
                  onToggle={() => setFieldValue('acceptTerms', !values.acceptTerms)}
                />
                <View style={styles.termsText}>
                  <Text style={[styles.termsLabel, { color: colors.text }]}>
                    {'Sözleşmeleri kabul ediyorum: '}
                  </Text>
                  <TouchableOpacity onPress={() => router.push('/(auth)/terms')}>
                    <Text style={[styles.termsLink, { color: colors.primary[600] }]}>
                      Kullanım Şartları ve Gizlilik Politikası
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {touched.acceptTerms && errors.acceptTerms && (
                <Text style={[styles.termsError, { color: colors.error[500] }]}>
                  {errors.acceptTerms}
                </Text>
              )}

              <Button
                label="Kayıt Ol"
                onPress={() => handleSubmit()}
                loading={isSubmitting}
                style={styles.submitBtn}
              />
            </View>
          )}
        </Formik>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>
            Zaten hesabınız var mı?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
            <Text style={[styles.footerLink, { color: colors.primary[600] }]}>
              Giriş Yapın
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AuthScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
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
  },
  form: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 4,
  },
  termsText: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsLabel: {
    fontSize: 14,
    fontWeight: '400',
  },
  termsLink: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  termsError: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  submitBtn: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    paddingBottom: 16,
  },
  footerText: {
    fontSize: 15,
  },
  footerLink: {
    fontSize: 15,
    fontWeight: '600',
  },
});
