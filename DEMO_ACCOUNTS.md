# Demo Accounts for ClimateBuddy

This document lists the demo accounts available for testing the ClimateBuddy application.

## Available Demo Accounts

### 1. Sarah Johnson (Premium User)
- **Email:** sarah.johnson@email.com
- **Password:** Climate2024!
- **Subscription:** Premium
- **Level:** 8 (2,450 points)
- **Achievements:** eco-warrior, energy-saver, water-conserver

### 2. Mike Chen (Free User)
- **Email:** mike.chen@email.com
- **Password:** GreenLife2024
- **Subscription:** Free
- **Level:** 3 (890 points)
- **Achievements:** first-steps

### 3. Emma Rodriguez (Enterprise User)
- **Email:** emma.rodriguez@email.com
- **Password:** Sustainable2024
- **Subscription:** Enterprise
- **Level:** 15 (5,670 points)
- **Achievements:** eco-warrior, energy-saver, water-conserver, waste-reducer, climate-educator

### 4. Alex Thompson (Premium User)
- **Email:** alex.thompson@email.com
- **Password:** EcoFriendly2024
- **Subscription:** Premium
- **Level:** 6 (1,890 points)
- **Achievements:** energy-saver, water-conserver

### 5. Lisa Wang (Free User)
- **Email:** lisa.wang@email.com
- **Password:** ClimateAction2024
- **Subscription:** Free
- **Level:** 2 (450 points)
- **Achievements:** first-steps

### 6. David Kim (Premium User)
- **Email:** david.kim@email.com
- **Password:** GreenFuture2024
- **Subscription:** Premium
- **Level:** 12 (4,230 points)
- **Achievements:** eco-warrior, energy-saver, water-conserver, waste-reducer

### 7. Maria Garcia (Free User)
- **Email:** maria.garcia@email.com
- **Password:** SustainableLife2024
- **Subscription:** Free
- **Level:** 5 (1,560 points)
- **Achievements:** energy-saver, water-conserver

### 8. James Wilson (Enterprise User)
- **Email:** james.wilson@email.com
- **Password:** EcoWarrior2024
- **Subscription:** Enterprise
- **Level:** 18 (6,780 points)
- **Achievements:** eco-warrior, energy-saver, water-conserver, waste-reducer, climate-educator, community-leader

## How to Use Demo Accounts

1. **Via Login Form:** Click "Show Demo Accounts" on the login page to see available accounts and click "Use This Account" to auto-fill the credentials.

2. **Manual Entry:** Copy any email and password from the list above and enter them manually in the login form.

3. **New Account:** You can also create a new account using the signup form with any email that's not already in the demo accounts list.

## Features Demonstrated

- **Realistic Authentication:** Simulates real API calls with network delays
- **User Profiles:** Each account has different subscription levels, points, and achievements
- **Session Management:** JWT-like tokens with expiration
- **Error Handling:** Proper validation and error messages
- **Password Reset:** Forgot password functionality (simulated)

## Technical Details

- All user data is stored in `src/data/users.json`
- Authentication service is in `src/services/authService.ts`
- Realistic network delays (500ms - 2000ms)
- Proper form validation and error handling
- Session management with token expiration
