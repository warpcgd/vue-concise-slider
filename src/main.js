// 基础滚动
import sliderbasic from './components/slider_basic';
// 不定宽滚动
import sliderindefiniteWidth from './components/slider_indefiniteWidth';
// 无限滚动
import sliderbasicloop from './components/slider_basic_loop';
// 垂直滚动
import slidervertical from './components/slider_vertical';
Vue.config.debug = true;

// 实例vue
new Vue(sliderbasic);
new Vue(sliderindefiniteWidth);
new Vue(sliderbasicloop);
new Vue(slidervertical);