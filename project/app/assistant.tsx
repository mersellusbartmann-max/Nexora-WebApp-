import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, LayoutAnimation, UIManager,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft, Sparkles, Send, Trash2, User,
} from 'lucide-react-native';
import { useApp } from '@/context/AppContext';
import { Colors, Spacing, FontSize, Radius, Shadows } from '@/constants/theme';
import { ChatMessage } from '@/types';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const suggestedQuestions = [
  'How can I improve my CV?',
  'How should I prepare for an interview?',
  'What skills should I develop?',
  'How do I write a professional email?',
  'Help me plan my job search.',
];

function generateResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('cv') || q.includes('resume')) {
    return "Here are some key tips to improve your CV:\n\n1. Keep it clear and structured — use headings, bullet points, and a clean font. Aim for 1-2 pages.\n\n2. Put your most relevant experience first. Use reverse chronological order.\n\n3. Include measurable achievements, not just duties. For example: 'Increased sales by 20%' rather than 'Responsible for sales.'\n\n4. Tailor your CV for each application. Mirror keywords from the job description.\n\n5. Always save and send as a PDF to preserve formatting.\n\n6. Include a short personal summary (2-3 lines) at the top.\n\nWould you like more specific advice on any of these points?";
  }

  if (q.includes('interview')) {
    return "Here's how to prepare for an interview:\n\nBefore the interview:\n• Research the company — visit their website and understand what they do\n• Prepare answers for common questions like 'Tell me about yourself' and 'Why do you want this job?'\n• Dress appropriately for the company culture\n• Arrive 10-15 minutes early\n\nDuring the interview:\n• Use the STAR method (Situation, Task, Action, Result) for behavioural questions\n• Maintain eye contact and listen carefully\n• Take a moment to think before answering\n• Ask thoughtful questions at the end\n\nAfter the interview:\n• Send a thank-you email within 24 hours\n• Follow up politely after 5-7 days if no response\n\nWould you like me to practice some interview questions with you?";
  }

  if (q.includes('skill') || q.includes('develop')) {
    return "Great question! Here are skills worth developing:\n\nDigital Skills:\n• Microsoft Office (especially Excel)\n• Google Workspace\n• Basic data analysis\n\nCommunication Skills:\n• Professional email writing\n• Active listening\n• Presentation skills\n\nWorkplace Skills:\n• Time management\n• Teamwork and collaboration\n• Problem-solving\n\nEmerging Skills:\n• AI literacy — learn to use AI tools productively\n• Basic coding or data skills\n• Digital marketing basics\n\nStart by picking one area and using free online resources. Even 30 minutes a day can make a big difference over time!\n\nWould you like recommendations for free learning resources?";
  }

  if (q.includes('email') || q.includes('professional')) {
    return "Writing professional emails is an important skill. Here's a simple structure:\n\n1. Subject line: Be clear and specific (e.g., 'Application: Junior Developer role')\n\n2. Greeting: 'Dear [Name]' or 'Good morning/afternoon'\n\n3. Body: Keep it concise (3-5 short paragraphs). State your purpose in the first line.\n\n4. Closing: 'Kind regards' or 'Best regards' followed by your full name\n\n5. Always proofread before sending — read it out loud to catch errors\n\nTips:\n• Check that names are spelled correctly\n• Verify you've attached any documents you mention\n• Double-check the recipient's email address\n• Keep a professional tone — avoid slang and emojis\n\nWould you like me to help you draft a specific email?";
  }

  if (q.includes('job search') || q.includes('plan')) {
    return "Here's a simple job search plan:\n\nWeek 1-2: Preparation\n• Update your CV and create a basic cover letter template\n• Set up profiles on job platforms (LinkedIn, Indeed, etc.)\n• Identify 3-5 target industries or roles\n\nWeek 3-4: Active searching\n• Set daily goals (e.g., apply to 3 jobs per day)\n• Set up job alerts on multiple platforms\n• Tell friends and family you're looking\n\nWeek 5+: Networking and follow-up\n• Attend job fairs and networking events\n• Follow up on applications after 5-7 days\n• Connect with people in your target industry\n\nTrack every application in a spreadsheet or an app like Nexora's Application Tracker. Stay consistent and don't get discouraged — the right opportunity will come!\n\nWould you like help with any specific part of this plan?";
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return "Hello! I'm your AI Career Assistant. I can help you with:\n\n• Improving your CV\n• Preparing for interviews\n• Identifying skills to develop\n• Writing professional emails\n• Planning your job search\n\nWhat would you like help with today?";
  }

  return "That's a great question! While I'm a demo assistant, I can help with topics like:\n\n• CV writing and improvement\n• Interview preparation\n• Skills development recommendations\n• Professional email writing\n• Job search planning\n\nTry asking me about any of these topics, or tap one of the suggested questions below. In a full version of Nexora, this assistant would connect to a real AI to answer any career-related question you have.";
}

export default function AssistantScreen() {
  const { chatHistory, addChatMessage, clearChat } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [chatHistory, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: Date.now(),
    };
    addChatMessage(userMsg);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        text: generateResponse(text),
        timestamp: Date.now(),
      };
      addChatMessage(responseMsg);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12} style={styles.iconBtn}>
          <ArrowLeft size={22} color={Colors.neutral[900]} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerAvatar}>
            <Sparkles size={18} color={Colors.neutral[0]} strokeWidth={2} />
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Career Assistant</Text>
            <Text style={styles.headerStatus}>Demo • Always available</Text>
          </View>
        </View>
        {chatHistory.length > 0 ? (
          <TouchableOpacity onPress={clearChat} hitSlop={12} style={styles.iconBtn}>
            <Trash2 size={20} color={Colors.neutral[500]} strokeWidth={2} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBtnPlaceholder} />
        )}
      </View>

      {/* Demo banner */}
      <View style={styles.demoBanner}>
        <Sparkles size={14} color={Colors.warning[600]} strokeWidth={2} />
        <Text style={styles.demoBannerText}>
          Prototype AI Assistant — responses are simulated for demo purposes
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.chatArea}
        behavior={Platform.OS === 'web' ? undefined : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.messagesScroll}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {chatHistory.length === 0 && (
            <View style={styles.welcomeContainer}>
              <View style={styles.welcomeIconWrap}>
                <Sparkles size={32} color={Colors.accent[600]} strokeWidth={2} />
              </View>
              <Text style={styles.welcomeTitle}>Hi! I'm your career assistant</Text>
              <Text style={styles.welcomeText}>
                I can help you with CV tips, interview prep, skills development, and job search planning. Tap a question below or type your own.
              </Text>
              <View style={styles.suggestions}>
                {suggestedQuestions.map((q) => (
                  <TouchableOpacity
                    key={q}
                    onPress={() => sendMessage(q)}
                    activeOpacity={0.7}
                    style={styles.suggestionChip}
                  >
                    <Text style={styles.suggestionText}>{q}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {chatHistory.map((msg) => (
            <View
              key={msg.id}
              style={[styles.messageRow, msg.role === 'user' && styles.messageRowUser]}
            >
              {msg.role === 'assistant' && (
                <View style={styles.assistantAvatar}>
                  <Sparkles size={14} color={Colors.neutral[0]} strokeWidth={2} />
                </View>
              )}
              <View
                style={[
                  styles.messageBubble,
                  msg.role === 'user' ? styles.userBubble : styles.assistantBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    msg.role === 'user' ? styles.userMessageText : styles.assistantMessageText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
              {msg.role === 'user' && (
                <View style={styles.userAvatar}>
                  <User size={14} color={Colors.neutral[0]} strokeWidth={2} />
                </View>
              )}
            </View>
          ))}

          {isTyping && (
            <View style={styles.messageRow}>
              <View style={styles.assistantAvatar}>
                <Sparkles size={14} color={Colors.neutral[0]} strokeWidth={2} />
              </View>
              <View style={[styles.messageBubble, styles.assistantBubble]}>
                <View style={styles.typingDots}>
                  <View style={[styles.typingDot, styles.typingDot1]} />
                  <View style={[styles.typingDot, styles.typingDot2]} />
                  <View style={[styles.typingDot, styles.typingDot3]} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Ask me anything about your career..."
            placeholderTextColor={Colors.neutral[400]}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={() => sendMessage(input)}
            disabled={!input.trim()}
            activeOpacity={0.7}
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
          >
            <Send size={18} color={Colors.neutral[0]} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Platform.OS === 'web' ? Spacing.md : Spacing.xl + 16,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.neutral[0],
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnPlaceholder: {
    width: 40,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 2,
    flex: 1,
    justifyContent: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
  },
  headerStatus: {
    fontSize: FontSize.xs,
    color: Colors.success[600],
    fontFamily: 'Inter-Regular',
    marginTop: 1,
  },
  demoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.warning[50],
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
  },
  demoBannerText: {
    flex: 1,
    fontSize: FontSize.xs,
    color: Colors.warning[600],
    fontFamily: 'Inter-Regular',
  },
  chatArea: {
    flex: 1,
  },
  messagesScroll: {
    flex: 1,
  },
  messagesContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  welcomeIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.accent[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  welcomeTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: FontSize.sm,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  suggestions: {
    gap: Spacing.sm + 2,
    width: '100%',
    maxWidth: 400,
  },
  suggestionChip: {
    backgroundColor: Colors.neutral[0],
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    ...Shadows.sm,
  },
  suggestionText: {
    fontSize: FontSize.sm,
    color: Colors.neutral[700],
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    marginBottom: Spacing.md - 2,
    maxWidth: '100%',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  assistantAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.accent[600],
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  messageBubble: {
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.md,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: Colors.primary[600],
    borderBottomRightRadius: Radius.sm,
  },
  assistantBubble: {
    backgroundColor: Colors.neutral[0],
    borderWidth: 1,
    borderColor: Colors.neutral[100],
    borderBottomLeftRadius: Radius.sm,
    ...Shadows.sm,
  },
  messageText: {
    fontSize: FontSize.sm,
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  userMessageText: {
    color: Colors.neutral[0],
  },
  assistantMessageText: {
    color: Colors.neutral[700],
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
    paddingVertical: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neutral[300],
  },
  typingDot1: { opacity: 0.4 },
  typingDot2: { opacity: 0.7 },
  typingDot3: { opacity: 1 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    backgroundColor: Colors.neutral[0],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[100],
    paddingBottom: Platform.OS === 'web' ? Spacing.sm + 2 : Spacing.xl + 8,
  },
  textInput: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.neutral[800],
    fontFamily: 'Inter-Regular',
    backgroundColor: Colors.neutral[50],
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md - 2,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    maxHeight: 100,
    minHeight: 44,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  sendBtnDisabled: {
    backgroundColor: Colors.neutral[300],
  },
});
