/*! skrollr v0.4.13 https://github.com/Prinzhorn/skrollr | free to use under terms of MIT license */

(function(a,b,c){function L(a){ba=this,a=a||{},bi=a.constants||{};if(a.easing)for(var c in a.easing)K[c]=a.easing[c];bd={beforerender:a.beforerender,render:a.render},be=a.forceHeight!==!1,bn=a.smoothScrolling!==!1,bo={targetTop:ba.getScrollTop()},be&&(bh=a.scale||1),X(e,[j],[k]);if(be){var d=b.createElement("div"),g=d.style;g.width="1px",g.position="absolute",g.right=g.top=g.zIndex="0",f.appendChild(d),bg=function(){bf=0,M(),g.height=bf+e.clientHeight+"px"}}else bg=function(){bf=f.scrollHeight-e.clientHeight,M(),bp=!0};return ba.refresh(),W("resize",bg),function h(){v(h),O()}(),ba}"use strict";var d=Object.prototype.hasOwnProperty,e=b.documentElement,f=b.body,g="rendered",h="un"+g,i="skrollable",j="skrollr",k="no-"+j,l="linear",m=1e3,n=200,o="start",p="end",q="top",r="center",s="bottom",t="___has_rendered_class",u="___skrollable_id",v=a.requestAnimationFrame;(function(){var b=["ms","moz","webkit","o"],c;for(c=0;c<b.length&&!v;c++)v=a[b[c]+"RequestAnimationFrame"];var d=0;v||(v=function(b){var c=$(),e=Math.max(0,30-(c-d));a.setTimeout(function(){b(c+e)},e),d=c+e})})();var w=/^\s*(.+)\s*$/m,x=/^data(?:-(_\w+))?(?:-?(-?\d+))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,y=/:|;/g,z=/^([a-z\-]+)\[(\w+)\]$/,A=/-([a-z])/g,B=function(a,b){return b.toUpperCase()},C=/(:?\+|-)?[\d.]+/g,D=/rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,E=/[a-z\-]+-gradient/g,F=/^O|Moz|webkit|ms/,G,H;if(a.getComputedStyle){var I=a.getComputedStyle(f,null);for(var J in I){G=J.match(F)||+J==J&&I[J].match(F);if(G)break}}G=(G||[""])[0],H="-"+G.toLowerCase()+"-",F=c;var K={begin:function(){return 0},end:function(){return 1},linear:function(a){return a},quadratic:function(a){return a*a},cubic:function(a){return a*a*a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5},sqrt:function(a){return Math.sqrt(a)},bounce:function(a){var b;if(a<=.5083)b=3;else if(a<=.8489)b=9;else if(a<=.96208)b=27;else if(a<=.99981)b=91;else return 1;return 1-Math.abs(3*Math.cos(a*b*1.028)/b)}};L.prototype.refresh=function(a){var d,e=!1;a===c?(e=!0,bc=[],bq=0,a=b.getElementsByTagName("*")):a=[].concat(a);for(d=0;d<a.length;d++){var f=a[d],j=f,k=[],l=bn;if(!f.attributes)continue;for(var m=0;m<f.attributes.length;m++){var n=f.attributes[m];if(n.name==="data-anchor-target"){j=b.querySelector(n.value);if(j===null)throw'Unable to find anchor target "'+n.value+'"';continue}if(n.name==="data-smooth-scrolling"){l=n.value!=="off";continue}var q=n.name.match(x);if(q!==null){var r=q[1];r=r&&bi[r.substr(1)]||0;var s=(q[2]|0)+r,t=q[3],v=q[4]||t,w={offset:s,props:n.value,element:f};k.push(w),!t||t===o||t===p?(w.mode="absolute",t===p?w.isEnd=!0:(w.frame=s*bh,delete w.offset)):(w.mode="relative",w.anchors=[t,v])}}if(k.length){var y;!e&&u in f?y=f[u]:y=f[u]=bq++,bc[y]={element:f,anchorTarget:j,keyFrames:k,smoothScrolling:l},X(f,[i,h],[g])}}bg();for(d=0;d<a.length;d++){var z=bc[a[d][u]];if(z===c)continue;z.keyFrames.sort(_),P(z),R(z)}return ba},L.prototype.relativeToAbsolute=function(a,b,c){var d=e.clientHeight,f=a.getBoundingClientRect(),g=f.top;return b===s?g-=d:b===r&&(g-=d/2),c===s?g+=f.height:c===r&&(g+=f.height/2),g+=ba.getScrollTop(),g+.5|0},L.prototype.animateTo=function(a,b){b=b||{};var d=$(),e=ba.getScrollTop();return bm={startTop:e,topDiff:a-e,targetTop:a,duration:b.duration||m,startTime:d,endTime:d+(b.duration||m),easing:K[b.easing||l],done:b.done},bm.topDiff||(bm.done&&bm.done.call(ba,!1),bm=c),ba},L.prototype.stopAnimateTo=function(){bm&&bm.done&&bm.done.call(ba,!0),bm=c},L.prototype.isAnimatingTo=function(){return!!bm},L.prototype.setScrollTop=function(b){return(a.skrollr.scrollerInstance||a).scrollTo(0,b),ba},L.prototype.getScrollTop=function(){return a.skrollr.scrollerInstance?a.skrollr.scrollerInstance.__scrollTop:a.pageYOffset||e.scrollTop||f.scrollTop||0},L.prototype.on=function(a,b){return bd[a]=b,ba},L.prototype.off=function(a){return delete bd[a],ba};var M=function(){var a,b,c,d,e,f;for(e=0;e<bc.length;e++){a=bc[e],b=a.anchorTarget,c=a.keyFrames;for(f=0;f<c.length;f++)d=c[f],d.mode==="relative"&&(d.frame=ba.relativeToAbsolute(b,d.anchors[0],d.anchors[1])-d.offset),be&&!d.isEnd&&d.frame>bf&&(bf=d.frame)}for(e=0;e<bc.length;e++){a=bc[e],c=a.keyFrames;for(f=0;f<c.length;f++)d=c[f],d.isEnd&&(d.frame=bf-d.offset)}},N=function(a,b){for(var c=0;c<bc.length;c++){var e=bc[c],f=e.smoothScrolling?a:b,i=e.keyFrames,j=i[0].frame,k=i[i.length-1].frame,l=f<=j,m=f>=k,n,o;if(l||m){var p=i[l?0:i.length-1].props;for(n in p)d.call(p,n)&&(o=U(p[n].value),V(e.element,n,o));e[t]&&(f<j||f>k)&&(X(e.element,[h],[g]),e[t]=!1);continue}e[t]||(X(e.element,[g],[h]),e[t]=!0);for(var q=0;q<i.length-1;q++)if(f>=i[q].frame&&f<=i[q+1].frame){var r=i[q],s=i[q+1];for(n in r.props)if(d.call(r.props,n)){var u=(f-r.frame)/(s.frame-r.frame);u=r.props[n].easing(u),o=T(r.props[n].value,s.props[n].value,u),o=U(o),V(e.element,n,o)}break}}},O=function(){var a=ba.getScrollTop(),b,d=$(),e;if(bm)d>=bm.endTime?(a=bm.targetTop,b=bm.done,bm=c):(e=bm.easing((d-bm.startTime)/bm.duration),a=bm.startTop+e*bm.topDiff|0),ba.setScrollTop(a);else{var f=bo.targetTop-a;f&&(bo={startTop:bk,topDiff:a-bk,targetTop:a,startTime:bl,endTime:bl+n}),d<=bo.endTime&&(e=K.sqrt((d-bo.startTime)/n),a=bo.startTop+e*bo.topDiff|0)}a<0&&(a=0);if(bp||bk!==a){bj=a>=bk?"down":"up",bp=!1;var g={curTop:a,lastTop:bk,maxTop:bf,direction:bj},h=bd.beforerender&&bd.beforerender.call(ba,g);h!==!1&&(N(a,ba.getScrollTop()),bk=a,bd.render&&bd.render.call(ba,g)),b&&b.call(ba,!1)}bl=d},P=function(a){for(var b=0;b<a.keyFrames.length;b++){var c=a.keyFrames[b],d=c.props.split(y),e,f,g;c.props={};for(var h=0;h<d.length-1;h+=2)e=Y(d[h]),f=Y(d[h+1]),g=e.match(z),g!==null?(e=g[1],g=g[2]):g=l,f=f.indexOf("!")?Q(f):[f.slice(1)],c.props[e]={value:f,easing:K[g]}}},Q=function(a){var b=[];return D.lastIndex=0,a=a.replace(D,function(a){return a.replace(C,function(a){return a/255*100+"%"})}),E.lastIndex=0,a=a.replace(E,function(a){return H+a}),a=a.replace(C,function(a){return b.push(+a),"?"}),b.unshift(a),b},R=function(a){var b={},c;for(c=0;c<a.keyFrames.length;c++)S(a.keyFrames[c],b);b={};for(c=a.keyFrames.length-1;c>=0;c--)S(a.keyFrames[c],b)},S=function(a,b){var c;for(c in b)d.call(a.props,c)||(a.props[c]=b[c]);for(c in a.props)b[c]=a.props[c]},T=function(a,b,c){if(a.length!==b.length)throw"Can't interpolate between \""+a[0]+'" and "'+b[0]+'"';var d=[a[0]];for(var e=1;e<a.length;e++)d[e]=a[e]+(b[e]-a[e])*c;return d},U=function(a){var b=1;return a[0].replace(/\?/g,function(){return a[b++]})},V=function(a,b,c){var d=a.style;b=b.replace(A,B).replace("-","");if(b==="zIndex")d[b]=""+(c|0);else if(b==="float")d.styleFloat=d.cssFloat=c;else try{d[G+b.slice(0,1).toUpperCase()+b.slice(1)]=c,d[b]=c}catch(e){}if(bb.setStyle)for(var f=0;f<bb.setStyle.length;f++)bb.setStyle[f].call(ba,a,b,c)},W=function(b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},X=function(b,c,d){var e="className";a.SVGElement&&b instanceof a.SVGElement&&(b=b[e],e="baseVal");var f=b[e];for(var g=0;g<c.length;g++)Z(f).indexOf(Z(c[g]))===-1&&(f+=" "+c[g]);for(var h=0;h<d.length;h++)f=Z(f).replace(Z(d[h])," ");b[e]=Y(f)},Y=function(a){return a.replace(w,"$1")},Z=function(a){return" "+a+" "},$=Date.now||function(){return+(new Date)},_=function(a,b){return a.frame-b.frame},ba,bb={},bc=[],bd,be,bf=0,bg,bh=1,bi,bj="down",bk=-1,bl=$(),bm,bn,bo,bp,bq=0;a.skrollr={init:function(a){return ba||new L(a)},plugin:function(a,b){bb[a]?bb[a].push(b):bb[a]=[b]},VERSION:"0.4.13"}})(window,document);;
//http://detectmobilebrowsers.com/
	(function(a) {
		if(/android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|playbook|silk/i.test(a)
		||
		/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
		{
			//Add skrollr mobile on mobile devices.
			document.write('<script type="text/javascript" src="../dist/skrollr.mobile.min.js"><\/script>');
		}
	})(navigator.userAgent||navigator.vendor||window.opera);;
window.onload = function() {
		skrollr.init({
			forceHeight: false,
			easing: {
				vibrate: function(p) {
					return Math.sin(p * 10 * Math.PI);
				}
			}
		});
	}