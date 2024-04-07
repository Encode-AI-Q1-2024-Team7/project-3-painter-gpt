import { FormEvent, useState } from 'react';
import DropDownBox, { Option } from '../ui/dropdown';
import { AIStatus, AssistantMessage } from '@/app/page';

const Themes: Option[] = [
  { id: 1, name: 'Landscape' },
  { id: 2, name: 'Animal' },
  { id: 3, name: 'Abstract' },
  { id: 4, name: 'Nature' },
  { id: 5, name: 'Modern' },
  // More themes...
];

interface ChatSettingsProps {
  status: AIStatus;
  setStatus: (status: AIStatus) => void;
  setMessages: (messages: AssistantMessage[]) => void;
}

export default function ChatSettings({
  status,
  setStatus,
  setMessages,
}: ChatSettingsProps) {
  const [selectedTheme, setSelectedTheme] = useState(Themes[0]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessages([]); // Clear messages
    setStatus(AIStatus.InProgress);

    const formData = new FormData();
    formData.append(
      'message',
      `Can you suggest a ${selectedTheme.name} themed painting?`
    );

    const response = await fetch('/api/ai-assistant', {
      method: 'POST',
      body: JSON.stringify({ message: formData.get('message') }),
    });

    if (!response.ok) {
      console.error('API request failed');
      return;
    }

    const data: { messages: AssistantMessage[] } = await response.json();
    console.log('**************** data: ', data);
    console.log('**************** data.messages: ', data.messages);
    setMessages(data.messages);
    setStatus(AIStatus.Idle);
  }

  return (
    <div className='relative min-w-[500px] ml-6 w-96 mockup-window border bg-base-300 h-[50vh]'>
      <div className='card-body'>
        <h2 className='text-2xl font-bold text-center mb-4'>GPT Assistant</h2>
        <div className='sticky top-36 rounded-md mx-3 py-4'>
          <div className='flex justify-center py-2'>
            <DropDownBox
              state={selectedTheme}
              setState={setSelectedTheme}
              title='Pick a theme:'
              options={Themes}
            />
          </div>

          <div className='flex flex-col mt-40 items-center p-4'>
            <form onSubmit={onSubmit}>
              <label htmlFor='themeInput' />
              <input
                id='themeInput'
                type='text'
                value={`Can you suggest a ${selectedTheme.name} themed painting?`}
                hidden
                readOnly
                className='fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl'
              />
              <button className='btn' disabled={status !== AIStatus.Idle}>
                {status === AIStatus.InProgress && (
                  <div className='loading loading-dots loading-md' />
                )}
                {status === AIStatus.Idle
                  ? 'Ask DaVinci to suggest a painting'
                  : 'Loading'}
                {status === AIStatus.InProgress && (
                  <div className='loading loading-dots loading-md' />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
