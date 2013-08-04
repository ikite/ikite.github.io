// Carousel to allow viewing many items in a horizontal display
ItemCarousel = {
// Setup the ItemCarousel
// ItemCarousel.init();
init : function(carouselEl) {
if (carouselEl.length < 1) { return false; }
$(window).resize(function() { ItemCarousel.repositionArrows(carouselEl); });
carouselEl.find(".carousel-items").data("carouselIndex", 0);
ItemCarousel.repositionArrows(carouselEl);
ItemCarousel.refreshArrowStates(carouselEl);
carouselEl.find(".carousel-arrows").on('click', ".arrow-prev:not(.disabled)", function() {
ItemCarousel.slidePrev(carouselEl);
});
carouselEl.find(".carousel-arrows").on('click', ".arrow-next:not(.disabled)", function() {
ItemCarousel.slideNext(carouselEl);
});
},
// Slide the carousel to the left backwards
// ItemCarousel.slidePrev();
slidePrev : function(carouselEl) {
var itemSlideNum = carouselEl.data("slide-items") || carouselEl.data("visible-count");
var itemSlideWidth = ItemCarousel.getItemWidth(carouselEl) * itemSlideNum;
carouselEl.find(".carousel-items").animate({ "margin-left" : "+=" + itemSlideWidth }).data().carouselIndex -= itemSlideNum;
ItemCarousel.refreshArrowStates(carouselEl);
},
// Slide the carousel to the right forwards
// ItemCarousel.slideNext();
slideNext : function(carouselEl) {
var itemSlideNum = carouselEl.data("slide-items") || carouselEl.data("visible-count");
var itemSlideWidth = ItemCarousel.getItemWidth(carouselEl) * itemSlideNum;
carouselEl.find(".carousel-items").animate({ "margin-left" : "-=" + itemSlideWidth }).data().carouselIndex += itemSlideNum;
ItemCarousel.refreshArrowStates(carouselEl);
},
// refresh arrows enabled or disabled based on index
// ItemCarousel.refreshArrowStates();
refreshArrowStates : function(carouselEl) {
var currentIndex = carouselEl.find(".carousel-items").data().carouselIndex;
var visibleCount = carouselEl.data("visible-count");
ItemCarousel.setArrowState(carouselEl, 'prev', currentIndex > 0);
ItemCarousel.setArrowState(carouselEl, 'next', (currentIndex + visibleCount) < ItemCarousel.getItemCount(carouselEl));
},
// Returns the total number of items in the carousel
getItemCount : function(carouselEl) {
return carouselEl.find(".carousel-items > div").length;
},
// Returns the item width to scroll back or forward to slide
getItemWidth : function(carouselEl) {
var itemPadding = carouselEl.data("item-padding");
return carouselEl.find(".carousel-items > div").outerWidth() + itemPadding;
},
// Returns the window width (or minimum width if less than 1100)
getWindowWidth : function() {
return Math.max($(window).width(), 1100);
},
// Set position of right arrow based on carousel width
repositionArrows : function(carouselEl) {
var arrowPadding = carouselEl.data("arrow-padding");
carouselEl.find(".carousel-arrows .arrow-next").css("left", carouselEl.outerWidth() + arrowPadding);
},
// setArrowState('prev', true);
setArrowState : function(carouselEl, arrowType, state) {
var arrowEl = carouselEl.find(".carousel-arrows .arrow-" + arrowType);
if (state) {
var changedSrc = arrowEl.find("img").attr("src").replace(/-off/, '');
arrowEl.removeClass("disabled").find("img").attr("src", changedSrc);
} else {
var changedSrc = arrowEl.find("img").attr("src").replace(/arrow-(\w+?)\./, 'arrow-$1-off.');
arrowEl.addClass("disabled").find("img").attr("src", changedSrc);
}
}
};
