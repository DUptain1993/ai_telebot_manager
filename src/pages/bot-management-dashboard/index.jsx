import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import DashboardToolbar from './components/DashboardToolbar';
import FilterChips from './components/FilterChips';
import BotCard from './components/BotCard';
import EmptyState from './components/EmptyState';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import UsageAnalytics from './components/UsageAnalytics';
import LoadingSkeleton from './components/LoadingSkeleton';

const BotManagementDashboard = () => {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('lastUsed');
  const [selectedBots, setSelectedBots] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    bot: null,
    isBulkDelete: false,
    isDeleting: false
  });

  // Mock bot data
  const mockBots = [
    {
      id: 'bot-1',
      name: 'React Expert',
      avatar: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=100&h=100&fit=crop&crop=face',
      specializations: ['React', 'TypeScript', 'Next.js'],
      model: 'gpt-4',
      status: 'active',
      lastUsed: new Date(Date.now() - 300000), // 5 minutes ago
      totalChats: 247,
      avgResponseTime: 850,
      monthlyUsage: 78,
      createdAt: new Date('2024-01-15')
    },
    {
      id: 'bot-2',
      name: 'Python Assistant',
      avatar: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=100&h=100&fit=crop&crop=face',
      specializations: ['Python', 'Django', 'FastAPI', 'ML'],
      model: 'claude-3',
      status: 'active',
      lastUsed: new Date(Date.now() - 1800000), // 30 minutes ago
      totalChats: 189,
      avgResponseTime: 1200,
      monthlyUsage: 65,
      createdAt: new Date('2024-02-01')
    },
    {
      id: 'bot-3',
      name: 'DevOps Helper',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      specializations: ['Docker', 'Kubernetes', 'AWS'],
      model: 'gpt-3.5-turbo',
      status: 'active',
      lastUsed: new Date(Date.now() - 3600000), // 1 hour ago
      totalChats: 156,
      avgResponseTime: 950,
      monthlyUsage: 45,
      createdAt: new Date('2024-01-20')
    },
    {
      id: 'bot-4',
      name: 'Frontend Guru',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      specializations: ['Vue.js', 'CSS', 'SASS'],
      model: 'gpt-4',
      status: 'active',
      lastUsed: new Date(Date.now() - 7200000), // 2 hours ago
      totalChats: 98,
      avgResponseTime: 780,
      monthlyUsage: 32,
      createdAt: new Date('2024-02-10')
    },
    {
      id: 'bot-5',
      name: 'Database Expert',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      specializations: ['PostgreSQL', 'MongoDB', 'Redis'],
      model: 'gemini-pro',
      status: 'inactive',
      lastUsed: new Date(Date.now() - 86400000), // 1 day ago
      totalChats: 67,
      avgResponseTime: 1100,
      monthlyUsage: 18,
      createdAt: new Date('2024-01-25')
    },
    {
      id: 'bot-6',
      name: 'Mobile Dev Assistant',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      specializations: ['React Native', 'Flutter', 'iOS'],
      model: 'claude-3',
      status: 'active',
      lastUsed: new Date(Date.now() - 10800000), // 3 hours ago
      totalChats: 134,
      avgResponseTime: 920,
      monthlyUsage: 55,
      createdAt: new Date('2024-02-05')
    }
  ];

  // Load mock data
  useEffect(() => {
    const loadBots = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setBots(mockBots);
      setLoading(false);
    };

    loadBots();
  }, []);

  // Filter and sort bots
  const filteredAndSortedBots = useMemo(() => {
    let filtered = bots;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(bot =>
        bot?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        bot?.specializations?.some(spec => 
          spec?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        ) ||
        bot?.model?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply active filters
    activeFilters?.forEach(filter => {
      switch (filter?.type) {
        case 'specialization':
          filtered = filtered?.filter(bot =>
            bot?.specializations?.some(spec => 
              spec?.toLowerCase() === filter?.value?.toLowerCase()
            )
          );
          break;
        case 'model':
          filtered = filtered?.filter(bot => bot?.model === filter?.value);
          break;
        case 'status':
          filtered = filtered?.filter(bot => bot?.status === filter?.value);
          break;
        case 'usage':
          if (filter?.value === 'high') {
            filtered = filtered?.filter(bot => bot?.monthlyUsage > 50);
          } else if (filter?.value === 'low') {
            filtered = filtered?.filter(bot => bot?.monthlyUsage <= 50);
          }
          break;
      }
    });

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'name-desc':
          return b?.name?.localeCompare(a?.name);
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'created-desc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'lastUsed':
          return new Date(b.lastUsed) - new Date(a.lastUsed);
        case 'lastUsed-desc':
          return new Date(a.lastUsed) - new Date(b.lastUsed);
        case 'usage':
          return b?.monthlyUsage - a?.monthlyUsage;
        case 'usage-desc':
          return a?.monthlyUsage - b?.monthlyUsage;
        default:
          return new Date(b.lastUsed) - new Date(a.lastUsed);
      }
    });

    return filtered;
  }, [bots, searchQuery, activeFilters, sortBy]);

  const handleBotSelect = (botId) => {
    setSelectedBots(prev => 
      prev?.includes(botId) 
        ? prev?.filter(id => id !== botId)
        : [...prev, botId]
    );
  };

  const handleClearSelection = () => {
    setSelectedBots([]);
  };

  const handleBulkDelete = () => {
    setDeleteModal({
      isOpen: true,
      bot: null,
      isBulkDelete: true,
      isDeleting: false
    });
  };

  const handleBotEdit = (bot) => {
    // Navigate to bot builder with bot data
    console.log('Edit bot:', bot);
  };

  const handleBotDelete = (bot) => {
    setDeleteModal({
      isOpen: true,
      bot,
      isBulkDelete: false,
      isDeleting: false
    });
  };

  const handleDeleteConfirm = async () => {
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (deleteModal?.isBulkDelete) {
      setBots(prev => prev?.filter(bot => !selectedBots?.includes(bot?.id)));
      setSelectedBots([]);
    } else {
      setBots(prev => prev?.filter(bot => bot?.id !== deleteModal?.bot?.id));
    }
    
    setDeleteModal({
      isOpen: false,
      bot: null,
      isBulkDelete: false,
      isDeleting: false
    });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({
      isOpen: false,
      bot: null,
      isBulkDelete: false,
      isDeleting: false
    });
  };

  const handleRemoveFilter = (index) => {
    setActiveFilters(prev => prev?.filter((_, i) => i !== index));
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
  };

  const isFiltered = searchQuery || activeFilters?.length > 0;
  const showEmptyState = filteredAndSortedBots?.length === 0 && !loading;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bot Management Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your AI coding assistants and monitor their performance
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <DashboardToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                selectedCount={selectedBots?.length}
                onBulkDelete={handleBulkDelete}
                onClearSelection={handleClearSelection}
              />

              <FilterChips
                activeFilters={activeFilters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
              />

              {/* Bot Grid */}
              {loading ? (
                <LoadingSkeleton />
              ) : showEmptyState ? (
                <EmptyState
                  isFiltered={isFiltered}
                  onClearFilters={handleClearAllFilters}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedBots?.map((bot) => (
                    <BotCard
                      key={bot?.id}
                      bot={bot}
                      onEdit={handleBotEdit}
                      onDelete={handleBotDelete}
                      onSelect={handleBotSelect}
                      isSelected={selectedBots?.includes(bot?.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <UsageAnalytics />
            </div>
          </div>
        </div>
      </main>
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal?.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        bot={deleteModal?.bot}
        isDeleting={deleteModal?.isDeleting}
        isBulkDelete={deleteModal?.isBulkDelete}
        selectedCount={selectedBots?.length}
      />
    </div>
  );
};

export default BotManagementDashboard;