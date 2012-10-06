"use string";


$(document).ready(function() {
	"use strict";
	var elem = $('#calendar'),
		selectedElem = $("#calendar-selected");

	elem.fullCalendar({
		theme : true,
		header: {
			left: 'today',
			right: 'title'
		},
		unselectAuto : false,
		selectable: true,
		selectHelper: true,
		select: function(start, end) {
			var getStr = function(date){
				return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
			};
			selectedElem.text( getStr( start ) + " - " + getStr( end ));
		},
		eventSources: [{
			url : "https://www.google.com/calendar/feeds/sideroad.jpdev%40gmail.com/public/basic",
            className: 'gcal-event'
		},{
			url : "https://www.google.com/calendar/feeds/ja.japanese%23holiday%40group.v.calendar.google.com/public/basic",
            className: 'gcal-event holiday'


		}]
	});

	$("#calendar-next,#calendar-prev").click(function(){
		elem.fullCalendar(this.id.split("-")[1]);
		return false;
	});

	$(".smooth-scroll").click(function(){
		$.smoothScroll({
			offset: this.id.split("-")[1]
		});
	});
	
});

