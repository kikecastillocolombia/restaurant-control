/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // Permite cualquier dominio
        },
      ],
    },
  };
  
  export default nextConfig;
  