import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useGetPostsQuery } from '@/src/store/api/postsApi';
import { BaseComponent } from '@/src/core/base/BaseComponent';
import { PostCard } from '@/src/components/specific/PostCard';
import { useThemeColors } from '@/src/theme/ThemeProvider';
import { ErrorHandler } from '@/src/core/exceptions/ErrorHandler';
import { IPost } from '@/src/store/api/postsApi';

export default function FeedScreen() {
  const colors = useThemeColors();
  const { data, isLoading, isError, error, refetch, isFetching } = useGetPostsQuery();

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isError) {
    ErrorHandler.log(error, 'FeedScreen.getPosts');
  }

  const renderItem = useCallback(({ item }: { item: IPost }) => {
    return <PostCard post={item} />;
  }, []);

  return (
    <BaseComponent
      isLoading={isLoading}
      isError={isError}
      errorMessage={(error as Error)?.message ?? 'Gönderiler yüklenemedi.'}
      onRetry={handleRetry}
      skeletonVariant="list"
      skeletonCount={5}
      scrollable={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Feed</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          {data ? `${data.length} posts` : 'Loading...'}
        </Text>
      </View>
      <FlashList
        data={data ?? []}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        refreshing={isFetching && !isLoading}
        onRefresh={refetch}
        overrideItemLayout={(layout, item) => {
          layout.span = 1;
        }}
        drawDistance={250}
      />
    </BaseComponent>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
