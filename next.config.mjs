// import withPWA from 'next-pwa';

// const config = {
//   publicRuntimeConfig: {
//     // Will be available on both server and client
//     CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
//     CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
//     CONTENTSTACK_BRANCH: process.env.CONTENTSTACK_BRANCH || "main",
//     CONTENTSTACK_REGION: process.env.CONTENTSTACK_REGION || "us",
//     CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
//     CONTENTSTACK_PREVIEW_TOKEN: process.env.CONTENTSTACK_PREVIEW_TOKEN,
//     CONTENTSTACK_PREVIEW_HOST:
//       process.env.CONTENTSTACK_PREVIEW_HOST || "rest-preview.contentstack.com",
//     CONTENTSTACK_API_HOST:
//       process.env.CONTENTSTACK_API_HOST || "api.contentstack.io",
//     CONTENTSTACK_APP_HOST:
//       process.env.CONTENTSTACK_APP_HOST || "app.contentstack.com",
//     CONTENTSTACK_LIVE_PREVIEW: process.env.CONTENTSTACK_LIVE_PREVIEW || "true",
//     CONTENTSTACK_LIVE_EDIT_TAGS:
//       process.env.CONTENTSTACK_LIVE_EDIT_TAGS || "false",
//   },
//   experimental: { largePageDataBytes: 128 * 100000 },
// };

// export default process.env.NODE_ENV === "development" ? config : withPWA(config);


import withPWA from 'next-pwa';

const config = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    CONTENTSTACK_BRANCH: process.env.CONTENTSTACK_BRANCH || "main",
    CONTENTSTACK_REGION: process.env.CONTENTSTACK_REGION || "us",
    CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
    CONTENTSTACK_PREVIEW_TOKEN: process.env.CONTENTSTACK_PREVIEW_TOKEN,
    CONTENTSTACK_PREVIEW_HOST:
      process.env.CONTENTSTACK_PREVIEW_HOST || "rest-preview.contentstack.com",
    CONTENTSTACK_API_HOST:
      process.env.CONTENTSTACK_API_HOST || "api.contentstack.io",
    CONTENTSTACK_APP_HOST:
      process.env.CONTENTSTACK_APP_HOST || "app.contentstack.com",
    CONTENTSTACK_LIVE_PREVIEW: process.env.CONTENTSTACK_LIVE_PREVIEW || "true",
    CONTENTSTACK_LIVE_EDIT_TAGS:
      process.env.CONTENTSTACK_LIVE_EDIT_TAGS || "false",
  },
  experimental: { largePageDataBytes: 128 * 100000 },
};

const pwaConfig = withPWA({
  pwa: {
    dest: 'public', // Ensure that the PWA assets are placed in the 'public' directory
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/example\.com\/api\/.*$/,
        handler: 'NetworkFirst',
      },
    ],
  },
});


export default process.env.NODE_ENV === "development" ? config : { ...config, ...pwaConfig };
