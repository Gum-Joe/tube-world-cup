(this["webpackJsonptube-world-cup"]=this["webpackJsonptube-world-cup"]||[]).push([[0],{196:function(e,t,s){},198:function(e,t,s){},316:function(e,t,s){"use strict";s.r(t);var n=s(4),a=s(1),r=s.n(a),o=s(168),i=s.n(o),c=(s(196),s(186)),l=s(71),d=s(50),h=s.n(d),u=s(97),b=s(169),j=s(170),m=s(187),p=s(185),x=(s(198),s(331)),f=s(332),v=s(47),O=s(70),g={Bakerloo:"bakerloo",Northern:"northern",Jubilee:"jubilee","TfL Rail":"tflrail",Central:"central",District:"district",Circle:"circle",Thameslink:"thameslink","H&C":"handc",Victoria:"victoria",Metropolitan:"metropolitan",Trams:"trams",Overground:"overground",CableCar:"cablecar",DLR:"dlr",Piccadilly:"picadilly","???":"unknown"},k={"Bakerloo Line":"Bakerloo","Northern Line":"Northern","Jubilee Line":"Jubilee","TfL Rail":"TfL Rail","Central Line":"Central","District Line":"District","Circle Line":"Circle",Thameslink:"Thameslink","Hammersmith & City Line":"H&C","Victoria Line":"Victoria","Metropolitan Line":"Metropolitan",Trams:"Trams","London Overground":"Overground","Cable Car":"CableCar",DLR:"DLR","Piccadilly Line":"Piccadilly"},y={Bakerloo:"#B36305",Northern:"#000000",Jubilee:"#A0A5A9","TfL Rail":"rgb(0, 25, 168)",Central:"rgb(220, 36, 31)",District:"rgb(0, 125, 50)",Circle:"rgb(255, 211, 41)",Thameslink:"#E9438D","H&C":"rgb(244, 169, 190)",Victoria:"rgb(0, 152, 216)",Metropolitan:"rgb(155, 0, 88)",Trams:"rgb(0, 189, 25)",Overground:"rgb(239, 123, 16)",CableCar:"rgb(220, 36, 31)",DLR:"rgb(0, 175, 173)",Piccadilly:"rgb(0, 25, 168)"},w="https://devnull-as-a-service.com/dev/null",L=[["District","Thameslink",w,"false","Blackfriars"],["Victoria","Metropolitan",w,"false","King's Cross"],["Overground","DLR",w,"false","Shadwell"]],C=s(121),N=s(328),T=function(e){return Object(n.jsxs)(N.a,{striped:!0,bordered:!0,responsive:!0,children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{children:"Link"}),Object(n.jsx)("th",{children:"Line 1"}),Object(n.jsx)("th",{children:"Votes"}),Object(n.jsx)("th",{children:"%"}),Object(n.jsx)("th",{children:"Line 2"}),Object(n.jsx)("th",{children:"Votes"}),Object(n.jsx)("th",{children:"%"}),Object(n.jsx)("th",{children:"\u2206"})]})}),Object(n.jsx)("tbody",{children:e.results.map((function(e){return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:Object(n.jsx)("a",{href:e.link,children:"View"})}),Object(n.jsxs)("td",{className:e.one.className,children:[e.one.name," ",1===e.winner?Object(n.jsx)(v.a,{icon:C.a}):""]}),Object(n.jsx)("td",{children:e.one.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.one.className,children:[(e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]}),Object(n.jsxs)("td",{className:e.two.className,children:[e.two.name," ",2===e.winner?Object(n.jsx)(v.a,{icon:C.a}):""]}),Object(n.jsx)("td",{children:e.two.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.two.className,children:[(e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]}),Object(n.jsx)("td",{children:e.one.votes>e.two.votes?e.one.votes-e.two.votes:e.two.votes-e.one.votes})]})}))})]})},S=s(330),P=s(334),D=s(336),F=s(345),R=s(337),z=s(340),_=s(339),A=s(343),H=s(338),I=Object(P.a)("zoom","voronoi"),V=function(e){return Object(n.jsx)(n.Fragment,{children:e.results.filter((function(t){var s;return t.today===(null===(s=e.isToday)||void 0===s||s)})).map((function(t){var s=e.history[t.gameName];if("undefined"!==typeof s){var a=s.results.map((function(e){return{x:(e.timestamp-s.results[0].timestamp)/1e3/60/60,y:e.votes.one}})),r=s.results.map((function(e){return{x:(e.timestamp-s.results[1].timestamp)/1e3/60/60,y:e.votes.two}})),o=s.results.map((function(e){return{x:(e.timestamp-s.results[1].timestamp)/1e3/60/60,y:e.votes.one>e.votes.two?e.votes.one-e.votes.two:e.votes.two-e.votes.one}}));return console.log(t.one.name),console.log(t.two.name),Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(S.a,{sm:!0,md:!0,lg:!0,children:Object(n.jsxs)(D.a,{horizontal:!0,domainPadding:{x:100},categories:{x:[t.one.name,t.two.name]},height:350,width:500,padding:{top:0,bottom:80,right:10,left:10},children:[Object(n.jsx)(F.a,{dependentAxis:!0,label:"Votes",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:30,padding:40},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}}),Object(n.jsx)(R.a,{style:{data:{fill:function(e){var t=e.datum;return y[t.xName]},width:60},labels:{fill:"#ffffff",fontSize:30}},alignment:"middle",labels:function(e){var t=e.datum;return"".concat(t.x)},labelComponent:Object(n.jsx)(z.a,{textAnchor:"end",dx:-20}),data:[{y:t.one.votes,x:t.one.name},{y:t.two.votes,x:t.two.name}]}),Object(n.jsx)(F.a,{fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:0,padding:0},tickLabels:{fontSize:0,padding:0},grid:{stroke:"grey",strokeWidth:0},ticks:{strokeWidth:0}}})]})}),Object(n.jsx)(S.a,{sm:!0,md:!0,lg:!0,children:Object(n.jsxs)(D.a,{theme:_.a.material,height:475,width:750,domainPadding:{y:100},padding:{top:0,bottom:80,left:100},containerComponent:Object(n.jsx)(I,{voronoiDimension:"x",radius:1e5,labels:function(e){var t=e.datum;return"".concat(t.y)},labelComponent:Object(n.jsx)(A.a,{cornerRadius:0,flyoutStyle:{fill:"white",fontSize:20}})}),children:[Object(n.jsx)(F.a,{dependentAxis:!0,label:"Votes",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:20,padding:70},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}}),Object(n.jsx)(F.a,{label:"Time (hrs)",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:20,padding:40},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}}),"DLR"===t.one.name&&"Piccadilly"===t.two.name?Object(n.jsx)(H.a,{name:t.one.name,style:{data:{stroke:y.DLR,strokeWidth:3},parent:{border:"1px solid #ccc"}},data:[{x:0,y:1711},{x:(r[r.length-1]||{x:0}).x,y:1711}]}):null,"DLR"===t.one.name&&"Piccadilly"===t.two.name?Object(n.jsx)(H.a,{style:{data:{stroke:y.Piccadilly,strokeWidth:3},parent:{border:"1px solid #ccc"}},data:[{x:0,y:1882},{x:(r[r.length-1]||{x:0}).x,y:1882}]}):null,Object(n.jsx)(H.a,{style:{data:{stroke:"rgb(65, 75, 86)",strokeWidth:2},parent:{border:"1px solid #ccc"}},data:o}),Object(n.jsx)(H.a,{style:{data:{stroke:y[t.one.name],strokeWidth:5},parent:{border:"1px solid #ccc"},labels:{fill:y[t.one.name]}},data:a}),Object(n.jsx)(H.a,{style:{data:{stroke:y[t.two.name],strokeWidth:5},parent:{border:"1px solid #ccc"},labels:{fill:y[t.two.name]}},data:r})]})})]})}}))})},W={quartera1:"Waterloo",quartera2:"Blackfriars",quarterb3:"King's Cross",quarterb4:"Shadwell"},B=function(e){Object(m.a)(s,e);var t=Object(p.a)(s);function s(e){var n;return Object(b.a)(this,s),(n=t.call(this,e)).state={resultsKnockout:[],resultsQFinals:[],resultsHistories:{},pairedPastGames:[]},n}return Object(j.a)(s,[{key:"updateHistory",value:function(){var e=Object(u.a)(h.a.mark((function e(){var t,s,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.davwheat.dev/fullhistory");case 2:return t=e.sent,e.t0=this,e.next=6,t.json();case 6:e.t1=e.sent,e.t2={resultsHistories:e.t1},e.t0.setState.call(e.t0,e.t2),s=[],(n=this.state.resultsKnockout.filter((function(e){return!e.today&&"undefined"!==typeof e.link}))).forEach((function(e,t){t%2===0&&s.push([e,n[t+1]])})),console.log(s),this.setState({pairedPastGames:s});case 14:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.updateResults(),this.updateHistory();var e=this.updateResults.bind(this);setInterval((function(){return e()}),2e4);var t=this.updateHistory.bind(this);setInterval((function(){return t()}),6e4)}},{key:"getUpdates",value:function(){var e=Object(u.a)(h.a.mark((function e(t){var s,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.davwheat.dev/getpolls");case 2:return s=e.sent,e.next=5,s.json();case 5:return n=e.sent,e.abrupt("return",n.filter((function(e){return e.game.includes(t)})).map((function(e){return console.log(k[e.poll.options[0].label]),{gameName:e.game,one:{name:k[e.poll.options[0].label]||"???",votes:e.poll.options[0].votes,className:g[k[e.poll.options[0].label]||"???"]},two:{name:k[e.poll.options[1].label]||"???",votes:e.poll.options[1].votes,className:g[k[e.poll.options[1].label]||"???"]},winner:e.poll.options[0].votes>e.poll.options[1].votes?1:2,link:"https://twitter.com/geofftech/status/"+e.tweetId,today:"open"===e.poll.voting_status,venue:W[e.game]||"???"}})));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getUpdatesOld",value:function(){var e=Object(u.a)(h.a.mark((function e(t){var s,n,a,r,o,i,c,l;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=0,n=0,a=0,e.prev=3,t[2]===w){e.next=18;break}return e.next=7,fetch(t[2]);case 7:return r=e.sent,e.next=10,r.text();case 10:o=e.sent,i=o.split("\n"),c=i[0].match(/^\d+|\d+\b|\d+(?=\w)/g)||["0"],s=parseInt(c[0],10),c.length>1&&"1"===c[1]&&(a=1),l=i[1].match(/^\d+|\d+\b|\d+(?=\w)/g)||["0"],n=parseInt(l[0],10),l.length>1&&"1"===l[1]&&(a=2);case 18:e.next=23;break;case 20:e.prev=20,e.t0=e.catch(3),console.log(e.t0.stack);case 23:return e.prev=23,e.abrupt("return",{gameName:"unknown",one:{name:t[0],votes:s,className:g[t[0]]},two:{name:t[1],votes:n,className:g[t[1]]},winner:a,link:t[2].split("url=")[1],today:"true"===t[3],venue:t[4]});case 26:case"end":return e.stop()}}),e,null,[[3,20,23,26]])})));return function(t){return e.apply(this,arguments)}}()},{key:"updateResults",value:function(){var e=this;console.log("UPDATED"),this.getUpdates("knockout").then((function(t){return e.setState({resultsKnockout:t})}));var t=L.map(this.getUpdatesOld);Promise.all(t).then((function(t){e.getUpdates("quarter").then((function(s){e.setState({resultsQFinals:[].concat(Object(l.a)(s),Object(l.a)(t))})}))}))}},{key:"render",value:function(){var e=this;return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsxs)("div",{className:"header",children:[Object(n.jsx)("h1",{children:"Tube Lines World Cup:"}),Object(n.jsx)("h5",{children:"Updated every 20 secs. Please view in landscape."}),Object(n.jsx)("h6",{children:"Note: if no votes are showing, the API this site uses has gone down and should be back up in a few mins."})]}),Object(n.jsx)("h3",{children:"Quarterfinals:"}),Object(n.jsx)(T,{results:this.state.resultsQFinals}),Object(n.jsx)("h3",{children:"Today's games:"}),Object(n.jsx)("h6",{children:"Straight lines represent votes in the same match from previous years."}),Object(n.jsx)("h6",{children:"Thin grey lines represent the difference between options."}),Object(n.jsx)(x.a,{children:Object(n.jsx)(f.a,{children:Object(n.jsx)(V,{results:[].concat(Object(l.a)(this.state.resultsQFinals),Object(l.a)(this.state.resultsKnockout)),history:this.state.resultsHistories})})}),Object(n.jsx)("h3",{children:"Knockout stage results:"}),Object(n.jsx)(T,{results:this.state.resultsKnockout}),Object(n.jsx)("h3",{children:"Past games:"}),Object(n.jsx)(x.a,{children:this.state.pairedPastGames.map((function(t){var s=Object(c.a)(t,2),a=s[0],r=s[1];return console.log(a),Object(n.jsx)(f.a,{children:Object(n.jsx)(V,{results:"undefined"!==typeof r?[a,r]:[a],history:e.state.resultsHistories,isToday:!1})})}))}),Object(n.jsx)("footer",{children:Object(n.jsxs)(x.a,{children:["Created by @k_sam_mighty for ",Object(n.jsx)("a",{href:"https://twitter.com/geofftech",children:"Geoff Marshall's"})," World Cup of Tube Lines.",Object(n.jsx)("br",{}),"Find me (@k_sam_mighty) here:",Object(n.jsx)("br",{}),Object(n.jsxs)("a",{href:"https://github.com/Gum-Joe",children:[Object(n.jsx)(v.a,{icon:O.a})," Gum-Joe"]})," ",Object(n.jsx)("br",{}),Object(n.jsxs)("a",{href:"hhttps://twitter.com/official_gumjoe",children:[Object(n.jsx)(v.a,{icon:O.c})," @official_gumjoe"]})," ",Object(n.jsx)("br",{}),Object(n.jsxs)("a",{href:"https://www.instagram.com/k_sam_mighty",children:[Object(n.jsx)(v.a,{icon:O.b})," @k_sam_mighty"]})," ",Object(n.jsx)("br",{}),Object(n.jsxs)("a",{href:"https://www.youtube.com/channel/UCIwdVs7v-WL7_5erRzNv6sw",children:[Object(n.jsx)(v.a,{icon:O.d})," Gum Joe"]}),Object(n.jsx)("br",{}),"Special thanks to ",Object(n.jsx)("a",{href:"https://github.com/davwheat",children:"@davwheat"})," for the API, and ",Object(n.jsx)("a",{href:"https://twitter.com/_FlaiFlai",children:"@_FlaiFlai"})," for the original API.",Object(n.jsx)("br",{}),"Thank you to all the memebers of the community who contributed ideas!"]})})]})}}]),s}(a.Component),J=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,346)).then((function(t){var s=t.getCLS,n=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;s(e),n(e),a(e),r(e),o(e)}))};s(315);i.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(B,{})}),document.getElementById("root")),J()}},[[316,1,2]]]);
//# sourceMappingURL=main.a1b77dff.chunk.js.map