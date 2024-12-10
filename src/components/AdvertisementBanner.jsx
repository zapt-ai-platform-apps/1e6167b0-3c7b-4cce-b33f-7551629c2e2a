import { createSignal, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { getAds } from '../utils/getAds';
import { handleToolClick } from '../utils/handleToolClick';
import AdDisplay from './AdDisplay';

function AdvertisementBanner() {
  const [ad, setAd] = createSignal(null);
  const navigate = useNavigate();
  const ads = getAds();

  const getRandomAd = () => {
    if (ads.length === 0) {
      setAd(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * ads.length);
    setAd(ads[randomIndex]);
  };

  onMount(() => {
    getRandomAd();
  });

  const handleButtonClick = () => {
    if (ad()) {
      if (ad().type === 'tool') {
        handleToolClick(ad().toolName, navigate);
      } else if (ad().link) {
        if (ad().link.startsWith('http')) {
          window.open(ad().link, '_blank', 'noopener,noreferrer');
        } else {
          navigate(encodeURI(ad().link));
        }
      }
    }
  };

  return (
    <AdDisplay ad={ad} onClick={handleButtonClick} />
  );
}

export default AdvertisementBanner;