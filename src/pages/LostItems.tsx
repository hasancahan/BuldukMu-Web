import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, MapPin, Calendar, DollarSign, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ItemCard } from '../components/items/ItemCard';
import { SearchFilters } from '../components/filters/SearchFilters';
import type { LostItem, SearchFilters as Filters } from '../types';

export function LostItems() {
  const navigate = useNavigate();
  const [items, setItems] = useState<LostItem[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data - gerçek uygulamada Supabase'den gelecek
  const mockItems: LostItem[] = [
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
    },
    {
      id: '4',
      user_id: '4',
      title: 'MacBook Pro 16"',
      description: '2023 model MacBook Pro, Space Gray renk. Üzerinde Apple sticker var.',
      category: 'electronics',
      location: {
        lat: 39.9334,
        lng: 32.8597,
        address: 'Kızılay, Ankara',
        city: 'Ankara'
      },
      photos: ['https://images.pexels.com/photos/18105/pexels-photo.jpg'],
      status: 'active',
      reward_amount: 3000,
      is_premium: true,
      date_lost: '2024-01-22',
      created_at: '2024-01-23',
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
      title: 'Diamond Ring',
      description: 'Nişan yüzüğüm, beyaz altın üzerinde 1 karat elmas.',
      category: 'jewelry',
      location: {
        lat: 38.4237,
        lng: 27.1428,
        address: 'Alsancak, İzmir',
        city: 'İzmir'
      },
      photos: ['https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg'],
      status: 'active',
      reward_amount: 5000,
      is_premium: true,
      date_lost: '2024-01-19',
      created_at: '2024-01-20',
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
      title: 'Ev Anahtarı',
      description: 'Kırmızı anahtarlık üzerinde 3 anahtar var.',
      category: 'keys',
      location: {
        lat: 40.1885,
        lng: 29.0610,
        address: 'Nilüfer, Bursa',
        city: 'Bursa'
      },
      photos: ['https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg'],
      status: 'active',
      reward_amount: 200,
      is_premium: false,
      date_lost: '2024-01-24',
      created_at: '2024-01-25',
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

  const handleContact = (item: LostItem) => {
    console.log('Contact item:', item);
  };

  const handleItemClick = (item: LostItem) => {
    console.log('LostItems - handleItemClick called with:', item);
    console.log('Navigating to:', `/item/${item.id}`);
    navigate(`/item/${item.id}`);
  };

  const filteredItems = items.filter(item => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.city && item.location.city !== filters.city) return false;
    if (filters.hasReward && !item.reward_amount) return false;
    return true;
  });

  const stats = [
    { label: 'Toplam Kayıp Eşya', value: items.length.toString(), icon: Search, color: 'from-blue-500 to-purple-600' },
    { label: 'Premium İlanlar', value: items.filter(i => i.is_premium).length.toString(), icon: DollarSign, color: 'from-yellow-500 to-orange-600' },
    { label: 'Ödüllü İlanlar', value: items.filter(i => i.reward_amount).length.toString(), icon: DollarSign, color: 'from-green-500 to-teal-600' },
    { label: 'Aktif İlanlar', value: items.filter(i => i.status === 'active').length.toString(), icon: Calendar, color: 'from-purple-500 to-pink-600' }
  ];

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
            Kayıp Eşyalar
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Kaybolan eşyalarınızı bulun veya bulduğunuz eşyaları sahiplerine ulaştırın.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/post">
              <Button size="lg" className="w-full sm:w-auto">
                <Plus className="w-5 h-5 mr-2" />
                Kayıp Eşya İlanı Ver
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
            Kayıp Eşyalar ({filteredItems.length})
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
                            {item.reward_amount && (
                              <div className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {item.reward_amount} TL
                              </div>
                            )}
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
                              {new Date(item.date_lost).toLocaleDateString('tr-TR')}
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
                                         <ItemCard item={item} onContact={handleContact} onClick={() => handleItemClick(item)} />
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
                Arama kriterlerinize uygun kayıp eşya bulunamadı.
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
