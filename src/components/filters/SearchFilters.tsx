import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, 
  MapPin, 
  Calendar, 
  DollarSign,
  Search,
  X
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import type { SearchFilters as Filters } from '../../types';

interface SearchFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

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

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Kayıp eşya ara..."
              className="pl-10"
              value={filters.category || ''}
              onChange={(e) => onFiltersChange({ ...filters, category: e.target.value as any })}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtrele
          </Button>
        </div>
      </Card>

      {/* Advanced Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={filters.category || ''}
                  onChange={(e) => onFiltersChange({ ...filters, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tümü</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şehir
                </label>
                <select
                  value={filters.city || ''}
                  onChange={(e) => onFiltersChange({ ...filters, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tümü</option>
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reward */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasReward"
                  checked={filters.hasReward || false}
                  onChange={(e) => onFiltersChange({ ...filters, hasReward: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="hasReward" className="ml-2 text-sm text-gray-700">
                  Sadece ödüllü ilanlar
                </label>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlangıç Tarihi
                </label>
                <Input
                  type="date"
                  value={filters.dateFrom || ''}
                  onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bitiş Tarihi
                </label>
                <Input
                  type="date"
                  value={filters.dateTo || ''}
                  onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
                />
              </div>

              {/* Radius */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yarıçap (km)
                </label>
                <Input
                  type="number"
                  placeholder="10"
                  value={filters.radius || ''}
                  onChange={(e) => onFiltersChange({ ...filters, radius: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => onFiltersChange({})}
              >
                <X className="w-4 h-4 mr-2" />
                Temizle
              </Button>
              <Button onClick={() => setShowFilters(false)}>
                Filtreleri Uygula
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}