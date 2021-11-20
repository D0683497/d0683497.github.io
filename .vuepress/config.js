const { config } = require('vuepress-theme-hope');
const dayjs = require('dayjs');
const nav = require('./navbar.js');
const sidebar = require('./sidebar.js');

module.exports = config({
  title: 'K139',
  description: '記錄一些有趣的東西',
  locales: { '/': { lang: 'zh-Hant' } },
  dest: './dist',

  head: [
    ['script', { src: 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js' } ],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' } ]
  ],

  themeConfig: {
    hostname: 'https://d0683497.github.io',
    author: 'D0683497',
    repo: 'https://github.com/D0683497/d0683497.github.io',
    footer: { display: true },
    copyright: false,
    iconPrefix: 'fas fa-',
    themeColor: false,
    fullscreen: false,
    pageInfo: false,
    git: {
      timezone: 'Asia/Taipei',
      contributor: false,
      transformer: (timestamp, lang) => `${dayjs(timestamp).locale('zh-tw').format('YYYY/MM/DD HH:mm')}`
    },
    searchPlaceholder: '搜尋',
    prevLinks: false,
    nextLinks: false,
    hideSiteTitleonMobile: false,
    editLinks: false,

    nav,
    sidebar,

    blog: {
      sidebarDisplay: 'mobile',
      links: {
        Gmail: 'mailto:ff129043923@gmail.com',
        Facebook: 'https://www.facebook.com/k139215130/',
        Instagram: 'https://www.instagram.com/k139215130/',
        Github: 'https://github.com/D0683497/'
      },
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ['highlight', 'math', 'search', 'notes', 'zoom', 'anything', 'audio', 'chalkboard'],
        revealConfig: {
          preloadIframes: true,
          mouseWheel: false,
          previewLinks: true
        }
      }
    },
    pwa: false
  }
});
