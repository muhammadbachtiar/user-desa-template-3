'use client';

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import './chatbot.css'
import { createChat } from '@n8n/chat';

const Chatbot = () => {

  const base64 = btoa(`${process.env.NEXT_PUBLIC_LABAHSA_CHATBOT_USERNAME}:${process.env.NEXT_PUBLIC_LABAHSA_CHATBOT_PASSWORD}`);

	useEffect(() => {
		createChat({
			webhookUrl:   `${process.env.NEXT_PUBLIC_LABAHSA_CHATBOT_BASE_URL}`,
       webhookConfig: {
          method: 'POST',
          headers: {
          'Authorization': `Basic ${base64}`,
          'Content-Type': 'application/json',
        }
		},
    initialMessages: [
      'Hi, Nama saya Aruna. Ada yang bisa saya bantu?',
    ],
    i18n: {
      en: {
        title: 'Chatbot <svg viewBox="0 0 24 24" width="32" height="32" class=""><path fill="currentColor" d="M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8"></path></svg>',
        subtitle: '',
        footer: '',
        getStarted: 'New Conversation',
        inputPlaceholder: 'Type your question..',
        closeButtonTooltip: ''
      },
    },
    }
  );
	}, [base64]);

	return (<div></div>);
};

export default Chatbot
