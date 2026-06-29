import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PostCard({ post, onPress }) {
  const [conLike, setConLike] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [guardado, setGuardado] = useState(false);

  const manejarLike = () => {
    const nuevoLike = !conLike;
    setConLike(nuevoLike);
    setLikes((prev) => (nuevoLike ? prev + 1 : prev - 1));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarRing}>
            <Image source={{ uri: post.autorAvatar }} style={styles.avatar} />
          </View>
          <View>
            <Text style={styles.username}>{post.autorUsername}</Text>
            <Text style={styles.ubicacion}>{post.ubicacion}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Imagen del post */}
      <TouchableOpacity activeOpacity={0.95} onPress={() => onPress(post)}>
        <Image
          source={{ uri: post.imagenUrl }}
          style={styles.postImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Barra de acciones */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={manejarLike} style={styles.actionBtn}>
            <Ionicons
              name={conLike ? 'heart' : 'heart-outline'}
              size={26}
              color={conLike ? '#ed4956' : '#000'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => onPress(post)}>
            <Ionicons name="chatbubble-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="paper-plane-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setGuardado((g) => !g)}>
          <Ionicons
            name={guardado ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <Text style={styles.likes}>{likes.toLocaleString()} Me gusta</Text>

      {/* Leyenda */}
      <View style={styles.captionRow}>
        <Text>
          <Text style={styles.captionUser}>{post.autorUsername} </Text>
          <Text style={styles.caption}>{post.leyenda}</Text>
        </Text>
      </View>

      {/* Ver comentarios */}
      {post.comentarios.length > 0 && (
        <TouchableOpacity onPress={() => onPress(post)}>
          <Text style={styles.verComentarios}>
            Ver los {post.comentarios.length} comentarios
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.tiempo}>HACE {post.tiempo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#c13584',
    padding: 2,
    marginRight: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  username: {
    fontWeight: '700',
    fontSize: 13,
    color: '#000',
  },
  ubicacion: {
    fontSize: 11,
    color: '#555',
  },
  postImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: '#f0f0f0',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    marginRight: 14,
  },
  likes: {
    fontWeight: '700',
    fontSize: 13,
    paddingHorizontal: 12,
    marginTop: 6,
    color: '#000',
  },
  captionRow: {
    paddingHorizontal: 12,
    marginTop: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  captionUser: {
    fontWeight: '700',
    fontSize: 13,
    color: '#000',
  },
  caption: {
    fontSize: 13,
    color: '#000',
  },
  verComentarios: {
    color: '#888',
    fontSize: 13,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  tiempo: {
    color: '#aaa',
    fontSize: 10,
    paddingHorizontal: 12,
    marginTop: 4,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
});
