import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useSocket, Message } from '@/hooks/useSocket';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { MessageItem } from '@/components/MessageItem';
import { MessageInput } from '@/components/MessageInput';

export default function ChatScreen() {
  const { connected, connecting, messages, sendMessage, connectionError, userId } = useSocket();
  const flatListRef = useRef<FlatList<Message>>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (messages.length > 0) {
      // Pequeño delay para asegurar que el render se complete
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const renderMessage = ({ item }: { item: Message }) => {
    const isOwn = item.userId === userId;
    return <MessageItem message={item} isOwn={isOwn} />;
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>¡Bienvenido al Chat!</Text>
      <Text style={styles.emptySubtitle}>
        {connecting 
          ? 'Conectando al servidor...'
          : connected 
            ? 'Envía tu primer mensaje para comenzar la conversación'
            : 'Verifica tu conexión a internet y que el servidor esté funcionando'
        }
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Chat en Tiempo Real</Text>
        <Text style={styles.subtitle}>
          {messages.length} {messages.length === 1 ? 'mensaje' : 'mensajes'}
        </Text>
      </View>

      {/* Estado de conexión */}
      <ConnectionStatus 
        connected={connected} 
        connecting={connecting} 
        error={connectionError}
      />

      {/* Lista de mensajes */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={messages.length === 0 ? styles.emptyContainer : styles.messagesContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        onContentSizeChange={() => {
          if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: false });
          }
        }}
      />

      {/* Input para enviar mensajes */}
      <MessageInput
        onSendMessage={sendMessage}
        disabled={!connected}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  messagesList: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  messagesContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyState: {
    alignItems: 'center',
    maxWidth: 300,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});