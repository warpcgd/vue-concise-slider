English | [中文](README.md)

###weixinAudio.js
#####a simple webchat AudioPlayer(from weixin of china)
* * *
you can use weixinAudio.js in App,Web where surport HTML5 Video.
###Demo
[Take a look at this simple](http://warpcgd.github.io/webchataudio/src/demo.html)
###How to use it
You may use Vidage on one of the following ways:
###Add boilerplate/template in your HTML
```html
<p class="weixinAudio">
	<audio src="../sound/sound.mp3" id="media" width="1" height="1" preload></audio>
	<span id="audio_area" class="db audio_area">
		<span class="audio_wrp db">
			<span class="audio_play_area">
				<i class="icon_audio_default"></i>
				<i class="icon_audio_playing"></i>
            </span>
			<span id="audio_length" class="audio_length tips_global">3:07</span>
			<span class="db audio_info_area">
                <strong class="db audio_title">Title</strong>
                <span class="audio_source tips_global">From</span>
			</span>
			<span id="audio_progress" class="progress_bar" style="width: 0%;"></span>
	 	</span>
	</span>
</p>
```
###Regular way(run js)
```html
//weixinAudip.js need jQuery
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script src="js/weixinAudip.js"></script>
<script>
   $('.weixinAudio').weixinAudio();
</script>
```
###API
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
    <td>play method</td>
  </tr>
  <tr>
    <td><code>pause()</code></td>
    <td>&mdash;</td>
    <td>pause method</td>
  </tr>
  <tr>
    <td><code>changsrc()</code></td>
    <td><code>src,callback</code></td>
    <td><code>src</code>:The source;<code>callback</code>:Function</td>
  </tr>
 </tbody>
</table>