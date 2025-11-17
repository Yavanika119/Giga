import { StyleSheet, Platform, Dimensions } from 'react-native';

export default function getLoginStyles(theme: any) {
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isLargeScreen = width > 768;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor || '#0A0F20',
      justifyContent: 'center',
      alignItems: 'center',
      padding: isWeb ? 40 : 20,
    },
    formContainer: {
      backgroundColor: theme.cardBackground || 'rgba(30, 35, 55, 0.7)',
      borderRadius: 12,
      padding: isLargeScreen ? 40 : 24,
      width: isLargeScreen ? 400 : '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    title: {
      fontSize: theme.titleFontSize || 28,
      fontWeight: 'bold',
      color: theme.titleColor || '#FFF',
      marginBottom: 8,
      fontFamily: theme.fontFamily || Platform.select({ ios: 'Helvetica', android: 'Roboto' }),
    },
    subtitle: {
      fontSize: theme.subtitleFontSize || 14,
      color: theme.subtitleColor || '#AAA',
      marginBottom: 24,
      fontFamily: theme.fontFamily,
    },
    input: {
      backgroundColor: theme.inputBackground || 'rgba(255, 255, 255, 0.08)',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 16,
      color: theme.inputTextColor || '#FFF',
      fontSize: 16,
    },
    loginButton: {
      backgroundColor: theme.primaryColor || '#5AAFFF',
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 16,
    },
    actionButton: {
      backgroundColor: '#5AAFFF',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 12,
    },

    disabledButton: {
      opacity: 0.6,
    },
    buttonText: {
      color: theme.buttonTextColor || '#000',
      fontSize: 16,
      fontWeight: '600',
      fontFamily: theme.fontFamily,
    },
    linkButton: {
      alignItems: 'center',
    },
    linkText: {
      color: theme.linkColor || '#5AAFFF',
      fontSize: 14,
      fontFamily: theme.fontFamily,
    },
  });
}
