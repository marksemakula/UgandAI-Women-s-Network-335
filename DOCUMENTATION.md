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
- **Mentor**: Platform connecting mentors and mentees in AI fields

## Content Management System

The CMS allows authorized administrators to:
- Manage all website content
- Approve talent pool submissions
- Create and edit events
- Update featured stories
- Manage mentorship pairings
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

### Mentorship Program
1. Go to `/admin/mentorship`
2. View current mentorship pairings
3. Manage program settings:
   - Matching criteria (expertise, availability)
   - Program duration options
   - Feedback collection forms
4. Edit program content:
   - Program description
   - Benefits section
   - Success stories
5. Set featured mentor profiles

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
- Mentorship components:
  - Matching algorithm
  - Session scheduling
  - Progress tracking

### Backend Requirements
- Node.js server
- MongoDB database
- Authentication service
- Mentorship-specific collections:
  - mentor_profiles
  - mentorship_matches
  - session_records

### Deployment
- Build command: `npm run build`
- Outputs to `dist` folder
- Requires Vite-compatible hosting

## Footer Banner
The black banner at the bottom displays:
`UWIAI / Inzozi / 1705` 
- This represents our partnership with Inzozi and founding year
- Do not remove or modify without approval