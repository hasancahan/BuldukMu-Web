import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  MessageCircle, 
  Star,
  Clock
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { LostItem } from '../../types';

interface ItemCardProps {
  item: LostItem;
  onContact: (item: LostItem) => void;
  onClick?: () => void;
}

export function ItemCard({ item, onContact, onClick }: ItemCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      electronics: 'bg-blue-100 text-blue-800',
      jewelry: 'bg-yellow-100 text-yellow-800',
      documents: 'bg-green-100 text-green-800',
      pets: 'bg-pink-100 text-pink-800',
      clothing: 'bg-purple-100 text-purple-800',
      keys: 'bg-gray-100 text-gray-800',
      bags: 'bg-indigo-100 text-indigo-800',
      other: 'bg-orange-100 text-orange-800'
    };
    return colors[category] || colors.other;
  };

  return (
    <Card 
      className={onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}
      onClick={() => {
        console.log('ItemCard - onClick called with:', item);
        if (onClick) onClick(item);
      }}
    >
      <div className="relative">
        {item.is_premium && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <Star className="w-3 h-3 mr-1" />
              Premium
            </div>
          </div>
        )}
        
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
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
            </div>
            {item.reward_amount && (
              <div className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full">
                <DollarSign className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">{item.reward_amount} TL</span>
              </div>
            )}
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
              {new Date(item.date_lost).toLocaleDateString('tr-TR')}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              {new Date(item.created_at).toLocaleDateString('tr-TR')} tarihinde paylaşıldı
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
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
                onContact(item);
              }}
              className="flex items-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              İletişim
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}