import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, FileText, Shield, ScrollText } from 'lucide-react-native';
import { useThemeColors } from '@/src/theme/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TermsScreen() {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <ArrowLeft size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Sözleşmeler</Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Section
          icon={<FileText size={20} color={colors.primary[600]} />}
          title="Kullanım Şartları"
          colors={colors}
        >
          Bu uygulama, yalnızca yasal amaçlarla kullanım için sunulmaktadır. Kullanıcı, uygulamayı kullanırken tüm yürürlükteki yasalara ve yönetmeliklere uymakla yükümlüdür. Hesap güvenliğinizden siz sorumlusunuz ve hesabınız üzerinden yapılan tüm işlemlerden siz sorumlu tutulursunuz.
        </Section>

        <Section
          icon={<Shield size={20} color={colors.secondary[600]} />}
          title="Gizlilik Politikası"
          colors={colors}
        >
          Kişisel verileriniz, yalnızca hizmet sunumu ve kullanıcı deneyimini iyileştirme amacıyla işlenir. E-posta adresiniz kimlik doğrulama ve iletişim amacıyla kullanılır. Verileriniz üçüncü taraflarla paylaşılmaz ve ilgili veri koruma yasalarına uygun olarak saklanır.
        </Section>

        <Section
          icon={<ScrollText size={20} color={colors.accent[600]} />}
          title="Sorumluluk Reddi"
          colors={colors}
        >
          Uygulama "olduğu gibi" sunulmaktadır. Hizmetin kesintisiz veya hatasız olacağına dair garanti verilmemektedir. Uygulamanın kullanımı sonucunda oluşabilecek doğrudan veya dolaylı zararlardan sağlayıcı sorumlu tutulamaz.
        </Section>

        <Section
          icon={<FileText size={20} color={colors.success[600]} />}
          title="İletişim"
          colors={colors}
        >
          Sözleşmeler veya uygulama kullanımı hakkında sorularınız için destek ekibimizle iletişime geçebilirsiniz. Geri bildirimleriniz uygulamanın geliştirilmesine katkı sağlar.
        </Section>
      </ScrollView>
    </View>
  );
}

function Section({
  icon,
  title,
  children,
  colors,
}: {
  icon: React.ReactNode;
  title: string;
  children: string;
  colors: ReturnType<typeof useThemeColors>;
}) {
  return (
    <View
      style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <View style={styles.sectionHeader}>
        {icon}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      </View>
      <Text style={[styles.sectionBody, { color: colors.textMuted }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 24,
    gap: 16,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    gap: 12,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
  },
});
