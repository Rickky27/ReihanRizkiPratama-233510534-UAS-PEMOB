import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  SafeAreaView, 
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

// Mengimpor komponen kustom kamu
import CustomInput from './src/components/CustomInput';
import Card from './src/components/Card';
import CustomButton from './src/components/CustomButton';

// 1. Mendefinisikan Interface untuk Data (Best Practice TypeScript)
interface Car {
  id: string;
  name: string;
  category: string;
  transmission: 'Automatic' | 'Manual';
  price: number;
  rating: number;
  passengers: number;
  imageUrl: string;
}

// 2. Memperbanyak Data Dummy Katalog Mobil
const CAR_DATA: Car[] = [
  { 
    id: '1', name: 'Toyota Avanza', category: 'MPV', transmission: 'Automatic', 
    price: 400000, rating: 4.8, passengers: 7,
    imageUrl: 'https://th.bing.com/th/id/OIP.ReileU325jQrORtKjzRLuQHaE8?w=278&h=185&c=7&r=0&o=7&pid=1.7&rm=3' 
  },
  { 
    id: '2', name: 'Honda Brio RS', category: 'City Car', transmission: 'Manual', 
    price: 300000, rating: 4.9, passengers: 5,
    imageUrl: 'https://th.bing.com/th/id/OIP.7wyHtESmTd_T9q3cWpE13wHaHa?w=199&h=199&c=7&r=0&o=7&pid=1.7&rm=3' 
  },
  { 
    id: '3', name: 'Mitsubishi Pajero Sport', category: 'SUV', transmission: 'Automatic', 
    price: 900000, rating: 4.7, passengers: 7,
    imageUrl: 'https://th.bing.com/th/id/OIF.gBNlB4CKQdge55zs4fHkig?w=297&h=180&c=7&r=0&o=7&pid=1.7&rm=3' 
  },
  { 
    id: '4', name: 'Toyota Innova Reborn', category: 'MPV', transmission: 'Automatic', 
    price: 650000, rating: 4.9, passengers: 7,
    imageUrl: 'https://th.bing.com/th/id/OIP.kM1mt97Dy43AB6-RNH5f0QHaEK?w=304&h=180&c=7&r=0&o=7&pid=1.7&rm=3' 
  },
  { 
    id: '5', name: 'Honda HR-V', category: 'SUV', transmission: 'Automatic', 
    price: 550000, rating: 4.8, passengers: 5,
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.tSssUK5eeORV9UydH8WtCwHaFh?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' 
  },
  { 
    id: '6', name: 'Daihatsu Ayla', category: 'City Car', transmission: 'Manual', 
    price: 250000, rating: 4.5, passengers: 5,
    imageUrl: 'https://th.bing.com/th/id/OIP.kM1mt97Dy43AB6-RNH5f0QHaEK?w=304&h=180&c=7&r=0&o=7&pid=1.7&rm=3' 
  },
];

const CATEGORIES = ['Semua', 'MPV', 'SUV', 'City Car', 'Sedan'];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Fungsi utilitas untuk memformat harga ke Rupiah
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const renderCarItem = ({ item }: { item: Car }) => (
    <Card>
      <View style={styles.cardContainer}>
        {/* Gambar Mobil */}
        <Image source={{ uri: item.imageUrl }} style={styles.carImage} />
        
        <View style={styles.cardContent}>
          {/* Info Atas: Kategori & Rating */}
          <View style={styles.rowBetween}>
            <Text style={styles.categoryBadge}>{item.category}</Text>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          </View>

          {/* Nama Mobil */}
          <Text style={styles.carName}>{item.name}</Text>
          
          {/* Spesifikasi Singkat */}
          <Text style={styles.carSpecs}>
            {item.transmission} • 👤 {item.passengers} Kursi
          </Text>

          {/* Info Bawah: Harga & Tombol */}
          <View style={styles.bottomRow}>
            <View>
              <Text style={styles.priceLabel}>Mulai dari</Text>
              <Text style={styles.carPrice}>{formatRupiah(item.price)}<Text style={styles.perDay}>/hari</Text></Text>
            </View>
            <CustomButton
              title="Sewa"
              onPress={() => console.log(`Proses booking untuk ${item.name}`)}
            />
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Sewa Mobil Cepat di Pekanbaru 🚗</Text>
        <Text style={styles.subtitle}>Temukan kendaraan terbaik untuk perjalananmu hari ini.</Text>
        <CustomInput
          placeholder="Cari Avanza, Brio, Pajero..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Horizontal Category Filter */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.categoryChip, 
                activeCategory === cat && styles.activeCategoryChip
              ]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === cat && styles.activeCategoryText
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Car List Section */}
      <FlatList
        data={CAR_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderCarItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9', // Sedikit lebih soft dari abu-abu standar
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 20,
  },
  categoryContainer: {
    paddingVertical: 15,
    paddingLeft: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    marginRight: 10,
  },
  activeCategoryChip: {
    backgroundColor: '#2E66E7',
  },
  categoryText: {
    color: '#4A5568',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  carImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#EDF2F7',
    color: '#2D3748',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D69E2E',
  },
  carName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 4,
  },
  carSpecs: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
    paddingTop: 12,
  },
  priceLabel: {
    fontSize: 12,
    color: '#A0AEC0',
    marginBottom: 2,
  },
  carPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2E66E7',
  },
  perDay: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#718096',
  },
});