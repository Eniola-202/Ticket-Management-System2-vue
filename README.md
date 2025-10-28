# Ticket Management System Vue implementation

## 🏠 Landing Page

- Welcoming hero section with animated SVG background 
- Decorative circular elements and gradients 
- Feature highlight boxes with soft shadows 
- Responsive layout (max-width: 1440px) 
- Clear call-to-action buttons for Login and Sign Up

## 🔐Authentication System
- Secure Login and Sign Up pages 
- Real-time form validation with inline error messages 
- Toast notifications for instant user feedback 
- Session management using localStorage 
- Navigation guards for protecting authenticated routes

## 📊Dashboard
- Real-time ticket analytics (Total, Open, In Progress, Resolved) 
- Dynamic completion rate visualization 
- Recent ticket overview section 
- Quick action buttons for management tasks 
- Performance metrics displayed using cards and charts

## 🎟️ Ticket Management (CRUD)
- Operation Description 
- Create Add new tickets with form validation 
- Read Display all tickets in a responsive grid view 
- Update Edit existing ticket details easily 
- Delete Remove tickets with a confirmation prompt 
- Search Find tickets by title or description 
- Filter Filter tickets by status or priority 
- Color Coding Open (Green), In Progress (Amber), Closed (Gray)


## SetUp
```bash
git clone https://github.com/yourusername/vue-app.git

# Navigate to project folder
cd vue-app

# Install dependencies
npm install

# Run development server
npm run dev
```
### Dependencies
```bash 
npm install lucide-vue-next
```


## 🎨 UI Components Overview
#### 🦸‍♂️ Hero Component
- Full-width landing section.  
- Wavy SVG background at bottom edge.  
- Decorative circular elements.  
- Responsive grid layout.  
- CTA buttons for authentication.

#### 🔐 Authentication Components (Login / Signup)
- Form-based authentication.  
- Real-time validation and inline error messages.  
- Toast notifications for feedback.  
- Redirects upon successful authentication.

#### 📈 Dashboard Component
- Statistics cards with icons.  
- Status-based color coding.  
- Performance visualization.  
- Navigation cards and recent tickets list.

#### 🧾 Ticket Management Component
- Search and filter bar.  
- Responsive ticket grid layout.  
- Modal form for creating or editing tickets.  
- Status and priority badges.  
- Confirmation dialogs and toast notifications.

#### ⚙️ Footer Component
- Consistent across all pages.  
- Contains copyright information.  
- Centered and responsive layout.

## 🤝 Support

For issues or questions about this implementation, please refer to the project documentation or create an issue in the repository.

---

Built with ❤️ using **Vue.js 3**, **Vite**, and **Tailwind CSS** by **yours truly**!