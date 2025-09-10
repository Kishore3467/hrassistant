import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your HR assistant. How can I help you with HR-related questions today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const hrKnowledgeBase = {
    'leave policy': 'Our leave policy includes 20 days of annual leave, 10 sick days, and 5 personal days per year. Leave requests should be submitted at least 2 weeks in advance.',
    'benefits': 'We offer comprehensive benefits including health insurance, retirement plans, wellness programs, and professional development opportunities.',
    'onboarding': 'The onboarding process takes 2 weeks and includes orientation, training sessions, and meetings with your team and manager.',
    'performance review': 'Performance reviews are conducted biannually. They include self-assessment, manager evaluation, and goal setting for the next period.',
    'career development': 'We offer mentorship programs, training courses, and opportunities for internal mobility to support career growth.',
    'work from home': 'Our hybrid work policy allows up to 3 days of remote work per week, subject to manager approval and role requirements.',
    'salary structure': 'Salaries are structured based on role, experience, and market benchmarks. We conduct annual salary reviews.',
    'code of conduct': 'Our code of conduct emphasizes respect, integrity, professionalism, and inclusive behavior in the workplace.',
    'recruitment process': 'The recruitment process typically takes 2-4 weeks and includes screening, interviews, and reference checks.',
    'employee referral': 'We offer a $1000 referral bonus for successful hires who stay with the company for more than 3 months.'
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific keywords
    for (const [keyword, response] of Object.entries(hrKnowledgeBase)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // General responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I assist you with HR matters today?";
    } else if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else you'd like to know?";
    } else if (lowerMessage.includes('help')) {
      return "I can help with questions about leave policies, benefits, onboarding, performance reviews, and other HR topics. What would you like to know?";
    } else {
      return "I'm here to help with HR-related questions. You can ask me about leave policies, benefits, onboarding, performance reviews, or other HR topics. How can I assist you?";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div 
        style={styles.chatIcon} 
        onClick={() => setIsOpen(!isOpen)}
        title="HR Assistant"
      >
        <svg style={styles.chatIconSvg} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
        {!isOpen && <div style={styles.notificationDot}></div>}
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div style={styles.overlay} onClick={() => setIsOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>HR Assistant</h3>
              <button 
                style={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            <div style={styles.messagesContainer}>
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  style={{
                    ...styles.message,
                    ...(message.sender === 'user' ? styles.userMessage : styles.botMessage)
                  }}
                >
                  <div style={{
                    ...styles.messageContent,
                    ...(message.sender === 'user' ? styles.userMessageContent : styles.botMessageContent)
                  }}>
                    <p style={styles.messageText}>{message.text}</p>
                    <span style={styles.messageTime}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div style={{...styles.message, ...styles.botMessage}}>
                  <div style={styles.messageContent}>
                    <div style={styles.typingIndicator}>
                      <span style={styles.typingDot}></span>
                      <span style={styles.typingDot}></span>
                      <span style={styles.typingDot}></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} style={styles.inputForm}>
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about HR policies, benefits, or other HR topics..."
                  disabled={isLoading}
                  style={styles.input}
                />
                <button 
                  type="submit" 
                  disabled={!inputMessage.trim() || isLoading}
                  style={styles.sendButton}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// Styles for the component
const styles = {
  chatIcon: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    transition: 'transform 0.2s',
  },
  chatIconSvg: {
    width: '30px',
    height: '30px',
  },
  notificationDot: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#ff4757',
    border: '2px solid white',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
  },
  modal: {
    width: '350px',
    height: '500px',
    backgroundColor: 'white',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesContainer: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    background: '#f8fafc',
  },
  message: {
    display: 'flex',
    marginBottom: '12px',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  messageContent: {
    maxWidth: '80%',
    padding: '10px 14px',
    borderRadius: '18px',
    position: 'relative',
  },
  userMessageContent: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderBottomRightRadius: '4px',
  },
  botMessageContent: {
    background: 'white',
    color: '#333',
    border: '1px solid #e2e8f0',
    borderBottomLeftRadius: '4px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  messageText: {
    margin: 0,
    fontSize: '14px',
    lineHeight: '1.4',
  },
  messageTime: {
    fontSize: '10px',
    opacity: '0.7',
    display: 'block',
    marginTop: '4px',
    textAlign: 'right',
  },
  inputForm: {
    padding: '16px',
    borderTop: '1px solid #e2e8f0',
    background: 'white',
  },
  inputContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    outline: 'none',
    fontSize: '14px',
    transition: 'border-color 0.2s',
  },
  sendButton: {
    padding: '10px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
  },
  typingIndicator: {
    display: 'flex',
    padding: '10px 14px',
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    borderBottomLeftRadius: '4px',
  },
  typingDot: {
    width: '6px',
    height: '6px',
    margin: '0 2px',
    backgroundColor: '#667eea',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'typing 1.4s infinite both',
  },
};

// Add animation for typing indicator
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    30% {
      transform: translateY(-6px);
      opacity: 1;
    }
  }
`, styleSheet.cssRules.length);

export default Chatbot;