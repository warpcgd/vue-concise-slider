// 基础滚动
import sliderbasic from './components/slider_basic';
// 不定宽滚动
import sliderindefiniteWidth from './components/slider_indefiniteWidth';
// 无限滚动
import sliderbasicloop from './components/slider_basic_loop';

Vue.config.debug = true;

new Vue(sliderbasic);
new Vue(sliderindefiniteWidth);
new Vue(sliderbasicloop);