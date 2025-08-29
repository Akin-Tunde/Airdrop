// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const projectId = import.meta.env.VITE_RAINBOWKIT_PROJECT_ID;
if (!projectId) {
  throw new Error("VITE_RAINBOWKIT_PROJECT_ID is not set. Please add it to your .env file");
}
const alchemyApiKey = import.meta.env.ALCHEMYAPIKEY;
const config = getDefaultConfig({
  appName: 'Raindrop dApp',
  projectId: projectId,
  chains: [base],

  // --- This 'transports' object is the fix for the 503 errors ---
  transports: {
    [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
  },

  ssr: false, // Required for Vite client-side apps
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);