import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { usuarioActual, leyendas, tiempos, comentariosEjemplo } from '../data/userData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_SIZE = SCREEN_WIDTH / 3;

function construirPost(img, i) {
  return {
    id: img.id || `pp-${i}`,
    imagenUrl: img.url,
    autorUsername: usuarioActual.username,
    autorAvatar: usuarioActual.avatar,
    leyenda: leyendas[i % leyendas.length],
    ubicacion: 'Buenos Aires, Argentina',
    likes: Math.floor(Math.random() * 5000) + 100,
    comentarios: comentariosEjemplo.slice(0, 2).map((c) => ({ ...c })),
    tiempo: tiempos[i % tiempos.length],
  };
}

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [tabActiva, setTabActiva] = useState('publicaciones');

  useEffect(() => {
    async function cargarPublicaciones() {
      try {
        const res = await axios.get('https://api.thecatapi.com/v1/images/search', {
          params: { limit: 12, size: 'med' },
        });
        setPublicaciones(res.data.map((img, i) => construirPost(img, i)));
      } catch (e) {
        console.error(e);
      } finally {
        setCargando(false);
      }
    }
    cargarPublicaciones();
  }, []);

  const ListHeader = () => (
    <View>
      {/* Info del perfil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarRing}>
          <Image source={{ uri: usuarioActual.avatar }} style={styles.avatar} />
        </View>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{publicaciones.length || usuarioActual.postsCount}</Text>
            <Text style={styles.statLabel}>publicaciones</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{usuarioActual.followers.toLocaleString()}</Text>
            <Text style={styles.statLabel}>seguidores</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{usuarioActual.following}</Text>
            <Text style={styles.statLabel}>seguidos</Text>
          </View>
        </View>
      </View>

      {/* Bio */}
      <View style={styles.bio}>
        <Text style={styles.bioName}>{usuarioActual.name}</Text>
        <Text style={styles.bioText}>{usuarioActual.bio}</Text>
      </View>

      {/* Botones */}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}>
          <Text style={styles.editBtnText}>Compartir perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="person-add-outline" size={16} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tabActiva === 'publicaciones' && styles.tabActiva]}
          onPress={() => setTabActiva('publicaciones')}
        >
          <Ionicons
            name="grid-outline"
            size={22}
            color={tabActiva === 'publicaciones' ? '#000' : '#888'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tabActiva === 'etiquetados' && styles.tabActiva]}
          onPress={() => setTabActiva('etiquetados')}
        >
          <Ionicons
            name="pricetag-outline"
            size={22}
            color={tabActiva === 'etiquetados' ? '#000' : '#888'}
          />
        </TouchableOpacity>
      </View>

      {cargando && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() =>
        navigation.navigate('Home', {
          screen: 'PostDetail',
          params: { post: item },
        })
      }
    >
      <Image source={{ uri: item.imagenUrl }} style={styles.gridImage} resizeMode="cover" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  avatarRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#c13584',
    padding: 3,
    marginRight: 24,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 36,
    backgroundColor: '#f0f0f0',
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNum: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
  statLabel: {
    fontSize: 12,
    color: '#000',
  },
  bio: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  bioName: {
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
    marginBottom: 2,
  },
  bioText: {
    fontSize: 13,
    color: '#000',
    lineHeight: 18,
  },
  buttons: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 14,
    gap: 8,
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#efefef',
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: 'center',
  },
  shareBtn: {
    flex: 1,
    backgroundColor: '#efefef',
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: 'center',
  },
  iconBtn: {
    backgroundColor: '#efefef',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtnText: {
    fontWeight: '600',
    fontSize: 13,
    color: '#000',
  },
  tabs: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#dbdbdb',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tabActiva: {
    borderBottomColor: '#000',
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
});
