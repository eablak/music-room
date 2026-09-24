import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '@/src/theme/ThemeProvider';
import { IPost } from '@/src/store/api/postsApi';

interface PostCardProps {
  post: IPost;
}

export const PostCard = React.memo(function PostCard({ post }: PostCardProps) {
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: colors.primary[50] }]}>
          <Text style={[styles.badgeText, { color: colors.primary[700] }]}>
            #{post.id}
          </Text>
        </View>
        <Text style={[styles.userId, { color: colors.textMuted }]}>
          User {post.userId}
        </Text>
      </View>
      <Text
        style={[styles.title, { color: colors.text }]}
        numberOfLines={2}
      >
        {post.title}
      </Text>
      <Text
        style={[styles.body, { color: colors.textMuted }]}
        numberOfLines={3}
      >
        {post.body}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    gap: 8,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  userId: {
    fontSize: 12,
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    textTransform: 'capitalize',
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
  },
});
