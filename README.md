# Blind Accessibility

Blind Accessibility is an application designed to assist visually impaired users by providing accessible features and functionalities. The app focuses on delivering a seamless experience with screen reader compatibility and keyboard navigation support.

## User Journeys

### 1. Sign In with ZAPT

1. **Landing Page**: The user opens the app and lands on the sign-in page.
2. **Sign In Heading**: The page displays a heading "Sign in with ZAPT".
3. **Learn More Link**: Below the heading, there's a link to [ZAPT](https://www.zapt.ai) that opens in a new tab.
4. **Authentication**: The user chooses a preferred method to sign in (Email, Google, Facebook, Apple).
5. **Screen Reader Support**: All elements are accessible via screen readers, with appropriate ARIA labels.

### 2. Navigate to the Home Page

1. **Successful Sign In**: After signing in, the user is redirected to the home page.
2. **Header**: The app displays a header with the title "Blind Accessibility".
3. **Sign Out Button**: A sign-out button is available, accessible via keyboard and screen reader.
4. **Main Content**: The user can navigate through the main features using the keyboard.

### 3. Add New Entry

1. **Form Navigation**: The user uses the keyboard to focus on the "Add New Entry" form.
2. **Input Fields**: Inputs have clear labels and are accessible.
3. **Submit Button**: The user submits the form using the keyboard.
4. **Confirmation**: A confirmation message is read by the screen reader.

### 4. Access Additional Features

1. **Feature Buttons**: Buttons like "Generate Content" are accessible and have descriptive ARIA labels.
2. **Loading States**: Loading indicators are announced via screen readers.
3. **Generated Content**: New content is added to the page, and the user is alerted.

## External API Services

- **Supabase Authentication**: Used for user authentication.
- **ZAPT Events**: Sends events to the backend for processing features like content generation.

## Accessibility Features

- **ARIA Labels**: All interactive elements have ARIA labels.
- **Keyboard Navigation**: Full support for navigating using the keyboard.
- **Screen Reader Compatibility**: Tested with screen readers to ensure information is conveyed properly.
