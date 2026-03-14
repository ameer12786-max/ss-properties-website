# S&S Properties Website

Premium property development and refurbishment marketing website.

## Overview

This is a responsive, modern marketing website for S&S Properties featuring:
- **Home Page**: Hero section, services overview, about section, featured projects
- **Projects Page**: Full portfolio with before/after galleries
- **Contact Page**: Contact form with email functionality

## Features

- Responsive design for all devices
- Smooth animations and transitions
- Interactive image lightbox gallery
- Contact form integration (FormSubmit.co)
- SEO-friendly structure
- Azure Static Web Apps ready

## Deployment to Azure Static Web Apps

### Option 1: Azure Portal (Quick)

1. Go to [Azure Portal](https://portal.azure.com)
2. Create a new **Static Web App** resource
3. Choose your subscription and resource group
4. Select **Other** as the deployment source for manual upload
5. Upload the `website` folder contents
6. Your site will be live at `https://<your-app-name>.azurestaticapps.net`

### Option 2: GitHub Integration (Recommended)

1. Push this repository to GitHub
2. In Azure Portal, create a new **Static Web App**
3. Connect to your GitHub repository
4. Configure build settings:
   - **App location**: `/website`
   - **Api location**: (leave empty)
   - **Output location**: `/website`
5. Azure will automatically deploy on every push

### Option 3: Azure CLI

```bash
# Install Azure CLI if not already installed
# https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

# Login to Azure
az login

# Create a resource group (if needed)
az group create --name ssproperties-rg --location "UK South"

# Create a Static Web App
az staticwebapp create \
  --name ssproperties-website \
  --resource-group ssproperties-rg \
  --location "UK South" \
  --source "." \
  --app-location "/website" \
  --output-location "/website"
```

### Option 4: VS Code Extension

1. Install the **Azure Static Web Apps** extension for VS Code
2. Sign in to Azure
3. Right-click the `website` folder
4. Select **Deploy to Static Web App**
5. Follow the prompts

## Contact Form Configuration

The contact form uses [FormSubmit.co](https://formsubmit.co) to handle email submissions.

### Setup Steps:
1. The form is pre-configured to send to `info@ssproperties.co.uk`
2. On first submission, you'll receive an activation email
3. Click the link in the email to activate the form
4. All future submissions will be emailed to that address

### Changing the Email Address:
In `contact.html`, update the form action:
```html
<form action="https://formsubmit.co/YOUR-EMAIL@DOMAIN.COM" method="POST">
```

## Project Structure

```
website/
├── index.html              # Home page
├── projects.html           # Projects gallery
├── contact.html            # Contact form
├── staticwebapp.config.json # Azure config
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js             # JavaScript functionality
└── images/                 # Website images (empty - uses Content folder)

Content/
├── Logo/                   # Company logos
│   ├── Standard Logo Files/
│   ├── Social Media Logo Files/
│   └── Color Code Guide/
└── Projects/               # Project photos
    ├── Capstone/
    ├── Chingford/
    ├── Horsley/
    ├── Ivanhoe/
    ├── Primrose/
    └── Wheaton Vale/
```

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-dark: #0d1b2a;
    --primary: #1b263b;
    --accent: #c9a227;
    /* ... */
}
```

### Adding New Projects
1. Add images to `Content/Projects/[ProjectName]/`
2. Add a new section in `projects.html`
3. Follow the existing project section structure

### Updating Content
- Edit `index.html` for home page content
- Edit `projects.html` for project descriptions
- Edit `contact.html` for contact information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Notes

- Images are loaded from relative paths
- Consider converting HEIC images to JPG for better compatibility
- Use image optimization for production deployment

## License

© 2026 S&S Properties. All rights reserved.
