![image](https://github.com/pabloDYEL/ESTATICA-48/assets/116923433/c31c7e41-99e7-44a7-830f-8032adfdf81d)

# Slite - Company Knowledge Base Platform

A clean, modern static website showcasing Slite's collaborative knowledge base platform powered by AI. This project demonstrates a professional SaaS landing page with responsive design and interactive elements.

## Tech Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with flexbox/grid layouts
- **Vanilla JavaScript** - Interactive functionality and animations
- **No dependencies** - Pure static implementation

## Features

- Responsive design optimized for all devices
- Interactive navigation with dropdown menus
- Animated document illustrations
- Professional email signup form
- Clean, modern UI with smooth transitions
- Call-to-action sections with trial signup
- Cross-browser compatible implementation

## Project Structure

```
slite/
├── index.html              # Main landing page
├── css/
│   ├── style.css          # Main stylesheet
│   ├── responsive.css     # Mobile/tablet styles
│   └── animations.css     # Animation definitions
├── js/
│   ├── main.js           # Core functionality
│   ├── navigation.js     # Menu interactions
│   └── forms.js          # Form handling
├── images/
│   ├── logo.svg          # Slite logo
│   ├── illustrations/    # Document graphics
│   └── icons/           # UI icons
├── fonts/               # Custom web fonts
└── README.md           # This file
```

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/pabloWIB/Slite.git
   cd Slite
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your preferred browser
   open index.html
   # or
   double-click index.html
   ```

3. **Live Server (Optional)**
   ```bash
   # Using Node.js live-server
   npx live-server
   
   # Using PHP built-in server
   php -S localhost:8000
   ```

### File Editing

- Edit `index.html` for content changes
- Modify `css/style.css` for styling updates
- Update `js/main.js` for functionality changes
- Replace images in `images/` directory as needed

## Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source branch (main/master)
4. Your site will be available at `https://username.github.io/Slite`

### Netlify
1. Drag and drop your project folder to Netlify
2. Or connect your GitHub repository
3. Automatic deployment on every push

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow the prompts

### Other Static Hosts
- **Firebase Hosting**: `firebase deploy`
- **Surge.sh**: `surge` (after installing surge CLI)
- **AWS S3**: Upload files to S3 bucket with static hosting enabled

## Customization

### Content Updates
- **Company Name**: Replace "Slite" in `index.html`
- **Messaging**: Update headline and description text
- **Email Placeholder**: Change `name@company.com` in signup form
- **Trial Period**: Modify "14-days free trial" text

### Styling Changes
- **Colors**: Update CSS custom properties in `:root`
- **Fonts**: Replace font imports in `css/style.css`
- **Layout**: Modify flexbox/grid properties
- **Animations**: Adjust timing in `css/animations.css`

### Features Customization
- **Navigation**: Add/remove menu items in HTML and CSS
- **Forms**: Update form actions and validation in `js/forms.js`
- **Illustrations**: Replace SVG graphics in `images/illustrations/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+ (with polyfills)

## Performance Optimization

- Optimize images using tools like TinyPNG
- Minify CSS and JavaScript for production
- Use WebP format for better compression
- Enable gzip compression on your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Live Demo**: [Insert your deployed URL here]
**Repository**: https://github.com/pabloWIB/Slite.git
