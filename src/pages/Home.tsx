import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, MapPin, Users, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ItemCard } from '../components/items/ItemCard';
import { SearchFilters } from '../components/filters/SearchFilters';
import type { LostItem, SearchFilters as Filters } from '../types';

export function Home() {
  const navigate = useNavigate();
  const [items, setItems] = useState<LostItem[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState(true);

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
    // Burada mesajlaşma modalı açılacak
    console.log('Contact item:', item);
  };

  const handleItemClick = (item: LostItem) => {
    navigate(`/item/${item.id}`);
  };

  const stats = [
    { label: 'Toplam İlan', value: '12,543', icon: TrendingUp, color: 'from-blue-500 to-purple-600' },
    { label: 'Bulunan Eşya', value: '8,721', icon: Award, color: 'from-green-500 to-teal-600' },
    { label: 'Aktif Kullanıcı', value: '45,234', icon: Users, color: 'from-purple-500 to-pink-600' },
    { label: 'Şehir', value: '81', icon: MapPin, color: 'from-orange-500 to-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Kayıp Eşyanızı Bulun
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Türkiye'nin en büyük kayıp eşya platformu. Kaybolan eşyanızı paylaşın, 
            bulunan eşyaları inceleyin ve güvenli bir şekilde sahipleri ile buluşturun.
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

        {/* Items Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Son Kayıp Eşyalar</h2>
            <Link to="/lost" className="text-blue-600 hover:text-blue-700 font-medium">
              Tümünü Gör →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="h-96 animate-pulse">
                  <div className="aspect-video bg-gray-200"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                                       <ItemCard item={item} onContact={handleContact} onClick={() => handleItemClick(item)} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}