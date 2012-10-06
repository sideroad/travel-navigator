$(document).ready(function() {
	var elem = $('#calendar');
	var selectedElem = $("#calendar-selected");
	
	var calendar = elem.fullCalendar({
		theme : true,
		header: {
			left: 'today',
			right: 'title'
		},
		unselectAuto : false,
		selectable: true,
		selectHelper: true,
		select: function(start, end, allDay) {
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
	});
	
});
