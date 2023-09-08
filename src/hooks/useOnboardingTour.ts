import { onboardingTourConfiguration } from '@/lib/onboarding-tour';
import { useMediaQuery } from '@mantine/hooks';
import { driver } from 'driver.js';
import { useEffect } from 'react';

export function useOnboardingTour() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    const tourCompleted = localStorage.getItem('tour_completed');

    if (!tourCompleted && isDesktop) {
      const driverIntance = driver(onboardingTourConfiguration);

      driverIntance.drive();

      localStorage.setItem('tour_completed', 'true');
    }
  }, [isDesktop]);
}
