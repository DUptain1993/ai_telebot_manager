import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ChatMessage from './components/ChatMessage';
import ConversationHistory from './components/ConversationHistory';
import ChatInput from './components/ChatInput';
import BotConfigPanel from './components/BotConfigPanel';
import ChatHeader from './components/ChatHeader';

const AIChatInterface = () => {
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);
  const [isConfigCollapsed, setIsConfigCollapsed] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState('conv-1');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const messagesEndRef = useRef(null);

  // Mock bot data
  const currentBot = {
    id: 'bot-1',
    name: 'CodeMaster Pro',
    specialization: 'Full-Stack Development',
    model: 'GPT-4 Turbo',
    systemPrompt: `You are CodeMaster Pro, an expert full-stack developer with deep knowledge in React, Node.js, Python, and modern web technologies. You provide clear, practical coding solutions with detailed explanations and best practices.`,
    temperature: 0.7,
    maxTokens: 4096,
    contextWindow: '128K tokens'
  };

  // Mock conversations data
  const [conversations, setConversations] = useState([
    {
      id: 'conv-1',
      title: 'React Hook Optimization',
      preview: 'How to optimize useEffect hooks for better performance...',
      botName: 'CodeMaster Pro',
      messageCount: 12,
      lastActivity: new Date(Date.now() - 1800000), // 30 minutes ago
      hasBookmarks: true
    },
    {
      id: 'conv-2',
      title: 'Database Schema Design',
      preview: 'Best practices for designing scalable database schemas...',
      botName: 'CodeMaster Pro',
      messageCount: 8,
      lastActivity: new Date(Date.now() - 7200000), // 2 hours ago
      hasBookmarks: false
    },
    {
      id: 'conv-3',
      title: 'API Error Handling',
      preview: 'Implementing robust error handling in REST APIs...',
      botName: 'CodeMaster Pro',
      messageCount: 15,
      lastActivity: new Date(Date.now() - 86400000), // 1 day ago
      hasBookmarks: true
    }
  ]);

  // Mock messages data
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      content: 'Hi! I need help optimizing my React component that uses multiple useEffect hooks. The component is re-rendering too frequently.',
      isUser: true,
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 'msg-2',
      content: `I'd be happy to help you optimize your React component! Frequent re-renders with multiple useEffect hooks is a common performance issue. Let me show you some strategies to fix this.

Here are the main optimization techniques:

\`\`\`jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Icon from '../../components/AppIcon';


const OptimizedComponent = ({ userId, filters }) => {
  const [userData, setUserData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Memoize expensive calculations
  const processedFilters = useMemo(() => {
    return filters.map(filter => ({
      ...filter,
      processed: true
    }));
  }, [filters]);

  // 2. Use useCallback for event handlers
  const handleDataUpdate = useCallback((newData) => {
    setUserData(prevData => ({ ...prevData, ...newData }));
  }, []);

  // 3. Combine related effects
  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    
    const fetchUserData = async () => {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]); // Only depend on userId

  // 4. Separate effect for filtering
  useEffect(() => {
    if (!userData || !processedFilters.length) {
      setFilteredData([]);
      return;
    }

    const filtered = userData.items?.filter(item => 
      processedFilters.some(filter => item.category === filter.value)
    ) || [];
    
    setFilteredData(filtered);
  }, [userData, processedFilters]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* Your component JSX */}
        </div>
      )}
    </div>
  );
};

export default OptimizedComponent;
\`\`\`

**Key optimization points:**

1. **Dependency Arrays**: Only include values that actually change and affect the effect
2. **useMemo**: For expensive calculations that don't need to run on every render
3. **useCallback**: For event handlers passed to child components
4. **Combine Effects**: Group related side effects together when possible
5. **Early Returns**: Use guard clauses to prevent unnecessary work

Would you like me to review your specific component code for more targeted optimizations?`,
      isUser: false,
      timestamp: new Date(Date.now() - 1740000)
    },
    {
      id: 'msg-3',
      content: 'This is really helpful! Here\'s my current component code that needs optimization:',
      isUser: true,
      timestamp: new Date(Date.now() - 1680000)
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsHistoryCollapsed(true);
        setIsConfigCollapsed(true);
      } else {
        setIsHistoryCollapsed(false);
        setIsConfigCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = async (content, attachedFile) => {
    const newUserMessage = {
      id: `msg-${Date.now()}`,
      content: attachedFile ? `${content}\n\n[Attached file: ${attachedFile?.name}]` : content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    // Simulate AI response with streaming
    setTimeout(() => {
      const aiMessageId = `msg-ai-${Date.now()}`;
      setStreamingMessageId(aiMessageId);
      
      const aiMessage = {
        id: aiMessageId,
        content: `I'll help you with that! Let me analyze your request and provide a comprehensive solution.

\`\`\`javascript
// Here's an example solution based on your query
function optimizedSolution() {
  // Implementation details would go here
  console.log('Processing your request...');
  return 'Solution implemented successfully!';
}
\`\`\`

This approach should address your specific needs. Would you like me to explain any part in more detail?`,
        isUser: false,
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setStreamingMessageId(null);
        setIsLoading(false);
      }, 2000);
    }, 1000);
  };

  const handleNewConversation = () => {
    const newConversation = {
      id: `conv-${Date.now()}`,
      title: 'New Conversation',
      preview: 'Start a new conversation...',
      botName: currentBot?.name,
      messageCount: 0,
      lastActivity: new Date(),
      hasBookmarks: false
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation?.id);
    setMessages([]);
  };

  const handleSelectConversation = (conversationId) => {
    setActiveConversationId(conversationId);
    // In a real app, you would load messages for this conversation
    if (conversationId !== 'conv-1') {
      setMessages([]);
    }
  };

  const handleRegenerate = (messageId) => {
    console.log('Regenerating message:', messageId);
    // Implement regeneration logic
  };

  const handleBookmark = (messageId) => {
    console.log('Bookmarking message:', messageId);
    // Implement bookmark logic
  };

  const handleQuickPrompt = (prompt) => {
    handleSendMessage(prompt);
  };

  const activeConversation = conversations?.find(conv => conv?.id === activeConversationId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="px-6 py-4">
          <Breadcrumb customItems={[
            { label: 'Dashboard', path: '/bot-management-dashboard', icon: 'LayoutDashboard' },
            { label: 'AI Chat Interface', path: '/ai-chat-interface', icon: 'MessageSquare', isActive: true }
          ]} />
        </div>

        <div className="flex h-[calc(100vh-120px)]">
          {/* Conversation History Sidebar */}
          <ConversationHistory
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
            isCollapsed={isHistoryCollapsed}
            onToggleCollapse={() => setIsHistoryCollapsed(!isHistoryCollapsed)}
          />

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chat Header */}
            <ChatHeader
              bot={currentBot}
              onToggleHistory={() => setIsHistoryCollapsed(!isHistoryCollapsed)}
              onToggleConfig={() => setIsConfigCollapsed(!isConfigCollapsed)}
              isHistoryCollapsed={isHistoryCollapsed}
              isConfigCollapsed={isConfigCollapsed}
              conversationTitle={activeConversation?.title}
            />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {messages?.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="MessageSquare" size={32} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Start a conversation
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Ask {currentBot?.name} anything about coding, debugging, or software development.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <button
                        onClick={() => handleQuickPrompt("Help me debug this JavaScript error")}
                        className="p-3 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        🐛 Debug JavaScript error
                      </button>
                      <button
                        onClick={() => handleQuickPrompt("Review my React component code")}
                        className="p-3 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        ⚛️ Review React code
                      </button>
                      <button
                        onClick={() => handleQuickPrompt("Optimize database query performance")}
                        className="p-3 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        🗄️ Optimize database
                      </button>
                      <button
                        onClick={() => handleQuickPrompt("Explain design patterns")}
                        className="p-3 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        📚 Design patterns
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto">
                  {messages?.map((message) => (
                    <ChatMessage
                      key={message?.id}
                      message={message}
                      isUser={message?.isUser}
                      isStreaming={streamingMessageId === message?.id}
                      onRegenerate={handleRegenerate}
                      onBookmark={handleBookmark}
                    />
                  ))}
                  {streamingMessageId && (
                    <ChatMessage
                      message={{ id: streamingMessageId, content: '', timestamp: new Date() }}
                      isUser={false}
                      isStreaming={true}
                    />
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Chat Input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
             
            />
          </div>

          {/* Bot Configuration Panel */}
          <BotConfigPanel
            bot={currentBot}
            isCollapsed={isConfigCollapsed}
            onToggleCollapse={() => setIsConfigCollapsed(!isConfigCollapsed)}
            onQuickPrompt={handleQuickPrompt}
          />
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;