/*! skrollr v0.4.13 https://github.com/Prinzhorn/skrollr | free to use under terms of MIT license */
(function(bx,bv,bt){function ao(b){bz=this,b=b||{},a3=b.constants||{};if(b.easing){for(var k in b.easing){ap[k]=b.easing[k]}}bu={beforerender:b.beforerender,render:b.render},bs=b.forceHeight!==!1,aT=b.smoothScrolling!==!1,aR={targetTop:bz.getScrollTop()},bs&&(a5=b.scale||1),ac(a8,[aY],[aW]);if(bs){var j=bv.createElement("div"),f=j.style;f.width="1px",f.position="absolute",f.right=f.top=f.zIndex="0",a6.appendChild(j),a7=function(){a9=0,an(),f.height=a9+a8.clientHeight+"px"}}else{a7=function(){a9=a6.scrollHeight-a8.clientHeight,an(),aP=!0}}return bz.refresh(),ad("resize",a7),function e(){aG(e),al()}(),bz}"use strict";var br=Object.prototype.hasOwnProperty,a8=bv.documentElement,a6=bv.body,a4="rendered",a2="un"+a4,a0="skrollable",aY="skrollr",aW="no-"+aY,aU="linear",aS=1000,aQ=200,aO="start",aM="end",aL="top",aK="center",aJ="bottom",aI="___has_rendered_class",aH="___skrollable_id",aG=bx.requestAnimationFrame;(function(){var a=["ms","moz","webkit","o"],f;for(f=0;f<a.length&&!aG;f++){aG=bx[a[f]+"RequestAnimationFrame"]}var e=0;aG||(aG=function(d){var h=aB(),g=Math.max(0,30-(h-e));bx.setTimeout(function(){d(h+g)},g),e=h+g})})();var aF=/^\s*(.+)\s*$/m,aE=/^data(?:-(_\w+))?(?:-?(-?\d+))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,aD=/:|;/g,aC=/^([a-z\-]+)\[(\w+)\]$/,aA=/-([a-z])/g,az=function(d,c){return c.toUpperCase()},ay=/(:?\+|-)?[\d.]+/g,ax=/rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,aw=/[a-z\-]+-gradient/g,av=/^O|Moz|webkit|ms/,au,at;if(bx.getComputedStyle){var ar=bx.getComputedStyle(a6,null);for(var aq in ar){au=aq.match(av)||+aq==aq&&ar[aq].match(av);if(au){break}}}au=(au||[""])[0],at="-"+au.toLowerCase()+"-",av=bt;var ap={begin:function(){return 0},end:function(){return 1},linear:function(b){return b},quadratic:function(b){return b*b},cubic:function(b){return b*b*b},swing:function(b){return -Math.cos(b*Math.PI)/2+0.5},sqrt:function(b){return Math.sqrt(b)},bounce:function(d){var c;if(d<=0.5083){c=3}else{if(d<=0.8489){c=9}else{if(d<=0.96208){c=27}else{if(d<=0.99981){c=91}else{return 1}}}}return 1-Math.abs(3*Math.cos(d*c*1.028)/c)}};ao.prototype.refresh=function(E){var B,A=!1;E===bt?(A=!0,bw=[],aN=0,E=bv.getElementsByTagName("*")):E=[].concat(E);for(B=0;B<E.length;B++){var x=E[B],u=x,p=[],o=aT;if(!x.attributes){continue}for(var h=0;h<x.attributes.length;h++){var g=x.attributes[h];if(g.name==="data-anchor-target"){u=bv.querySelector(g.value);if(u===null){throw'Unable to find anchor target "'+g.value+'"'}continue}if(g.name==="data-smooth-scrolling"){o=g.value!=="off";continue}var c=g.name.match(aE);if(c!==null){var b=c[1];b=b&&a3[b.substr(1)]||0;var I=(c[2]|0)+b,H=c[3],G=c[4]||H,F={offset:I,props:g.value,element:x};p.push(F),!H||H===aO||H===aM?(F.mode="absolute",H===aM?F.isEnd=!0:(F.frame=I*a5,delete F.offset)):(F.mode="relative",F.anchors=[H,G])}}if(p.length){var D;!A&&aH in x?D=x[aH]:D=x[aH]=aN++,bw[D]={element:x,anchorTarget:u,keyFrames:p,smoothScrolling:o},ac(x,[a0,a2],[a4])}}a7();for(B=0;B<E.length;B++){var C=bw[E[B][aH]];if(C===bt){continue}C.keyFrames.sort(bA),ak(C),ai(C)}return bz},ao.prototype.relativeToAbsolute=function(h,e,m){var l=a8.clientHeight,k=h.getBoundingClientRect(),j=k.top;return e===aJ?j-=l:e===aK&&(j-=l/2),m===aJ?j+=k.height:m===aK&&(j+=k.height/2),j+=bz.getScrollTop(),j+0.5|0},ao.prototype.animateTo=function(f,c){c=c||{};var h=aB(),g=bz.getScrollTop();return aV={startTop:g,topDiff:f-g,targetTop:f,duration:c.duration||aS,startTime:h,endTime:h+(c.duration||aS),easing:ap[c.easing||aU],done:c.done},aV.topDiff||(aV.done&&aV.done.call(bz,!1),aV=bt),bz},ao.prototype.stopAnimateTo=function(){aV&&aV.done&&aV.done.call(bz,!0),aV=bt},ao.prototype.isAnimatingTo=function(){return !!aV},ao.prototype.setScrollTop=function(a){return(bx.skrollr.scrollerInstance||bx).scrollTo(0,a),bz},ao.prototype.getScrollTop=function(){return bx.skrollr.scrollerInstance?bx.skrollr.scrollerInstance.__scrollTop:bx.pageYOffset||a8.scrollTop||a6.scrollTop||0},ao.prototype.on=function(d,c){return bu[d]=c,bz},ao.prototype.off=function(b){return delete bu[b],bz};var an=function(){var h,g,m,l,k,j;for(k=0;k<bw.length;k++){h=bw[k],g=h.anchorTarget,m=h.keyFrames;for(j=0;j<m.length;j++){l=m[j],l.mode==="relative"&&(l.frame=bz.relativeToAbsolute(g,l.anchors[0],l.anchors[1])-l.offset),bs&&!l.isEnd&&l.frame>a9&&(a9=l.frame)}}for(k=0;k<bw.length;k++){h=bw[k],m=h.keyFrames;for(j=0;j<m.length;j++){l=m[j],l.isEnd&&(l.frame=a9-l.offset)}}},am=function(F,E){for(var D=0;D<bw.length;D++){var C=bw[D],B=C.smoothScrolling?F:E,A=C.keyFrames,z=A[0].frame,y=A[A.length-1].frame,x=B<=z,w=B>=y,v,t;if(x||w){var h=A[x?0:A.length-1].props;for(v in h){br.call(h,v)&&(t=af(h[v].value),ae(C.element,v,t))}C[aI]&&(B<z||B>y)&&(ac(C.element,[a2],[a4]),C[aI]=!1);continue}C[aI]||(ac(C.element,[a4],[a2]),C[aI]=!0);for(var g=0;g<A.length-1;g++){if(B>=A[g].frame&&B<=A[g+1].frame){var d=A[g],H=A[g+1];for(v in d.props){if(br.call(d.props,v)){var G=(B-d.frame)/(H.frame-d.frame);G=d.props[v].easing(G),t=ag(d.props[v].value,H.props[v].value,G),t=af(t),ae(C.element,v,t)}}break}}}},al=function(){var j=bz.getScrollTop(),c,o=aB(),n;if(aV){o>=aV.endTime?(j=aV.targetTop,c=aV.done,aV=bt):(n=aV.easing((o-aV.startTime)/aV.duration),j=aV.startTop+n*aV.topDiff|0),bz.setScrollTop(j)}else{var m=aR.targetTop-j;m&&(aR={startTop:aZ,topDiff:j-aZ,targetTop:j,startTime:aX,endTime:aX+aQ}),o<=aR.endTime&&(n=ap.sqrt((o-aR.startTime)/aQ),j=aR.startTop+n*aR.topDiff|0)}j<0&&(j=0);if(aP||aZ!==j){a1=j>=aZ?"down":"up",aP=!1;var l={curTop:j,lastTop:aZ,maxTop:a9,direction:a1},k=bu.beforerender&&bu.beforerender.call(bz,l);k!==!1&&(am(j,bz.getScrollTop()),aZ=j,bu.render&&bu.render.call(bz,l)),c&&c.call(bz,!1)}aX=o},ak=function(k){for(var j=0;j<k.keyFrames.length;j++){var q=k.keyFrames[j],p=q.props.split(aD),o,n,m;q.props={};for(var l=0;l<p.length-1;l+=2){o=ab(p[l]),n=ab(p[l+1]),m=o.match(aC),m!==null?(o=m[1],m=m[2]):m=aU,n=n.indexOf("!")?aj(n):[n.slice(1)],q.props[o]={value:n,easing:ap[m]}}}},aj=function(d){var c=[];return ax.lastIndex=0,d=d.replace(ax,function(b){return b.replace(ay,function(e){return e/255*100+"%"})}),aw.lastIndex=0,d=d.replace(aw,function(b){return at+b}),d=d.replace(ay,function(b){return c.push(+b),"?"}),c.unshift(d),c},ai=function(e){var d={},f;for(f=0;f<e.keyFrames.length;f++){ah(e.keyFrames[f],d)}d={};for(f=e.keyFrames.length-1;f>=0;f--){ah(e.keyFrames[f],d)}},ah=function(e,d){var f;for(f in d){br.call(e.props,f)||(e.props[f]=d[f])}for(f in e.props){d[f]=e.props[f]}},ag=function(g,f,k){if(g.length!==f.length){throw"Can't interpolate between \""+g[0]+'" and "'+f[0]+'"'}var j=[g[0]];for(var h=1;h<g.length;h++){j[h]=g[h]+(f[h]-g[h])*k}return j},af=function(d){var c=1;return d[0].replace(/\?/g,function(){return d[c++]})},ae=function(h,g,m){var l=h.style;g=g.replace(aA,az).replace("-","");if(g==="zIndex"){l[g]=""+(m|0)}else{if(g==="float"){l.styleFloat=l.cssFloat=m}else{try{l[au+g.slice(0,1).toUpperCase()+g.slice(1)]=m,l[g]=m}catch(k){}}}if(by.setStyle){for(var j=0;j<by.setStyle.length;j++){by.setStyle[j].call(bz,h,g,m)}}},ad=function(a,d){bx.addEventListener?bx.addEventListener(a,d,!1):bx.attachEvent("on"+a,d)},ac=function(a,o,n){var m="className";bx.SVGElement&&a instanceof bx.SVGElement&&(a=a[m],m="baseVal");var l=a[m];for(var k=0;k<o.length;k++){aa(l).indexOf(aa(o[k]))===-1&&(l+=" "+o[k])}for(var j=0;j<n.length;j++){l=aa(l).replace(aa(n[j])," ")}a[m]=ab(l)},ab=function(b){return b.replace(aF,"$1")},aa=function(b){return" "+b+" "},aB=Date.now||function(){return +(new Date)},bA=function(d,c){return d.frame-c.frame},bz,by={},bw=[],bu,bs,a9=0,a7,a5=1,a3,a1="down",aZ=-1,aX=aB(),aV,aT,aR,aP,aN=0;bx.skrollr={init:function(b){return bz||new ao(b)},plugin:function(d,c){by[d]?by[d].push(c):by[d]=[c]},VERSION:"0.4.13"}})(window,document);var layers=document.getElementsByTagName("div");var activeLayer=0;var animateUpSettings={duration:200,done:function(){document.body.style.overflow="auto";location.hash="#"+layers[activeLayer].id}};var animateDownSettings={duration:2000,easing:"sqrt",done:animateUpSettings.done};var s=skrollr.init({render:function(b){if(this.isAnimatingTo()){return}var a=this.relativeToAbsolute(layers[activeLayer],"top","top");if(this.getScrollTop()===a){return}document.body.style.overflow="hidden";this.setScrollTop(a);if(b.direction==="down"){if(activeLayer+1<layers.length){activeLayer++;var c=this.relativeToAbsolute(layers[activeLayer],"top","top");this.animateTo(c,animateDownSettings)}}else{if(activeLayer>0){activeLayer--;var c=this.relativeToAbsolute(layers[activeLayer],"top","top");this.animateTo(c,animateUpSettings)}}}});var nav=document.getElementById("nav");var links=nav.getElementsByTagName("a");nav.onclick=function(f){f=f||window.event;var d=f.target||f.srcElement;if(d.tagName!=="A"){return}var g=d.href.match(/#(.+)$/)[1];var a=document.getElementById(g);if(!a){return}document.body.style.overflow="hidden";var c=s.relativeToAbsolute(a,"top","top");if(c>s.getScrollTop()){s.animateTo(c,animateDownSettings)}else{s.animateTo(c,animateUpSettings)}for(var b=0;b<links.length;b++){if(d===links[b]){activeLayer=b;break}}if(f.preventDefault){f.preventDefault()}f.returnValue=false;return false};if(location.hash.indexOf("#")>-1){for(var i=0;i<layers.length;i++){if(location.hash.indexOf("#"+layers[i].id)>-1){activeLayer=i;break}}};