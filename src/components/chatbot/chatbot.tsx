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
    }
  );
	}, [base64]);

	return (<div></div>);
};

export default Chatbot
