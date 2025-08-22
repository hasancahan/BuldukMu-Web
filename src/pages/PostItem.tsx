import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  MapPin, 
  Camera, 
  DollarSign, 
  Calendar,
  Upload,
  X,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { MapView } from '../components/map/MapView';
import type { Location, ItemCategory } from '../types';
import toast from 'react-hot-toast';

export function PostItem() {
  const navigate = useNavigate();
  const [postType, setPostType] = useState<'lost' | 'found'>('lost');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '' as ItemCategory,
    date: '',
    reward_amount: '',
    is_premium: false,
    photos: [] as string[]
  });
  const [location, setLocation] = useState<Location>({
    lat: 41.0082,
    lng: 28.9784,
    address: 'İstanbul, Türkiye',
    city: 'İstanbul'
  });

  const categories = [
    { value: 'electronics', label: 'Elektronik' },
    { value: 'jewelry', label: 'Takı' },
    { value: 'documents', label: 'Belgeler' },
    { value: 'pets', label: 'Evcil Hayvan' },
    { value: 'clothing', label: 'Giyim' },
    { value: 'keys', label: 'Anahtar' },
    { value: 'bags', label: 'Çanta' },
    { value: 'other', label: 'Diğer' }
  ];

  const cities = [
    'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 
    'Adana', 'Konya', 'Gaziantep', 'Kayseri', 'Mersin'
  ];

  const handleLocationSelect = (selectedLocation: Location) => {
    setLocation(selectedLocation);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Mock photo upload - gerçek uygulamada Supabase'e yüklenecek
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
      toast.success(`${files.length} fotoğraf yüklendi`);
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Form validation
      if (!formData.title || !formData.description || !formData.category || !formData.date) {
        toast.error('Lütfen tüm gerekli alanları doldurun');
        return;
      }

      if (formData.photos.length === 0) {
        toast.error('En az bir fotoğraf yükleyin');
        return;
      }

      // Mock API call - gerçek uygulamada Supabase'e gönderilecek
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success(
        postType === 'lost' 
          ? 'Kayıp eşya ilanınız başarıyla oluşturuldu!' 
          : 'Bulunan eşya ilanınız başarıyla oluşturuldu!'
      );
      
      navigate('/');
    } catch (error) {
      toast.error('İlan oluşturulurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Başarı Oranı', value: '87%', icon: Star, color: 'from-green-500 to-teal-600' },
    { label: 'Ortalama Bulunma', value: '3.2 gün', icon: Calendar, color: 'from-blue-500 to-purple-600' },
    { label: 'Aktif İlanlar', value: '12,543', icon: Plus, color: 'from-purple-500 to-pink-600' },
    { label: 'Mutlu Son', value: '8,721', icon: DollarSign, color: 'from-yellow-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-6">
            {postType === 'lost' ? 'Kayıp Eşya İlanı Ver' : 'Bulunan Eşya İlanı Ver'}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {postType === 'lost' 
              ? 'Kaybolan eşyanızı detaylı bir şekilde tanımlayın ve bulunma şansını artırın.'
              : 'Bulduğunuz eşyayı paylaşın ve sahibine ulaştırın.'
            }
          </p>
          
          {/* Post Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              <Button
                variant={postType === 'lost' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setPostType('lost')}
                className="rounded-md"
              >
                Kayıp Eşya
              </Button>
              <Button
                variant={postType === 'found' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setPostType('found')}
                className="rounded-md"
              >
                Bulunan Eşya
              </Button>
            </div>
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

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Temel Bilgiler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Input
                      label="İlan Başlığı"
                      placeholder={postType === 'lost' ? 'Örn: iPhone 14 Pro kayboldu' : 'Örn: iPhone 14 Pro bulundu'}
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as ItemCategory })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Kategori seçin</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Input
                      label={postType === 'lost' ? 'Kaybolma Tarihi' : 'Bulunma Tarihi'}
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  {postType === 'lost' && (
                    <div>
                      <Input
                        label="Ödül Miktarı (TL)"
                        type="number"
                        placeholder="500"
                        value={formData.reward_amount}
                        onChange={(e) => setFormData({ ...formData, reward_amount: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Açıklama
                    </label>
                    <textarea
                      placeholder={postType === 'lost' 
                        ? 'Eşyanızın detaylı açıklamasını yazın (renk, marka, model, özel işaretler vb.)'
                        : 'Bulduğunuz eşyanın detaylı açıklamasını yazın'
                      }
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 min-h-32 resize-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Photos */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Fotoğraflar</h3>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Fotoğraf Yükle
                      </p>
                      <p className="text-gray-600">
                        En az bir fotoğraf yükleyin. Birden fazla fotoğraf yükleyebilirsiniz.
                      </p>
                    </label>
                  </div>

                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={photo}
                            alt={`Fotoğraf ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Konum Bilgisi</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Şehir
                      </label>
                      <select
                        value={location.city}
                        onChange={(e) => setLocation({ ...location, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      >
                        {cities.map(city => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Input
                        label="Adres"
                        placeholder="Detaylı adres bilgisi"
                        value={location.address}
                        onChange={(e) => setLocation({ ...location, address: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
                    <MapView
                      items={[]}
                      center={location}
                      onLocationSelect={handleLocationSelect}
                      selectable={true}
                    />
                  </div>

                  <p className="text-sm text-gray-600">
                    💡 Haritada konum seçmek için tıklayın veya adres bilgisini manuel olarak girin.
                  </p>
                </div>
              </div>

              {/* Premium Options */}
              {postType === 'lost' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Premium Seçenekler</h3>
                  <Card className="p-6 border-2 border-orange-200 bg-orange-50">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          Premium İlan
                        </h4>
                        <p className="text-gray-600 mb-4">
                          Premium ilanlar daha fazla görünürlük kazanır ve öncelikli olarak gösterilir.
                          Bu seçenek ilanınızın bulunma şansını artırır.
                        </p>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={formData.is_premium}
                            onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })}
                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            Premium ilan olarak yayınla (Ücretsiz)
                          </span>
                        </label>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  size="lg"
                  loading={loading}
                  className="flex-1"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {postType === 'lost' ? 'Kayıp Eşya İlanını Yayınla' : 'Bulunan Eşya İlanını Yayınla'}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  İptal Et
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
