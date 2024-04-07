'use client';

import { experimental_useAssistant as useAssistant } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import ChatSettings from './components/chat/ChatSettings';
import ChatSection from './components/chat/ChatSection';
import { Finger_Paint } from 'next/font/google';


const fingerPaint = Finger_Paint({ weight: '400', subsets: ['latin'] });

export enum AIStatus {
  Idle = 'Idle',
  InProgress = 'In Progress',
}

export type AssistantMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};


export default function Home() {
  const [status, setStatus] = useState(AIStatus.Idle);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // const lastMessage = messages.filter((m) => m.role === 'assistant').pop();
  return (
    <main className={fingerPaint.className}>
      <header className='py-8 text-5xl font-bold text-center mb-4'>
        DaVinci GPT
      </header>
      <div className='flex min-w-lg'>
        <ChatSettings
          status={status}
          setStatus={setStatus}
          setMessages={setMessages}
        />
        <ChatSection
          messages={messages}
          status={status}
          lastMessageRef={lastMessageRef}
        />
      </div>
    </main>
  );
}
