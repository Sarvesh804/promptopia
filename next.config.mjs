// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com'], // Add this line
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      };
      return config;
    },
  };
  
  // Use ES module export syntax
  export default nextConfig;
  