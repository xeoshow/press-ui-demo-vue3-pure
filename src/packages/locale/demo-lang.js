
import { isInIFrame } from '../common/utils/iframe';
import { storageUtil } from '../common/utils/storage';
import { initGlobalMixin } from '../common/vue3/adapter';

import {
  LOCALE_STORAGE_KEY,
  DEFAULT_LOCALE_NUMBER,
  LOCALE_NUMBER_MAP,
} from './config';
import { getComponentNameFromUrl } from './demo-component-name';
import localeEn from './lang/en-US';

import locale, { t } from './index';


const DEFAULT_LANG = 'zh-CN';

const LOCALE_MAP = {
  'en-US': localeEn,
};

let curLang = DEFAULT_LANG;


function getLocaleFromLocation() {
  const { href } = window.location;
  if (href.indexOf('?') <= -1) return;

  const search = href.split('?')[1];
  const map = search.split('&').reduce((acc, value) => {
    const temp = value.split('=');
    acc[temp[0]] = temp[1];
    return acc;
  }, {});

  console.log('[map] ', map);

  return map.locale || map.lang;
}


function getLocale() {
  // #ifdef H5
  if (isInIFrame()) {
    return getLocaleFromLocation();
  }
  // #endif

  const locale = storageUtil.get(LOCALE_STORAGE_KEY);
  console.log('[locale] ', locale);
  return LOCALE_NUMBER_MAP[(locale || DEFAULT_LOCALE_NUMBER)];
}

let set = false;
let globalLocaleMap = {};

export function setLang(force = false, localeMap = {}) {
  if (set && !force) return ;
  set = true;
  curLang = getLocale() || DEFAULT_LANG;
  console.log('[curLang] ', curLang);
  console.log('[localeMap] ', localeMap);

  if (localeMap && Object.keys(localeMap).length) {
    globalLocaleMap = localeMap;
  }

  if (LOCALE_MAP[curLang]) {
    locale.use(LOCALE_MAP[curLang]);
  }
  if (localeMap[curLang]) {
    locale.add(localeMap[curLang]);
  }
  if (globalLocaleMap[curLang]) {
    locale.add(globalLocaleMap[curLang]);
  }
}

function getPageName() {
  const pages = getCurrentPages();
  const path = pages[pages.length - 1]?.$page?.fullPath || '';
  const route = pages[pages.length - 1]?.route || '';

  return getComponentNameFromUrl(path, route);
}

export function initDemoI18n(app) {
  const mixin = {
    // @ts-ignore
    onReady() {
      const name = getPageName();
      if (!name) return;

      const newTitle = (this).t(`titleMap.${name}`);
      if (!newTitle) return;


      if (typeof uni !== 'undefined') {
        uni.setNavigationBarTitle({
          title: newTitle,
        });
      }
    },
    methods: {
      t(key, ...args) {
        // @ts-ignore
        const { i18n } = this.$options;
        if (i18n?.[curLang]?.[key]) {
          const value = i18n[curLang][key];
          if (typeof value === 'function') {
            return value(...args);
          }
          return value;
        }
        return t.call(this, key, ...args);
      },
    },
  };

  initGlobalMixin(mixin, app);
}

