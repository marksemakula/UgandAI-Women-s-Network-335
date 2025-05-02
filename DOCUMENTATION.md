# UWIAI Website Documentation

## Table of Contents
1. [Website Structure](#website-structure)
2. [Content Management System](#content-management-system)
3. [Updating Content](#updating-content)
4. [Admin Accounts](#admin-accounts)
5. [Technical Details](#technical-details)

## Website Structure

The UWIAI website consists of the following main sections:
- **Home**: Landing page with featured stories and upcoming events
- **Projects**: Showcase of AI projects by members
- **Innovators**: Profiles of leading women in AI
- **Talent Pool**: Directory of members with public profiles
- **Membership**: Registration form for new members

## Content Management System

The CMS allows authorized administrators to:
- Manage all website content
- Approve talent pool submissions
- Create and edit events
- Update featured stories
- Manage admin accounts

### Accessing the CMS
1. Navigate to `/admin/login`
2. Enter admin credentials
3. You'll be redirected to the dashboard

## Updating Content

### Events
1. Go to `/admin/events`
2. Click "Add New" or select an existing event
3. Fill in event details:
   - Title
   - Date and time
   - Location
   - Description
   - Event type (Workshop, Conference, etc.)
4. Click "Save Changes"

### Featured Stories
1. Go to `/admin/content`
2. Select "Stories" from the sidebar
3. Add new or edit existing stories:
   - Title
   - Author
   - Date
   - Featured image (URL)
   - Excerpt
4. Click "Save Changes"

### Innovator Spotlights
1. Go to `/admin/innovators`
2. Add or edit innovator profiles:
   - Name and title
   - Bio
   - Achievements
   - Social links
   - Featured image
3. Toggle "Featured" status for highlighted profiles

## Admin Accounts

### Creating New Admins
1. Currently requires direct database access
2. Contact the technical team for setup

### Password Reset
1. Admins can reset passwords via email link
2. System will send a reset link to registered email

## Technical Details

### Frontend
- Built with React.js
- Styled with Tailwind CSS
- Animations with Framer Motion
- Icons from React Icons

### Backend Requirements
- Node.js server
- MongoDB database
- Authentication service

### Deployment
- Build command: `npm run build`
- Outputs to `dist` folder
- Requires Vite-compatible hosting

## Footer Banner
The black banner at the bottom displays:
`UWIAI / Inzozi / 1705` 
- This represents our partnership with Inzozi and founding year
- Do not remove or modify without approval