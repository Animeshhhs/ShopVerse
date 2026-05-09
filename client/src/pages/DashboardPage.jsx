import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Package, LogOut, Calendar, Phone, Mail, Clock, CheckCircle, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user, logout, api } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const { data } = await api.get('/orders');
      if (data.success) setOrders(data.data.orders);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
  const formatAmount = (a) => `₹${Number(a).toLocaleString('en-IN')}`;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">ShopVerse</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/products" className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition-colors">
              Browse Products
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Hello, {user.FirstName}! 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here&apos;s your account overview</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg">
                  {user.FirstName?.[0]}{user.LastName?.[0]}
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{user.FirstName} {user.LastName}</h2>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full mt-1 font-medium">Customer</span>
              </div>

              {/* Info */}
              <div className="space-y-3">
                {[
                  { icon: <Mail className="w-4 h-4" />, label: user.Email },
                  { icon: <Phone className="w-4 h-4" />, label: user.Phone },
                  { icon: <Calendar className="w-4 h-4" />, label: user.DateOfBirth ? new Date(user.DateOfBirth).toLocaleDateString('en-IN') : '—' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="text-slate-400">{icon}</span>
                    <span className="truncate">{label}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{orders.length}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Orders</p>
                </div>
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {formatAmount(orders.reduce((sum, o) => sum + Number(o.order_amount), 0))}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total Spent</p>
                </div>
              </div>

              <Link to="/products" className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors">
                <ShoppingBag className="w-4 h-4" /> Browse Products
              </Link>
            </div>
          </motion.div>

          {/* Orders Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">My Orders</h2>
              </div>

              {loadingOrders ? (
                <div className="flex items-center justify-center py-16">
                  <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">No orders yet</p>
                  <Link to="/products" className="mt-3 inline-block text-blue-600 hover:underline text-sm">Start shopping →</Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {orders.map(order => (
                    <div key={order.order_id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">Order #{order.order_id}</span>
                            <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                              order.order_status === 'delivery'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                                : 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400'
                            }`}>
                              {order.order_status === 'delivery'
                                ? <><CheckCircle className="w-3 h-3" /> Delivered</>
                                : <><Clock className="w-3 h-3" /> Pending</>}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                            <span>Ordered: {formatDate(order.order_date)}</span>
                            {order.shipping_date && <span>Shipped: {formatDate(order.shipping_date)}</span>}
                          </p>
                        </div>
                        <span className="text-base font-bold text-slate-900 dark:text-white">{formatAmount(order.order_amount)}</span>
                      </div>

                      {/* Items */}
                      {order.items?.length > 0 && (
                        <div className="space-y-1">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-lg px-3 py-1.5">
                              <span className="font-medium text-slate-700 dark:text-slate-300 truncate mr-2">{item.product_name}</span>
                              <span className="flex-shrink-0">x{item.quantity} · {formatAmount(item.paid_price)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {order.paymentMode && (
                        <p className="text-xs text-slate-400 mt-2 capitalize">
                          Payment: {order.paymentMode}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
