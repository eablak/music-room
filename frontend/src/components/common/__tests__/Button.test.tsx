import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Button } from '@/src/components/common/Button';

jest.mock('@/src/theme/ThemeProvider', () => ({
  useThemeColors: () => ({
    primary: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
      400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
      800: '#1e40af', 900: '#1e3a8a',
    },
    secondary: {
      50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
      400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
      800: '#115e59', 900: '#134e4a',
    },
  }),
}));

describe('Button component', () => {
  it('renders the label text', async () => {
    const { getByText } = await render(<Button label="Test Action" onPress={() => {}} />);
    await waitFor(() => expect(getByText('Test Action')).toBeTruthy());
  });

  it('calls onPress when tapped', async () => {
    const onPressMock = jest.fn();
    const { getByText } = await render(<Button label="Tap Me" onPress={onPressMock} />);
    await waitFor(() => expect(getByText('Tap Me')).toBeTruthy());
    fireEvent.press(getByText('Tap Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPressMock = jest.fn();
    const { getByText } = await render(
      <Button label="Disabled" onPress={onPressMock} disabled />,
    );
    await waitFor(() => expect(getByText('Disabled')).toBeTruthy());
    fireEvent.press(getByText('Disabled'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('does not render the label when loading', async () => {
    const { queryByText } = await render(
      <Button label="Loading" onPress={() => {}} loading />,
    );
    await waitFor(() => expect(queryByText('Loading')).toBeNull());
  });

  it('renders different variants without crashing', async () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost'] as const;
    for (const variant of variants) {
      const { unmount } = await render(
        <Button label={variant} onPress={() => {}} variant={variant} />,
      );
      unmount();
    }
  });
});
