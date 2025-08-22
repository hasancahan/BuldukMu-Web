import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Phone, 
  Mail, 
  MessageCircle,
  Share2,
  Heart,
  Flag,
  ArrowLeft,
  Camera,
  Star,
  Award,
  Clock,
  User,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { MapView } from '../components/map/MapView';
import type { LostItem, FoundItem, Location } from '../types';
import toast from 'react-hot-toast';

export function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  console.log('ItemDetail - Component rendered with id:', id);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<LostItem | FoundItem | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [similarItems, setSimilarItems] = useState<(LostItem | FoundItem)[]>([]);

  // Mock data - gerçek uygulamada Supabase'den gelecek
  const mockItem: LostItem = {
    id: '1',
    user_id: '1',
    title: 'iPhone 14 Pro - Kayboldu',
    description: 'Siyah renk iPhone 14 Pro, kamerası çok iyi çalışıyor. Üzerinde mavi kılıf var. Telefon numarası: +90 555 123 45 67. E-posta: ahmet@example.com. Lütfen bulursanız hemen haber verin, çok önemli.',
    category: 'electronics',
    location: {
      lat: 41.0082,
      lng: 28.9784,
      address: 'Sultanahmet Meydanı, Fatih, İstanbul',
      city: 'İstanbul'
    },
    photos: [
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg'
    ],
    status: 'active',
    reward_amount: 500,
    is_premium: true,
    date_lost: '2024-01-15',
    created_at: '2024-01-16',
    user: {
      id: '1',
      email: 'ahmet@example.com',
      name: 'Ahmet Yılmaz',
      created_at: '2024-01-01'
    }
  };

  const mockSimilarItems: (LostItem | FoundItem)[] = [
    {
      id: '2',
      user_id: '2',
      title: 'iPhone 13 Pro Bulundu',
      description: 'Kadıköy\'de bulunan iPhone 13 Pro. Sahibi aranıyor.',
      category: 'electronics',
      location: {
        lat: 41.0369,
        lng: 29.0053,
        address: 'Kadıköy, İstanbul',
        city: 'İstanbul'
      },
      photos: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
      date_found: '2024-01-20',
      created_at: '2024-01-20',
      user: {
        id: '2',
        email: 'ayse@example.com',
        name: 'Ayşe Demir',
        created_at: '2024-01-01'
      }
    },
    {
      id: '3',
      user_id: '3',
      title: 'Samsung Galaxy S23 Kayboldu',
      description: 'Beşiktaş\'ta kaybolan Samsung Galaxy S23. Siyah renk.',
      category: 'electronics',
      location: {
        lat: 41.0766,
        lng: 29.0175,
        address: 'Beşiktaş, İstanbul',
        city: 'İstanbul'
      },
      photos: ['https://images.pexels.com/photos/18105/pexels-photo.jpg'],
      status: 'active',
      reward_amount: 300,
      is_premium: false,
      date_lost: '2024-01-18',
      created_at: '2024-01-18',
      user: {
        id: '3',
        email: 'mehmet@example.com',
        name: 'Mehmet Özkan',
        created_at: '2024-01-01'
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setItem(mockItem);
      setSimilarItems(mockSimilarItems);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Form validation
      if (!contactForm.name || !contactForm.email || !contactForm.message) {
        toast.error('Lütfen tüm gerekli alanları doldurun');
        return;
      }

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Mesajınız başarıyla gönderildi!');
      setShowContactForm(false);
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Mesaj gönderilirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item?.title,
        text: item?.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link kopyalandı!');
    }
  };

  const handleReport = () => {
    toast.success('İlan rapor edildi. Teşekkürler!');
  };

  const isLostItem = (item: any): item is LostItem => {
    return 'status' in item && 'reward_amount' in item;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">İlan detayları yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">İlan Bulunamadı</h2>
          <p className="text-gray-600 mb-4">Aradığınız ilan mevcut değil veya kaldırılmış olabilir.</p>
          <Button onClick={() => navigate('/')}>
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri Dön
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Item Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {isLostItem(item) && item.is_premium && (
                        <div className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          <Star className="w-3 h-3 mr-1" />
                          Premium
                        </div>
                      )}
                      {isLostItem(item) && item.status === 'found' && (
                        <div className="flex items-center bg-gradient-to-r from-green-500 to-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Bulundu
                        </div>
                      )}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {item.title}
                    </h1>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {item.location.city}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {isLostItem(item) 
                          ? new Date(item.date_lost).toLocaleDateString('tr-TR')
                          : new Date((item as FoundItem).date_found).toLocaleDateString('tr-TR')
                        }
                      </span>
                      {isLostItem(item) && item.reward_amount && (
                        <span className="flex items-center text-green-600 font-medium">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {item.reward_amount} TL Ödül
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Paylaş
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReport}
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      Rapor Et
                    </Button>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </motion.div>

            {/* Photos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fotoğraflar</h3>
                
                {/* Main Image */}
                <div className="mb-4">
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    {item.photos[activeImage] ? (
                      <img
                        src={item.photos[activeImage]}
                        alt={`${item.title} - Fotoğraf ${activeImage + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Camera className="w-16 h-16" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                {item.photos.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {item.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          activeImage === index 
                            ? 'border-blue-500 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={photo}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Konum Bilgisi</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location.address}</span>
                  </div>
                  
                  <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
                    <MapView
                      items={[item]}
                      center={item.location}
                      onLocationSelect={() => {}}
                      selectable={false}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            {showContactForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">İletişim Formu</h3>
                  
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Ad Soyad"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                      <Input
                        label="E-posta"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                    
                    <Input
                      label="Telefon (Opsiyonel)"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mesajınız
                      </label>
                      <textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-32 resize-none"
                        placeholder="İlan sahibi ile iletişime geçmek için mesajınızı yazın..."
                        required
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button
                        type="submit"
                        loading={loading}
                        className="flex-1"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Mesaj Gönder
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowContactForm(false)}
                        className="flex-1"
                      >
                        İptal
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">İlan Sahibi</h3>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl font-bold">
                      {item.user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{item.user?.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">Üye since 2024</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {item.user?.email}
                    </div>
                    <div className="flex items-center justify-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Doğrulanmış Üye
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
                
                <div className="space-y-3">
                  <Button
                    onClick={() => setShowContactForm(true)}
                    className="w-full"
                    size="lg"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    İletişime Geç
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Favorilere Ekle
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="w-full"
                    size="lg"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Paylaş
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Item Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">İlan Bilgileri</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Durum:</span>
                    <span className={`font-medium ${
                      isLostItem(item) && item.status === 'found' 
                        ? 'text-green-600' 
                        : 'text-blue-600'
                    }`}>
                      {isLostItem(item) && item.status === 'found' ? 'Bulundu' : 'Aktif'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Kategori:</span>
                    <span className="font-medium text-gray-900">{item.category}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Şehir:</span>
                    <span className="font-medium text-gray-900">{item.location.city}</span>
                  </div>
                  
                  {isLostItem(item) && item.reward_amount && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Ödül:</span>
                      <span className="font-medium text-green-600">{item.reward_amount} TL</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">İlan Tarihi:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(item.created_at).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  
                  {isLostItem(item) && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Kaybolma:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(item.date_lost).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Similar Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Card className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Benzer İlanlar</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarItems.map((similarItem) => (
                <Card key={similarItem.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    {isLostItem(similarItem) && similarItem.status === 'found' && (
                      <div className="absolute top-3 right-3 z-10">
                        <div className="flex items-center bg-gradient-to-r from-green-400 to-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Bulundu
                        </div>
                      </div>
                    )}
                    
                    <div className="aspect-video bg-gray-200 overflow-hidden">
                      {similarItem.photos[0] && (
                        <img
                          src={similarItem.photos[0]}
                          alt={similarItem.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {similarItem.title}
                      </h4>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {similarItem.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {similarItem.location.city}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {isLostItem(similarItem) 
                            ? new Date(similarItem.date_lost).toLocaleDateString('tr-TR')
                            : new Date((similarItem as FoundItem).date_found).toLocaleDateString('tr-TR')
                          }
                        </span>
                      </div>
                      
                      <Button
                        onClick={() => navigate(`/item/${similarItem.id}`)}
                        variant="outline"
                        size="sm"
                        className="w-full mt-3"
                      >
                        Detayları Gör
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
