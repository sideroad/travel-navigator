(function(global, document, $, google, _ ){
	"use strict";

	$(function() {


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

			/* Google API */
			// var autocomplete = new google.maps.places.Autocomplete($("#area-text")[0],{
			//	componentRestrictions: {country: 'jp'}
			// });

			// google.maps.event.addListener(autocomplete, 'place_changed', function() {
			//	var place = autocomplete.getPlace().geometry;
			//	if(!place) return;
			//	console.log(place.location);
			// });

			/*Travel area mapping*/
			var group = global.domesticAreaMaster.name.group,
				name = global.domesticAreaMaster.name.normal,
				map = global.domesticAreaMaster.map.normal,
				areaPhotoTemplate = "<div id='${id}' class='area-photo ${className}' data-val='${val}' data-render='${this}.each'>${title}</div>";

			$("#area-photo-container").render( areaPhotoTemplate,
				_.map(group, function(val, key){
					return {
						id : "area_group_"+key,
						title : val,
						className : "area-group"
					};
				})
			);

			$("#area-photo-container").delegate(".area-photo", "click", function(){
				var id = this.id.split("_"),
					next = {
						group: 'middle',
						middle: 'small',
						small : 'detail'
					}[id[1]],
					area = map[next][id[3]?id[3]:id[2]];
				if(!area) {
					//Search!!!!
					console.log("Search! by ", id);
				}

				$(this).clone().appendTo("#area-photo-selected").transition({
					rotateY : "360deg",
					opacity: 1
				});

				$("#area-photo-container").find(".area-photo").transition({
					rotateY : "360deg",
					opacity: 0
				}, function(){
					this.remove();
					if(!area.length) return;
					var data = _.map(
							_.filter(area, function(item){
								return !/\d/.test( item );
							}), function(key){
								return {
									id : "area_"+next+"_"+key+"_"+(id[3]?id[3]+"-":"")+key,
									className : "area-"+next,
									val: key,
									title: name[(id[3]?id[3]+"-":"")+key]
								};

							}
						);

					$("#area-photo-container")
						.render( areaPhotoTemplate,data)
						.css({
							css : "360deg",
							opacity: 0
						}).transition({
							rotateY: "0deg",
							opacity: 1
						});
					area = [];
				});
			});

			$("#area-photo-selected").delegate(".area-photo", "click", function(){


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
})(this, this.document, jQuery, google, _);
