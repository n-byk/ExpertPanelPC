// ==UserScript==
// @name VK Experts PC (beta) | Тематические ленты
// @namespace http://tampermonkey.net/
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @version 1.0
// @license MIT
// @author NiByk, vk.com/nibyk
// @match https://vk.com/*
// @grant GM_xmlhttpRequest
// @grant unsafeWindow
// Часть кода взята из github.com/dlkrt/expert-buttons | dlkrt, danyadev
// ==/UserScript==

//Получить токен приложения: https://oauth.vk.com/token?client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&https=1&libverify_support=1&scope=all&grant_type=password&username=<имя пользователя>&password=<пароль>&2fa_supported=1&v=5.141&lang=ru&device_id=testid&api_id=2274003

const access_token = '<токен официального приложения от android>';

(function() {
	tematic_loader('photo_sizes=1&intent=initial&func_v=3&preload_initial=1&extended=1&lang=ru&cached_preselected_index=-1&connection_subtype=unknown&https=1');
})();

function tematic_loader(method, params = {}) {
	const paramsList = [`access_token=${access_token}`, 'v=5.141', 'lang=ru'];
	for(const key in params) {
		paramsList.push(`${key}=${encodeURIComponent(params[key])}`);
	}
	$['ajax']({
		type: 'POST',
		url: 'https://api.vk.com/method/execute.discoverCategories',
		data: (paramsList.join('&')),
		success: function(data) {
			localStorage.setItem('stringArr', data);
			var panel_vkexperts = document.getElementById("side_bar_inner")
			.children[0].children[0];

			if (panel_vkexperts.children[panel_vkexperts.children.length - 1].id == "l_bt") {
				panel_vkexperts.children[panel_vkexperts.children.length - 1].parentNode.removeChild(panel_vkexperts.children[panel_vkexperts.children.length - 1]);
				panel_vkexperts.children[panel_vkexperts.children.length - 1].parentNode.removeChild(panel_vkexperts.children[panel_vkexperts.children.length - 1]);
				}
			var exe = 0;
			panel_vkexperts.innerHTML += '<div class="more_div"></div>';
			data['response']['categories'].forEach(function(item)
				{
					if(exe === 1) { var moder = '<span class="left_count_wrap fl_r"><span class="inl_bl left_count">GO</span></span>'; } else { var moder = ''; }
					panel_vkexperts.innerHTML += `<li id="`+item['id']+`" class=""><a onclick="history.pushState(null, null, \'/experts?mod=`+item['id']+`\'); tematic('`+item['id']+`','`+item['name']+`','0');" class="left_row"><div class="LeftNav__icon"><svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M11.76 7.7c-.28-.27-.52-.51-.7-.73a2.3 2.3 0 01-.47-.77 2.25 2.25 0 010-1.4c.1-.3.27-.54.46-.77.19-.22.45-.48.73-.76l.25-.24.24-.25c.28-.28.54-.54.76-.73.23-.19.47-.36.77-.46.46-.14.94-.14 1.4 0 .3.1.54.27.77.46.22.19.46.43.74.7l.26.28.27.26c.28.28.52.52.7.74.2.23.37.47.47.77.14.46.14.94 0 1.4-.1.3-.27.54-.46.77-.19.22-.45.48-.73.76l-.25.24-.24.25c-.28.28-.54.54-.76.73-.23.19-.47.36-.77.46-.46.14-.94.14-1.4 0a2.3 2.3 0 01-.77-.46 13.4 13.4 0 01-.74-.7l-.26-.28-.27-.26zm4.4-1.03l-.25.24-.24.25c-.3.3-.5.5-.67.64a.85.85 0 01-.27.18.75.75 0 01-.46 0A.86.86 0 0114 7.8c-.16-.14-.36-.33-.67-.64l-.24-.25-.25-.24c-.3-.3-.5-.5-.64-.67a.85.85 0 01-.18-.27.75.75 0 010-.46.85.85 0 01.18-.27c.14-.16.33-.36.64-.67l.25-.24.24-.25c.3-.3.5-.5.67-.64a.86.86 0 01.27-.18.75.75 0 01.46 0c.04.01.11.05.27.18.16.14.36.33.67.64l.24.25.25.24c.3.3.5.5.64.67.13.16.17.23.18.27.05.15.05.31 0 .46a.86.86 0 01-.18.27c-.14.16-.33.36-.64.67zM11 14.12c0-.4 0-.74.02-1.02.03-.3.08-.59.23-.87.21-.42.56-.77.98-.98.28-.15.58-.2.87-.23.28-.02.65-.02 1.05-.02h.7c.4 0 .77 0 1.05.02.3.03.59.08.87.23.42.21.77.56.98.98.15.28.2.58.23.87.02.28.02.63.02 1.02v.76c0 .4 0 .74-.02 1.02a2.25 2.25 0 01-1.2 1.86c-.3.14-.59.2-.88.22-.28.02-.65.02-1.05.02h-.7c-.4 0-.77 0-1.05-.02-.3-.03-.59-.08-.87-.23a2.25 2.25 0 01-.98-.98 2.3 2.3 0 01-.23-.87c-.02-.28-.02-.63-.02-1.02v-.38zm3.85 2.38h-.7c-.43 0-.71 0-.92-.02a.86.86 0 01-.32-.06.75.75 0 01-.33-.33.86.86 0 01-.06-.32c-.02-.2-.02-.49-.02-.92v-.7c0-.43 0-.71.02-.92.01-.2.04-.28.06-.32a.75.75 0 01.33-.33.85.85 0 01.32-.06c.2-.02.49-.02.92-.02h.7c.43 0 .71 0 .92.02.2.01.28.04.32.06.14.07.26.19.33.33.02.04.05.11.06.32.02.2.02.49.02.92v.7c0 .43 0 .71-.02.92a.86.86 0 01-.06.32.75.75 0 01-.33.33.86.86 0 01-.32.06c-.2.02-.49.02-.92.02zM2 5.12v.76c0 .4 0 .74.02 1.02a2.25 2.25 0 001.2 1.86c.3.14.59.2.88.22.28.02.65.02 1.05.02h.7c.4 0 .77 0 1.05-.02a2.25 2.25 0 001.86-1.2c.14-.3.2-.59.22-.88C9 6.62 9 6.27 9 5.88v-.76c0-.4 0-.74-.02-1.02a2.3 2.3 0 00-.23-.87 2.25 2.25 0 00-.98-.98 2.3 2.3 0 00-.87-.23C6.62 2 6.25 2 5.85 2h-.7c-.4 0-.77 0-1.05.02a2.25 2.25 0 00-1.86 1.2c-.14.3-.2.59-.22.88C2 4.38 2 4.73 2 5.12zM5.5 7.5h.35c.43 0 .71 0 .92-.02.2-.01.28-.04.32-.06a.75.75 0 00.33-.33.85.85 0 00.06-.32c.02-.2.02-.49.02-.92v-.7c0-.43 0-.71-.02-.92a.85.85 0 00-.06-.32.75.75 0 00-.33-.33.86.86 0 00-.32-.06c-.2-.02-.49-.02-.92-.02h-.7c-.43 0-.71 0-.92.02a.86.86 0 00-.32.06.75.75 0 00-.33.33.85.85 0 00-.06.32c-.02.2-.02.49-.02.92v.7c0 .43 0 .71.02.92.01.2.04.28.06.32.07.14.19.26.33.33.04.02.11.05.32.06.2.02.49.02.92.02zM2 14.12c0-.4 0-.74.02-1.02.03-.3.08-.59.23-.87.21-.42.56-.77.98-.98.28-.15.58-.2.87-.23.28-.02.65-.02 1.05-.02h.7c.4 0 .77 0 1.05.02.3.03.59.08.87.23.42.21.77.56.98.98.15.28.2.58.23.87.02.28.02.63.02 1.02v.76c0 .4 0 .74-.02 1.02a2.25 2.25 0 01-1.2 1.86c-.3.14-.59.2-.88.22-.28.02-.65.02-1.05.02h-.7c-.4 0-.77 0-1.05-.02a2.25 2.25 0 01-1.86-1.2 2.3 2.3 0 01-.22-.88C2 15.62 2 15.27 2 14.88v-.38zm3.85 2.38h-.7c-.43 0-.71 0-.92-.02a.86.86 0 01-.32-.06.75.75 0 01-.33-.33.85.85 0 01-.06-.32c-.02-.2-.02-.49-.02-.92v-.7c0-.43 0-.71.02-.92.01-.2.04-.28.06-.32a.75.75 0 01.33-.33.85.85 0 01.32-.06c.2-.02.49-.02.92-.02h.7c.43 0 .71 0 .92.02.2.01.28.04.32.06.14.07.26.19.33.33.02.04.05.11.06.32.02.2.02.49.02.92v.7c0 .43 0 .71-.02.92a.85.85 0 01-.06.32.75.75 0 01-.33.33.86.86 0 01-.32.06c-.2.02-.49.02-.92.02z" fill="currentColor" fill-rule="evenodd"></path></svg></div><span class="left_label inl_bl">Лента `+item['name']+`</span>`+moder+`</a><div class="left_settings" onclick="menuSettings(0)"><div class="left_settings_inner"></div></div></li>`;
					exe++;
				});
		},
		error: function(data) {
			return 'error';
		}
	});
}

function tematic()
{
	var tematic_id = arguments[0];
	var manetitle = arguments[1];
	var next_page = arguments[2];
	var params = 'access_token='+access_token+'&v=5.141&lang=ru&start_from='+next_page+'&extended=1&fields=photo_50%2Cphoto_100%2Cphoto_200%2Csex%2Cverified%2Ctrending%2Cvideo_files%2Cemoji_status%2Cimage_status%2Ccan_write_private_message%2Ccan_message&user_options=%7B%22autoplay_video%22%3A%7B%22value%22%3A%22always%22%7D%2C%22autoplay_gif%22%3A%7B%22value%22%3A%22always%22%7D%2C%22traffic_saver%22%3A%7B%22value%22%3A%22off%22%7D%7D&filters=ads_site_slider%2Cads_app%2Cads_post_snippet_video%2Cads_post_pretty_cards%2Cads_app_slider%2Cads_site%2Cads_post%2Cads_app_video&feed_id='+arguments[0]+'&connection_subtype=unknown';
	if(parseInt(next_page) === 0)
	{
		document.title = manetitle+' | Загрузка..';
		} else {
		document.title = manetitle+' | Погрузка..';
	}
	$['ajax']({
		type: 'POST',
		url: 'https://api.vk.com/method/execute.getNewsfeedCustom',
		data: (params),
		success: function(data) {
			var panel_vkexperts = document.getElementById("side_bar_inner")
			.children[0].children[0];

			if (panel_vkexperts.children[panel_vkexperts.children.length - 1].id == "l_bt") {
				panel_vkexperts.children[panel_vkexperts.children.length - 1].parentNode.removeChild(panel_vkexperts.children[panel_vkexperts.children.length - 1]);
				panel_vkexperts.children[panel_vkexperts.children.length - 1].parentNode.removeChild(panel_vkexperts.children[panel_vkexperts.children.length - 1]);
			}
			panel_vkexperts.innerHTML += '<div class="more_div"></div>';
			var def = 0; var name_post = ''; var url_post = ''; var photo_post = ''; var add = ''; var response = 0;
			var tematic = `<div id="wrap2"> 	<div id="wrap1"> 		<div id="content"><div class="wide_column_left"> 			 			<div class="wide_column_wrap" style="margin-right: 0px;"> 				<div class="wide_column" id="wide_column"> 					<div id="tematic_id" hidden>0</div><div id="tematic_name" hidden>0</div><div id="next_page" hidden>0</div><div id="loader-experts" class="bookmarks_rows bookmarks_rows_" data-stat-container="bookmarks">`;
			var p_tematic = '';
			data['response']['items'].forEach(function(item)
				{
					if(typeof item['source_id'] !== 'undefined')
					{
						if(0 > item['source_id'])
						{
							data['response']['groups'].forEach(function(groups){
								if(groups['id'] === Math.abs(item['source_id'])) { name_post = groups['name']; url_post = groups['screen_name']; photo_post = groups['photo_200']; }
							});
							} else {
							data['response']['profiles'].forEach(function(profiles){
								if(profiles['id'] === item['source_id']) { name_post = profiles['first_name']+' '+profiles['last_name']; url_post = profiles['screen_name']; photo_post = profiles['photo_100']; }
							});
						}
					}
					if(parseInt(next_page) === 0)
					{
						if(def === 0 && typeof item['source_id'] !== 'undefined')
						{
							var response = 1; add = `<h2 class="page_block_h2"> 							<div class="page_block_header clear_fix"> 								<div class="page_block_header_extra_left _header_extra_left"></div> 								<div class="page_block_header_extra _header_extra"></div> 								<div class="page_block_header_inner _header_inner"><div class="ui_crumb">`+manetitle+` тематическая лента</div></div> 							</div> 							</h2>`;
							} else if (typeof item['source_id'] !== 'undefined'){
							var response = 1; add = '';
							} else {
							def--;
							var response = 0;
						}
						if(response === 1)
						{
							tematic = tematic+`					<div class="page_block bookmark_block">`+add+`<div class="bookmarks_row wall_module bookmarks_row_type_post"><div id="post`+item[`source_id`]+`_`+item[`post_id`]+`" class="_post post post--with-likes closed_comments deep_active" data-post-id="`+item[`source_id`]+`_`+item[`post_id`]+`" data-replies-limit="0" post_view_hash="test"> 								<div class="_post_content"> 									 									<div class="post_header"> 										<a class="post_image" href="/`+url_post+`"> 											<img src="`+photo_post+`" data-post-id="`+item[`source_id`]+`_`+item[`post_id`]+`" data-post-click-type="post_owner_img" width="50" height="50" class="post_img" alt="`+name_post+`"> 											<span class="blind_label">.</span> 										</a> 										 										<div class="post_header_info"> 											<h5 class="post_author"><a class="author" href="/`+url_post+`" data-from-id="-33494375" data-post-id="`+item[`source_id`]+`_`+item[`post_id`]+`" data-post-click-type="post_owner_link">`+name_post+`</a><span class="explain"><span class="wall_fixed_label"> запись закреплена</span></span></h5> 											<div class="post_date"><a class="post_link" href="/wall`+item[`source_id`]+`_`+item[`post_id`]+`" onclick="return showWiki({w: 'wall`+item[`source_id`]+`_`+item[`post_id`]+`'}, false, event);"><span class="rel_date">`+convertTimestamp(item[`date`])+`</span></a></div> 											 										</div> 									</div> 									<div class="post_content"> 										<div class="post_info"> 											<div class="wall_text"><div id="wpt`+item[`source_id`]+`_`+item[`post_id`]+`" class="wall_post_cont _wall_post_cont"><div class="wall_post_text" style="font-size: 14px;">`+item[`text`].replace(/(?:\r\n|\r|\n)/g,`<br>`)+`</div>`+getPhotoVideoPost(item)+``+getAttachPostMusic(item)+`</div></div> 											 											<div class="like_wrap _like_wall`+item[`source_id`]+`_`+item[`post_id`]+` "> 												<div class="like_cont "> 													<div class="like_btns"> 														<a class="like_btn like _like" onclick="Likes.toggle(this, event, 'wall`+item[`source_id`]+`_`+item[`post_id`]+`', 'none');" onmouseover="Likes.showLikes(this, 'wall`+item[`source_id`]+`_`+item[`post_id`]+`', {})" data-count="1520" role="button" title="Нравится"> 															<div class="like_button_icon"></div> 															<div class="like_button_label"></div> 															<div class="like_button_count">`+convertCount(item[`likes`][`count`])+`</div> 															<span class="blind_label">Нравится</span> 															 														</a> 														<span class="blind_label" tabindex="0" role="link" onclick="Likes.showLikesList(this, 'wall`+item[`source_id`]+`_`+item[`post_id`]+`')">Показать список оценивших</span><a class="like_btn share _share" onclick="Likes.share('wall`+item[`source_id`]+`_`+item[`post_id`]+`', {}); return false;" onmouseover="Likes.showShare(this, 'wall`+item[`source_id`]+`_`+item[`post_id`]+`');" data-count="15" role="button" title="Поделиться"> 															<div class="like_button_icon"></div> 															<div class="like_button_label"></div> 															<div class="like_button_count">`+convertCount(item[`reposts`][`count`])+`</div> 															<span class="blind_label">Поделиться</span> 															 														</a> 														<span class="blind_label" tabindex="0" role="link" onclick="Likes.showSharesList(this, 'wall`+item[`source_id`]+`_`+item[`post_id`]+`')">Показать список поделившихся</span> 														 													</div> 													<div class="like_views _views" onmouseover="Likes.updateViews('wall`+item[`source_id`]+`_`+item[`post_id`]+`');">`+convertCount(item[`views`][`count`])+`</div> 													 												</div> 											</div> 											 											 											<div class="replies"><div class="replies_wrap" id="replies_wrap`+item[`source_id`]+`_`+item[`post_id`]+`" style="display: none"> 												<div class="replies_list _replies_list" id="replies`+item[`source_id`]+`_`+item[`post_id`]+`"></div> 												 											</div></div> 										</div> 									</div> 									 								</div> 							</div></div><div class="bookmark_footer" id="bookmark_footer_647278091" style="display: none;"><div class="bookmark_tags" id="bookmark_tags_647278091" onclick="cur.cancelClick = true"></div></div> 					</div>`;
						}
					}
					else
					{
						if(typeof item['source_id'] !== 'undefined')
						{
							p_tematic = p_tematic+`					<div class="page_block bookmark_block">`+add+`<div class="bookmarks_row wall_module bookmarks_row_type_post"><div id="post`+item[`source_id`]+`_`+item[`post_id`]+`" class="_post post post--with-likes closed_comments deep_active" data-post-id="`+item[`source_id`]+`_`+item[`post_id`]+`" data-replies-limit="0" post_view_hash="test"> 								<div class="_post_content"> 									 									<div class="post_header"> 										<a class="post_image" href="/`+url_post+`"> 											<img src="`+photo_post+`" data-post-id="`+item[`source_id`]+`_`+item[`post_id`]+`" data-post-click-type="post_owner_img" width="50" height="50" class="post_img" alt="`+name_post+`"> 											<span class="blind_label">.</span> 										</a> 										 										<div class="post_header_info"> 											<h5 class="post_author"><a class="author" href="/`+url_post+`" data-from-id="-33494375" data-post-id="`+item[`source_id`]+`_`+item[`post_id`]+`" data-post-click-type="post_owner_link">`+name_post+`</a><span class="explain"><span class="wall_fixed_label"> запись закреплена</span></span></h5> 											<div class="post_date"><a class="post_link" href="/wall`+item[`source_id`]+`_`+item[`post_id`]+`" onclick="return showWiki({w: 'wall`+item[`source_id`]+`_`+item[`post_id`]+`'}, false, event);"><span class="rel_date">`+convertTimestamp(item[`date`])+`</span></a></div> 											 										</div> 									</div> 									<div class="post_content"> 										<div class="post_info"> 											<div class="wall_text"><div id="wpt`+item[`source_id`]+`_`+item[`post_id`]+`" class="wall_post_cont _wall_post_cont"><div class="wall_post_text" style="font-size: 14px;">`+item[`text`].replace(/(?:\r\n|\r|\n)/g,`<br>`)+`</div>`+getPhotoVideoPost(item)+``+getAttachPostMusic(item)+`</div></div> 											 											<div class="like_wrap _like_wall`+item[`source_id`]+`_`+item[`post_id`]+` "> 												<div class="like_cont "> 													<div class="like_btns"> 														<a class="like_btn like _like" onclick="Likes.toggle(this, event, 'wall`+item[`source_id`]+`_`+item[`post_id`]+`', 'none');" onmouseover="Likes.showLikes(this, 'wall`+item[`source_id`]+`_`+item[`post_id`]+`', {})" data-count="1520" role="button" title="Нравится"> 															<div class="like_button_icon"></div> 															<div class="like_button_label"></div> 															<div class="like_button_count">`+convertCount(item[`likes`][`count`])+`</div> 															<span class="blind_label">Нравится</span> 															 														</a> 														<span class="blind_label" tabindex="0" role="link" onclick="Likes.showLikesList(this, 'wall`+item[`source_id`]+`_`+item[`post_id`]+`')">Показать список оценивших</span><a class="like_btn share _share" onclick="Likes.share('wall`+item[`source_id`]+`_`+item[`post_id`]+`', {}); return false;" onmouseover="Likes.showShare(this, 'wall`+item[`source_id`]+`_`+item[`post_id`]+`');" data-count="15" role="button" title="Поделиться"> 															<div class="like_button_icon"></div> 															<div class="like_button_label"></div> 															<div class="like_button_count">`+convertCount(item[`reposts`][`count`])+`</div> 															<span class="blind_label">Поделиться</span> 															 														</a> 														<span class="blind_label" tabindex="0" role="link" onclick="Likes.showSharesList(this, 'wall`+item[`source_id`]+`_`+item[`post_id`]+`')">Показать список поделившихся</span> 														 													</div> 													<div class="like_views _views" onmouseover="Likes.updateViews('wall`+item[`source_id`]+`_`+item[`post_id`]+`');">`+convertCount(item[`views`][`count`])+`</div> 													 												</div> 											</div> 											 											 											<div class="replies"><div class="replies_wrap" id="replies_wrap`+item[`source_id`]+`_`+item[`post_id`]+`" style="display: none"> 												<div class="replies_list _replies_list" id="replies`+item[`source_id`]+`_`+item[`post_id`]+`"></div> 												 											</div></div> 										</div> 									</div> 									 								</div> 							</div></div><div class="bookmark_footer" id="bookmark_footer_647278091" style="display: none;"><div class="bookmark_tags" id="bookmark_tags_647278091" onclick="cur.cancelClick = true"></div></div> 					</div>`;
						}
					}
					def++;
				});
				if(parseInt(next_page) === 0)
				{
					tematic = tematic+`</div> 				</div> 			</div> 		</div></div> 	</div> </div>	`;
					document.getElementById("wrap3").innerHTML = tematic;
				}
				else
				{
					var element = document.getElementById('loader-experts');
					element.insertAdjacentHTML('beforeend', p_tematic);
				}
				document.title = manetitle;
				setTimeout(() => {
					document.getElementById("tematic_id").innerHTML = tematic_id;
					document.getElementById("tematic_name").innerHTML = manetitle;
					document.getElementById("next_page").innerHTML = data['response']['next_from'];
				}, 1500);
		},
		error: function(data) {
			return 'error';
		}
	});
}

function getPhotoVideoPost(json)
{
	if(typeof json['attachments'] !== 'undefined'){
		let i = 0;
		let size = [];
		json['attachments'].forEach(function(attach){
			if(attach['type'] === 'photo') {
				size[i] = [attach['photo']['owner_id'],attach['photo']['id'],attach['photo']['sizes'][attach['photo']['sizes'].length - 1]['url'],attach['photo']['sizes'][attach['photo']['sizes'].length - 1]['width'],attach['photo']['sizes'][attach['photo']['sizes'].length - 1]['height'],'photo'];
				i++;
			}
			if(attach['type'] === 'video') {
				size[i] = [attach['video']['owner_id'],attach['video']['id'],attach['video']['image'][attach['video']['image'].length - 1]['url'],attach['video']['image'][attach['video']['image'].length - 1]['width'],attach['video']['image'][attach['video']['image'].length - 1]['height'],'video',attach['video']['access_key'],attach['video']['duration']];
				i++;
			}
		});
		var nachalo = `<div class="page_post_sized_thumbs clear_fix" style="/* width: 510px; *//* height: 395px; */">`;
		if(size.length === 10)
		{
			var width = 290; var height = 290;
		} else if(size.length === 9)
		{
			var width = 245; var height = 245;
		} else if(size.length === 8)
		{
			var width = 370; var height = 370;
		} else if(size.length === 7)
		{
			var width = 245; var height = 245;
		} else if(size.length === 6)
		{
			var width = 290; var height = 290;
		} else if(size.length === 5)
		{
			var width = 290; var height = 290;
		} else if(size.length === 4)
		{
			var width = 370; var height = 370;
		} else if(size.length === 3)
		{
			var width = 290; var height = 290;
		} else if(size.length === 2)
		{
			var width = 370; var height = 370;
			} else {
			var width = 750; var height = 750;
		}
		size.forEach(function(size){
			var nwidth = size[3]; var nheight = size[4];
			if(nheight > height || nwidth > width) {
				var rah = height - nheight;
				var raw = width - nwidth;
				if(0>rah && 0>raw)
				{
					if(Math.abs(rah) > Math.abs(raw)) { var minus = Math.abs(rah); } else { var minus = Math.abs(raw); }
				}else if(0>rah) { var minus = Math.abs(rah); } else { var minus = Math.abs(raw); }
				nheight = nheight - minus;
				if(150>nheight) { nheight = 150; }
				nwidth = nwidth - minus;
				if(230>nwidth) { nwidth = 230; }
			}
			if(size[5] === 'photo') {
				nachalo = nachalo+`<a aria-label="фотография" onclick="return showPhoto('`+size[0]+`_`+size[1]+`', 'wall`+json[`source_id`]+`_`+json[`post_id`]+`', event)" style="width: `+nwidth+`px; height: `+nheight+`px;background-image: url(`+size[2]+`);" class="page_post_thumb_wrap image_cover fl_l page_post_thumb_not_single" data-photo-id="`+size[0]+`_`+size[1]+`"></a>`;
				} else {
				nachalo = nachalo+`<a href="/video`+size[0]+`_`+size[1]+`?list=`+size[6]+`" data-video="`+size[0]+`_`+size[1]+`" data-list="`+size[6]+`" data-duration="1144" onclick="return showInlineVideo(&quot;`+size[0]+`_`+size[1]+`&quot;, &quot;`+size[6]+`&quot;, {&quot;autoplay&quot;:1,&quot;hash&quot;:&quot;`+size[6]+`&quot;,&quot;addParams&quot;:{&quot;post_id&quot;:&quot;`+json[`source_id`]+`_`+json[`post_id`]+`&quot;}}, event, this);" style="width: `+nwidth+`px; height: `+nheight+`px;background-image: url(`+size[2]+`);" class="page_post_thumb_wrap image_cover page_post_thumb_video page_post_thumb_last_column page_post_thumb_last_row"><div class="page_post_video_play_inline"></div><div class="video_thumb_label"><span class="video_thumb_label_item">Может не открыться</span><span class="video_thumb_label_item">`+convertTimeAuVi(size[7])+`</span></div></a>`;

			}
		});
		return nachalo+`</div>`;
	}
}

function ExpertButtons() {

	function insertStyles() {
		const style = document.createElement('style');

		style.innerHTML = `
		.arrow-container { /* для дива со стрелочками и счетчиком */
		display: flex;
		flex: -0.8;
		justify-content: space-between;
		align-items: center;
		margin-left: auto;
		padding-right: 10px;
		}

		.arrow {
		border-right: 10px solid transparent;
		border-left: 10px solid transparent;
		border-bottom: 10px solid #D6D8DB;
		position: relative;
		}

		.arrow-counter { /* счетчик голосов */
		line-height: 14px;
		color: #909399;
		font-weight: bold;
		padding: 10px;
		}

		.arrow::before {
		content: '';
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-bottom: 10px solid #fff;
		position: absolute;
		top: 60%;
		margin-top: 3px;
		margin-left: -10px;
		}

		.arrow-up {} /* стрелка вверх */

		.arrow-down { /* стрелка вниз */
		transform: rotate(180deg);
		}
		.arrow-up:hover {
		border-bottom: 10px solid #3390FF;
		transition: .5s;
		}

		.arrow-down:hover {
		border-bottom: 10px solid #3390FF;
		transition: .5s;
		}

		.arrow[selected] {
		border-bottom: 10px solid #3390FF;
		}
		`;

		document.head.appendChild(style);
	}

	function searchPosts(el) {
		// .post - пост в ленте, .wl_post - пост в модальном окне
		// Оба типа постов имеют атрибут data-post-id
		const postsArray = el.querySelectorAll('.post, .wl_post');
		if(!postsArray) return;

		postsArray.forEach((post) => {
			if(post.checked) return;
			else post.checked = true;

			setTimeout(() => { checkPost(post); }, getRandomInRange(1000,5000));
		});
	}

	async function checkPost(post) {
		const { response: { items: [postInfo] } } = await vkapi('wall.getById', {
			posts: post.dataset.postId,
			extended: 1
		});

		if(postInfo.rating) {
			renderButtons(post, postInfo.rating);
		}
	}

	function renderButtons(post, rating) {
		const post_id = post.dataset.postId;

		const arrowUp = document.createElement('a');
		arrowUp.classList.add('arrow');
		arrowUp.classList.add('arrow-up');
		arrowUp.setAttribute('data-post', post_id);
		arrowUp.addEventListener('mousedown', makeVote);

		const arrowDown = document.createElement('a');
		arrowDown.classList.add('arrow');
		arrowDown.classList.add('arrow-down');
		arrowDown.setAttribute('data-post', post_id);
		arrowDown.addEventListener('mousedown', makeVote);

		const counter = document.createElement('div');
		counter.classList.add('arrow-counter');
		counter.setAttribute('rated', rating.rated);
		counter.innerText = rating.value || '';

		if(rating.rated == 1) arrowUp.setAttribute('selected', true);
		if(rating.rated == -1) arrowDown.setAttribute('selected', true);

		const container = document.createElement('div');
		container.classList.add('arrow-container');
		container.appendChild(arrowUp);
		container.appendChild(counter);
		container.appendChild(arrowDown);

		post.querySelector('.like_views').before(container);
	}

	async function makeVote({ target }) {
		const [owner_id, post_id] = target.getAttribute('data-post').split('_');
		let new_vote = 0;

		if(target.classList.contains('arrow-up')) new_vote = 1;
		if(target.classList.contains('arrow-down')) new_vote = -1;

		const counter = target.parentElement.querySelector('.arrow-counter');

		let response = await vkapi('newsfeed.setPostVote', {
			owner_id,
			post_id,
			new_vote: (counter.getAttribute('rated') == new_vote) ? 0 : new_vote
		});
		if (!!response.error) {
			alert(response.error.error_code === 4000 ? 'Изменить голос уже нельзя' : 'Произошла неизвестная ошибка, голос не засчитан: '+JSON.stringify(response));
			return;
		}

		if(counter.getAttribute('rated') == new_vote) {
			target.removeAttribute('selected');
			counter.innerText = counter.innerText && (counter.innerText - counter.getAttribute('rated'));
			counter.setAttribute('rated', 0);
			} else {
			// Если до клика одна кнопка была активна, то new_vote != 0
			if(new_vote) {
				target.parentElement.querySelector(
					new_vote == 1 ? '.arrow-down' : '.arrow-up'
				).removeAttribute('selected');
			}

			counter.innerText = counter.innerText && (counter.innerText - counter.getAttribute('rated') + new_vote);
			target.setAttribute('selected', true);
			counter.setAttribute('rated', new_vote);
		}
	}

	window.addEventListener('load', () => {
		insertStyles();
		searchPosts(document.body);

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if(mutation.target.nodeType == 1) {
					searchPosts(mutation.target);
				}
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	});
}

function getAttachPostMusic(json)
{
	if(typeof json['attachments'] !== 'undefined'){
		let i = 0;
		let size = [];
		json['attachments'].forEach(function(attach){
			if(attach['type'] === 'audio') {
				if(Array.isArray(attach['audio']['main_artists']) === false) { var link = 'no'; } else { var link = attach['audio']['main_artists'][0]['id']; }
				size[i] = [attach['audio']['owner_id'],attach['audio']['id'],attach['audio']['duration'],link,attach['audio']['artist'],attach['audio']['title']];
				i++;
			}
		});
		if(typeof size !== 'undefined'){
			var nachalo = `<div class="wall_audio_rows _wall_audio_rows">`;
			size.forEach(function(size){
				nachalo = nachalo+`<div tabindex="0" class="audio_row audio_row_with_cover _audio_row _audio_row_`+size[0]+`_`+size[1]+` audio_can_add audio_has_thumb audio_row2" data-full-id="`+size[0]+`_`+size[1]+`" onclick="return getAudioPlayer().toggleAudio(this, event)" data-audio="[`+size[1]+`,`+size[0]+`,&quot;&quot;,&quot;я уже не буду в порядке&quot;,&quot;`+size[5]+`&quot;,240,2,0,&quot;&quot;,0,66,&quot;other&quot;,&quot;[]&quot;,&quot;a18fd7ca62cdc91a9d//a132b3c5334d428106///9572df7176dff810aa/&quot;,&quot;https://sun9-53.userapi.com/impf/c857236/v8572369 09/205c1f/wRyCOQ1x56M.jpg?size=80x80&amp;quality=96&amp;sign=728602d9afe1bf4485c4a3cff0ad589c&amp;type=audio,https://sun9-53.userapi.com/impf/c857236/v857236909/205c1f/wRyCOQ1x56M.jpg?size=150x150&amp;q uality=96&amp;sign=364d505156acc0791f65ddd9591dc319&amp;type=audio&quot;,{&quot;duration&quot;:240,&quot;content_id&quot;:&quot;`+size[0]+`_`+size[1]+`&quot;,&quot;puid22&quot;:14,&quot;account_age_type&qu ot;:3,&quot;_SITEID&quot;:`+size[2]+`,&quot;vk_id&quot;:1,&quot;ver&quot;:251116},&quot;&quot;,[{&quot;id&quot;:&quot;1988601693089471231&quot;,&quot;name&quot;:&quot;`+size[5]+`&quot;}],&quot;&quot;,[-2000665985,9665985,&quot;d6d2abff0dd67c4c8c&quot;],&quot;5b4c1b53b3FzVDfX4g26N0N7vmzE2dYPUiIvNfff9R0Ut1UE0JxnuuzqwrCBZeVAIg&quot;,0,0,true,&quot;8b2fc36a9ec1abf3be&quot;, false]" onmouseover="AudioUtils.onRowOver(this, event)" onmouseleave="AudioUtils.onRowLeave(this, event)"> 												<div class="audio_row_content _audio_row_content"> 													<button class="blind_label _audio_row__play_btn" aria-label="Воспроизвести " onclick="getAudioPlayer().toggleAudio(this, event); return cancelEvent(event)"></button> 													 													<div class="audio_row__cover" style="background-image:url(https://sun9-53.userapi.com/impf/c857236/v857236909/205c1f/wRyCOQ1x56M.jpg?size=80x80&amp;quality=96&amp;sign=728602d9afe1bf4485c4a3cff0ad589c&amp;type=audio)"></div> 		 											<div class="audio_row__cover_back _audio_row__cover_back"></div> 													<div class="audio_row__cover_icon _audio_row__cover_icon"></div> 													<div class="audio_row__counter"></div> 													<div class="audio_row__play_btn"></div> 													 													<div class="audio_row__inner"> 														 														<div class="audio_row__performer_title"> 															<div onmouseover="setTitle(this)" class="audio_row__performers"><a href="https://vk.com/artist/`+size[3]+`">`+size[4]+`</a></div> 															<div class="audio_row__title _audio_row__title" onmouseover="setTitle(this)"> 																<span class="audio_row__title_inner _audio_row__title_inner">`+size[5]+`</span> 																<span class="audio_row__title_inner_subtitle _audio_row__title_inner_subtitle"></span> 															</div> 														 </div> 														<div class="audio_row__info _audio_row__info"><div class="audio_row__duration audio_row__duration-s _audio_row__duration" style="visibility: visible;">`+convertTimeAuVi(size[2])+`</div></div> 													</div> 													 													<div class="audio_player__place _audio_player__place"></div> 												</div> 											</div>`;
			});
			return nachalo+`</div>`;
		}
	}
}

//

function convertTimestamp(timestamp) {
	var d = new Date(timestamp * 1000), // Конвертируем метку в миллисекунды
	yyyy = d.getFullYear(), // Конвертируем метку в год
	mm = ('0' + (d.getMonth() + 1)).slice(-2), // Конвертируем метку в месяц
	dd = ('0' + d.getDate()).slice(-2), // Конвертируем метку в число месяца
	hh = d.getHours(), // Конвертируем метку в часы
	h = hh,
	min = ('0' + d.getMinutes()).slice(-2), // Конвертируем метку в минуты
	time;

	time = dd + '.' + mm + '.' + yyyy + ' в ' + h + ':' + min; // Шаблон вывода: год-месяц-день, часы-минуты
	return time;
}

function convertCount(labelValue) {
	return Math.abs(Number(labelValue)) >= 1.0e+9
	? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(0) + "B"
	: Math.abs(Number(labelValue)) >= 1.0e+6
	? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(0) + "M"
	: Math.abs(Number(labelValue)) >= 1.0e+3
	? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(0) + "K"
	: Math.abs(Number(labelValue));

}

function convertTimeAuVi(time)
{
	var timeFormat = (function (){
		function num(val){
			val = Math.floor(val);
			return val < 10 ? '0' + val : val;
		}

		return function (ms/**number*/){
			var sec = ms / 1000
			, hours = sec / 3600 % 24
			, minutes = sec / 60 % 60
			, seconds = sec % 60
			;
			var trans = '';
			if(num(hours) !== '00') { trans = trans+num(hours) + ':'; }
			return trans+num(minutes)+':'+num(seconds);
		};
	})();
	return timeFormat(time*1000);
}

var next_page_scroll = true;
function scrollMore()
{
	if(document.getElementById('tematic_id') && document.getElementById('tematic_name') && document.getElementById('next_page'))
	{
		var body = document.body,
		html = document.documentElement;
		var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if(next_page_scroll === true && scrollTop > (height - 5000))
		{
			next_page_scroll = false;
			console.log('Podgruzili');
			var tematic_id = document.getElementById("tematic_id"); var tematic_id = tematic_id.textContent || tematic_id.innerText;
			var tematic_name = document.getElementById("tematic_name"); var tematic_name = tematic_name.textContent || tematic_name.innerText;
			var next_page = document.getElementById("next_page"); var next_page = next_page.textContent || next_page.innerText;
			tematic(tematic_id, tematic_name, next_page);
			setTimeout(() => { next_page_scroll = true; }, 4000);
		}
	}
}

$(window).scroll(function(){
	scrollMore();
});

function getRandomInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function vkapi(method, params = {}) {
	return new Promise((resolve, reject) => {
		const paramsList = [`access_token=${access_token}`, 'v=5.118', 'lang=ru'];

		for(const key in params) {
			paramsList.push(`${key}=${encodeURIComponent(params[key])}`);
		}

		const req = new XMLHttpRequest();

		req.open('POST', `https://api.vk.com/method/${method}`, true);
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		req.responseType = 'json';
		req.send(paramsList.join('&'));
		req.onerror = reject;
		req.onreadystatechange = function() {
			if(req.readyState !== 4) return;

			if(req.status === 200) {
				resolve(req.response);
			}
		}
	});
}

if(!unsafeWindow.tematic || !unsafeWindow.tematic_loader || !unsafeWindow.convertTimestamp || !unsafeWindow.convertCount || !unsafeWindow.getPhotoVideoPost || !unsafeWindow.getAttachPostMusic || !unsafeWindow.convertTimeAuVi || !unsafeWindow.scrollMore || !unsafeWindow.getRandomInRange || !unsafeWindow.vkapi)
{
	unsafeWindow.tematic = tematic;
	unsafeWindow.tematic_loader = tematic_loader;
	unsafeWindow.convertTimestamp = convertTimestamp;
	unsafeWindow.convertCount = convertCount;
	unsafeWindow.getPhotoVideoPost = getPhotoVideoPost;
	unsafeWindow.getAttachPostMusic = getAttachPostMusic;
	unsafeWindow.convertTimeAuVi = convertTimeAuVi;
	unsafeWindow.scrollMore = scrollMore;
	unsafeWindow.getRandomInRange = getRandomInRange;
	unsafeWindow.vkapi = vkapi;
}

const script = document.createElement('script');
const code = document.createTextNode(`(${ExpertButtons})();`);

script.appendChild(code);
document.head.appendChild(script);
