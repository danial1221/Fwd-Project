# Deploying MERN Eat to Render

## Prerequisites
1. GitHub account
2. Render account (sign up at https://render.com)
3. MongoDB Atlas account (for database)
4. Cloudinary account (for image uploads)
5. Stripe account (for payments)
6. Auth0 account (for authentication)

## Step 1: Push Code to GitHub

```bash
cd C:\Users\Online\Desktop\mern-food-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 2: Deploy Backend on Render

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `mern-eat-backend`
   - **Region**: Oregon (or closest to you)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   MONGODB_CONNECTION_STRING=your_mongodb_atlas_connection_string
   AUTH0_AUDIENCE=your_auth0_api_identifier
   AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=https://mern-eat-frontend.onrender.com (update after frontend deployment)
   STRIPE_API_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

6. Click **"Create Web Service"**
7. Copy the backend URL (e.g., `https://mern-eat-backend.onrender.com`)

## Step 3: Deploy Frontend on Render

1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `mern-eat-frontend`
   - **Region**: Oregon
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variables:
   ```
   VITE_API_BASE_URL=https://mern-eat-backend.onrender.com
   VITE_AUTH0_DOMAIN=your-tenant.auth0.com
   VITE_AUTH0_CLIENT_ID=your_auth0_client_id
   VITE_AUTH0_CALLBACK_URL=https://mern-eat-frontend.onrender.com/auth-callback
   VITE_AUTH0_AUDIENCE=your_auth0_api_identifier
   ```

5. Click **"Create Static Site"**

## Step 4: Update Auth0 Settings

1. Go to Auth0 Dashboard → Applications → Your Application
2. Update **Allowed Callback URLs**:
   ```
   https://mern-eat-frontend.onrender.com/auth-callback
   ```
3. Update **Allowed Logout URLs**:
   ```
   https://mern-eat-frontend.onrender.com
   ```
4. Update **Allowed Web Origins**:
   ```
   https://mern-eat-frontend.onrender.com
   ```

## Step 5: Update Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Create a new webhook endpoint:
   - **URL**: `https://mern-eat-backend.onrender.com/api/order/checkout/webhook`
   - **Events**: Select `checkout.session.completed`
3. Copy the Webhook Signing Secret and update `STRIPE_WEBHOOK_SECRET` in Render backend environment variables

## Step 6: Update Backend FRONTEND_URL

1. Go to Render Dashboard → mern-eat-backend → Environment
2. Update `FRONTEND_URL` to: `https://mern-eat-frontend.onrender.com`
3. Save changes (this will trigger a redeployment)

## Notes

- **Free tier limitations**: Services may spin down after 15 minutes of inactivity. First request may take 30-60 seconds to wake up.
- **MongoDB Atlas**: Make sure to whitelist Render's IP addresses (or use `0.0.0.0/0` for all IPs)
- **CORS**: Already configured to accept all origins in development. For production, update CORS settings in `backend/src/index.ts`

## Troubleshooting

### Backend not starting
- Check Render logs for errors
- Verify all environment variables are set correctly
- Ensure MongoDB Atlas allows connections from Render IPs

### Frontend can't connect to backend
- Verify `VITE_API_BASE_URL` is correct
- Check if backend is running (visit `/health` endpoint)

### Auth0 login not working
- Verify all Auth0 URLs are updated
- Check Auth0 application settings match environment variables

### Stripe webhooks failing
- Verify webhook URL is correct
- Check `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Review Stripe webhook delivery logs
