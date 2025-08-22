import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  
  const isLogin = location.pathname === '/login';
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        toast.success('Başarıyla giriş yapıldı!');
        navigate('/');
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Şifreler eşleşmiyor');
          return;
        }
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) throw error;
        toast.success('Hesabınız oluşturuldu!');
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {isLogin ? 'Giriş Yap' : 'Hesap Oluştur'}
            </h1>
            <p className="text-gray-600">
              {isLogin 
                ? 'Hesabınıza giriş yapın' 
                : 'Kayıp eşyalarınızı paylaşmaya başlayın'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  label="Ad Soyad"
                  type="text"
                  placeholder="Adınızı girin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
              <Input
                label="E-posta"
                type="email"
                placeholder="ornek@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
              <Input
                label="Şifre"
                type={showPassword ? 'text' : 'password'}
                placeholder="Şifrenizi girin"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
                <Input
                  label="Şifre Tekrar"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Şifrenizi tekrar girin"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              {isLogin ? 'Giriş Yap' : 'Hesap Oluştur'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
              {' '}
              <Link
                to={isLogin ? '/signup' : '/login'}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}