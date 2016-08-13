##vue-slider.js
####简单vue的slider滑动组件
* * *

播放器DOM及CSS是微信里内置的音频播放器的样式，重新创建了控制层js，方便在在公众号，APP等场景使用。

###例子

<!-- [demo](http://warpcgd.github.io/webchataudio/src/demo.html) -->

###如何使用

通过以下demo来实现

###HTML模板

```html
<p class="weixinAudo">
	<audio src="../sound/sound1.mp3" id="media" width="1" height="1" preload></audio>
	<span id="audio_area" class="db audio_area">
		<span class="audio_wrp db">
			<span class="audio_play_area">
				<i class="icon_audio_default"></i>
				<i class="icon_audio_playing"></i>
            </span>
			<span id="audio_length" class="audio_length tips_global">3:07</span>
			<span class="db audio_info_area">
                <strong class="db audio_title">标题1</strong>
                <span class="audio_source tips_global">来源1</span>
			</span>
			<span id="audio_progress" class="progress_bar" style="width: 0%;"></span>
	 	</span>
	</span>
</p>
<!-- 也可以多音频使用 -->
<!-- 注意使用同一类名，在js中进行初始化 -->
<p class="weixinAudo">
  <audio src="../sound/sound2.mp3" id="media" width="1" height="1" preload></audio>
  <span id="audio_area" class="db audio_area">
    <span class="audio_wrp db">
      <span class="audio_play_area">
        <i class="icon_audio_default"></i>
        <i class="icon_audio_playing"></i>
            </span>
      <span id="audio_length" class="audio_length tips_global">3:07</span>
      <span class="db audio_info_area">
                <strong class="db audio_title">标题2</strong>
                <span class="audio_source tips_global">来源2</span>
      </span>
      <span id="audio_progress" class="progress_bar" style="width: 0%;"></span>
    </span>
  </span>
</p>
```

###Js调用

```html
//你需要先引入一个jQuery
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script src="js/weixinAudio.js"></script>
<script>
   $('.weixinAudo').weixinAudio(options);
</script>
```

###options/初始化参数

<table width="100%">
<thead>
  <tr>
    <th width="20%">Option</th>
    <th width="20%">Type</th>
    <th width="20%">Default</th>
    <th width="40%">Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>autoplay</code></td>
    <td>Boolean</td>
    <td>false</td>
    <td>播放器是否在初始化时自动播放</td>
  </tr>
  <tr>
    <td><code>src</code></td>
    <td>String</td>
    <td>&mdash;</td>
    <td>如果audio标签上没设定src属性，可在初始化时设置</td>
  </tr>
 </tbody>
</table>

###API/执行方法

<table width="100%" align="center">
<thead>
  <tr>
    <th width="12.5%">Method</th>
    <th width="12.5%">Parameters</th>
    <th width="75%">Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>play()</code></td>
    <td>&mdash;</td>
    <td>播放方法</td>
  </tr>
  <tr>
    <td><code>pause()</code></td>
    <td>&mdash;</td>
    <td>暂停方法</td>
  </tr>
  <tr>
    <td><code>changsrc()</code></td>
    <td><code>src,callback</code></td>
    <td><code>src</code>:播放的地址;<code>callback</code>:回调函数</td>
  </tr>
 </tbody>
</table>