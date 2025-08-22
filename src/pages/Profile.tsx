import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X,
  Plus,
  Search,
  Filter,
  MessageCircle,
  Star,
  Award,
  Settings,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { ItemCard } from '../components/items/ItemCard';
import { useAuth } from '../hooks/useAuth';
import type { LostItem, FoundItem } from '../types';
import toast from 'react-hot-toast';

export function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'posts' | 'messages' | 'settings'>('profile');
  
  const [profileData, setProfileData] = useState({
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 555 123 45 67',
    city: 'İstanbul',
    bio: 'Kayıp eşyaları bulmaya yardımcı olmaya çalışan biriyim. İyilik yapmak en büyük mutluluğum.',
    avatar: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg'
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
      user_id: '1',
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
      status: 'found',
      reward_amount: 1000,
      is_premium: false,
      date_lost: '2024-01-20',
      created_at: '2024-01-21',
      user: {
        id: '1',
        email: 'user@example.com',
        name: 'Ahmet Yılmaz',
        created_at: '2024-01-01'
      }
    }
  ];

  const mockFoundItems: FoundItem[] = [
    {
      id: '1',
      user_id: '1',
      title: 'Ev Anahtarı Bulundu',
      description: 'Beşiktaş\'ta bulunan ev anahtarı. Sahibi aranıyor.',
      category: 'keys',
      location: {
        lat: 41.0766,
        lng: 29.0175,
        address: 'Beşiktaş, İstanbul',
        city: 'İstanbul'
      },
      photos: ['https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg'],
      date_found: '2024-01-18',
      created_at: '2024-01-18',
      user: {
        id: '1',
        email: 'user@example.com',
        name: 'Ahmet Yılmaz',
        created_at: '2024-01-01'
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profil bilgileri güncellendi!');
      setEditing(false);
    } catch (error) {
      toast.error('Profil güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Başarıyla çıkış yapıldı');
      navigate('/');
    } catch (error) {
      toast.error('Çıkış yapılırken bir hata oluştu');
    }
  };

  const stats = [
    { label: 'Toplam İlan', value: (mockLostItems.length + mockFoundItems.length).toString(), icon: Plus, color: 'from-blue-500 to-purple-600' },
    { label: 'Bulunan Eşya', value: mockLostItems.filter(i => i.status === 'found').length.toString(), icon: Award, color: 'from-green-500 to-teal-600' },
    { label: 'Premium İlanlar', value: mockLostItems.filter(i => i.is_premium).length.toString(), icon: Star, color: 'from-yellow-500 to-orange-600' },
    { label: 'Aktif İlanlar', value: mockLostItems.filter(i => i.status === 'active').length.toString(), icon: MessageCircle, color: 'from-purple-500 to-pink-600' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Profil yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-6">
            Profil
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Profil bilgilerinizi yönetin, ilanlarınızı takip edin ve hesap ayarlarınızı düzenleyin.
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

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="p-2">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'profile', label: 'Profil', icon: User },
                { id: 'posts', label: 'İlanlarım', icon: Plus },
                { id: 'messages', label: 'Mesajlar', icon: MessageCircle },
                { id: 'settings', label: 'Ayarlar', icon: Settings }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab(tab.id as any)}
                  className="flex items-center"
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card className="p-8">
              <div className="flex items-start justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Profil Bilgileri</h3>
                <div className="flex space-x-3">
                  {editing ? (
                    <>
                      <Button
                        onClick={handleSaveProfile}
                        loading={loading}
                        size="sm"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Kaydet
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditing(false)}
                        size="sm"
                      >
                        <X className="w-4 h-4 mr-2" />
                        İptal
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setEditing(true)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Düzenle
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Avatar Section */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <img
                      src={profileData.avatar}
                      alt="Profil Fotoğrafı"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {editing && (
                      <Button
                        size="sm"
                        className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mt-4">{profileData.name}</h4>
                  <p className="text-gray-600">Üye since 2024</p>
                </div>

                {/* Profile Form */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Ad Soyad"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!editing}
                      icon={User}
                    />
                    
                    <Input
                      label="E-posta"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!editing}
                      icon={Mail}
                    />
                    
                    <Input
                      label="Telefon"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!editing}
                      icon={Phone}
                    />
                    
                    <Input
                      label="Şehir"
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      disabled={!editing}
                      icon={MapPin}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hakkımda
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 min-h-32 resize-none disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="space-y-8">
              {/* Lost Items */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Kayıp Eşya İlanlarım</h3>
                  <Button onClick={() => navigate('/post')} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni İlan
                  </Button>
                </div>
                
                {mockLostItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockLostItems.map((item) => (
                                           <ItemCard
                       key={item.id}
                       item={item}
                       onContact={() => console.log('Contact:', item)}
                       onClick={() => navigate(`/item/${item.id}`)}
                     />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Plus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Henüz ilan vermediniz</h4>
                    <p className="text-gray-600 mb-4">İlk ilanınızı vermek için tıklayın</p>
                    <Button onClick={() => navigate('/post')}>
                      <Plus className="w-4 h-4 mr-2" />
                      İlan Ver
                    </Button>
                  </div>
                )}
              </Card>

              {/* Found Items */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Bulunan Eşya İlanlarım</h3>
                
                {mockFoundItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockFoundItems.map((item) => (
                      <Card key={item.id}>
                        <div className="relative">
                          <div className="absolute top-3 right-3 z-10">
                            <div className="flex items-center bg-gradient-to-r from-green-400 to-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Bulundu
                            </div>
                          </div>
                          
                          <div className="aspect-video bg-gray-200 rounded-t-xl overflow-hidden">
                            {item.photos[0] && (
                              <img
                                src={item.photos[0]}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>

                          <div className="p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>{item.location.city}</span>
                              <span>{new Date(item.date_found).toLocaleDateString('tr-TR')}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Henüz bulunan eşya ilanı vermediniz</h4>
                    <p className="text-gray-600 mb-4">Bulduğunuz eşyaları paylaşın</p>
                    <Button onClick={() => navigate('/post')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Bulunan Eşya İlanı Ver
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <Card className="p-8">
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Henüz mesajınız yok</h4>
                <p className="text-gray-600 mb-4">İlanlarınızla ilgili mesajlar burada görünecek</p>
                <Button onClick={() => navigate('/')}>
                  İlanları Görüntüle
                </Button>
              </div>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Hesap Ayarları</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">E-posta Bildirimleri</h4>
                    <p className="text-sm text-gray-600">Yeni mesajlar ve güncellemeler için e-posta al</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">SMS Bildirimleri</h4>
                    <p className="text-sm text-gray-600">Önemli güncellemeler için SMS al</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Konum Paylaşımı</h4>
                    <p className="text-sm text-gray-600">İlanlarınızda konum bilgisi paylaş</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" defaultChecked />
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıkış Yap
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
