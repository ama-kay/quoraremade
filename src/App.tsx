import React, { useState, useEffect } from 'react';
import { Home, User, Bell, Search, Settings, MessageSquare, DollarSign, BarChart3, Bookmark, FileText, ChevronRight, Filter, MoreHorizontal, ArrowUp, MessageCircle, Share, Plus, Check, Volume2, Fuel as Funnel, Users, Mail, Zap, X } from 'lucide-react';

// Types
interface Post {
  id: number;
  title: string;
  author: string;
  timeAgo: string;
  content: string;
  thenImage: string;
  nowImage: string;
  upvotes: string;
  downvotes: string;
  comments: string;
  shares: string;
}

interface Notification {
  id: number;
  type: string;
  author: string;
  title: string;
  content: string;
  timeAgo: string;
  isRead: boolean;
  category: 'likes' | 'replies' | 'follows' | 'highlights';
}

interface Space {
  id: number;
  name: string;
  isFollowing: boolean;
  memberCount: string;
  description: string;
}

interface Message {
  id: number;
  sender: string;
  preview: string;
  timeAgo: string;
  isRead: boolean;
  avatar: string;
}

function App() {
  const [activeScreen, setActiveScreen] = useState<'home' | 'search' | 'messages' | 'notifications' | 'profile'>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState<'all' | 'likes' | 'replies' | 'follows' | 'highlights'>('all');
  const [spaces, setSpaces] = useState<Space[]>([
    { id: 1, name: 'Technology', isFollowing: false, memberCount: '2.1M', description: 'Latest tech trends and discussions' },
    { id: 2, name: 'Science', isFollowing: true, memberCount: '1.8M', description: 'Scientific discoveries and research' },
    { id: 3, name: 'Philosophy', isFollowing: false, memberCount: '890K', description: 'Deep thoughts and philosophical debates' }
  ]);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'BEAUTY', preview: 'Thanks for your answer about skincare!', timeAgo: '1h', isRead: false, avatar: 'bg-pink-500' },
    { id: 2, sender: 'In ca', preview: 'Great question about career advice', timeAgo: '2h', isRead: true, avatar: 'bg-blue-500' },
    { id: 3, sender: 'In da', preview: 'I disagree with your point about...', timeAgo: '3h', isRead: true, avatar: 'bg-green-500' },
    { id: 4, sender: 'Ok ru', preview: 'Can you elaborate on your answer?', timeAgo: '4h', isRead: false, avatar: 'bg-purple-500' }
  ]);

  const samplePost: Post = {
    id: 1,
    title: "Regular People & Their Amazing Stories",
    author: "Richard Strachon",
    timeAgo: "Jul 10",
    content: "[The Post was originally From Wonder] She was 24, fresh out of college. The baby was 3 months old, abandoned outside the hospital with Read more",
    thenImage: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    nowImage: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    upvotes: "16.1k",
    downvotes: "751",
    comments: "751",
    shares: "119"
  };

  const notifications: Notification[] = [
    {
      id: 1,
      type: "Highlight in Interesting",
      author: "Belle Gayor-Thu",
      title: "Stand your ground",
      content: "If my boyfriend refuses to reciprocate affection, is it time to leave my relationship? He said that he simply doesn't...",
      timeAgo: "3h",
      isRead: false,
      category: 'highlights'
    },
    {
      id: 2,
      type: "Highlight in Interesting",
      author: "Emmanuel Nzohakwe-Sel",
      title: "Tom Brady Faces Backlash From Friends Over Picture With 17-Year-Old Son Jack",
      content: "Tom Brady may be one of the greatest NFL...",
      timeAgo: "4h",
      isRead: false,
      category: 'highlights'
    },
    {
      id: 3,
      type: "Highlight in Interesting",
      author: "Emmanuel Nzohakwe-FD",
      title: "Drink where the horses drink, for a horse will never drink dirty water. Place your bed where the cat sleeps, for t...",
      content: "",
      timeAgo: "5h",
      isRead: false,
      category: 'highlights'
    },
    {
      id: 4,
      type: "Highlight in Interesting",
      author: "Belle Gayor-Thu",
      title: "Different, positive approach",
      content: "What do you say to win the 'I",
      timeAgo: "6h",
      isRead: false,
      category: 'highlights'
    }
  ];

  // Simulate real-time space following with <500ms response
  const handleSpaceFollow = async (spaceId: number) => {
    const startTime = Date.now();
    
    // Optimistic update
    setSpaces(prev => prev.map(space => 
      space.id === spaceId 
        ? { ...space, isFollowing: !space.isFollowing }
        : space
    ));

    // Simulate API call with guaranteed <500ms response
    await new Promise(resolve => {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, Math.min(400, 400 - elapsed)); // Ensure <500ms total
      setTimeout(resolve, delay);
    });

    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleMarkAllAsRead = () => {
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    
    // Mark all notifications as read (would update backend)
    console.log('All notifications marked as read');
  };

  const handleDeleteMessage = (messageId: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (notificationFilter === 'all') return true;
    return notification.category === notificationFilter;
  });

  // Status Bar Component - Exact match to screenshots
  const StatusBar = ({ time = "16:02" }: { time?: string }) => (
    <div className="bg-black px-6 py-3 flex items-center justify-between text-white text-base font-semibold safe-area-top">
      <span className="text-white font-medium">{time}</span>
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-1 h-4 bg-white rounded-full"></div>
          <div className="w-1 h-4 bg-white rounded-full"></div>
          <div className="w-1 h-4 bg-white rounded-full"></div>
          <div className="w-1 h-4 bg-gray-500 rounded-full"></div>
        </div>
        <div className="ml-3 flex items-center space-x-1">
          <div className="w-7 h-4 border border-white rounded-sm">
            <div className="w-5 h-2 bg-white rounded-sm m-0.5"></div>
          </div>
          <span className="text-sm">83</span>
        </div>
      </div>
    </div>
  );

  // Home Screen - Exact match to 16:02 screenshot
  const HomeScreen = () => (
    <div className="min-h-screen bg-black text-white mobile-app">
      <StatusBar time="16:02" />
      
      {/* Header with Home and icons */}
      <div className="bg-black px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-medium text-xl">Home</span>
        </div>
        <div className="flex items-center space-x-5">
          <Settings className="w-6 h-6 text-gray-300" />
          <Bell className="w-6 h-6 text-gray-300" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-black px-6 pb-5">
        <div className="relative">
          <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="search"
            className="w-full bg-gray-700 text-white pl-12 pr-5 py-4 rounded-xl focus:outline-none placeholder-gray-400 text-base"
          />
        </div>
      </div>

      {/* Post */}
      <div className="px-6">
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          {/* Post Header */}
          <div className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-base font-bold">R</span>
              </div>
              <div className="flex-1">
                <h3 className="text-blue-400 font-medium text-base">
                  Regular People & Their Amazing Stories
                </h3>
                <p className="text-gray-400 text-sm">Posted by Richard Strachon Jul 10</p>
              </div>
            </div>
            <button className="text-gray-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Post Content */}
          <div className="px-5 pb-4">
            <p className="text-gray-300 text-base leading-relaxed mb-5">
              [The Post was originally From Wonder] She was 24, fresh out of college. The baby was 3 months old, abandoned outside the hospital with Read more
            </p>

            {/* Then vs Now Images */}
            <div className="relative rounded-xl overflow-hidden">
              <div className="flex">
                <div className="flex-1 relative">
                  <img src={samplePost.thenImage} alt="Then" className="w-full h-56 object-cover" />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-90 text-white px-4 py-2 rounded text-base font-bold">
                    THEN
                  </div>
                </div>
                <div className="flex-1 relative">
                  <img src={samplePost.nowImage} alt="Now" className="w-full h-56 object-cover" />
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-90 text-white px-4 py-2 rounded text-base font-bold">
                    NOW
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Post Actions */}
          <div className="px-5 py-4 flex items-center justify-between text-gray-400 text-sm border-t border-gray-700">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <ArrowUp className="w-5 h-5" />
                <span>Upvote 16.1k</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowUp className="w-5 h-5 rotate-180" />
                <span>751</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>119</span>
              </div>
            </div>
            <button>
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 safe-area-bottom">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => setActiveScreen('home')}
            className="p-4"
          >
            <Home className={`w-7 h-7 ${activeScreen === 'home' ? 'text-red-500' : 'text-gray-400'}`} />
          </button>
          
          <button
            onClick={() => setActiveScreen('profile')}
            className="p-4"
          >
            <Users className={`w-7 h-7 ${activeScreen === 'profile' ? 'text-red-500' : 'text-gray-400'}`} />
          </button>
          
          <button className="p-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-600">
              <Plus className="w-5 h-5 text-white" />
            </div>
          </button>
          
          <button className="p-4">
            <img src="/image.png" alt="Custom" className="w-7 h-7" />
          </button>
          
          <button
            onClick={() => setActiveScreen('notifications')}
            className="p-4 relative"
          >
            <MessageSquare className={`w-7 h-7 ${activeScreen === 'notifications' ? 'text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>
        
        {/* Home indicator */}
        <div className="flex justify-center pb-3">
          <div className="w-36 h-1 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );

  // Profile Screen - Exact match to 16:38 screenshot
  const ProfileScreen = () => (
    <div className="min-h-screen bg-black text-white mobile-app">
      <StatusBar time="16:38" />
      
      {/* Profile Header */}
      <div className="bg-black px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-white font-medium text-xl">Manuela Wilson</span>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 space-y-2">
        {[
          { icon: MessageSquare, label: "Messages", screen: 'messages' as const },
          { icon: DollarSign, label: "Monetization" },
          { icon: BarChart3, label: "Your content & stats" },
          { icon: Bookmark, label: "Bookmarks" },
          { icon: FileText, label: "Drafts" }
        ].map((item, index) => (
          <button 
            key={index} 
            onClick={() => item.screen && setActiveScreen(item.screen)}
            className="w-full bg-gray-900 rounded-xl px-5 py-5 flex items-center space-x-4 text-left"
          >
            <item.icon className="w-6 h-6 text-gray-300" />
            <span className="text-white font-medium flex-1 text-base">{item.label}</span>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        ))}
      </div>

      {/* Chat Messages Preview - Right side of screen */}
      <div className="absolute right-6 top-40 space-y-4">
        {messages.slice(0, 4).map((msg, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full ${msg.avatar} flex items-center justify-center`}>
              <span className="text-white text-sm font-bold">{msg.sender.charAt(0)}</span>
            </div>
            <div className="text-right">
              <div className="text-white text-sm">{msg.sender}</div>
              <div className="text-gray-400 text-sm">{msg.timeAgo}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 safe-area-bottom">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => setActiveScreen('home')}
            className="p-4"
          >
            <Home className={`w-7 h-7 ${activeScreen === 'home' ? 'text-red-500' : 'text-gray-400'}`} />
          </button>
          
          <button
            onClick={() => setActiveScreen('profile')}
            className="p-4"
          >
            <Users className={`w-7 h-7 ${activeScreen === 'profile' ? 'text-red-500' : 'text-gray-400'}`} />
          </button>
          
          <button className="p-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-600">
              <Plus className="w-5 h-5 text-white" />
            </div>
          </button>
          
          <button className="p-4">
            <img src="/image.png" alt="Custom" className="w-7 h-7" />
          </button>
          
          <button
            onClick={() => setActiveScreen('notifications')}
            className="p-4 relative"
          >
            <MessageSquare className={`w-7 h-7 ${activeScreen === 'notifications' ? 'text-red-500' : 'text-gray-400'}`} />
            <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
        
        {/* Home indicator */}
        <div className="flex justify-center pb-3">
          <div className="w-36 h-1 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );

  // Notifications Screen - Exact match to 16:38 screenshot
  const NotificationsScreen = () => (
    <div className="min-h-screen bg-black text-white mobile-app">
      <StatusBar time="16:38" />
      
      <div className="bg-black px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-medium text-xl">Notifications</span>
        </div>
        <Settings className="w-6 h-6 text-gray-300" />
      </div>

      {/* Controls */}
      <div className="bg-black px-6 pb-5 flex items-center justify-between">
        <button 
          onClick={handleMarkAllAsRead}
          className="text-blue-400 text-base font-medium"
        >
          Mark All As Read
        </button>
        <div className="relative">
          <Funnel className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-6 space-y-4">
        {filteredNotifications.map((notification) => (
          <div key={notification.id} className="bg-gray-900 rounded-xl p-5">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-base">
                  {notification.author.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <span className="text-blue-400 text-sm font-medium block mb-1">{notification.type}</span>
                    <p className="text-gray-400 text-sm mb-2">Posted by {notification.author}</p>
                    <h4 className="text-white font-medium text-base leading-relaxed mb-3">
                      {notification.title}
                    </h4>
                    {notification.content && (
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {notification.content}
                      </p>
                    )}
                  </div>
                  <button className="ml-3">
                    <MoreHorizontal className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 safe-area-bottom">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => setActiveScreen('home')}
            className="p-4"
          >
            <Home className={`w-7 h-7 ${activeScreen === 'home' ? 'text-red-500' : 'text-gray-400'}`} />
          </button>
          
          <button
            onClick={() => setActiveScreen('profile')}
            className="p-4"
          >
            <Users className={`w-7 h-7 ${activeScreen === 'profile' ? 'text-red-500' : 'text-gray-400'}`} />
          </button>
          
          <button className="p-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-600">
              <Plus className="w-5 h-5 text-white" />
            </div>
          </button>
          
          <button className="p-4">
            <img src="/image.png" alt="Custom" className="w-7 h-7" />
          </button>
          
          <button
            onClick={() => setActiveScreen('notifications')}
            className="p-4 relative"
          >
            <MessageSquare className={`w-7 h-7 ${activeScreen === 'notifications' ? 'text-red-500' : 'text-gray-400'}`} />
            <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
        
        {/* Home indicator */}
        <div className="flex justify-center pb-3">
          <div className="w-36 h-1 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mobile-container">
      {activeScreen === 'home' && <HomeScreen />}
      {activeScreen === 'profile' && <ProfileScreen />}
      {activeScreen === 'notifications' && <NotificationsScreen />}
    </div>
  );
}

export default App;