(function(global, document, $, google, _ ){
	"use strict";

	//Ajax jack mockjax
	$.mockjax({
		url : "http://search.travel.rakuten.co.jp/*",
		proxy : ".procedure/proxy.searchApi.json"
	});

	$.mockjax({
		url : "/share/HOTEL/*/*_gallery.js",
		proxy : ".procedure/proxy.gallery.js"
	});


	$(function() {
		var body = $(document.body),
			param = {
				checkin: undefined,
				checkout: undefined,
				largeClassCode: "japan",
				middleClassCode: "",
				smallClassCode: undefined,
				detailClassCode: "",
				adult: 2
			},
			search,
			skr = global.skrollr.init({
			smoothScrolling : true,
			render:  function(act){
				var item = body.find(".rendered[data-validate]"),
					arr;

				if(!item.length) return;
				arr = item.data("validate").split("-");
				if( act.direction=="down" &&
					act.curTop > arr[1] &&
					param[ arr[0] ] === undefined ){
					this.stopAnimateTo();
					this.setScrollTop(arr[1]);
				}
			}
		});
		global.param = param;

		$(".smooth-scroll").click(function(){
			$.smoothScroll({
				offset: $(this).data("href").split("#")[1],
				speed: 800
			});
			// smooth scroll is good animation more then below.
			//skr.animateTo($(this).data("href").split("#")[1]);
		});


		//Date initialize
		(function(){
			var elem = $('#calendar');

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
					param.checkin = getStr(start);
					param.checkout = getStr(end);
					$("#link-date").text( getStr( start ) + " - " + getStr( end ) );
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

			/*Travel area mapping*/
			var group = global.domesticAreaMaster.name.group,
				name = global.domesticAreaMaster.name.normal,
				map = global.domesticAreaMaster.map.normal,
				bg = $("#s-1500-bg"),
				areaPhotoTemplate = "<div id='${id}' class='area-photo ${className}' data-val='${val}' data-render='${this}.each'>${title}</div>",
				selectArea = function(){
					/*
						id
						0: "area"
						1: class
						2: code
						3: all code
					*/
					var id = this.id.split("_"),
						next = {
							japan : 'group',
							group: 'middle',
							middle: 'small',
							small : 'detail',
							detail: 'dummy'
						}[id[1]],
						area = map[next][
							next == 'detail' ? id[3].split("-").slice(1,3).join("-") : id[2]
						];
					console.log(id);
					param[ id[1]+"ClassCode" ] = id[2];
					
					$("#link-area").text( $(this).text());

					//Search!!
					if(!area) {
						search();
						return;
					}

					//Change back ground
					bg.transition({
						x : "-100%",
						rotateX : "180deg",
						opacity: 0
					}, function(){
						bg.css({
								x : "100%",
								rotateX : "360deg"
							})
							.removeClass("area-"+id[2])
							.addClass("area-"+id[3])
							.transition({
								x : "0%",
								rotateX : "0deg",
								opacity : 0.3
							});
					});

					$(this).clone().appendTo("#area-photo-selected").css({
						rotateY : "360deg",
						opacity: 0
					}).transition({
						rotateY : "0deg",
						opacity: 0.7
					});


					$("#area-photo-container").find(".area-photo").transition({
						rotateY : "360deg",
						opacity: 0
					}, function(){
						this.remove();
						if(!area.length) return;
						var data = _.map(
							_.filter(area, function(item){
								return !/-1/.test( item );
							}), function(key){
								// var childId = key+(next != "group" ? "_"+id[3]+"-"+key : "");
								var childId = key+ "_"+id[3]+"-"+key;
								return {
									id : "area_"+next+"_"+childId,
									className : "area-"+next + " "+ childId,
									val: key,
									title: name[id[3]+"-"+key]
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
								opacity: 0.7
							});
						area = [];
					});
				},
				autocomplete;

			//Adjust map specification
			map.group = {
				japan : Object.keys( map.middle )
			};
			(function(){
				var keys = Object.keys( map.middle );
				keys.forEach(function(key){
					name["japan-"+key] = group[key];
					map.middle[key].forEach(function(code){
						name["japan-"+key+"-"+code] = name[code];
						map.small[code].forEach(function(ccode){
							name["japan-"+key+"-"+code+"-"+ccode] = name[code+ "-" +ccode];
							(map.detail[code+"-"+ccode]||[]).forEach(function(cccode){
								name["japan-"+key+"-"+code+"-"+ccode+"-"+cccode] = name[code+"-"+ccode+"-"+cccode];
							});
						});
					});
				});
			})();

			map.dummy = {};
			//Izu Hakone
			delete group["5"];
			$.extend( name, group );

			$("#area-photo-selected").render( areaPhotoTemplate, [{
				id : "area_japan_japan_japan",
				title: "Japan",
				val : "",
				className : "area-japan"
			}]);

			$("#area-photo-container").render( areaPhotoTemplate,
				_.map(group, function(val, key){
					return {
						id : "area_group_"+key+"_japan-"+key,
						title : val,
						val : "",
						className : "area-group area-"+key
					};
				})
			);


			$("#area-photo-container").delegate(".area-photo", "click", selectArea );

			$("#area-photo-selected").delegate(".area-photo", "click", function(){
				var elem = $(this);

				elem.nextAll().remove();
				selectArea.call( this );
				elem.remove();

			});

			//map-pin
			$("#area-text").focus(function(){
				$("#area-photo-selected, #area-photo-container").transition({
					scale: 0
				});

			}).blur(function(){
				$("#area-photo-selected, #area-photo-container").transition({
					scale: 1
				});
			});

			autocomplete = new google.maps.places.Autocomplete($("#area-text")[0],{
				componentRestrictions: {country: 'jp'}
			});

			//Latitude
			$("#map-pin").click(function(){
				var elem = $(this),
					suggest = $(".pac-container");

				if( elem.hasClass("selected") ){
					elem.removeClass("selected");
					autocomplete.unbindAll();
					suggest.removeClass("show");
				} else{
					elem.addClass("selected");
					/* Google API */

					suggest.addClass("show");
					google.maps.event.addListener(autocomplete, 'place_changed', function() {
						var place = autocomplete.getPlace().geometry;
						if(!place) return;

						param.smallClassCode = "";
						param.latitude = place.location.Xa;
						param.longitude = place.location.Ya;
						console.log("latlng search!", param);
						search();

					});
				}
			});
			

		})();

		//Search!!
		(function(){
			global.search = search = function(){
				var calls = [],
					imgLoad = function(src){
						var dfd = $.Deferred(),
							img = new global.Image();
						img.src=src;
						img.onload = function(){
							dfd.resolve();
						};
						return dfd.promise();
					},
					start = 2500,
					offset = start,
					maxPlanLength = 130,
					hotelElems;

				//Initialize
				$("#link-result").click();

				$("#result")
					.delegate(".next-hotel", "click", function(){
						var to =  $(this).parents(".hotel").next().data("anc");
						if(!to) return false;
						$.smoothScroll({
							offset: to
						});
						return false;
					})
					.delegate(".prev-hotel", "click", function(){
						var to = $(this).parents(".hotel").prev().data("anc");
						if(!to) return false;
						$.smoothScroll({
							offset: to
						});
						return false;
					})
					.delegate(".room-photo-more", "click", function(){
						var elem = $(this).parents(".right"),
						    key = Object.keys( elem.data())[0],
						    data = elem.data(key);
						elem.animate({
							left: "20%",
							width: "72%"
						});

						elem.attr("data-"+key, data.replace(/left[^%]+%/, "left:20%"));
						$(this).addClass("room-photo-close")
						       .removeClass("room-photo-more").text("Close");
						skr.refresh(elem[0]);

					})
					.delegate(".room-photo-close", "click", function(){
						var elem = $(this).parents(".right"),
						    key = Object.keys( elem.data())[0],
						    data = elem.data(key);
						elem.animate({
							left: "67%",
							width: "33%"
						});

						elem.attr("data-"+key, data.replace(/left[^%]+%/, "left:67%"));
						$(this).addClass("room-photo-more")
						       .removeClass("room-photo-close").text("More");
						skr.refresh(elem[0]);

					})
					.html("");

				$.ajax({
					url : "http://search.travel.rakuten.co.jp/ds/api/apiVacant",
					data : param,
					dataType: "json",
					success:  function(json){
						var hotels = json.Body.hotel;


						hotels.forEach(function(item){
							var no = item.hotelNo;

							calls.push(
								$.ajax({
									url : "/share/HOTEL/"+no+"/"+no+"_gallery.js",
									data : {no:no},
									dataType: "json"
								})
							);
							
							item.interiors = [item.roomImageUrl];
							item.room.forEach(function(room){
								var contents = room.planContents || room.remark || "";
								room.planContents = (contents.length >= maxPlanLength) ?
									contents.substr( 0, maxPlanLength ) + "..." :
									contents;

								room.planName = room.planName || room.roomName;
								room.total = "￥"+room.dailyCharge[0].total;

							});
							item.rate = parseInt( (Math.round( item.reviewAverage * 2 ) / 2 ) * 10, 10);

						});
						$.when.apply($, calls)
							.done(function(){
								var responses = Array.prototype.slice.apply( arguments ),
									imgCalls = [];
								responses.forEach(function( item, i ){
									var data = item[0].DATA;

									data.forEach(function( item ){
										imgCalls.push( imgLoad( item.PATH ) );
										hotels[i].interiors.push(item.PATH);
									});
								});

								$.when.apply($, imgCalls).done(function(){
									var result = $("<div></div>");
									console.log(hotels);
									result.render({
										url : "ren/search-item.ren",
										success : function(){
											var elem = $("#result").html("");
											hotelElems = result.find(".hotel");
											hotelElems.each(function(){
												var hotel = $(this),
													span = parseInt(hotel.find(".room-photo").length / 2 , 10) * 150,
													dh = $(document.body).height();

												hotel.attr("data-"+(offset), "left:50px;top:100%");
												hotel.attr("data-"+(offset+500),       "top:0%");
												hotel.attr("data-"+(offset+span-500),   "top:0%");
												hotel.attr("data-"+(offset+span),  "top:-100%");

												hotel.find(".right").each(function(){
													var item = $(this);
													item.attr("data-"+(offset), "left:67%;top:"+dh+"px");
													item.attr("data-"+(offset+500), "top:0px");
													item.attr("data-"+(offset+span), "top:-"+span+"px");
												});
												hotel.data("anc", (offset+500));
												offset+=span-500;

											}).appendTo(elem);

											$("#result").hide();
											skr.refresh();
											$.smoothScroll({
												offset : start+501
											});
											$("#result").show();

										}
									}, hotels);



								});
							});
					}
				});



			};

		})();
		
	});
})(this, this.document, jQuery, google, _);
