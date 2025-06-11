import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Wifi, WifiOff, Loader } from 'lucide-react-native';

interface ConnectionStatusProps {
  connected: boolean;
  connecting: boolean;
  error?: string | null;
}

export function ConnectionStatus({ connected, connecting, error }: ConnectionStatusProps) {
  const getStatusColor = () => {
    if (connecting) return '#f59e0b';
    if (connected) return '#10b981';
    return '#ef4444';
  };

  const getStatusText = () => {
    if (connecting) return 'Conectando...';
    if (connected) return 'Conectado';
    return error || 'Desconectado';
  };

  const getStatusIcon = () => {
    const color = getStatusColor();
    const size = 16;

    if (connecting) return <Loader size={size} color={color} />;
    if (connected) return <Wifi size={size} color={color} />;
    return <WifiOff size={size} color={color} />;
  };

  return (
    <View style={[styles.container, { backgroundColor: getStatusColor() + '20' }]}>
      {getStatusIcon()}
      <Text style={[styles.text, { color: getStatusColor() }]}>
        {getStatusText()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});