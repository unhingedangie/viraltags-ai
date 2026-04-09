'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    // Check if app is already installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    };

    checkInstalled();

    // Check if dismissal was stored in localStorage
    const isDismissed = localStorage.getItem('pwa-install-dismissed');
    const dismissedTime = isDismissed ? parseInt(isDismissed, 10) : null;
    const now = Date.now();

    // Reset dismissal after 7 days
    if (dismissedTime && now - dismissedTime > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem('pwa-install-dismissed');
    }

    // Listen for beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Only show banner if not dismissed and not installed
      if (!isDismissed && !isInstalled) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for app installation
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowBanner(false);
      console.log('ViralTags AI installed successfully');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slideup">
      <div className="mx-4 mb-4 rounded-lg bg-gradient-to-r from-slate-900 to-gray-900 border border-cyan-500/30 shadow-2xl overflow-hidden">
        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-100">
              Install ViralTags AI for the best experience
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Add to your home screen for quick access
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleInstall}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold text-sm hover:shadow-lg hover:shadow-green-500/50 transition-all duration-200 whitespace-nowrap"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Dismiss install banner"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
