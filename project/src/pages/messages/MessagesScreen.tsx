import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Send, 
  Trash2, 
  User, 
  ChevronLeft 
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { COLORS } from '../../theme';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: 'teacher' | 'admin';
  };
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  messages: {
    id: string;
    content: string;
    timestamp: string;
    fromSender: boolean;
  }[];
}

const MessagesScreen: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  
  // Mock data
  const messages: Message[] = [
    {
      id: '1',
      sender: {
        id: 't1',
        name: 'Ms. Johnson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        role: 'teacher'
      },
      subject: 'Math Homework Update',
      preview: 'I wanted to let you know about the upcoming math project...',
      date: '2025-06-10T14:30:00',
      unread: true,
      messages: [
        {
          id: 'm1',
          content: 'Hello! I wanted to let you know about the upcoming math project. Your child has been doing great in class, but I noticed they might need some extra help with the geometry concepts we\'ve been covering. The project is due next Friday, and it counts for 20% of their grade this term.',
          timestamp: '2025-06-10T14:30:00',
          fromSender: true
        },
        {
          id: 'm2',
          content: 'Thank you for letting me know. We\'ll make sure to review the geometry concepts at home. Is there any specific resource you recommend we use?',
          timestamp: '2025-06-10T15:45:00',
          fromSender: false
        },
        {
          id: 'm3',
          content: 'Yes, I recommend using Khan Academy\'s geometry section. They have excellent tutorials and practice problems. I\'ve also shared some additional worksheets on the class portal that might be helpful.',
          timestamp: '2025-06-10T16:20:00',
          fromSender: true
        }
      ]
    },
    {
      id: '2',
      sender: {
        id: 'a1',
        name: 'Principal Wilson',
        role: 'admin'
      },
      subject: 'School Event Reminder',
      preview: 'Don\'t forget about the upcoming parent-teacher conference...',
      date: '2025-06-08T09:15:00',
      unread: false,
      messages: [
        {
          id: 'm1',
          content: 'Don\'t forget about the upcoming parent-teacher conference scheduled for next Thursday from 4-7 PM. This is an important opportunity to discuss your child\'s progress and any concerns you might have. Please make sure to sign up for a time slot if you haven\'t already done so.',
          timestamp: '2025-06-08T09:15:00',
          fromSender: true
        }
      ]
    },
    {
      id: '3',
      sender: {
        id: 't2',
        name: 'Mr. Williams',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        role: 'teacher'
      },
      subject: 'Science Fair Project',
      preview: 'Your child\'s science fair project was exceptional...',
      date: '2025-06-05T11:45:00',
      unread: false,
      messages: [
        {
          id: 'm1',
          content: 'Your child\'s science fair project was exceptional! Their presentation on renewable energy sources was well-researched and clearly presented. They answered questions confidently and demonstrated a deep understanding of the subject matter. I wanted to let you know how proud we are of their work.',
          timestamp: '2025-06-05T11:45:00',
          fromSender: true
        },
        {
          id: 'm2',
          content: 'That\'s wonderful to hear! They worked very hard on that project, and I\'m glad it paid off. Thank you for letting us know.',
          timestamp: '2025-06-05T13:20:00',
          fromSender: false
        }
      ]
    }
  ];
  
  const formatMessageDate = (dateString: string) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    
    // Check if the message is from today
    if (messageDate.toDateString() === today.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Check if the message is from this week
    const diffDays = Math.floor((today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return messageDate.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise, show the date
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending reply:', replyText);
    
    // Clear the input
    setReplyText('');
  };
  
  const handleDeleteMessage = (messageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would delete the message from the backend
    console.log('Deleting message:', messageId);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        <p className="text-gray-600 mt-1">Stay in touch with teachers and school staff</p>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        {/* Message list */}
        <div className={`w-full md:w-1/3 overflow-y-auto ${selectedMessage ? 'hidden md:block' : ''}`}>
          <Card className="p-0 h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`
                    p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors
                    ${selectedMessage?.id === message.id ? 'bg-blue-50' : ''}
                    ${message.unread ? 'border-l-4 border-l-blue-500' : ''}
                  `}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      {message.sender.avatar ? (
                        <img
                          src={message.sender.avatar}
                          alt={message.sender.name}
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <User size={18} className="text-blue-600" />
                        </div>
                      )}
                      <div>
                        <h3 className={`font-medium ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.sender.name}
                        </h3>
                        <p className="text-xs text-gray-500">{message.sender.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">
                        {formatMessageDate(message.date)}
                      </span>
                      <button
                        className="ml-2 text-gray-400 hover:text-red-500 p-1"
                        onClick={(e) => handleDeleteMessage(message.id, e)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <h4 className={`mt-2 font-medium ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                    {message.subject}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {message.preview}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Message detail */}
        {selectedMessage ? (
          <div className="w-full md:w-2/3 flex flex-col h-full">
            <Card className="p-0 flex-1 flex flex-col h-full">
              {/* Message header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <button 
                    className="md:hidden mr-2 text-gray-500"
                    onClick={() => setSelectedMessage(null)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  {selectedMessage.sender.avatar ? (
                    <img
                      src={selectedMessage.sender.avatar}
                      alt={selectedMessage.sender.name}
                      className="h-10 w-10 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <User size={18} className="text-blue-600" />
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedMessage.sender.name}</h3>
                    <p className="text-xs text-gray-500">{selectedMessage.sender.role}</p>
                  </div>
                </div>
                
                <div>
                  <button className="text-gray-400 hover:text-red-500 p-1">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              {/* Message subject */}
              <div className="px-4 py-3 border-b">
                <h2 className="text-xl font-semibold text-gray-800">{selectedMessage.subject}</h2>
              </div>
              
              {/* Message content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {selectedMessage.messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.fromSender ? 'justify-start' : 'justify-end'}`}
                    >
                      <div 
                        className={`
                          max-w-[80%] p-3 rounded-lg
                          ${msg.fromSender 
                            ? 'bg-gray-100 text-gray-800' 
                            : `bg-[${COLORS.primary}] text-white`}
                        `}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${msg.fromSender ? 'text-gray-500' : 'text-blue-100'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reply box */}
              <div className="p-4 border-t">
                <div className="flex">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button
                    variant="primary"
                    className="rounded-l-none"
                    onClick={handleSendReply}
                    rightIcon={<Send size={16} />}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="w-full md:w-2/3 hidden md:flex items-center justify-center bg-gray-50 rounded-xl">
            <div className="text-center p-8">
              <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No message selected</h3>
              <p className="text-gray-500">Select a message from the list to view its contents</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesScreen;