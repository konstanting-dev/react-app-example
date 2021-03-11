import { useContext } from 'react';

import OnboardingContext from '../context';
import { OnboardingContextType } from '../types';

export default function useClaim(): OnboardingContextType {
  return useContext(OnboardingContext);
}
