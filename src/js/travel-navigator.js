var aaa;
(function(global, $, google){
	"use strict";

	$(global.document).ready(function() {


		//Date initialize
		(function(){
			var elem = $('#calendar'),
				dateTextElem = $("#date");

			elem.fullCalendar({
				theme : true,
				header: {
					left: '',
					right: 'title'
				},
				unselectAuto : false,
				selectable: true,
				selectHelper: true,
				select: function(start, end) {
					var getStr = function(date){
						return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
					};
					dateTextElem.text( getStr( start ) + " - " + getStr( end ));
					$("#nav-date").text( getStr(start) );
					$("#link-area").click();
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
		})();

		//Area initialize
		(function(){
			var autocomplete = new google.maps.places.Autocomplete($("#area-text")[0],{
				componentRestrictions: {country: 'jp'}
			});

			google.maps.event.addListener(autocomplete, 'place_changed', function() {
				var place = autocomplete.getPlace().geometry;
				if(!place) return;
				console.log(place.location);
			});



			// $.ajax({
			// 	url : "https://api.instagram.com/v1/tags/paysage/media/recent?client_id=830cfff8e4404dd8ac7873c2af1f14a6",
			// 	dataType : "jsonp",
			// 	success : function(json){
			// 		var list = json.data;
			// 		list.forEach(function(item){
			// 			$(global.document.body).append("<img src='"+item.images.standard_resolution.url+"'>");
			// 		});
			// 	}
			// });

		})();




		$(".smooth-scroll").click(function(){
			$.smoothScroll({
				offset: $(this).data("href").split("#")[1]
			});
		});

		global.skrollr.init();

		
	});
})(this, jQuery, google);
