import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import type { User, UserRole } from '../types/auth';
import { hasRole, hasAnyRole } from '../utils/roles';
import { authService } from '../services/authService';
import { userService } from '../services/userService';

// For now, we will mock an admin user as requested.
// You can easily change the role here to test different access levels.
import sarahJonesAvatar from "../assets/sarah_jones.png";

const MOCK_ADMIN_USER: User = {
  id: 'usr_1',
  name: 'Sarah Jones',
  role: 'admin', // Updated role to test the new UI
  avatar: sarahJonesAvatar,
  jobTitle: 'Company Admin'
};

interface AuthContextType {
  user: User | null;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const checkRole = (role: UserRole) => hasRole(user, role);
  const checkAnyRole = (roles: UserRole[]) => hasAnyRole(user, roles);

  const login = async (email?: string, password?: string) => {
    if (email && password) {
      try {
        const response = await authService.login({ email, password });
        
        // If login is successful, we might get a token (assuming it's in the data property of the response or string)
        // For this API, the token is likely returned as a string in the 'data' field or it sets an httpOnly cookie.
        // Let's assume there's a token we can store if it exists:
        if ((response as any).data && typeof (response as any).data === 'string') {
          localStorage.setItem('token', (response as any).data);
        }

        // Fetch current user details
        const userResp = await userService.getCurrentUser();
        if (userResp.isSuccess && userResp.data) {
          const apiUser: User = {
            id: userResp.data.id || 'usr_1',
            name: `${userResp.data.firstName || ''} ${userResp.data.lastName || ''}`.trim() || 'Unknown User',
            role: (userResp.data.roles?.[0] as UserRole) || 'admin',
            avatar: userResp.data.profilePictureUrl || sarahJonesAvatar,
            jobTitle: userResp.data.designation || 'Staff',
          };
          setUser(apiUser);
          localStorage.setItem('auth_user', JSON.stringify(apiUser));
          return;
        }
      } catch (err) {
        console.warn("API Login failed, falling back to mock user for dev:", err);
      }
    }
    
    // Fallback if API fails or no credentials provided
    setUser(MOCK_ADMIN_USER);
    localStorage.setItem('auth_user', JSON.stringify(MOCK_ADMIN_USER));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, hasRole: checkRole, hasAnyRole: checkAnyRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
