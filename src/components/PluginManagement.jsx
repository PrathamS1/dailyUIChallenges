import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MoreVertical,
  Shield,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Package,
  Zap,
  Globe,
  Image,
  Mail,
  BarChart3,
 } from "lucide-react";
import { ReusableToggleSwitch } from "./dailyUI015";

// Move PluginCard outside to prevent re-creation on every render
const PluginCard = ({ plugin, onToggle, onShowModal }) => {
  const IconComponent = plugin.icon;
  
  const statusColors = {
    active: "text-emerald-700 bg-emerald-50 border-emerald-200",
    inactive: "text-slate-500 bg-slate-50 border-slate-200",
    "update-available": "text-amber-700 bg-amber-50 border-amber-200"
  };
  
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h3 className="text-base font-medium text-slate-900">{plugin.name}</h3>
            <p className="text-sm text-slate-500">v{plugin.version}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[plugin.status]}`}>
            {plugin.status === 'update-available' ? 'Update' : 
             plugin.status === 'active' ? 'Active' : 'Inactive'}
          </span>
          
          {plugin.installed ? (
            <ReusableToggleSwitch
              isOn={plugin.status === 'active'}
              onToggle={() => onToggle(plugin.id)}
              size="small"
            />
          ) : (
            <button 
              onClick={onShowModal}
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium"
            >
              Install
            </button>
          )}

          <button className="p-2 hover:bg-slate-100 rounded-md transition-colors">
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

const PluginManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedPlugin, setSelectedPlugin] = useState(null);
  const [showInstallModal, setShowInstallModal] = useState(false);

  // Mock plugin data
  const [plugins, setPlugins] = useState([
    {
      id: 1,
      name: "Advanced SEO Toolkit",
      description: "Comprehensive SEO optimization tools for better search rankings",
      version: "2.1.4",
      author: "SEO Masters",
      category: "SEO",
      status: "active",
      installed: true,
      rating: 4.8,
      downloads: 125000,
      lastUpdated: "2025-08-10",
      icon: Globe,
      size: "2.3 MB",
      compatibility: "CMS 3.0+",
      price: "Free",
      features: ["Meta tags optimization", "XML sitemaps", "Schema markup", "Analytics integration"]
    },
    {
      id: 2,
      name: "Security Guardian",
      description: "Advanced security features to protect your CMS from threats",
      version: "1.8.2",
      author: "SecureWeb Inc",
      category: "Security",
      status: "active",
      installed: true,
      rating: 4.9,
      downloads: 89000,
      lastUpdated: "2025-08-12",
      icon: Shield,
      size: "1.8 MB",
      compatibility: "CMS 2.5+",
      price: "$29/year",
      features: ["Firewall protection", "Malware scanning", "Login security", "SSL monitoring"]
    },
    {
      id: 3,
      name: "Media Gallery Pro",
      description: "Professional image and video gallery management system",
      version: "3.2.1",
      author: "MediaTech",
      category: "Media",
      status: "inactive",
      installed: true,
      rating: 4.6,
      downloads: 67000,
      lastUpdated: "2025-08-08",
      icon: Image,
      size: "4.1 MB",
      compatibility: "CMS 3.0+",
      price: "$19/month",
      features: ["Drag & drop upload", "Image optimization", "Video streaming", "CDN integration"]
    },
    {
      id: 4,
      name: "Email Marketing Suite",
      description: "Complete email marketing automation and newsletter management",
      version: "2.5.0",
      author: "MailFlow",
      category: "Marketing",
      status: "active",
      installed: true,
      rating: 4.7,
      downloads: 45000,
      lastUpdated: "2025-08-11",
      icon: Mail,
      size: "3.2 MB",
      compatibility: "CMS 3.0+",
      price: "$39/month",
      features: ["Email templates", "Automation workflows", "Analytics dashboard", "A/B testing"]
    },
    {
      id: 5,
      name: "Analytics Dashboard",
      description: "Comprehensive website analytics and reporting tools",
      version: "1.4.3",
      author: "DataViz Co",
      category: "Analytics",
      status: "update-available",
      installed: true,
      rating: 4.5,
      downloads: 78000,
      lastUpdated: "2025-08-05",
      icon: BarChart3,
      size: "2.9 MB",
      compatibility: "CMS 2.8+",
      price: "Free",
      features: ["Real-time analytics", "Custom reports", "Goal tracking", "Export data"]
    },
    {
      id: 6,
      name: "Performance Optimizer",
      description: "Speed up your website with advanced caching and optimization",
      version: "2.0.1",
      author: "SpeedTech",
      category: "Performance",
      status: "inactive",
      installed: false,
      rating: 4.4,
      downloads: 92000,
      lastUpdated: "2025-08-09",
      icon: Zap,
      size: "1.5 MB",
      compatibility: "CMS 3.0+",
      price: "$15/month",
      features: ["Page caching", "Image compression", "Database optimization", "CDN support"]
    }
  ]);

  const categories = ["All", "SEO", "Security", "Media", "Marketing", "Analytics", "Performance"];

  // Memoize the toggle function to prevent unnecessary re-renders
  const togglePluginStatus = useCallback((pluginId) => {
    setPlugins(prevPlugins => prevPlugins.map(plugin => 
      plugin.id === pluginId 
        ? { ...plugin, status: plugin.status === 'active' ? 'inactive' : 'active' }
        : plugin
    ));
  }, []);

  // Memoize filtered plugins calculation
  const filteredPlugins = useMemo(() => {
    return plugins.filter(plugin => {
      const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plugin.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === "all" || plugin.category.toLowerCase() === filterBy.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [plugins, searchTerm, filterBy]);

  // Memoize stats calculations
  const stats = useMemo(() => ({
    total: plugins.length,
    active: plugins.filter(p => p.status === 'active').length,
    updates: plugins.filter(p => p.status === 'update-available').length,
    inactive: plugins.filter(p => p.status === 'inactive').length,
  }), [plugins]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Plugin Management</h1>
              <p className="text-slate-600 mt-1">Manage your CMS plugins</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-2 text-sm">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button 
                onClick={() => setShowInstallModal(true)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 text-sm"
              >
                <Package className="w-4 h-4" />
                <span>Add Plugin</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total</p>
                <p className="text-xl font-semibold text-slate-900">{stats.total}</p>
              </div>
              <Package className="w-6 h-6 text-slate-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active</p>
                <p className="text-xl font-semibold text-emerald-600">{stats.active}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Updates</p>
                <p className="text-xl font-semibold text-amber-600">{stats.updates}</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Inactive</p>
                <p className="text-xl font-semibold text-slate-600">{stats.inactive}</p>
              </div>
              <XCircle className="w-6 h-6 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search plugins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Plugin List */}
        <div className="space-y-3">
          {filteredPlugins.map(plugin => (
            <PluginCard 
              key={plugin.id} 
              plugin={plugin} 
              onToggle={togglePluginStatus}
              onShowModal={() => setShowInstallModal(true)}
            />
          ))}
        </div>

        {filteredPlugins.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No plugins found</h3>
            <p className="text-slate-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Plugin Detail Modal */}
      <AnimatePresence>
        {selectedPlugin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPlugin(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      <selectedPlugin.icon className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 mb-1">{selectedPlugin.name}</h2>
                      <p className="text-sm text-slate-600 mb-2">{selectedPlugin.description}</p>
                      <span className="text-sm text-slate-500">v{selectedPlugin.version}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPlugin(null)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{selectedPlugin.rating}</span>
                    <span className="text-sm text-slate-500">• {selectedPlugin.downloads.toLocaleString()} downloads</span>
                  </div>
                  
                  {selectedPlugin.installed ? (
                    <ReusableToggleSwitch
                      isOn={selectedPlugin.status === 'active'}
                      onToggle={() => togglePluginStatus(selectedPlugin.id)}
                      size="small"
                    />
                  ) : (
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                      Install Plugin
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install Plugin Modal */}
      <AnimatePresence>
        {showInstallModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowInstallModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Add New Plugin</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Plugin URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://example.com/plugin.zip"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <Package className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Or drag and drop plugin file here</p>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowInstallModal(false)}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                    Install
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PluginManagement;
