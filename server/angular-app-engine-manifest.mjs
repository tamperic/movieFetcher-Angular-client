
export default {
  basePath: '/movieFetcher-Angular-client',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
