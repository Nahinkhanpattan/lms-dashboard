import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get user data from localStorage on initial load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, [user]);

  const login = async (email, password) => {
    try {
      // For demo purposes, we'll use these test credentials:
      // instructor@test.com / any-password -> logs in as instructor
      // student@test.com / any-password -> logs in as student
      // Any other email will be rejected

      if (!email || !password) {
        throw new Error('Please provide both email and password');
      }

      let mockUser;
      if (email === 'instructor@test.com') {
        mockUser = {
          id: '1',
          name: 'John Smith',
          email: email,
          role: 'instructor',
          avatar: 'https://ui-avatars.com/api/?name=John+Smith'
        };
      } else if (email === 'student@test.com') {
        mockUser = {
          id: '2',
          name: 'Jane Doe',
          email: email,
          role: 'student',
          avatar: 'https://ui-avatars.com/api/?name=Jane+Doe'
        };
      } else {
        throw new Error('Invalid credentials. Please use instructor@test.com or student@test.com');
      }

      // In a real implementation, this would be an API call:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      // const mockUser = data.user;

      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = async (profileData) => {
    try {
      // API call would go here
      // const response = await fetch('/api/users/profile', {
      //   method: 'PUT',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${user.token}`
      //   },
      //   body: JSON.stringify(profileData),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      setUser(prev => ({
        ...prev,
        ...profileData
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile
  };

  if (loading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};