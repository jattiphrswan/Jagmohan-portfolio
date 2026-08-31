import { useState, useEffect, useCallback } from 'react';
import { ProfileContext } from './ProfileContext';
import { profile as defaultProfile } from '../data/profile';
import { API_BASE } from '../config/api';

export default function ProfileProvider({ children }) {
  const [profileData, setProfileData] = useState(defaultProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/profile`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setProfileData(json.data);
          setError(null);
          return json.data;
        }
      }
      return defaultProfile;
    } catch {
      // Fallback remains in state
      return defaultProfile;
    } finally {

      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <ProfileContext.Provider value={{ profile: profileData, loading, error, refetchProfile: fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
