import { AIStatus } from '@/app/page';
import { Message } from 'ai';
import { AssistantStatus } from 'ai/react';

interface ChatSectionProps {
  messages: Message[];
  status: AIStatus;
  lastMessageRef: React.RefObject<HTMLDivElement>;
}

export default function ChatSection({
  messages,
  status,
  lastMessageRef,
}: ChatSectionProps) {
  return (
    <>
      <div className='flex flex-col w-full h-5/6 min-w-96 max-w-3xl mx-auto'>
        <h2 className='text-2xl font-bold text-center mb-4'>Chat Box</h2>
        <div className='overflow-auto mb-8 w-full' ref={lastMessageRef}>
          {messages
            ? messages.map((m, idx) => (
                <div
                  key={m.id}
                  ref={idx === messages.length - 1 ? lastMessageRef : null}
                  className={`whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-neutral p-3 m-2 rounded-lg'
                      : 'bg-accent p-3 m-2 rounded-lg'
                  }`}
                >
                  {m.role === 'user' ? (
                    <span className='text-yellow-400'>Me: </span>
                  ) : (
                    <span className='text-red-400'>DaVinci: </span>
                  )}
                  {m.content}
                </div>
              ))
            : null}

          {status === AIStatus.InProgress && (
            <div className='flex justify-center pr-4'>
              <div className='loading loading-dots loading-lg'></div>
              <span className='text-lg px-2'>DaVinci is thinking</span>
              <div className='loading loading-dots loading-lg'></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
