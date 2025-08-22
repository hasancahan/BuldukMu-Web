import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, MapPin, Calendar, DollarSign, Search, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ItemCard } from '../components/items/ItemCard';
import { SearchFilters } from '../components/filters/SearchFilters';
import type { FoundItem, SearchFilters as Filters } from '../types';

export function FoundItems() {
  const navigate = useNavigate();
  const [items, setItems] = useState<FoundItem[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data - gerçek uygulamada Supabase'den gelecek
  const mockItems: FoundItem[] = [
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
    },
    {
      id: '3',
      user_id: '3',
      title: 'Golden Retriever Köpek Bulundu',
      description: 'Beşiktaş\'ta bulunan golden retriever köpek. Sahibi aranıyor.',
      category: 'pets',
      location: {
        lat: 41.0766,
        lng: 29.0175,
        address: 'Beşiktaş, İstanbul',
        city: 'İstanbul'
      },
      photos: ['https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg'],
      date_found: '2024-01-23',
      created_at: '2024-01-23',
      user: {
        id: '3',
        email: 'user3@example.com',
        name: 'Mehmet Özkan',
        created_at: '2024-01-01'
      }
    },
    {
      id: '4',
      user_id: '4',
      title: 'MacBook Pro Bulundu',
      description: 'Ankara\'da bulunan MacBook Pro. Sahibi aranıyor.',
      category: 'electronics',
      location: {
        lat: 39.9334,
        lng: 32.8597,
        address: 'Kızılay, Ankara',
        city: 'Ankara'
      },
      photos: ['https://images.pexels.com/photos/18105/pexels-photo.jpg'],
      date_found: '2024-01-22',
      created_at: '2024-01-22',
      user: {
        id: '4',
        email: 'user4@example.com',
        name: 'Zeynep Kaya',
        created_at: '2024-01-01'
      }
    },
    {
      id: '5',
      user_id: '5',
      title: 'Diamond Ring Bulundu',
      description: 'İzmir\'de bulunan elmas yüzük. Sahibi aranıyor.',
      category: 'jewelry',
      location: {
        lat: 38.4237,
        lng: 27.1428,
        address: 'Alsancak, İzmir',
        city: 'İzmir'
      },
      photos: ['https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg'],
      date_found: '2024-01-21',
      created_at: '2024-01-21',
      user: {
        id: '5',
        email: 'user5@example.com',
        name: 'Can Özkan',
        created_at: '2024-01-01'
      }
    },
    {
      id: '6',
      user_id: '6',
      title: 'Ev Anahtarı Bulundu',
      description: 'Bursa\'da bulunan ev anahtarı. Sahibi aranıyor.',
      category: 'keys',
      location: {
        lat: 40.1885,
        lng: 29.0610,
        address: 'Nilüfer, Bursa',
        city: 'Bursa'
      },
      photos: ['https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg'],
      date_found: '2024-01-20',
      created_at: '2024-01-20',
      user: {
        id: '6',
        email: 'user6@example.com',
        name: 'Fatma Demir',
        created_at: '2024-01-01'
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setItems(mockItems);
      setLoading(false);
    }, 1000);
  }, []);

  const handleContact = (item: FoundItem) => {
    console.log('Contact item:', item);
  };

  const handleItemClick = (item: FoundItem) => {
    console.log('FoundItems - handleItemClick called with:', item);
    console.log('Navigating to:', `/item/${item.id}`);
    navigate(`/item/${item.id}`);
  };

  const filteredItems = items.filter(item => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.city && item.location.city !== filters.city) return false;
    return true;
  });

  const stats = [
    { label: 'Toplam Bulunan Eşya', value: items.length.toString(), icon: Search, color: 'from-green-500 to-teal-600' },
    { label: 'Bu Ay Bulunan', value: items.filter(i => new Date(i.date_found).getMonth() === new Date().getMonth()).length.toString(), icon: Calendar, color: 'from-blue-500 to-purple-600' },
    { label: 'Elektronik', value: items.filter(i => i.category === 'electronics').length.toString(), icon: DollarSign, color: 'from-purple-500 to-pink-600' },
    { label: 'Takı', value: items.filter(i => i.category === 'jewelry').length.toString(), icon: CheckCircle, color: 'from-yellow-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Bulunan Eşyalar
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Bulduğunuz eşyaları paylaşın ve sahiplerine ulaştırın. İyilik yapın, mutlu olun!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/post">
              <Button size="lg" className="w-full sm:w-auto">
                <Plus className="w-5 h-5 mr-2" />
                Bulunan Eşya İlanı Ver
              </Button>
            </Link>
            <Link to="/map">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <MapPin className="w-5 h-5 mr-2" />
                Haritada Görüntüle
              </Button>
            </Link>
          </div>
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

        {/* Search Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <SearchFilters filters={filters} onFiltersChange={setFilters} />
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Bulunan Eşyalar ({filteredItems.length})
          </h2>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              Liste
            </Button>
          </div>
        </motion.div>

        {/* Items Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {loading ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {[...Array(6)].map((_, i) => (
                <Card key={i} className={`animate-pulse ${viewMode === 'list' ? 'h-32' : 'h-96'}`}>
                  {viewMode === 'list' ? (
                    <div className="flex items-center space-x-4 p-6">
                      <div className="w-20 h-20 bg-gray-200 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="aspect-video bg-gray-200"></div>
                      <div className="p-6 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                      </div>
                    </>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {viewMode === 'list' ? (
                    <Card 
                      className="h-32 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="flex items-center space-x-4 p-6 h-full">
                        <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                          {item.photos[0] && (
                            <img
                              src={item.photos[0]}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {item.title}
                            </h3>
                            <div className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Bulundu
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {item.location.city}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(item.date_found).toLocaleDateString('tr-TR')}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContact(item);
                          }}
                          className="flex-shrink-0"
                        >
                          İletişim
                        </Button>
                      </div>
                    </Card>
                  ) : (
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="relative">
                        <div className="absolute top-3 right-3 z-10">
                          <div className="flex items-center bg-gradient-to-r from-green-400 to-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Bulundu
                          </div>
                        </div>
                        
                        <div className="aspect-video bg-gray-200 rounded-t-xl overflow-hidden">
                          {item.photos[0] ? (
                            <img
                              src={item.photos[0]}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full"></div>
                                <p className="text-sm">Fotoğraf Yok</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {item.title}
                              </h3>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {item.category}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {item.description}
                          </p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-2" />
                              {item.location.address}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-2" />
                              {new Date(item.date_found).toLocaleDateString('tr-TR')}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                  {item.user?.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="text-sm text-gray-600">{item.user?.name}</span>
                            </div>

                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleContact(item);
                              }}
                              className="flex items-center"
                            >
                              İletişim
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sonuç Bulunamadı
              </h3>
              <p className="text-gray-600 mb-4">
                Arama kriterlerinize uygun bulunan eşya bulunamadı.
              </p>
              <Button
                variant="outline"
                onClick={() => setFilters({})}
              >
                Filtreleri Temizle
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
