# Artisan Bakery Website

A modern, secure, and accessible single-page website for Artisan Bakery with integrated contact and enquiry forms, SEO optimization, and production-ready security headers.

## Features

- **Responsive Design**: Mobile-first layout using CSS Grid and Flexbox
- **SEO Optimized**: Unique title tags, meta descriptions, robots.txt, and sitemap.xml
- **Accessible Forms**: Two dedicated form pages (enquiry.html, contact.html) with WCAG compliance
- **Client-Side Validation**: Real-time field validation with friendly error messages
- **AJAX Submission**: Asynchronous form processing — no page refresh
- **Security**:
  - CSRF protection via express-csurf
  - Input validation and sanitization (express-validator)
  - Rate limiting (express-rate-limit)
  - Security headers (Helmet.js)
  - Content Security Policy (CSP) configured
- **Production Ready**: Nginx and Apache configuration examples, Netlify deployment config

## Project Structure

```
.
├── index2.html                  # Main landing page
├── enquiry.html                 # Enquiry form page
├── contact.html                 # Contact form page
├── server.js                    # Express form handler (optional)
├── package.json                 # Node.js dependencies
├── assets/
│   └── js/
│       └── form-security.js     # Client-side validation & AJAX
├── robots.txt                   # Search crawler rules
├── sitemap.xml                  # Site structure for SEO
├── netlify.toml                 # Netlify deployment config
├── .htaccess                    # Apache security headers
├── security-headers.conf        # Nginx config snippet
├── README_SECURITY.md           # Detailed security setup
└── .gitignore                   # Git exclusions
```

## Quick Start (Local Testing)

### Option 1: Static Preview (no Node required)

```bash
cd "C:\Users\Student\Desktop\personal profile"
python -m http.server 8000
# Open http://localhost:8000/index2.html
```

### Option 2: Full Server with Form Handling

```bash
cd "C:\Users\Student\Desktop\personal profile"
npm install
node server.js
# Open http://localhost:3000
```

Visit `/enquiry.html` and `/contact.html` to test forms. Submit a message and verify:
- Client-side validation catches errors inline
- CSRF token is fetched and sent
- AJAX submission (no page reload)
- Green success message appears

## Form Pages

### Enquiry Form (`enquiry.html`)
- Name, Email, Phone (optional), Subject, Message
- Best for product questions and pre-order inquiries

### Contact Form (`contact.html`)
- Name, Email, Topic (dropdown), Message
- Includes contact details section (phone, email, address)
- Best for general feedback and catering requests

Both forms:
- Validate input before submission
- Show friendly error messages
- Submit via AJAX without page refresh
- Display success confirmation

## Deployment

### Deploy to Netlify (Recommended for Static)

1. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

2. Log in to [Netlify](https://netlify.com) and click **New site from Git**:
   - Connect your GitHub account
   - Select your repository
   - Leave build settings empty (static site)
   - Deploy

3. Netlify automatically uses `netlify.toml` for:
   - Publish directory: `.` (project root)
   - Security headers and CSP

### Deploy with Node Server (Render or Railway)

If you need server-side form handling:

1. Push to GitHub (as above)
2. Create account on [Render](https://render.com) or [Railway](https://railway.app)
3. New Web Service → Connect repo → Configure:
   - Start command: `node server.js`
   - Auto-detects PORT environment variable
   - Provides free SSL certificate

### Update Domain References

Before going live, replace `example.com` in:
- `robots.txt` (line with Sitemap URL)
- `sitemap.xml` (all `https://www.example.com` URLs)
- Security headers config if using Nginx/Apache

## SEO & Meta Tags

All pages include:
- Unique `<title>` tags (page-specific, keyword-friendly)
- `<meta name="description">` (compelling 155–160 characters)
- Descriptive `alt` text on all images

Pages indexed in sitemap:
- `/` (homepage)
- `/#about`, `/#menu`, `/#order`, `/#contact` (sections)
- `/enquiry.html`
- `/contact.html`

## Security Checklist

- ✅ CSRF tokens on forms
- ✅ Input validation (client + server)
- ✅ Output escaping
- ✅ Rate limiting on `/contact` endpoint
- ✅ Content Security Policy header
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy configured
- ✅ HSTS ready (enable after HTTPS works)

For detailed server security setup, see [README_SECURITY.md](README_SECURITY.md).

## Customization

### Change Form Endpoint

Edit `assets/js/form-security.js` line ~95:
```javascript
const res = await fetch(form.action || '/contact', { ... });
```
Or set `action="/your-endpoint"` in the `<form>` tag.

### Add a New Form Field

1. Add input/textarea to HTML
2. Update server validation in `server.js` (add a `body()` check)
3. Update client validation in `form-security.js` (add a `clientValidate` check)

### Modify CSP Header

Edit `netlify.toml`, `.htaccess`, or `security-headers.conf` to allow additional CDNs/scripts. Current CSP allows:
- Leaflet (map library)
- Unpkg (CDN)
- Cloudflare (Font Awesome, fonts)
- Google Fonts

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Form not submitting?
- Check browser console for errors (F12)
- Verify CSRF token fetch: Network tab should show `/form-token` request
- Ensure JavaScript is enabled
- Confirm `server.js` is running (if using Node)

### Images not loading?
- Check network tab for 404 errors
- Remote images require active internet connection
- Consider downloading images locally for reliability (see README_SECURITY.md)

### Header/CSP not applied?
- Verify web server is using your config (Nginx/Apache)
- For Netlify, check `netlify.toml` syntax (must be valid TOML)
- Test headers: `curl -i https://your-site.netlify.app`

## License

This project is proprietary to Artisan Bakery. All rights reserved.

## Support
<img width="800" height="1284" alt="_C__Users_Student_Desktop_personal%20profile_index2 html (5)" src="https://github.com/user-attachments/assets/f1c2f826-2f16-4391-9706-2adbfccc13af" />
<img width="800" height="1284" alt="_C__Users_Student_Desktop_personal%20profile_index2 html (4)" src="https://github.com/user-attachments/assets/a85af2d3-0a5f-4196-a3c5-5ea6d92b4ca7" />
<img width="800" height="1284" alt="_C__Users_Student_Desktop_personal%20profile_index2 html (3)" src="https://github.com/user-attachments/assets/094ca355-0022-431b-94ae-c4fcc33d2771" />
<img width="800" height="1284" alt="_C__Users_Student_Desktop_personal%20profile_index2 html (2)" src="https://github.com/user-attachments/assets/850e05c0-f28f-4528-9470-69f2516dc150" />
<img width="800" height="1284" alt="_C__Users_Student_Desktop_personal%20profile_index2 html (1)" src="https://github.com/user-attachments/assets/681fe9a5-04e6-48fb-8f99-b2f5c082f875" />
<img width="800" height="1284" alt="_C__Users_Student_Desktop_personal%20profile_index2 html" src="https://github.com/user-attachments/assets/8a37512b-19e6-412f-924a-f1c50666bd15" />
<img width="1891" height="900" alt="Screenshot 2026-06-18 142126" src="https://github.com/user-attachments/assets/2ed3d6b7-1b84-4281-8223-169c2b216d83" />
<img width="1851" height="847" alt="Screenshot 2026-06-18 142235" src="https://github.com/user-attachments/assets/bbe0cd37-6938-408c-97a0-a262a2612636" />
<img width="1827" height="890" alt="Screenshot 2026-06-18 143505" src="https://github.com/user-attachments/assets/5920b054-c47c-4fa9-a47d-e85cf39f34b6" />
<img width="1553" height="705" alt="Screenshot 2026-06-18 143528" src="https://github.com/user-attachments/assets/18aa8be5-3ff0-4cd3-bc17-d2658172b1b8" />
<img width="1652" height="697" alt="Screenshot 2026-06-18 143559" src="https://github.com/user-attachments/assets/10b91488-fe23-4121-b681-908b07981e5a" />


For issues or questions, contact hello@artisanbakery.com or open a GitHub issue.

