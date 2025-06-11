import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Server, MessageCircle, Wifi, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Configuración</Text>
          <Text style={styles.subtitle}>Información del chat en tiempo real</Text>
        </View>

        {/* Información del servidor */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Server size={20} color="#3b82f6" />
            <Text style={styles.sectionTitle}>Servidor WebSocket</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>URL del servidor:</Text>
            <Text style={styles.infoValue}>http://localhost:3001</Text>
            <Text style={styles.infoDescription}>
              Asegúrate de que tu servidor WebSocket esté ejecutándose en esta dirección.
            </Text>
          </View>
        </View>

        {/* Información de la app */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MessageCircle size={20} color="#10b981" />
            <Text style={styles.sectionTitle}>Características del Chat</Text>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>✅ Mensajería en tiempo real</Text>
              <Text style={styles.featureDescription}>
                Los mensajes se envían y reciben instantáneamente
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>✅ Reconexión automática</Text>
              <Text style={styles.featureDescription}>
                Se reconecta automáticamente si se pierde la conexión
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>✅ Estado de conexión visual</Text>
              <Text style={styles.featureDescription}>
                Indicadores visuales del estado de la conexión
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>✅ Scroll automático</Text>
              <Text style={styles.featureDescription}>
                Se desplaza automáticamente a los mensajes más recientes
              </Text>
            </View>
          </View>
        </View>

        {/* Información técnica */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Info size={20} color="#f59e0b" />
            <Text style={styles.sectionTitle}>Información Técnica</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.techInfo}>
              <Text style={styles.techLabel}>Tecnologías:</Text> React Native, Expo Router, Socket.io
            </Text>
            <Text style={styles.techInfo}>
              <Text style={styles.techLabel}>Eventos Socket.io:</Text> 'message' para envío y recepción
            </Text>
            <Text style={styles.techInfo}>
              <Text style={styles.techLabel}>Transporte:</Text> WebSocket con fallback a Polling
            </Text>
            <Text style={styles.techInfo}>
              <Text style={styles.techLabel}>Reconexión:</Text> Hasta 5 intentos con delay de 1 segundo
            </Text>
          </View>
        </View>

        {/* Instrucciones del servidor */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Wifi size={20} color="#ef4444" />
            <Text style={styles.sectionTitle}>Configuración del Servidor</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.instructionTitle}>Para configurar tu servidor Socket.io:</Text>
            <Text style={styles.instruction}>
              1. Crea un servidor Node.js con Express y Socket.io
            </Text>
            <Text style={styles.instruction}>
              2. Escucha el evento 'message' y reenvíalo a todos los clientes
            </Text>
            <Text style={styles.instruction}>
              3. Ejecuta el servidor en http://localhost:3001
            </Text>
            <Text style={styles.instruction}>
              4. Habilita CORS para permitir conexiones desde la app
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#3b82f6',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  featureItem: {
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  techInfo: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 20,
  },
  techLabel: {
    fontWeight: '600',
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  instruction: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 20,
  },
});