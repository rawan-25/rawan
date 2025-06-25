import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye, EyeOff, Clock, CheckCircle, Settings, Lock, MessageCircle } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import './App.css';

// Types
interface User {
  name: string;
  phone: string;
  purchaseCount: number;
  isAdmin: boolean;
}

// Login Page Component
const LoginPage = ({ onLogin, onAdminLogin }: { 
  onLogin: (name: string, phone: string) => void;
  onAdminLogin: () => void;
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isAdmin) {
      if (password === 'Lemon!32#TigerRunRawan') {
        onAdminLogin();
      } else {
        setError('كلمة المرور غير صحيحة');
      }
    } else {
      if (!name.trim() || !phone.trim()) {
        setError('يرجى إدخال جميع البيانات المطلوبة');
      } else if (!/^05\d{8}$/.test(phone)) {
        setError('يرجى إدخال رقم جوال صحيح يبدأ بـ 05');
      } else {
        // Simulate SMS verification (Twilio placeholder)
        console.log('SMS Verification Code sent to:', phone);
        onLogin(name.trim(), phone.trim());
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3">
            <span className="text-red-900">Choco</span>
            <span className="text-yellow-500"> Krumb</span>
          </h1>
          <p className="text-xl text-red-800 font-medium">أشهى المخبوزات الطازجة</p>
          <div className="w-16 h-1 bg-gradient-to-r from-red-900 to-yellow-500 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-stone-200">
          {/* Tab Switcher */}
          <div className="flex mb-6 bg-stone-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setIsAdmin(false)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                !isAdmin 
                  ? 'bg-white text-red-900 shadow-md transform scale-105' 
                  : 'text-stone-600 hover:text-red-800'
              }`}
            >
              تسجيل دخول العميل
            </button>
            <button
              type="button"
              onClick={() => setIsAdmin(true)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isAdmin 
                  ? 'bg-white text-red-900 shadow-md transform scale-105' 
                  : 'text-stone-600 hover:text-red-800'
              }`}
            >
              <Lock size={16} className="inline ml-2" />
              لوحة التحكم
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isAdmin && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-right"
                    placeholder="أدخل اسمك الكامل"
                    dir="rtl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    رقم الجوال
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-right"
                    placeholder="05xxxxxxxx"
                    dir="rtl"
                    required
                  />
                </div>
              </>
            )}

            {isAdmin && (
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  كلمة مرور الإدارة
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-4 pr-12 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="أدخل كلمة مرور الإدارة"
                    dir="ltr"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                  جاري التحقق...
                </div>
              ) : (
                isAdmin ? 'دخول لوحة التحكم' : 'تسجيل الدخول'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Business Hours Check Hook
const useBusinessHours = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nextOpenTime, setNextOpenTime] = useState('');

  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hour = now.getHours();
      
      // Working days: Saturday (6), Monday (1), Wednesday (3)
      // Working hours: 12:00 PM to 6:00 PM
      const workingDays = [1, 3, 6];
      const isWorkingDay = workingDays.includes(day);
      const isWorkingHour = hour >= 12 && hour < 18;
      
      setIsOpen(isWorkingDay && isWorkingHour);

      // Calculate next opening time
      const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      const workingDayNames = ['الاثنين', 'الأربعاء', 'السبت'];
      
      let nextDay = '';
      for (let i = 1; i <= 7; i++) {
        const nextDayIndex = (day + i) % 7;
        if (workingDays.includes(nextDayIndex)) {
          nextDay = dayNames[nextDayIndex];
          break;
        }
      }
      setNextOpenTime(nextDay);
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return { isOpen, nextOpenTime };
};

// Home Page Component
const HomePage = ({ user, onLogout, onGoToCart, onGoToAdmin }: {
  user: User;
  onLogout: () => void;
  onGoToCart: () => void;
  onGoToAdmin: () => void;
}) => {
  const { products, addToCart, cart } = useApp();
  const { isOpen, nextOpenTime } = useBusinessHours();
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, quantity)
    }));
  };

  const handleAddToCart = (product: any) => {
    const quantity = quantities[product.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  // Store Closed View
  if (!isOpen && !user.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="mb-8">
            <Clock size={80} className="mx-auto text-stone-400 mb-6" />
            <h2 className="text-4xl font-bold mb-3">
              <span className="text-red-900">Choco</span>
              <span className="text-yellow-500"> Krumb</span>
            </h2>
            <p className="text-xl text-red-800 font-medium">أشهى المخبوزات الطازجة</p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-stone-200">
            <h3 className="text-2xl font-bold text-stone-700 mb-6">نعتذر، المتجر مغلق حالياً</h3>
            <div className="text-stone-600 mb-8 space-y-3">
              <div className="bg-stone-50 rounded-xl p-4">
                <p className="font-semibold text-red-800 mb-2">أوقات استقبال الطلبات:</p>
                <p className="font-medium">السبت - الاثنين - الأربعاء</p>
                <p className="font-medium">من 12:00 ظهراً إلى 6:00 مساءً</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <p className="font-semibold text-amber-800 mb-2">أوقات الاستلام:</p>
                <p className="font-medium">الأحد - الثلاثاء - الخميس</p>
                <p className="font-medium">من 8:00 صباحاً إلى 12:00 ظهراً</p>
              </div>
              {nextOpenTime && (
                <p className="text-sm text-stone-500">
                  الفتح القادم: {nextOpenTime} الساعة 12:00 ظهراً
                </p>
              )}
            </div>
            <button
              onClick={onLogout}
              className="px-8 py-3 bg-stone-500 hover:bg-stone-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={onLogout}
              className="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors font-medium"
            >
              تسجيل الخروج
            </button>
            {user.isAdmin && (
              <button
                onClick={onGoToAdmin}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                <Settings size={18} />
                <span>لوحة التحكم</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm text-stone-600">مرحباً بك</p>
              <p className="font-bold text-stone-800 text-lg">{user.name}</p>
            </div>
            <button
              onClick={onGoToCart}
              className="relative p-3 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">
            <span className="text-red-900">Choco</span>
            <span className="text-yellow-500"> Krumb</span>
          </h1>
          <p className="text-3xl text-red-800 font-semibold mb-6">أشهى المخبوزات الطازجة</p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-900 to-yellow-500 mx-auto rounded-full"></div>
          
          {!isOpen && user.isAdmin && (
            <div className="mt-6 inline-flex items-center px-6 py-3 bg-amber-100 text-amber-800 rounded-xl border border-amber-200">
              <Clock size={20} className="ml-2" />
              <span className="font-medium">المتجر مغلق حالياً - أنت في وضع الإدارة</span>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-stone-800 mb-3">{product.name}</h3>
                <p className="text-stone-600 mb-6 text-base leading-relaxed">{product.description}</p>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-3xl font-bold text-red-900">
                    {product.price} ريال
                  </span>
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-3 bg-stone-100 rounded-xl p-2">
                    <button
                      onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}
                      className="w-8 h-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-stone-600 hover:text-red-800 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 font-bold text-lg min-w-[3rem] text-center">
                      {quantities[product.id] || 1}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                      className="w-8 h-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-stone-600 hover:text-red-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!isOpen && !user.isAdmin}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  أضف إلى السلة
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Cart Page Component
const CartPage = ({ user, onBack, onCheckout }: {
  user: User;
  onBack: () => void;
  onCheckout: () => void;
}) => {
  const { cart, updateCartQuantity, removeFromCart } = useApp();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <ShoppingCart size={80} className="mx-auto text-stone-400 mb-6" />
          <h2 className="text-3xl font-bold text-stone-700 mb-4">السلة فارغة</h2>
          <p className="text-stone-600 mb-8 text-lg">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
          <button
            onClick={onBack}
            className="px-8 py-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            العودة للمتجر
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors font-medium"
          >
            ← العودة للمتجر
          </button>
          <h1 className="text-3xl font-bold text-stone-800">سلة التسوق</h1>
          <div className="w-32"></div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-8">تفاصيل طلبك</h2>
            
            {/* Cart Items */}
            <div className="space-y-6 mb-8">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-6 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="flex items-center space-x-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl shadow-md"
                    />
                    <div>
                      <h3 className="font-bold text-stone-800 text-lg">{item.name}</h3>
                      <p className="text-stone-600">{item.price} ريال للقطعة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 font-medium transition-colors"
                    >
                      حذف
                    </button>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 bg-white rounded-xl border-2 border-stone-200 shadow-sm">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-4 py-2 text-stone-600 hover:text-red-800 font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 font-bold text-lg min-w-[3rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-4 py-2 text-stone-600 hover:text-red-800 font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-right min-w-[6rem]">
                      <p className="font-bold text-stone-800 text-lg">{(item.price * item.quantity).toFixed(2)} ريال</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t-2 border-stone-200 pt-8">
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold text-stone-800">المجموع الكلي:</span>
                <span className="text-3xl font-bold text-red-900">
                  {total.toFixed(2)} ريال
                </span>
              </div>

              {/* Customer Info */}
              <div className="bg-stone-50 rounded-2xl p-6 mb-8 border border-stone-100">
                <h3 className="font-bold text-stone-800 mb-4 text-lg">بيانات العميل:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-stone-700"><span className="font-semibold">الاسم:</span> {user.name}</p>
                  <p className="text-stone-700"><span className="font-semibold">الجوال:</span> {user.phone}</p>
                </div>
              </div>

              {/* Pickup Info */}
              <div className="bg-amber-50 rounded-2xl p-6 mb-8 border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-3 text-lg">معلومات الاستلام:</h3>
                <p className="text-amber-700 font-medium">يُستلم الطلب: الأحد، الثلاثاء، الخميس</p>
                <p className="text-amber-700 font-medium">من 8:00 صباحاً حتى 12:00 ظهراً</p>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-5 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold text-xl rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                ادفع الآن - {total.toFixed(2)} ريال
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Checkout Page Component
const CheckoutPage = ({ user, cart, onBack, onHome }: {
  user: User;
  cart: any[];
  onBack: () => void;
  onHome: () => void;
}) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { clearCart } = useApp();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Update user purchase count
      const userData = JSON.parse(localStorage.getItem('chocoKrumbUser') || '{}');
      userData.purchaseCount = (userData.purchaseCount || 0) + 1;
      localStorage.setItem('chocoKrumbUser', JSON.stringify(userData));
      
      // Clear cart after successful payment
      clearCart();
      
      // Placeholder for future integrations
      console.log('Payment Integration Placeholders:');
      console.log('Paylink API call would go here');
      console.log('STC Pay API call would go here');
      console.log('SMS notification via Twilio would go here');
      
    }, 3000);

    return () => clearTimeout(timer);
  }, [clearCart]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-red-900 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-stone-700 mb-4">جاري معالجة الدفع...</h2>
          <p className="text-stone-600 mb-4">يرجى الانتظار، لا تغلق الصفحة</p>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone-200">
            <p className="text-sm text-stone-500">المبلغ: {total.toFixed(2)} ريال</p>
            <p className="text-sm text-stone-500">العميل: {user.name}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="mb-8">
          <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
          <h2 className="text-3xl font-bold text-stone-700 mb-4">تم الدفع بنجاح!</h2>
          <p className="text-xl text-stone-600 mb-6">شكراً لك، سيتم التواصل معك قريباً</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-stone-200 mb-8">
          <h3 className="font-bold text-stone-800 mb-4 text-lg">تفاصيل الطلب:</h3>
          <div className="space-y-2 text-stone-600 mb-6">
            <p><span className="font-semibold">رقم الطلب:</span> #{Date.now().toString().slice(-6)}</p>
            <p><span className="font-semibold">المبلغ المدفوع:</span> {total.toFixed(2)} ريال</p>
            <p><span className="font-semibold">العميل:</span> {user.name}</p>
            <p><span className="font-semibold">الجوال:</span> {user.phone}</p>
          </div>
          
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="text-amber-800 font-semibold mb-2">موعد الاستلام:</p>
            <p className="text-amber-700">الأحد، الثلاثاء، أو الخميس</p>
            <p className="text-amber-700">من 8:00 صباحاً إلى 12:00 ظهراً</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={onHome}
            className="w-full py-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            العودة للصفحة الرئيسية
          </button>
          <button
            onClick={onBack}
            className="w-full py-4 bg-stone-500 hover:bg-stone-600 text-white font-semibold rounded-xl transition-all duration-300"
          >
            العودة للسلة
          </button>
        </div>
      </div>
    </div>
  );
};

// Admin Panel Component
const AdminPage = ({ onBack }: { onBack: () => void }) => {
  const { products, updateProduct } = useApp();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    image: '', 
    description: '' 
  });
  const [previewImage, setPreviewImage] = useState('');

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description
    });
    setPreviewImage(product.image);
  };

  const handleSave = () => {
    if (editingProduct && formData.name && formData.price && formData.image) {
      updateProduct({
        ...editingProduct,
        name: formData.name,
        price: parseFloat(formData.price),
        image: formData.image,
        description: formData.description
      });
      setEditingProduct(null);
      setFormData({ name: '', price: '', image: '', description: '' });
      setPreviewImage('');
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', image: '', description: '' });
    setPreviewImage('');
  };

  const handleImageChange = (url: string) => {
    setFormData({ ...formData, image: url });
    setPreviewImage(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors font-medium"
          >
            ← العودة للمتجر
          </button>
          <h1 className="text-3xl font-bold text-stone-800 flex items-center">
            <Lock size={28} className="ml-3 text-amber-600" />
            لوحة التحكم
          </h1>
          <div className="w-32"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 p-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-8 flex items-center">
            <Settings size={24} className="ml-3 text-red-900" />
            إدارة المنتجات
          </h2>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Current Products */}
            <div>
              <h3 className="text-xl font-semibold text-stone-700 mb-6">المنتجات الحالية</h3>
              <div className="space-y-6">
                {products.map((product) => (
                  <div key={product.id} className="p-6 border-2 border-stone-200 rounded-2xl hover:border-red-300 transition-all duration-300">
                    <div className="flex items-center space-x-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-xl shadow-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-stone-800 text-lg">{product.name}</h4>
                        <p className="text-stone-600 text-sm mb-2">{product.description}</p>
                        <p className="text-red-900 font-bold text-lg">{product.price} ريال</p>
                      </div>
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
                      >
                        تعديل
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Form */}
            {editingProduct && (
              <div>
                <h3 className="text-xl font-semibold text-stone-700 mb-6">تعديل المنتج</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">اسم المنتج</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-right"
                      dir="rtl"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">السعر (ريال)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">رابط الصورة</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => handleImageChange(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                      dir="ltr"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">وصف المنتج</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-4 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-right"
                      dir="rtl"
                    />
                  </div>
                  
                  {/* Image Preview */}
                  {previewImage && (
                    <div>
                      <p className="text-sm font-semibold text-stone-700 mb-3">معاينة الصورة:</p>
                      <img
                        src={previewImage}
                        alt="معاينة"
                        className="w-40 h-40 object-cover rounded-xl border-2 border-stone-200 shadow-md"
                        onError={() => setPreviewImage('')}
                      />
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      حفظ التغييرات
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 py-4 bg-stone-500 hover:bg-stone-600 text-white font-semibold rounded-xl transition-all duration-300"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Main App Content Component
const AppContent = () => {
  const [currentPage, setCurrentPage] = useState<'login' | 'home' | 'cart' | 'checkout' | 'admin'>('login');
  const [user, setUser] = useState<User | null>(null);
  const { cart, clearCart } = useApp();

  useEffect(() => {
    const savedUser = localStorage.getItem('chocoKrumbUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setCurrentPage('home');
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('chocoKrumbUser');
      }
    }
  }, []);

  const handleLogin = (name: string, phone: string) => {
    const userData: User = {
      name,
      phone,
      purchaseCount: 0,
      isAdmin: false
    };
    setUser(userData);
    localStorage.setItem('chocoKrumbUser', JSON.stringify(userData));
    setCurrentPage('home');
  };

  const handleAdminLogin = () => {
    const adminData: User = {
      name: 'المدير',
      phone: '',
      purchaseCount: 0,
      isAdmin: true
    };
    setUser(adminData);
    localStorage.setItem('chocoKrumbUser', JSON.stringify(adminData));
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('chocoKrumbUser');
    clearCart();
    setCurrentPage('login');
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  const handleCheckoutComplete = () => {
    setCurrentPage('home');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} onAdminLogin={handleAdminLogin} />;
  }

  switch (currentPage) {
    case 'home':
      return (
        <HomePage
          user={user}
          onLogout={handleLogout}
          onGoToCart={() => setCurrentPage('cart')}
          onGoToAdmin={() => setCurrentPage('admin')}
        />
      );
    case 'cart':
      return (
        <CartPage
          user={user}
          onBack={() => setCurrentPage('home')}
          onCheckout={handleCheckout}
        />
      );
    case 'checkout':
      return (
        <CheckoutPage
          user={user}
          cart={cart}
          onBack={() => setCurrentPage('cart')}
          onHome={handleCheckoutComplete}
        />
      );
    case 'admin':
      return <AdminPage onBack={() => setCurrentPage('home')} />;
    default:
      return <LoginPage onLogin={handleLogin} onAdminLogin={handleAdminLogin} />;
  }
};

// Main App Component
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;