
$(function() {
// Setup enroll form lightbox
EnrollForm.init()
// Setup carousels
HeroCarousel.init();
ItemCarousel.init($("#events .event-carousel"));
ItemCarousel.init($("#testimonials .quote-carousel"));
// Smooth animated scroll
SmoothScroll.init();
});
// Handles the enroll form behavior, revealing and submitting
EnrollForm = {
// EnrollForm.init();
init : function() {
// Triggered when a user clicks on an enroll button
$('a[data-course-id]:not(.disabled)').click(function(e) {
e.preventDefault();
EnrollForm.show($(this));
});
// Triggered when the enrollment form is submitted
$('#enroll_form').on('ajax:after', function(e) {
EnrollForm.submit($(this));
});
},
// Display the enroll form
show : function(enrollLink) {
var courseName = enrollLink.data("course-id");
var courseTitle = enrollLink.data("course-title");
$('#enroll_form').find('input#enroll_request_course_name').val(courseName).end().find("h2").text(courseTitle)
$("#enroll_form").lightbox_me({
centered: true,
onLoad: function() {
$('#enroll_form').find('input[type=text]:first').focus();
}
});
},
// Success submits form and notifies user
submit : function(enrollForm) {
enrollForm.closest('form').find("input[type=text], textarea").val("")
enrollForm.trigger('close');
$.notify.success('Your request for enrollment has been submitted, thanks!', { autoClose : 3000, close : true });
}
};
// Setup smooth anchor scrolling for links with .scroll class
SmoothScroll = {
init : function() {
$("a.scroll").click(function(event){
var offset = $(this.hash).offset();
if (offset) {
event.preventDefault();
$('html,body').animate({ scrollTop:offset.top }, 500);
}
});
}
};
