import { useContext } from 'react';
import { ProfileContext } from './ProfileContext';
import { profile as defaultProfile } from '../data/profile';

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    return { profile: defaultProfile, loading: false, error: null, refetchProfile: () => {} };
  }
  return context;
}

export default useProfile;
