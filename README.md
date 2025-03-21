# Modern Portfolio Website

A modern, responsive portfolio website built with Bootstrap 5, featuring a clean design, dark/light mode toggle, and an admin panel with CRUD functionality.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Modern UI**: Clean and professional design using Bootstrap 5
- **Interactive Elements**: Smooth scrolling, animations, and hover effects
- **Admin Panel**: Secure admin interface for managing content
- **Contact Form**: Integrated contact form with Google Maps
- **Project Showcase**: Grid layout for displaying projects with filtering
- **Skills Section**: Visual representation of skills with progress bars
- **Blog Section**: Manage and display blog posts
- **Social Media Integration**: Links to social media profiles

## Pages

1. **Home Page**
   - Hero section with carousel
   - Featured projects
   - Quick links to other sections

2. **About Page**
   - Personal information
   - Skills and expertise
   - Achievements and certifications

3. **Projects Page**
   - Project grid with filtering
   - Detailed project modals
   - Technologies used

4. **Contact Page**
   - Contact form
   - Contact information
   - Google Maps integration
   - Social media links

5. **Admin Panel**
   - Secure login
   - CRUD operations for:
     - Projects
     - Skills
     - Blog posts
   - Portfolio settings management

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome
- Google Maps API
- Local Storage for data persistence

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Replace placeholder content:
   - Update personal information in HTML files
   - Add your own images to the `assets/images` directory
   - Update social media links
   - Add your Google Maps API key in `contact/index.html`

3. Configure Google Maps:
   - Get a Google Maps API key from the Google Cloud Console
   - Replace `YOUR_API_KEY` in `contact/index.html`
   - Update the latitude and longitude coordinates

4. Admin Panel Setup:
   - Default credentials:
     - Username: admin
     - Password: admin123
   - Change these credentials in `admin/index.html`

5. Deploy the website:
   - Upload the files to your web hosting service
   - Ensure all file paths are correct
   - Test all functionality

## Directory Structure

```
portfolio/
├── admin/
│   ├── index.html
│   ├── dashboard.html
│   └── admin.js
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── about/
│   └── index.html
├── projects/
│   └── index.html
├── contact/
│   └── index.html
├── index.html
└── README.md
```

## Customization

### Colors
The website uses CSS variables for easy color customization. Edit the variables in `assets/css/styles.css`:

```css
:root {
    --primary-color: #0d6efd;
    --secondary-color: #6c757d;
    --dark-bg: #212529;
    --light-bg: #ffffff;
    --transition: all 0.3s ease;
}
```

### Images
Replace the following images in the `assets/images` directory:
- `hero1.jpg` and `hero2.jpg` for the carousel
- `project1.jpg`, `project2.jpg`, `project3.jpg` for project cards
- `profile.jpg` for the about page

### Content
Update the content in each HTML file with your personal information, projects, and skills.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Bootstrap 5 for the UI framework
- Font Awesome for icons
- Google Maps API for map integration 