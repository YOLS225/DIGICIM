import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';

export interface ButtonProps {
  buttonText?: string;
  buttonColor?: string;
  inactive?: boolean;
  loading?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  variant?: 'filled' | 'outline' | 'ghost';
}

export default function SimpleButton({
  buttonText,
  buttonColor,
  inactive,
  loading,
  onPress,
  variant = 'filled',
}: ButtonProps) {
  const bg = buttonColor || Colors.primary;

  const containerStyle = [
    styles.button,
    variant === 'filled' && { backgroundColor: inactive ? Colors.textMuted : bg },
    variant === 'outline' && {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: inactive ? Colors.textMuted : bg,
    },
    variant === 'ghost' && { backgroundColor: 'transparent' },
  ];

  const textStyle = [
    styles.text,
    variant === 'filled' && { color: '#fff' },
    variant === 'outline' && { color: inactive ? Colors.textMuted : bg },
    variant === 'ghost' && { color: inactive ? Colors.textMuted : bg },
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={inactive || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'filled' ? '#fff' : bg} size="small" />
      ) : (
        <Text style={textStyle}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
