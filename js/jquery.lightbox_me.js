/*
* $ lightbox_me
* By: Buck Wilson
* Version : 2.3
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
(function($) {
$.fn.lightbox_me = function(options) {
return this.each(function() {
var
opts = $.extend({}, $.fn.lightbox_me.defaults, options),
$overlay = $(),
$self = $(this),
$iframe = $('<iframe id="foo" style="z-index: ' + (opts.zIndex + 1) + ';border: none; margin: 0; padding: 0; position: absolute; width: 100%; height: 100%; top: 0; left: 0; filter: mask();"/>'),
ie6 = ($.browser.msie && $.browser.version < 7);
if (opts.showOverlay) {
//check if there's an existing overlay, if so, make subequent ones clear
var $currentOverlays = $(".js_lb_overlay:visible");
if ($currentOverlays.length > 0){
$overlay = $('<div class="lb_overlay_clear js_lb_overlay"/>');
} else {
$overlay = $('<div class="' + opts.classPrefix + '_overlay js_lb_overlay"/>');
}
}
/*----------------------------------------------------
DOM Building
---------------------------------------------------- */
if (ie6) {
var src = /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank';
$iframe.attr('src', src);
$('body').append($iframe);
} // iframe shim for ie6, to hide select elements
$('body').append($self.hide()).append($overlay);
/*----------------------------------------------------
Overlay CSS stuffs
---------------------------------------------------- */
// set css of the overlay
