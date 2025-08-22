import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Filter, Search, Crosshair, Layers, Navigation } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SearchFilters } from '../components/filters/SearchFilters';
import { MapView } from '../components/map/MapView';
import type { LostItem, FoundItem, SearchFilters as Filters, Location } from '../types';

export function Map() {
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState(true);
  const [mapType, setMapType] = useState<'all' | 'lost' | 'found'>('all');
  const [center, setCenter] = useState<Location>({
    lat: 41.0082,
    lng: 28.9784,
    address: 'İstanbul, Türkiye',
    city: 'İstanbul'
  });

  // Mock data - gerçek uygulamada Supabase'den gelecek
  const mockLostItems: LostItem[] = [
    {
      id: '1',
      user_id: '1',
      title: 'iPhone 14 Pro',
      description: 'Siyah renk iPhone 14 Pro, kamerası çok iyi çalışıyor. Üzerinde mavi kılıf var.',
      category: 'electronics',
      location: {
        lat: 41.0082,
        lng: 28.9784,
        address: 'Sultanahmet, İstanbul',
        city: 'İstanbul'
      },
      photos: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
      status: 'active',
      reward_amount: 500,
      is_premium: true,
      date_lost: '2024-01-15',
      created_at: '2024-01-16',
      user: {
        id: '1',
        email: 'user@example.com',
        name: 'Ahmet Yılmaz',
        created_at: '2024-01-01'
      }
    },
    {
      id: '2',
      user_id: '2',
      title: 'Altın Kolye',
      description: 'Annemin hediye ettiği altın kolye. Çok değerli, lütfen bulursanız haber verin.',
      category: 'jewelry',
      location: {
        lat: 41.0369,
        lng: 29.0053,
        address: 'Kadıköy, İstanbul',
        city: 'İstanbul'
      },
      photos: ['https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg'],
      status: 'active',
      reward_amount: 1000,
      is_premium: false,
      date_lost: '2024-01-20',
      created_at: '2024-01-21',
      user: {
        id: '2',
        email: 'user2@example.com',
        name: 'Ayşe Demir',
        created_at: '2024-01-01'
      }
    },
    {
      id: '3',
      user_id: '3',
      title: 'Köpek - Golden Retriever',
      description: 'Charlie isimli golden retriever köpeğim. Çok sakin, insanlara alışkın.',
      category: 'pets',
      location: {
        lat: 41.0766,
        lng: 29.0175,
        address: 'Beşiktaş, İstanbul',
        city: 'İstanbul'
      },
      photos: ['https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg'],
      status: 'active',
      reward_amount: 2000,
      is_premium: true,
      date_lost: '2024-01-18',
      created_at: '2024-01-18',
      user: {
        id: '3',
        email: 'user3@example.com',
        name: 'Mehmet Özkan',
        created_at: '2024-01-01'
      }
    }
  ];

  const mockFoundItems: FoundItem[] = [
    {
      id: '1',
      user_id: '1',
      title: 'iPhone 14 Pro Bulundu',
      description: 'Sultanahmet Meydanı\'nda bulunan iPhone 14 Pro. Siyah renk, mavi kılıf. Sahibi aranıyor.',
      category: 'electronics',
      location: {
        lat: 41.0082,
        lng: 28.9784,
        address: 'Sultanahmet, İstanbul',
        city: 'İstanbul'
      },
      photos: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
      date_found: '2024-01-25',
      created_at: '2024-01-25',
      user: {
        id: '1',
        email: 'user@example.com',
        name: 'Ahmet Yılmaz',
        created_at: '2024-01-01'
      }
    },
    {
      id: '2',
      user_id: '2',
      title: 'Altın Kolye Bulundu',
      description: 'Kadıköy\'de bulunan altın kolye. Sahibini arıyoruz.',
      category: 'jewelry',
      location: {
        lat: 41.0369,
        lng: 29.0053,
        address: 'Kadıköy, İstanbul',
        city: 'İstanbul'
      },
      photos: ['https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg'],
      date_found: '2024-01-24',
      created_at: '2024-01-24',
      user: {
        id: '2',
        email: 'user2@example.com',
        name: 'Ayşe Demir',
        created_at: '2024-01-01'
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLostItems(mockLostItems);
      setFoundItems(mockFoundItems);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLocationSelect = (location: Location) => {
    setCenter(location);
    console.log('Selected location:', location);
  };

  const getFilteredItems = () => {
    let items: any[] = [];
    
    if (mapType === 'all' || mapType === 'lost') {
      items.push(...lostItems);
    }
    if (mapType === 'all' || mapType === 'found') {
      items.push(...foundItems);
    }

    // Apply filters
    return items.filter(item => {
      if (filters.category && item.category !== filters.category) return false;
      if (filters.city && item.location.city !== filters.city) return false;
      return true;
    });
  };

  const stats = [
    { label: 'Toplam Kayıp Eşya', value: lostItems.length.toString(), icon: MapPin, color: 'from-red-500 to-pink-600' },
    { label: 'Toplam Bulunan Eşya', value: foundItems.length.toString(), icon: Search, color: 'from-green-500 to-teal-600' },
    { label: 'Aktif İlanlar', value: lostItems.filter(i => i.status === 'active').length.toString(), icon: Navigation, color: 'from-blue-500 to-purple-600' },
    { label: 'Bu Ay', value: (lostItems.length + foundItems.length).toString(), icon: Layers, color: 'from-yellow-500 to-orange-600' }
  ];

  const cities = [
    { name: 'İstanbul', lat: 41.0082, lng: 28.9784 },
    { name: 'Ankara', lat: 39.9334, lng: 32.8597 },
    { name: 'İzmir', lat: 38.4237, lng: 27.1428 },
    { name: 'Bursa', lat: 40.1885, lng: 29.0610 },
    { name: 'Antalya', lat: 36.8969, lng: 30.7133 }
  ];

  const goToCity = (city: typeof cities[0]) => {
    setCenter({
      lat: city.lat,
      lng: city.lng,
      address: city.name,
      city: city.name
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Harita yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Harita Görünümü
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Kayıp ve bulunan eşyaları harita üzerinde görüntüleyin, konum bazlı arama yapın.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Map Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              {/* Map Type Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Harita Türü:</span>
                <Button
                  variant={mapType === 'all' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setMapType('all')}
                >
                  Tümü
                </Button>
                <Button
                  variant={mapType === 'lost' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setMapType('lost')}
                >
                  Kayıp Eşyalar
                </Button>
                <Button
                  variant={mapType === 'found' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setMapType('found')}
                >
                  Bulunan Eşyalar
                </Button>
              </div>

              {/* City Quick Navigation */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Hızlı Git:</span>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <Button
                      key={city.name}
                      variant="outline"
                      size="sm"
                      onClick={() => goToCity(city)}
                      className="text-xs"
                    >
                      {city.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Search Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <SearchFilters filters={filters} onFiltersChange={setFilters} />
        </motion.div>

        {/* Map View */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Harita Görünümü
              </h2>
              <p className="text-gray-600">
                {mapType === 'all' && 'Tüm kayıp ve bulunan eşyalar'}
                {mapType === 'lost' && 'Sadece kayıp eşyalar'}
                {mapType === 'found' && 'Sadece bulunan eşyalar'}
                {' '}harita üzerinde gösteriliyor.
              </p>
            </div>
            
            <MapView
              items={getFilteredItems()}
              center={center}
              onLocationSelect={handleLocationSelect}
              selectable={false}
            />
          </Card>
        </motion.div>

        {/* Map Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Harita Açıklaması</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Kayıp Eşyalar</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Bulunan Eşyalar</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Premium İlanlar</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">💡 İpucu</h4>
              <p className="text-sm text-blue-800">
                Harita üzerindeki işaretlere tıklayarak eşya detaylarını görebilir, 
                filtreleme yaparak sadece istediğiniz kategorideki eşyaları haritada görüntüleyebilirsiniz.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
