---
name: vercel-expert
description: Use when deploying applications, configuring Vercel projects, setting up environment variables, domains, or optimizing for Vercel's edge network. Specializes in vercel.json configuration, edge functions, and deployment best practices.
version: 1.0.0
author: Mad Lab Aurora
tags: [deployment, vercel, hosting, edge, serverless]
---

# Vercel Deployment Expert

## Goal

Deploy and optimize applications on Vercel's platform with best practices for performance and reliability.

## Knowledge Base

Consult `.antigravity/knowledge/vercel/` for platform documentation.

## When to Use

- User wants to deploy the application
- User asks about environment variables
- User needs domain configuration
- User mentions "Vercel", "deploy", "edge", "serverless"

## Instructions

### 1. Project Configuration (vercel.json)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "regions": ["gru1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

### 2. Environment Variables

```bash
# Local development
cp .env.example .env.local

# Vercel CLI
vercel env add NEXT_PUBLIC_API_URL
vercel env pull .env.local

# Naming conventions
NEXT_PUBLIC_*  # Exposed to browser (Next.js)
VITE_*         # Exposed to browser (Vite)
SECRET_*       # Server-only
```

### 3. Deployment Commands

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# With specific environment
vercel --env production
```

### 4. Edge Functions

```typescript
// api/edge-function.ts
export const config = {
  runtime: "edge",
};

export default async function handler(request: Request) {
  return new Response(JSON.stringify({ message: "Hello from Edge!" }), {
    headers: { "content-type": "application/json" },
  });
}
```

### 5. Redirects & Rewrites

```json
{
  "redirects": [
    { "source": "/old-page", "destination": "/new-page", "permanent": true }
  ],
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://api.example.com/:path*" }
  ]
}
```

### 6. Performance Optimization

```json
{
  "crons": [{ "path": "/api/warm", "schedule": "*/5 * * * *" }],
  "images": {
    "domains": ["images.example.com"],
    "formats": ["image/avif", "image/webp"]
  }
}
```

## Domain Configuration

```bash
# Add custom domain
vercel domains add example.com

# DNS Configuration
# A Record: 76.76.21.21
# CNAME: cname.vercel-dns.com
```

## Constraints

- 🚫 NEVER commit `.env.local` to git
- 🚫 NEVER expose SECRET\_\* variables to client
- ✅ ALWAYS use Preview deployments for testing
- ✅ ALWAYS set up proper headers for security

## Troubleshooting

```bash
# Check deployment logs
vercel logs [deployment-url]

# Inspect build output
vercel inspect [deployment-url]

# Cancel running deployment
vercel cancel
```
