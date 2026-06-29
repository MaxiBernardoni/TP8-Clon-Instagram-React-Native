import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { historias } from '../data/userData';

function ItemHistoria({ historia }) {
  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.7}>
      <View style={[styles.ring, historia.esPropia && styles.ringPropia]}>
        <Image source={{ uri: historia.avatar }} style={styles.avatar} />
        {historia.esPropia && (
          <View style={styles.addBadge}>
            <Ionicons name="add" size={12} color="#fff" />
          </View>
        )}
      </View>
      <Text style={styles.username} numberOfLines={1}>
        {historia.username}
      </Text>
    </TouchableOpacity>
  );
}

export default function Stories() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {historias.map((historia) => (
          <ItemHistoria key={historia.id} historia={historia} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingHorizontal: 10,
  },
  item: {
    alignItems: 'center',
    marginHorizontal: 6,
    width: 66,
  },
  ring: {
    width: 66,
    height: 66,
    borderRadius: 33,
    padding: 2,
    borderWidth: 2,
    borderColor: '#c13584',
    marginBottom: 4,
    position: 'relative',
  },
  ringPropia: {
    borderColor: '#dbdbdb',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
  },
  addBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0095f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  username: {
    fontSize: 11,
    color: '#000',
    textAlign: 'center',
    width: 66,
  },
});
