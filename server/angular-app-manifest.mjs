
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/movieFetcher-Angular-client/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/movieFetcher-Angular-client/welcome",
    "route": "/movieFetcher-Angular-client"
  },
  {
    "renderMode": 2,
    "route": "/movieFetcher-Angular-client/welcome"
  },
  {
    "renderMode": 2,
    "route": "/movieFetcher-Angular-client/movies"
  },
  {
    "renderMode": 2,
    "route": "/movieFetcher-Angular-client/profile"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 77662, hash: '97f8826e9a97196c5a5fd24cbd26af1486e738e9ed28d034a5a8622149736693', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17122, hash: '178ab1d28cd122e98194d376f8003e6e6131ee1aa0e907ac5706541652a77088', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'welcome/index.html': {size: 112797, hash: '07b952e752956049da6f3b5b37878a631ba805472c7154ec2b5cfd7c30341de0', text: () => import('./assets-chunks/welcome_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 120311, hash: 'f9836fa57dd85519e1bbaf56d133677dfe70afbaacdad64f164be06474c57316', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'movies/index.html': {size: 142873, hash: '31331b23f3e4be2d352001f864e867df13f13687740724e38edfb6a10e8b9bbc', text: () => import('./assets-chunks/movies_index_html.mjs').then(m => m.default)},
    'styles-HS44XGHT.css': {size: 330664, hash: 'aozAAnvmxUo', text: () => import('./assets-chunks/styles-HS44XGHT_css.mjs').then(m => m.default)}
  },
};
