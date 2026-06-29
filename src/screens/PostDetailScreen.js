import { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const POST_WIDTH = Platform.OS === 'web' ? 390 : '100%';

export default function PostDetailScreen({ route, navigation }) {
  const { post } = route.params;

  const [conLike, setConLike] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [guardado, setGuardado] = useState(false);

  const manejarLike = () => {
    const nuevoLike = !conLike;
    setConLike(nuevoLike);
    setLikes((prev) => (nuevoLike ? prev + 1 : prev - 1));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header del post */}
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

        {/* Imagen en alta definición */}
        <Image
          source={{ uri: post.imagenUrl }}
          style={styles.postImage}
          resizeMode="cover"
        />

        {/* Barra de acciones */}
        <View style={styles.actions}>
          <View style={styles.leftActions}>
            <TouchableOpacity onPress={manejarLike} style={styles.actionBtn}>
              <Ionicons
                name={conLike ? 'heart' : 'heart-outline'}
                size={28}
                color={conLike ? '#ed4956' : '#000'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="chatbubble-outline" size={26} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="paper-plane-outline" size={26} color="#000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setGuardado((g) => !g)}>
            <Ionicons
              name={guardado ? 'bookmark' : 'bookmark-outline'}
              size={26}
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

        {/* Etiquetas */}
        <Text style={styles.tags}>#gatos #cats #felinos #catlovers #meow</Text>

        {/* Tiempo */}
        <Text style={styles.tiempo}>HACE {post.tiempo}</Text>

        {/* Separador */}
        <View style={styles.separator} />

        {/* Comentarios */}
        <Text style={styles.comentariosTitulo}>Comentarios</Text>
        {post.comentarios.map((comentario) => (
          <View key={comentario.id} style={styles.comentario}>
            <View style={styles.comentarioHeader}>
              <Text style={styles.comentarioUser}>{comentario.username}</Text>
              <Text style={styles.comentarioTiempo}>{comentario.tiempo}</Text>
            </View>
            <Text style={styles.comentarioTexto}>{comentario.texto}</Text>
            <View style={styles.comentarioAcciones}>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={14} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Campo de nuevo comentario */}
        <View style={styles.addCommentRow}>
          <Ionicons name="happy-outline" size={22} color="#888" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.commentInput}
            placeholder="Agrega un comentario..."
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity>
            <Text style={styles.publishBtn}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#c13584',
    padding: 2,
    marginRight: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
  },
  username: {
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
  },
  ubicacion: {
    fontSize: 12,
    color: '#555',
  },
  postImage: {
    width: POST_WIDTH,
    aspectRatio: 1,
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
    marginRight: 16,
  },
  likes: {
    fontWeight: '700',
    fontSize: 14,
    paddingHorizontal: 12,
    marginTop: 8,
    color: '#000',
  },
  captionRow: {
    paddingHorizontal: 12,
    marginTop: 4,
  },
  captionUser: {
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
  },
  caption: {
    fontSize: 14,
    color: '#000',
  },
  tags: {
    paddingHorizontal: 12,
    marginTop: 4,
    color: '#00376b',
    fontSize: 13,
  },
  tiempo: {
    color: '#aaa',
    fontSize: 10,
    paddingHorizontal: 12,
    marginTop: 6,
    letterSpacing: 0.3,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#dbdbdb',
    marginVertical: 12,
  },
  comentariosTitulo: {
    fontWeight: '700',
    fontSize: 14,
    paddingHorizontal: 12,
    marginBottom: 8,
    color: '#000',
  },
  comentario: {
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  comentarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  comentarioUser: {
    fontWeight: '700',
    fontSize: 13,
    color: '#000',
  },
  comentarioTiempo: {
    fontSize: 11,
    color: '#aaa',
  },
  comentarioTexto: {
    fontSize: 13,
    color: '#000',
    marginBottom: 4,
  },
  comentarioAcciones: {
    flexDirection: 'row',
  },
  addCommentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#dbdbdb',
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    fontSize: 13,
    color: '#000',
  },
  publishBtn: {
    color: '#0095f6',
    fontWeight: '700',
    fontSize: 13,
  },
});
