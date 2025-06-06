// press-ui, press-plus, press-next 相同
import { setLang as setLangUtil } from 'press-ui/locale/demo-lang';

import localeEnDemo from './lang/en-US';
import localeZhDemo from './lang/zh-CN';


const LOCALE_DEMO_AMP = {
  'en-US': localeEnDemo,
  'zh-CN': localeZhDemo,
};


export function setLang(force = false) {
  return setLangUtil(force, LOCALE_DEMO_AMP);
}


setLang();
