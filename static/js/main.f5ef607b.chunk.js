(this["webpackJsonptube-world-cup"]=this["webpackJsonptube-world-cup"]||[]).push([[0],{158:function(e,t,s){},160:function(e,t,s){},269:function(e,t,s){"use strict";s.r(t);var n=s(4),a=s(1),r=s.n(a),i=s(137),c=s.n(i),o=(s(158),s(93)),l=s.n(o),d=s(138),j=s(94),h=s(95),b=s(102),u=s(101),x=(s(160),s(278)),m=s(279),f=s(280),O=s(281),p=s(56),g=s(57),v=s(283),w=s(289),k=s(284),y=s(286),N={Bakerloo:"bakerloo",Northern:"northern",Jubilee:"jubilee","TfL Rail":"tflrail",Central:"central",District:"district",Circle:"circle",Thameslink:"thameslink","H&C":"handc",Victoria:"victoria",Metropolitan:"metropolitan",Trams:"trams",Overground:"overground",CableCar:"cablecar",DLR:"dlr",Piccadilly:"picadilly","???":"unknown"},L={Bakerloo:"#B36305",Northern:"#000000",Jubilee:"#A0A5A9","TfL Rail":"rgb(0, 25, 168)",Central:"rgb(220, 36, 31)",District:"rgb(0, 125, 50)",Circle:"rgb(255, 211, 41)",Thameslink:"#E9438D","H&C":"rgb(244, 169, 190);",Victoria:"rgb(0, 152, 216);",Metropolitan:"rgb(155, 0, 88)",Trams:"rgb(0, 189, 25)",Overground:"rgb(239, 123, 16)",CableCar:"rgb(220, 36, 31)",DLR:"rgb(0, 175, 173)",Piccadilly:"rgb(0, 25, 168)"},C="https://devnull-as-a-service.com/dev/null",T="https://twitter.www.statshelix.com",S=[["Bakerloo","Northern",T+"/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1320637628518223872","false"],["Jubilee","TfL Rail",T+"/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1320637979858247680","false"],["Central","District",T+"/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321001660479639552","true"],["Circle","Thameslink",T+"/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321002110801108993","true"],["H&C","Victoria",C],["Metropolitan","Trams",C],["Overground","CableCar",C],["DLR","Piccadilly",C]],z=[["Northern","Jubilee",C,"false","Waterloo"],["???","???",C,"false"],["???","???",C,"false"],["???","???",C,"false"]],F=(a.Component,function(e){Object(b.a)(s,e);var t=Object(u.a)(s);function s(e){var n;return Object(j.a)(this,s),(n=t.call(this,e)).state={results:[],resultsQFinals:[]},n}return Object(h.a)(s,[{key:"componentDidMount",value:function(){this.updateResults();var e=this.updateResults.bind(this);setInterval((function(){return e()}),2e4)}},{key:"getUpdates",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var s,n,a,r,i,c,o,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=0,n=0,a=0,e.prev=3,t[2]===C){e.next=18;break}return e.next=7,fetch(t[2]);case 7:return r=e.sent,e.next=10,r.text();case 10:i=e.sent,c=i.split("\n"),o=c[0].match(/^\d+|\d+\b|\d+(?=\w)/g)||["0"],s=parseInt(o[0],10),o.length>1&&"1"===o[1]&&(a=1),d=c[1].match(/^\d+|\d+\b|\d+(?=\w)/g)||["0"],n=parseInt(d[0],10),d.length>1&&"1"===d[1]&&(a=2);case 18:e.next=23;break;case 20:e.prev=20,e.t0=e.catch(3),console.log(e.t0.stack);case 23:return e.prev=23,e.abrupt("return",{one:{name:t[0],votes:s,className:N[t[0]]},two:{name:t[1],votes:n,className:N[t[1]]},winner:a,link:t[2].split("url=")[1],today:"true"===t[3],venue:t[4]});case 26:case"end":return e.stop()}}),e,null,[[3,20,23,26]])})));return function(t){return e.apply(this,arguments)}}()},{key:"updateResults",value:function(){var e=this,t=S.map(this.getUpdates);Promise.all(t).then((function(t){return e.setState({results:t})}));var s=z.map(this.getUpdates);Promise.all(s).then((function(t){return e.setState({resultsQFinals:t})}))}},{key:"render",value:function(){return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsxs)("div",{className:"header",children:[Object(n.jsx)("h1",{children:"Tube Lines World Cup:"}),Object(n.jsx)("h5",{children:"Updated every 20 secs. Please view in landscape."})]}),Object(n.jsx)("h3",{children:"Knockout stage games:"}),Object(n.jsxs)(x.a,{striped:!0,bordered:!0,responsive:!0,children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{children:"Line 1"}),Object(n.jsx)("th",{children:"Votes"}),Object(n.jsx)("th",{children:"%"}),Object(n.jsx)("th",{children:"Line 2"}),Object(n.jsx)("th",{children:"Votes"}),Object(n.jsx)("th",{children:"%"}),Object(n.jsx)("th",{children:"Link"})]})}),Object(n.jsx)("tbody",{children:this.state.results.map((function(e){return Object(n.jsxs)("tr",{children:[Object(n.jsxs)("td",{className:e.one.className,children:[e.one.name," ",1===e.winner?Object(n.jsx)(p.a,{icon:g.a}):""]}),Object(n.jsx)("td",{children:e.one.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.one.className,children:[(e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]}),Object(n.jsxs)("td",{className:e.two.className,children:[e.two.name," ",2===e.winner?Object(n.jsx)(p.a,{icon:g.a}):""]}),Object(n.jsx)("td",{children:e.two.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.two.className,children:[(e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]}),Object(n.jsx)("td",{children:Object(n.jsx)("a",{href:e.link,children:"View"})})]})}))})]}),Object(n.jsx)("h3",{children:"Today's games:"}),Object(n.jsx)(m.a,{children:Object(n.jsx)(f.a,{children:this.state.results.filter((function(e){return e.today})).map((function(e){return Object(n.jsx)(O.a,{sm:!0,md:!0,lg:!0,children:Object(n.jsxs)(v.a,{horizontal:!0,domainPadding:{x:100},categories:{x:[e.one.name,e.two.name]},height:350,padding:{top:0,bottom:80,right:10,left:10},children:[Object(n.jsx)(w.a,{dependentAxis:!0,label:"Votes",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:30,padding:30},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}}),Object(n.jsx)(k.a,{style:{data:{fill:function(e){var t=e.datum;return console.log(t.xName),console.log(L[t.xName]),L[t.xName]},width:60},labels:{fill:"#ffffff",fontSize:30}},alignment:"middle",labels:function(e){var t=e.datum;return"".concat(t.x)},labelComponent:Object(n.jsx)(y.a,{textAnchor:"end",dx:-20}),data:[{y:e.one.votes,x:e.one.name},{y:e.two.votes,x:e.two.name}]}),Object(n.jsx)(w.a,{fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:0,padding:0},tickLabels:{fontSize:0,padding:0},grid:{stroke:"grey",strokeWidth:0},ticks:{strokeWidth:0}}})]})})}))})}),Object(n.jsx)("h3",{children:"Upcoming quarterfinals:"}),Object(n.jsxs)(x.a,{striped:!0,bordered:!0,responsive:!0,children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{children:"Venue"}),Object(n.jsx)("th",{children:"Line 1"}),Object(n.jsx)("th",{children:"Votes"}),Object(n.jsx)("th",{children:"%"}),Object(n.jsx)("th",{children:"Line 2"}),Object(n.jsx)("th",{children:"Votes"}),Object(n.jsx)("th",{children:"%"}),Object(n.jsx)("th",{children:"Link"})]})}),Object(n.jsx)("tbody",{children:this.state.resultsQFinals.map((function(e){return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:e.venue||"???"}),Object(n.jsxs)("td",{className:e.one.className,children:[e.one.name," ",1===e.winner?Object(n.jsx)(p.a,{icon:g.a}):""]}),Object(n.jsx)("td",{children:e.one.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.one.className,children:[(e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]}),Object(n.jsxs)("td",{className:e.two.className,children:[e.two.name," ",2===e.winner?Object(n.jsx)(p.a,{icon:g.a}):""]}),Object(n.jsx)("td",{children:e.two.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.two.className,children:[(e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]}),Object(n.jsx)("td",{children:Object(n.jsx)("a",{href:e.link,children:"View"})})]})}))})]}),Object(n.jsx)("h3",{children:"Past games:"}),Object(n.jsx)(m.a,{children:Object(n.jsx)(f.a,{children:this.state.results.filter((function(e){return!e.today&&"undefined"!==typeof e.link})).map((function(e){return Object(n.jsx)(O.a,{sm:!0,md:!0,lg:!0,children:Object(n.jsxs)(v.a,{horizontal:!0,domainPadding:{x:100},categories:{x:[e.one.name,e.two.name]},height:350,padding:{top:0,bottom:80,right:10,left:10},children:[Object(n.jsx)(w.a,{dependentAxis:!0,label:"Votes",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:30,padding:30},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}}),Object(n.jsx)(k.a,{style:{data:{fill:function(e){var t=e.datum;return console.log(t.xName),console.log(L[t.xName]),L[t.xName]},width:60},labels:{fill:"#ffffff",fontSize:30}},alignment:"middle",labels:function(e){var t=e.datum;return"".concat(t.x)},labelComponent:Object(n.jsx)(y.a,{textAnchor:"end",dx:-20}),data:[{y:e.one.votes,x:e.one.name},{y:e.two.votes,x:e.two.name}]}),Object(n.jsx)(w.a,{fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:0,padding:0},tickLabels:{fontSize:0,padding:0},grid:{stroke:"grey",strokeWidth:0},ticks:{strokeWidth:0}}})]})})}))})})]})}}]),s}(a.Component)),V=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,291)).then((function(t){var s=t.getCLS,n=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;s(e),n(e),a(e),r(e),i(e)}))};s(268);c.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(F,{})}),document.getElementById("root")),V()}},[[269,1,2]]]);
//# sourceMappingURL=main.f5ef607b.chunk.js.map