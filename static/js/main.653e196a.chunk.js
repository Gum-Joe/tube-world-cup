(this["webpackJsonptube-world-cup"]=this["webpackJsonptube-world-cup"]||[]).push([[0],{158:function(e,t,n){},160:function(e,t,n){},269:function(e,t,n){"use strict";n.r(t);var s=n(6),a=n(1),i=n.n(a),r=n(137),o=n.n(r),c=(n(158),n(91)),l=n.n(c),d=n(138),h=n(92),b=n(93),j=n(102),u=n(101),x=(n(160),n(278)),f=n(279),m=n(280),p=n(281),g=n(94),O=n(96),v=n(283),w=n(289),k=n(284),y=n(286),L={Bakerloo:"bakerloo",Northern:"northern",Jubilee:"jubilee","TfL Rail":"tflrail",Central:"central",District:"district",Circle:"circle","Thames Link":"thameslink"},N={Bakerloo:"#B36305",Northern:"#000000",Jubilee:"#A0A5A9","TfL Rail":"rgb(0, 25, 168)",Central:"rgb(220, 36, 31)",District:"rgb(0, 125, 50)",Circle:"rgb(255, 211, 41)","Thames Link":"#E9438D"},T="https://gentle-wildflower-0e5e.kishansambhi.workers.dev/?https://twitter.www.statshelix.com",S=[["Bakerloo","Northern",T+"/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1320637628518223872","false"],["Jubilee","TfL Rail",T+"/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1320637979858247680","false"],["Central","District",T+"/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321001660479639552","true"],["Circle","Thames Link",T+"/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321002110801108993","true"]],z=(a.Component,function(e){Object(j.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(h.a)(this,n),(s=t.call(this,e)).state={results:[]},s}return Object(b.a)(n,[{key:"componentDidMount",value:function(){this.updateResults();this.updateResults.bind(this)}},{key:"updateResults",value:function(){var e=this,t=S.map(function(){var e=Object(d.a)(l.a.mark((function e(t){var n,s,a,i,r,o,c,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=0,s=0,a=0,e.prev=3,"https://devnull-as-a-service.com/dev/null"===t[2]){e.next=18;break}return e.next=7,fetch(t[2]);case 7:return i=e.sent,e.next=10,i.text();case 10:r=e.sent,o=r.split("\n"),c=o[0].match(/^\d+|\d+\b|\d+(?=\w)/g)||["0"],n=parseInt(c[0],10),c.length>1&&"1"===c[1]&&(a=1),d=o[1].match(/^\d+|\d+\b|\d+(?=\w)/g)||["0"],s=parseInt(d[0],10),d.length>1&&"1"===d[1]&&(a=2);case 18:e.next=22;break;case 20:e.prev=20,e.t0=e.catch(3);case 22:return e.prev=22,e.abrupt("return",{one:{name:t[0],votes:n,className:L[t[0]]},two:{name:t[1],votes:s,className:L[t[1]]},winner:a,link:t[2].split("url=")[1],today:"true"===t[3]});case 25:case"end":return e.stop()}}),e,null,[[3,20,22,25]])})));return function(t){return e.apply(this,arguments)}}());Promise.all(t).then((function(t){return e.setState({results:t})}))}},{key:"render",value:function(){return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsxs)("div",{className:"header",children:[Object(s.jsx)("h1",{children:"Tube Lines World Cup:"}),Object(s.jsx)("h5",{children:"Updated every 30 secs. Please view in landscape."})]}),Object(s.jsx)("h3",{children:"Knockout stage games:"}),Object(s.jsxs)(x.a,{striped:!0,bordered:!0,responsive:!0,children:[Object(s.jsx)("thead",{children:Object(s.jsxs)("tr",{children:[Object(s.jsx)("th",{children:"Line 1"}),Object(s.jsx)("th",{children:"Votes"}),Object(s.jsx)("th",{children:"%"}),Object(s.jsx)("th",{children:"Line 2"}),Object(s.jsx)("th",{children:"Votes"}),Object(s.jsx)("th",{children:"%"}),Object(s.jsx)("th",{children:"Link"})]})}),Object(s.jsx)("tbody",{children:this.state.results.map((function(e){return Object(s.jsxs)("tr",{children:[Object(s.jsxs)("td",{className:e.one.className,children:[e.one.name," ",1===e.winner?Object(s.jsx)(g.a,{icon:O.a}):""]}),Object(s.jsx)("td",{children:e.one.votes}),Object(s.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.one.className,children:[(e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]}),Object(s.jsxs)("td",{className:e.two.className,children:[e.two.name," ",2===e.winner?Object(s.jsx)(g.a,{icon:O.a}):""]}),Object(s.jsx)("td",{children:e.two.votes}),Object(s.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.two.className,children:[(e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]}),Object(s.jsx)("td",{children:Object(s.jsx)("a",{href:e.link,children:"View"})})]})}))})]}),Object(s.jsx)("h3",{children:"Today's games:"}),Object(s.jsx)(f.a,{children:Object(s.jsx)(m.a,{children:this.state.results.filter((function(e){return e.today})).map((function(e){return Object(s.jsx)(p.a,{sm:!0,md:!0,lg:!0,children:Object(s.jsxs)(v.a,{horizontal:!0,domainPadding:{x:100},categories:{x:[e.one.name,e.two.name]},height:350,padding:{top:0,bottom:80,right:10,left:10},children:[Object(s.jsx)(w.a,{dependentAxis:!0,label:"Votes",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:30,padding:30},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}}),Object(s.jsx)(k.a,{style:{data:{fill:function(e){var t=e.datum;return console.log(t.xName),console.log(N[t.xName]),N[t.xName]},width:60},labels:{fill:"#ffffff",fontSize:30}},alignment:"middle",labels:function(e){var t=e.datum;return"".concat(t.x)},labelComponent:Object(s.jsx)(y.a,{textAnchor:"end",dx:-20}),data:[{y:e.one.votes,x:e.one.name},{y:e.two.votes,x:e.two.name}]}),Object(s.jsx)(w.a,{fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:0,padding:0},tickLabels:{fontSize:0,padding:0},grid:{stroke:"grey",strokeWidth:0},ticks:{strokeWidth:0}}})]})})}))})}),Object(s.jsx)("h3",{children:"Past games:"}),Object(s.jsx)(f.a,{children:Object(s.jsx)(m.a,{children:this.state.results.filter((function(e){return!e.today})).map((function(e){return Object(s.jsx)(p.a,{sm:!0,md:!0,lg:!0,children:Object(s.jsxs)(v.a,{horizontal:!0,domainPadding:{x:100},categories:{x:[e.one.name,e.two.name]},height:350,padding:{top:0,bottom:80,right:10,left:10},children:[Object(s.jsx)(w.a,{dependentAxis:!0,label:"Votes",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:30,padding:30},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}}),Object(s.jsx)(k.a,{style:{data:{fill:function(e){var t=e.datum;return console.log(t.xName),console.log(N[t.xName]),N[t.xName]},width:60},labels:{fill:"#ffffff",fontSize:30}},alignment:"middle",labels:function(e){var t=e.datum;return"".concat(t.x)},labelComponent:Object(s.jsx)(y.a,{textAnchor:"end",dx:-20}),data:[{y:e.one.votes,x:e.one.name},{y:e.two.votes,x:e.two.name}]}),Object(s.jsx)(w.a,{fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:0,padding:0},tickLabels:{fontSize:0,padding:0},grid:{stroke:"grey",strokeWidth:0},ticks:{strokeWidth:0}}})]})})}))})})]})}}]),n}(a.Component)),C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,291)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),s(e),a(e),i(e),r(e)}))};n(268);o.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(z,{})}),document.getElementById("root")),C()}},[[269,1,2]]]);
//# sourceMappingURL=main.653e196a.chunk.js.map