import { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import PostCard from '../components/PostCard';
import Stories from '../components/Stories';
import { autoresPost, leyendas, ubicaciones, tiempos, comentariosEjemplo } from '../data/userData';

function construirPost(imagenGato, indice) {
  const autor = autoresPost[indice % autoresPost.length];
  return {
    id: imagenGato.id || `post-${indice}`,
    imagenUrl: imagenGato.url,
    autorUsername: autor.username,
    autorAvatar: autor.avatar,
    leyenda: leyendas[indice % leyendas.length],
    ubicacion: ubicaciones[indice % ubicaciones.length],
    likes: Math.floor(Math.random() * 9000) + 200,
    comentarios: comentariosEjemplo.slice(0, 3).map((c) => ({ ...c })),
    tiempo: tiempos[indice % tiempos.length],
  };
}

export default function HomeScreen({ navigation }) {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarGatos() {
      try {
        const respuesta = await axios.get(
          'https://api.thecatapi.com/v1/images/search',
          { params: { limit: 15, size: 'med' } }
        );
        setPublicaciones(respuesta.data.map((img, i) => construirPost(img, i)));
      } catch (err) {
        setError('No se pudieron cargar las imágenes. Verificá tu conexión.');
        console.error(err);
      } finally {
        setCargando(false);
      }
    }
    cargarGatos();
  }, []);

  if (cargando) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Cargando publicaciones...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={(post) => navigation.navigate('PostDetail', { post })}
          />
        )}
        ListHeaderComponent={<Stories />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    color: '#555',
    fontSize: 14,
  },
  errorText: {
    color: '#ed4956',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
