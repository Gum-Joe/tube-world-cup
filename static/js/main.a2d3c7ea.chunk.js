(this["webpackJsonptube-world-cup"]=this["webpackJsonptube-world-cup"]||[]).push([[0],{194:function(e,t,s){},196:function(e,t,s){},314:function(e,t,s){"use strict";s.r(t);var n=s(4),a=s(1),o=s.n(a),r=s(166),i=s.n(r),c=(s(194),s(72)),l=s(50),d=s.n(l),h=s(97),j=s(168),b=s(169),u=s(185),x=s(184),m=(s(196),s(328)),p=s(329),f=s(330),v=s(331),O=s(36),g=s(70),k=s(333),w=s(335),y=s(344),L=s(336),N=s(339),C=s(338),S=s(342),z=s(337),T=s(71),F={Bakerloo:"bakerloo",Northern:"northern",Jubilee:"jubilee","TfL Rail":"tflrail",Central:"central",District:"district",Circle:"circle",Thameslink:"thameslink","H&C":"handc",Victoria:"victoria",Metropolitan:"metropolitan",Trams:"trams",Overground:"overground",CableCar:"cablecar",DLR:"dlr",Piccadilly:"picadilly","???":"unknown"},D={"Bakerloo Line":"Bakerloo","Northern Line":"Northern","Jubilee Line":"Jubilee","TfL Rail":"TfL Rail","Central Line":"Central","District Line":"District","Circle Line":"Circle",Thameslink:"Thameslink","Hammersmith & City Line":"H&C","Victoria Line":"Victoria","Metropolitan Line":"Metropolitan",Trams:"Trams","London Overground":"Overground","Cable Car":"CableCar",DLR:"DLR","Piccadilly Line":"Piccadilly"},P={Bakerloo:"#B36305",Northern:"#000000",Jubilee:"#A0A5A9","TfL Rail":"rgb(0, 25, 168)",Central:"rgb(220, 36, 31)",District:"rgb(0, 125, 50)",Circle:"rgb(255, 211, 41)",Thameslink:"#E9438D","H&C":"rgb(244, 169, 190)",Victoria:"rgb(0, 152, 216)",Metropolitan:"rgb(155, 0, 88)",Trams:"rgb(0, 189, 25)",Overground:"rgb(239, 123, 16)",CableCar:"rgb(220, 36, 31)",DLR:"rgb(0, 175, 173)",Piccadilly:"rgb(0, 25, 168)"},R="https://devnull-as-a-service.com/dev/null",V=[["Northern","Jubilee",R,"false","Waterloo"],["District","Thameslink",R,"false","Blackfriars"],["Victoria","Metropolitan",R,"false","King's Cross"],["Overground","DLR",R,"false","Shadwell"]],W={quartera1:"Waterloo",quartera2:"Blackfriars"},_=Object(k.a)("zoom","voronoi"),A=function(e){Object(u.a)(s,e);var t=Object(x.a)(s);function s(e){var n;return Object(j.a)(this,s),(n=t.call(this,e)).state={resultsKnockout:[],resultsQFinals:[],resultsHistories:{}},n}return Object(b.a)(s,[{key:"updateHistory",value:function(){var e=Object(h.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.davwheat.dev/fullhistory");case 2:return t=e.sent,e.t0=this,e.next=6,t.json();case 6:e.t1=e.sent,e.t2={resultsHistories:e.t1},e.t0.setState.call(e.t0,e.t2);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.updateResults(),this.updateHistory();var e=this.updateResults.bind(this);setInterval((function(){return e()}),2e4);var t=this.updateHistory.bind(this);setInterval((function(){return t()}),6e4)}},{key:"getUpdates",value:function(){var e=Object(h.a)(d.a.mark((function e(t){var s,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.davwheat.dev/getpolls");case 2:return s=e.sent,e.next=5,s.json();case 5:return n=e.sent,e.abrupt("return",n.filter((function(e){return e.game.includes(t)})).map((function(e){return console.log(D[e.poll.options[0].label]),{gameName:e.game,one:{name:D[e.poll.options[0].label]||"???",votes:e.poll.options[0].votes,className:F[D[e.poll.options[0].label]||"???"]},two:{name:D[e.poll.options[1].label]||"???",votes:e.poll.options[1].votes,className:F[D[e.poll.options[1].label]||"???"]},winner:e.poll.options[0].votes>e.poll.options[1].votes?1:2,link:"https://twitter.com/geofftech/status/"+e.tweetId,today:"open"===e.poll.voting_status,venue:W[e.game]||"???"}})));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getUpdatesOld",value:function(){var e=Object(h.a)(d.a.mark((function e(t){var s,n,a,o,r,i,c,l;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=0,n=0,a=0,e.prev=3,t[2]===R){e.next=18;break}return e.next=7,fetch(t[2]);case 7:return o=e.sent,e.next=10,o.text();case 10:r=e.sent,i=r.split("\n"),c=i[0].match(/^\d+|\d+\b|\d+(?=\w)/g)||["0"],s=parseInt(c[0],10),c.length>1&&"1"===c[1]&&(a=1),l=i[1].match(/^\d+|\d+\b|\d+(?=\w)/g)||["0"],n=parseInt(l[0],10),l.length>1&&"1"===l[1]&&(a=2);case 18:e.next=23;break;case 20:e.prev=20,e.t0=e.catch(3),console.log(e.t0.stack);case 23:return e.prev=23,e.abrupt("return",{gameName:"unknown",one:{name:t[0],votes:s,className:F[t[0]]},two:{name:t[1],votes:n,className:F[t[1]]},winner:a,link:t[2].split("url=")[1],today:"true"===t[3],venue:t[4]});case 26:case"end":return e.stop()}}),e,null,[[3,20,23,26]])})));return function(t){return e.apply(this,arguments)}}()},{key:"updateResults",value:function(){var e=this;console.log("UPDATED"),this.getUpdates("knockout").then((function(t){return e.setState({resultsKnockout:t})}));var t=V.map(this.getUpdatesOld);Promise.all(t).then((function(t){e.getUpdates("quarter").then((function(s){e.setState({resultsQFinals:[].concat(Object(c.a)(s),Object(c.a)(t))})}))}))}},{key:"render",value:function(){var e=this;return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsxs)("div",{className:"header",children:[Object(n.jsx)("h1",{children:"Tube Lines World Cup:"}),Object(n.jsx)("h5",{children:"Updated every 20 secs. Please view in landscape."}),Object(n.jsx)("h6",{children:"Note: if no votes are showing, the API this site uses has gone down and should be back up in a few mins."})]}),Object(n.jsx)("h3",{children:"Knockout stage games:"}),Object(n.jsxs)(m.a,{striped:!0,bordered:!0,responsive:!0,children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{children:"Link"}),Object(n.jsx)("th",{children:"Line 1"}),Object(n.jsx)("th",{children:"Votes"}),Object(n.jsx)("th",{children:"%"}),Object(n.jsx)("th",{children:"Line 2"}),Object(n.jsx)("th",{children:"Votes"}),Object(n.jsx)("th",{children:"%"}),Object(n.jsx)("th",{children:"\u2206"})]})}),Object(n.jsx)("tbody",{children:this.state.resultsKnockout.map((function(e){return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:Object(n.jsx)("a",{href:e.link,children:"View"})}),Object(n.jsxs)("td",{className:e.one.className,children:[e.one.name," ",1===e.winner?Object(n.jsx)(O.a,{icon:g.a}):""]}),Object(n.jsx)("td",{children:e.one.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.one.className,children:[(e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]}),Object(n.jsxs)("td",{className:e.two.className,children:[e.two.name," ",2===e.winner?Object(n.jsx)(O.a,{icon:g.a}):""]}),Object(n.jsx)("td",{children:e.two.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.two.className,children:[(e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]}),Object(n.jsx)("td",{children:e.one.votes>e.two.votes?e.one.votes-e.two.votes:e.two.votes-e.one.votes})]})}))})]}),Object(n.jsx)("h3",{children:"Today's games:"}),Object(n.jsx)("h6",{children:"Straight lines represent votes in the same match from previous years."}),Object(n.jsx)("h6",{children:"Thin grey lines represent the difference between options."}),Object(n.jsx)(p.a,{children:[].concat(Object(c.a)(this.state.resultsKnockout),Object(c.a)(this.state.resultsQFinals)).filter((function(e){return e.today})).map((function(t){var s=e.state.resultsHistories[t.gameName];if("undefined"!==typeof s){var a=s.results.map((function(e){return{x:(e.timestamp-s.results[0].timestamp)/1e3/60/60,y:e.votes.one}})),o=s.results.map((function(e){return{x:(e.timestamp-s.results[1].timestamp)/1e3/60/60,y:e.votes.two}})),r=s.results.map((function(e){return{x:(e.timestamp-s.results[1].timestamp)/1e3/60/60,y:e.votes.one>e.votes.two?e.votes.one-e.votes.two:e.votes.two-e.votes.one}}));return console.log(t.one.name),console.log(t.two.name),Object(n.jsxs)(f.a,{children:[Object(n.jsx)(v.a,{sm:!0,md:!0,lg:!0,children:Object(n.jsxs)(w.a,{horizontal:!0,domainPadding:{x:100},categories:{x:[t.one.name,t.two.name]},height:350,width:500,padding:{top:0,bottom:80,right:10,left:10},children:[Object(n.jsx)(y.a,{dependentAxis:!0,label:"Votes",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:30,padding:30},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}}),Object(n.jsx)(L.a,{style:{data:{fill:function(e){var t=e.datum;return P[t.xName]},width:60},labels:{fill:"#ffffff",fontSize:30}},alignment:"middle",labels:function(e){var t=e.datum;return"".concat(t.x)},labelComponent:Object(n.jsx)(N.a,{textAnchor:"end",dx:-20}),data:[{y:t.one.votes,x:t.one.name},{y:t.two.votes,x:t.two.name}]}),Object(n.jsx)(y.a,{fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:0,padding:0},tickLabels:{fontSize:0,padding:0},grid:{stroke:"grey",strokeWidth:0},ticks:{strokeWidth:0}}})]})}),Object(n.jsx)(v.a,{sm:!0,md:!0,lg:!0,children:Object(n.jsxs)(w.a,{theme:C.a.material,height:475,width:750,domainPadding:{y:100},padding:{top:0,bottom:80,left:100},containerComponent:Object(n.jsx)(_,{voronoiDimension:"x",radius:1e5,labels:function(e){var t=e.datum;return"".concat(t.y)},labelComponent:Object(n.jsx)(S.a,{cornerRadius:0,flyoutStyle:{fill:"white",fontSize:20}})}),children:[Object(n.jsx)(y.a,{dependentAxis:!0,label:"Votes",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:20,padding:40},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}}),Object(n.jsx)(y.a,{label:"Time (hrs)",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:20,padding:40},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}}),"DLR"===t.one.name&&"Piccadilly"===t.two.name?Object(n.jsx)(z.a,{name:t.one.name,style:{data:{stroke:P.DLR,strokeWidth:3},parent:{border:"1px solid #ccc"}},data:[{x:0,y:1711},{x:(o[o.length-1]||{x:0}).x,y:1711}]}):null,"DLR"===t.one.name&&"Piccadilly"===t.two.name?Object(n.jsx)(z.a,{style:{data:{stroke:P.Piccadilly,strokeWidth:3},parent:{border:"1px solid #ccc"}},data:[{x:0,y:1882},{x:(o[o.length-1]||{x:0}).x,y:1882}]}):null,Object(n.jsx)(z.a,{style:{data:{stroke:"rgb(65, 75, 86)",strokeWidth:2},parent:{border:"1px solid #ccc"}},data:r}),Object(n.jsx)(z.a,{style:{data:{stroke:P[t.one.name],strokeWidth:5},parent:{border:"1px solid #ccc"},labels:{fill:P[t.one.name]}},data:a}),Object(n.jsx)(z.a,{style:{data:{stroke:P[t.two.name],strokeWidth:5},parent:{border:"1px solid #ccc"},labels:{fill:P[t.two.name]}},data:o})]})})]})}}))}),Object(n.jsx)("h3",{children:"Upcoming quarterfinals:"}),Object(n.jsxs)(m.a,{striped:!0,bordered:!0,responsive:!0,children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{children:"Link"}),Object(n.jsx)("th",{children:"Venue"}),Object(n.jsx)("th",{children:"Line 1"}),Object(n.jsx)("th",{children:"Votes"}),Object(n.jsx)("th",{children:"%"}),Object(n.jsx)("th",{children:"Line 2"}),Object(n.jsx)("th",{children:"Votes"}),Object(n.jsx)("th",{children:"%"}),Object(n.jsx)("th",{children:"\u2206"})]})}),Object(n.jsx)("tbody",{children:this.state.resultsQFinals.map((function(e){return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:Object(n.jsx)("a",{href:e.link,children:"View"})}),Object(n.jsx)("td",{children:e.venue||"???"}),Object(n.jsxs)("td",{className:e.one.className,children:[e.one.name," ",1===e.winner?Object(n.jsx)(O.a,{icon:g.a}):""]}),Object(n.jsx)("td",{children:e.one.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.one.className,children:[(e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]}),Object(n.jsxs)("td",{className:e.two.className,children:[e.two.name," ",2===e.winner?Object(n.jsx)(O.a,{icon:g.a}):""]}),Object(n.jsx)("td",{children:e.two.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.two.className,children:[(e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]}),Object(n.jsx)("td",{children:e.one.votes>e.two.votes?e.one.votes-e.two.votes:e.two.votes-e.one.votes})]})}))})]}),Object(n.jsx)("h3",{children:"Past games:"}),Object(n.jsx)(p.a,{children:Object(n.jsx)(f.a,{children:this.state.resultsKnockout.filter((function(e){return!e.today&&"undefined"!==typeof e.link})).map((function(e){return Object(n.jsx)(v.a,{sm:!0,md:!0,lg:!0,children:Object(n.jsxs)(w.a,{horizontal:!0,domainPadding:{x:100},categories:{x:[e.one.name,e.two.name]},height:350,padding:{top:0,bottom:80,right:10,left:10},children:[Object(n.jsx)(y.a,{dependentAxis:!0,label:"Votes",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:30,padding:30},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}}),Object(n.jsx)(L.a,{style:{data:{fill:function(e){var t=e.datum;return P[t.xName]},width:60},labels:{fill:"#ffffff",fontSize:30}},alignment:"middle",labels:function(e){var t=e.datum;return"".concat(t.x)},labelComponent:Object(n.jsx)(N.a,{textAnchor:"end",dx:-20}),data:[{y:e.one.votes,x:e.one.name},{y:e.two.votes,x:e.two.name}]}),Object(n.jsx)(y.a,{fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:0,padding:0},tickLabels:{fontSize:0,padding:0},grid:{stroke:"grey",strokeWidth:0},ticks:{strokeWidth:0}}})]})})}))})}),Object(n.jsx)("footer",{children:Object(n.jsxs)(p.a,{children:["Created by @k_sam_mighty for ",Object(n.jsx)("a",{href:"https://twitter.com/geofftech",children:"Geoff Marshall's"})," World Cup of Tube Lines.",Object(n.jsx)("br",{}),"Find me (@k_sam_mighty) here:",Object(n.jsx)("br",{}),Object(n.jsxs)("a",{href:"https://github.com/Gum-Joe",children:[Object(n.jsx)(O.a,{icon:T.a})," Gum-Joe"]})," ",Object(n.jsx)("br",{}),Object(n.jsxs)("a",{href:"hhttps://twitter.com/official_gumjoe",children:[Object(n.jsx)(O.a,{icon:T.c})," @official_gumjoe"]})," ",Object(n.jsx)("br",{}),Object(n.jsxs)("a",{href:"https://www.instagram.com/k_sam_mighty",children:[Object(n.jsx)(O.a,{icon:T.b})," @k_sam_mighty"]})," ",Object(n.jsx)("br",{}),Object(n.jsxs)("a",{href:"https://www.youtube.com/channel/UCIwdVs7v-WL7_5erRzNv6sw",children:[Object(n.jsx)(O.a,{icon:T.d})," Gum Joe"]}),Object(n.jsx)("br",{}),"Special thanks to ",Object(n.jsx)("a",{href:"https://github.com/davwheat",children:"@davwheat"})," for the API, and ",Object(n.jsx)("a",{href:"https://twitter.com/_FlaiFlai",children:"@_FlaiFlai"})," for the original API.",Object(n.jsx)("br",{}),"Thank you to all the memebers of the community who contributed ideas!"]})})]})}}]),s}(a.Component),I=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,345)).then((function(t){var s=t.getCLS,n=t.getFID,a=t.getFCP,o=t.getLCP,r=t.getTTFB;s(e),n(e),a(e),o(e),r(e)}))};s(313);i.a.render(Object(n.jsx)(o.a.StrictMode,{children:Object(n.jsx)(A,{})}),document.getElementById("root")),I()}},[[314,1,2]]]);
//# sourceMappingURL=main.a2d3c7ea.chunk.js.map