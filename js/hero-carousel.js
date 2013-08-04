// Carousel for hero with arrows and bullets navigating between full width hero banners
HeroCarousel = {
// HeroCarousel.init();
init : function() {
HeroCarousel.resizeBanners();
$(window).resize(function() { HeroCarousel.resizeBanners(); });
var timer = $.timer(function() { HeroCarousel.switchNext(); });
timer.set({ time : 10000, autostart : true });
$("#hero .arrows .arrow-prev").on("click", function() {
timer.reset(); HeroCarousel.switchPrevious();
});
$("#hero .arrows .arrow-next").on("click", function() {
timer.reset(); HeroCarousel.switchNext();
});
$("#hero .bullets a[data-hero]").on("click", function() {
timer.reset(); HeroCarousel.switchTo($(this).data("hero"));
});
},
// Jumps to the previous hero
// Show previous hero, prepend last hero to front with margin, assign new selected, animate away margin
// HeroCarousel.switchPrevious()
switchPrevious : function() {
var windowWidth = HeroCarousel.getWindowWidth();
var currentHero = HeroCarousel.getCurrentHero();
var prevHero = HeroCarousel.getPreviousHero();
currentHero.removeClass('selected');
HeroCarousel.setSelectedBullet(prevHero);
$("#hero .promos").prepend(prevHero.css("margin-left", windowWidth * -1));
$("#hero .arrows").hide();
prevHero.addClass('selected').animate({ "margin-left" : 0 }, {
complete : function() {
$("#hero .arrows").show();
}
});
},
// Jumps to the next hero
// Show next hero, slide current to the left, once done append current as last promo
// HeroCarousel.switchNext()
switchNext : function() {
var windowWidth = HeroCarousel.getWindowWidth();
var currentHero = HeroCarousel.getCurrentHero();
var nextHero = HeroCarousel.getNextHero();
nextHero.addClass('selected');
HeroCarousel.setSelectedBullet(nextHero);
$("#hero .arrows").hide();
currentHero.removeClass('selected').animate({ "margin-left" : windowWidth * -1 }, {
complete : function() {
$("#hero .promos").append(currentHero.css("margin-left", 0));
$("#hero .arrows").show();
}
});
},
// Jumps to a particular hero based on id
// HeroCarousel.switchTo(2)
switchTo : function(heroId) {
var currentHero = HeroCarousel.getCurrentHero();
var targetHero = $("#hero .promos div[data-id='" + heroId + "']");
var heroDiff = targetHero.data("id") - currentHero.data("id");
while (heroDiff != 0) {
if (heroDiff > 0) { HeroCarousel.switchNext(); heroDiff -= 1; }
else if (heroDiff < 0) { HeroCarousel.switchPrevious(); heroDiff += 1; }
}
},
// Returns the next hero element
getNextHero : function() {
var currentId = HeroCarousel.getCurrentHero().data("id");
var nextId = currentId >= HeroCarousel.getHeroCount() ? 1 : ++currentId
return $("#hero .promos div[data-id='" + nextId + "']");
},
// Returns the previous hero element
getPreviousHero : function() {
var currentId = HeroCarousel.getCurrentHero().data("id");
var prevId = currentId <= 1 ? HeroCarousel.getHeroCount() : --currentId;
return $("#hero .promos div[data-id='" + prevId + "']");
},
// Retrns the current hero element
getCurrentHero : function() {
return $('#hero .promos .selected');
},
// Returns total number of heroes
getHeroCount : function () {
return $('#hero .promos > div').length;
},
// Sets the selected bullet based on a hero
// HeroCarousel.setSelectedBullet(heroEl);
setSelectedBullet : function(heroEl) {
var bulletsEl = $("#hero .bullets");
var currentBullet = $(bulletsEl).find("a[data-hero='" + heroEl.data("id") + "'] img");
$(bulletsEl).find("a img").attr("src", bulletsEl.data("unselected-url"))
currentBullet.attr("src", bulletsEl.data("selected-url"))
},
// Position banners with proper widths based on viewport
resizeBanners : function() {
var windowWidth = HeroCarousel.getWindowWidth(); // min width of site
// Set all heros to exact window width
$('#hero .promos > div').width(windowWidth);
// Set right arrow to the edge of the right viewport
$("#hero .arrows .arrow-next").css("left", windowWidth - 120);
// Hide arrows if too narrow
$(window).width() < 1240 ? $("#hero .arrows").css("visibility", "hidden") : $("#hero .arrows").css("visibility", "visible");
$('#hero .promos > div .content').show();
},
// Returns the window width (or minimum width if less than 1100)
getWindowWidth : function() {
return Math.max($(window).width(), 1100);
}
};
