'use client';

import { useCallback, useState } from 'react';
import FeaturedVehiclesSection from '@/components/home/FeaturedVehiclesSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import HomeQuoteSection from '@/components/home/HomeQuoteSection';

export default function HomePageSections() {
  const [prefilledVehicle, setPrefilledVehicle] = useState<string | undefined>(
    undefined,
  );

  const handleVehicleEnquire = useCallback((vehicleName: string) => {
    setPrefilledVehicle(vehicleName);
    document.getElementById('quote-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  return (
    <>
      <FeaturedVehiclesSection onEnquire={handleVehicleEnquire} />
      <ServicesOverview />
      <HomeQuoteSection prefilledVehicle={prefilledVehicle} />
    </>
  );
}
