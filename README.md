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

### npm Package request Deprecated
- Replace request with axios for fetching GitHub repositories.
   ```javascript
   npm i axios
   cd client
  npm uninstall axios

### uuid Package Changes
 - Change import in client/src/actions/alert.js.
   ```javascript
   import { v4 as uuidv4 } from 'uuid';

### Addition of normalize-url Package
 - Added normalize-url to normalize entered URLs in routes/api/profile.js.
   
### Fix Broken Links in Gravatar
- Use normalize-url to fix broken links in Gravatar in routes/api/users.js.
### Redux Subscription for Local Storage Management
- Use Redux subscription to manage local storage in client/src/store.js.
- Update client/src/utils/setAuthToken.js and dependent files.
  
### Component Reuse
- Combined EditProfile and CreateProfile into ProfileForm.js.
  
### Log User Out on Token Expiration
- Implemented Axios interceptor to log out on token expiration in utils/api.js.
  
### Remove Moment.js
- Replaced with the browser's built-in Intl API.
- Create utils/formatDate.js for date formatting.
  
### React Router V6
- Update to React Router V6, follow the migration guide.
- Replace <Switch /> with <Routes /> and adjust routing components.
  
### Quick Start 🚀
### Setup
- Add a default.json file in the config folder with MongoDB URI, JWT secret, and GitHub token.
  ```javascript
   {
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<your_secret_access_token>"
  }
- Install server dependencies.
   ```javascript
   npm install
- Install client dependencies.
   ```javascript
   cd client
   npm install

### Build for Production
- Build the client for production.
    ```javascript
      cd client
    npm run build

### Test Production Before Deploy
- After building the client, go to the project root and run:
- Linux/Unix:
  ```javascript
    NODE_ENV=production node server.js
- Windows (Cmd Prompt or Powershell):
    ```javascript
      $env:NODE_ENV="production"
    node server.js

- Open http://localhost:5000/ in your browser.


