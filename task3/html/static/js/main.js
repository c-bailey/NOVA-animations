/*	POPUP http://www.quirksmode.org/js/popup.html
	In some cases this will have to be called inline so as to be able to pass a django template var as a url.
	eg.: <a class="popup" href="{{ lab.get_absolute_url }}" onclick="return popup('{{ lab.get_absolute_url }}')">LAUNCH</a>
*/
function popup(url, w, h) {
	var height = (h)?h:651,
		width = (w)?w:904,
		left = (screen.width/2)-(width/2),
		top = (screen.height/2)-(height/2),
		newwindow = window.open(url,'name','height='+height+',width='+width+', top='+top+', left='+left);
	if (window.focus) {newwindow.focus();}

	return false;
}

(function($) {
	$(document).ready( function() {

		// HOME PAGE CAROUSEL
		if ($("#billboard").size()) {
			var root = $("#billboard").scrollable({ circular: true }).autoscroll({ autoplay: true, interval: 4000 });

			var carouselApi = root.scrollable();

			carouselApi.onSeek(function(event, i) {
				$("#jump li").removeClass("active").eq(i).addClass("active");
			});
		}

		// ADD CLICK EVENTS TO DORP DOWN MENUS FOR TOUCH DEVICES
		$('.dropdown').bind('touchstart', function() {
			$(this).toggleClass('open');
		})

		// OPEN ALL EXTERNAL LINKS IN NEW TAB
		$('a[href^="http://"]')
			.not('[href*="http://localhost:8000/"]')
			.not('[href*="pbs.org/wgbh/nova/labs"]')
			.attr('target','_blank');
			
			
		// TABBED CONTENT
		$(".tabs").tabs(".panes > ul", { history: true });
	
	
		// COLLAPSABLE CONTENT
		if ($('.toggled-content').size()) {
			// init as hidden
			$('.toggled-content').hide();
			
			// handle open request
			$('.toggle-open').click(function() {
				var toggleOpen = $(this);
				toggleOpen.find('.toggle-label').hide();
				
				toggleOpen.removeClass('closed').next().slideToggle('medium', function(){
					// is closed
					if (!toggleOpen.next().is(':visible')) {
						toggleOpen.addClass('closed').removeClass('open');
						toggleOpen.find('.toggle-label').show();
					// is open
					} else {
						toggleOpen.addClass('open');
					}
				});
			});
			
			// handle close request
			$('.toggle-close').click(function() {
				var toggleClose = $(this),
					toggleOpen = toggleClose.parent().prev();
					
				toggleOpen.removeClass('open');
				toggleClose.parent().slideToggle('medium', function(){
					toggleOpen.addClass('closed').removeClass('open');
					toggleOpen.find('.toggle-label').show();
				});
			});
		}


		// MODAL TRIGGERS
		var triggers = $(".modalTrigger").click(
			
			function() {
				if($(this).hasClass('popup')) {
					buttons.data('popup', true);
				}
				buttons.data('href', $(this).attr('href'));
			}).overlay({
				top: 200,
				mask: {
					color: '#000',
					loadSpeed: 200,
					opacity: 0.6
				}

			});


		// BUTTONS WITHIN LOGIN MODAL
		var buttons = $('#login-overlay a').click(function(e) {
			
			// determine which button they chose
			var hasAccount = buttons.index(this) === 0;
 
			if (hasAccount) {
				// give them the PBS login prompt
				$('#join > a:first-child').trigger('click');

			} else {
				// log them in as a guest
				var isPopup = $(this).data('popup'),
					targetHref = $(this).data('href');

				if(isPopup) {
                    location.href = targetHref
				} else if (targetHref.indexOf('research') >= 0){
                    var hrefArray = targetHref.split('/')
					location.href = hrefArray.slice(0, hrefArray.length-3).join('/') + '/';
				} else {
                    location.href = targetHref
                }
			}
		});
	});
}) (jQuery);
