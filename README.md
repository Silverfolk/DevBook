# DevBook - A Social Site for Developers

## Updates Since Course Published

### GitHub API Authentication Changes
- GitHub has deprecated authentication via URL query parameters.
- To obtain an access token, follow these [instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
- Do not share tokens with permissions; it may compromise your account or repositories.

### Changes to GitHub API Requests
- Update the options object in `routes/api/profile.js` for GitHub API requests.
  ```javascript
  const options = {
    uri: encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    ),
    method: 'GET',
    headers: {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`
    }
  };


Introduction

DevBook is a vibrant online community built for developers. Create your profile, connect with fellow coders, share code snippets, discuss tech trends, and discover exciting job opportunities.

What's new since the course?

GitHub API Authentication: Say goodbye to URL parameters! Securely access GitHub with access tokens. See setup instructions for safe storage.
Package updates:
request is out, axios is in: We switched to a more robust HTTP request library.
uuid upgrade: Import using v4 as uuidv4 to handle the updated default export.
Introducing normalize-url: No more broken links! This package ensures valid website and social media URLs.
Moment.js sunset: We adopted the browser's built-in Intl API for date formatting.
React Router V6: Embrace the latest routing with new components and hooks like <Routes> and useParams.
Redux subscription for auth: Stay logged in effortlessly! A dedicated subscription manages local storage and axios headers for your token.
Component consolidation: EditProfile and CreateProfile united as ProfileForm.js for streamlined code.
Automatic logout on token expiration: Always secure, DevBook logs you out of expired sessions instantly.
Updated quick start: Follow the revised instructions to set up DevBook with ease.
Get started quickly:

Configure your secrets: Create a .env file in the config folder with your MongoDB Atlas URI, JWT secret, and GitHub access token.
Install dependencies: Run npm install in the project root, then cd client && npm install in the client folder.
Run server and client: Start both with npm run dev.
Build for production: Prepare for deployment with cd client && npm run build.
Test production build:
Set environment variable: NODE_ENV=production (Linux/Unix) or $env:NODE_ENV="production" (Windows).
Run server: node server.js.
Open DevBook! Visit http://localhost:5000/ in your browser.
Further notes:

For detailed implementation specifics, refer to the project code.
This readme highlights key updates; explore the code for comprehensive information.
We welcome contributions! Help us make DevBook even better!
Join the DevBook community and code collaboratively!




