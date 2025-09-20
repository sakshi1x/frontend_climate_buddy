import { LoginCredentials, SignupData, AuthUser } from '../types';
import usersData from '../data/users.json';

interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  token?: string;
  error?: string;
  message?: string;
}

interface UserSession {
  userId: string;
  token: string;
  createdAt: string;
  expiresAt: string;
}

class AuthService {
  private users: any[] = usersData.users;
  private sessions: UserSession[] = usersData.sessions || [];
  private readonly TOKEN_EXPIRY_HOURS = 24;

  // Simulate network delay
  private async simulateDelay(min: number = 500, max: number = 2000): Promise<void> {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  // Generate a realistic JWT-like token
  private generateToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 64; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${token}`;
  }

  // Check if email already exists
  private emailExists(email: string): boolean {
    return this.users.some(user => user.email.toLowerCase() === email.toLowerCase());
  }

  // Find user by email
  private findUserByEmail(email: string): any | null {
    return this.users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
  }

  // Create new user
  private createUser(signupData: SignupData): any {
    const newUser = {
      id: (this.users.length + 1).toString(),
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=150&h=150&fit=crop&crop=face`,
      subscription: 'free' as const,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      profile: {
        ageGroup: 'adult' as const,
        knowledgeLevel: 'beginner' as const,
        language: 'en',
        location: 'Unknown',
        points: 0,
        level: 1,
        achievements: []
      }
    };

    this.users.push(newUser);
    return newUser;
  }

  // Create session
  private createSession(userId: string): UserSession {
    const token = this.generateToken();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);

    const session: UserSession = {
      userId,
      token,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    };

    this.sessions.push(session);
    return session;
  }

  // Convert user data to AuthUser format
  private toAuthUser(user: any): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      subscription: user.subscription,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    };
  }

  // Login method
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      await this.simulateDelay(800, 1500);

      // Validate input
      if (!credentials.email || !credentials.password) {
        return {
          success: false,
          error: 'Email and password are required'
        };
      }

      // Find user
      const user = this.findUserByEmail(credentials.email);
      if (!user) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Check password
      if (user.password !== credentials.password) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Update last login
      user.lastLogin = new Date().toISOString();

      // Create session
      const session = this.createSession(user.id);

      // Return success response
      return {
        success: true,
        user: this.toAuthUser(user),
        token: session.token,
        message: 'Login successful'
      };

    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again.'
      };
    }
  }

  // Signup method
  async signup(signupData: SignupData): Promise<AuthResponse> {
    try {
      await this.simulateDelay(1000, 2000);

      // Validate input
      if (!signupData.name || !signupData.email || !signupData.password) {
        return {
          success: false,
          error: 'All fields are required'
        };
      }

      // Check if email already exists
      if (this.emailExists(signupData.email)) {
        return {
          success: false,
          error: 'An account with this email already exists'
        };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signupData.email)) {
        return {
          success: false,
          error: 'Please enter a valid email address'
        };
      }

      // Validate password strength
      if (signupData.password.length < 8) {
        return {
          success: false,
          error: 'Password must be at least 8 characters long'
        };
      }

      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(signupData.password)) {
        return {
          success: false,
          error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        };
      }

      // Check password confirmation
      if (signupData.password !== signupData.confirmPassword) {
        return {
          success: false,
          error: 'Passwords do not match'
        };
      }

      // Check terms agreement
      if (!signupData.agreeToTerms) {
        return {
          success: false,
          error: 'You must agree to the terms and conditions'
        };
      }

      // Create new user
      const newUser = this.createUser(signupData);

      // Create session
      const session = this.createSession(newUser.id);

      // Return success response
      return {
        success: true,
        user: this.toAuthUser(newUser),
        token: session.token,
        message: 'Account created successfully'
      };

    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again.'
      };
    }
  }

  // Forgot password method
  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      await this.simulateDelay(500, 1000);

      if (!email) {
        return {
          success: false,
          error: 'Email is required'
        };
      }

      const user = this.findUserByEmail(email);
      if (!user) {
        // For security, don't reveal if email exists
        return {
          success: true,
          message: 'If an account with this email exists, a password reset link has been sent.'
        };
      }

      // In a real app, this would send an email
      return {
        success: true,
        message: 'If an account with this email exists, a password reset link has been sent.'
      };

    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again.'
      };
    }
  }

  // Validate token
  async validateToken(token: string): Promise<AuthResponse> {
    try {
      await this.simulateDelay(200, 500);

      const session = this.sessions.find(s => s.token === token);
      if (!session) {
        return {
          success: false,
          error: 'Invalid token'
        };
      }

      // Check if token is expired
      if (new Date() > new Date(session.expiresAt)) {
        // Remove expired session
        this.sessions = this.sessions.filter(s => s.token !== token);
        return {
          success: false,
          error: 'Token expired'
        };
      }

      // Find user
      const user = this.users.find(u => u.id === session.userId);
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      return {
        success: true,
        user: this.toAuthUser(user),
        token: session.token
      };

    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  }

  // Logout method
  async logout(token: string): Promise<AuthResponse> {
    try {
      await this.simulateDelay(200, 500);

      // Remove session
      this.sessions = this.sessions.filter(s => s.token !== token);

      return {
        success: true,
        message: 'Logged out successfully'
      };

    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<any> {
    try {
      await this.simulateDelay(300, 800);

      const user = this.users.find(u => u.id === userId);
      if (!user) {
        return null;
      }

      return user.profile;

    } catch (error) {
      return null;
    }
  }

  // Update user profile
  async updateUserProfile(userId: string, profileData: any): Promise<AuthResponse> {
    try {
      await this.simulateDelay(500, 1000);

      const user = this.users.find(u => u.id === userId);
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      // Update profile
      user.profile = { ...user.profile, ...profileData };

      return {
        success: true,
        message: 'Profile updated successfully'
      };

    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  }

  // Get demo credentials for testing
  getDemoCredentials(): { email: string; password: string; name: string }[] {
    return this.users.slice(0, 3).map(user => ({
      email: user.email,
      password: user.password,
      name: user.name
    }));
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
