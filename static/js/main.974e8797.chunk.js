(this["webpackJsonptube-world-cup"]=this["webpackJsonptube-world-cup"]||[]).push([[0],{205:function(e,t,s){},207:function(e,t,s){},325:function(e,t,s){"use strict";s.r(t);var n=s(3),a=s(1),o=s.n(a),i=s(59),r=s.n(i),c=(s(205),s(194)),l=s(73),d=s.n(l),h=s(30),j=s(125),u=s(173),b=s(174),x=s(195),m=s(192),p=(s(207),s(341)),f=s(342),O=s(344),v=s(28),g=s(74),w={Bakerloo:"bakerloo",Northern:"northern",Jubilee:"jubilee","TfL Rail":"tflrail",Central:"central",District:"district",Circle:"circle",Thameslink:"thameslink","H&C":"handc",Victoria:"victoria",Metropolitan:"metropolitan",Trams:"trams",Overground:"overground",CableCar:"cablecar",DLR:"dlr",Piccadilly:"picadilly","???":"unknown"},y={"Bakerloo Line":"Bakerloo","Northern Line":"Northern","Jubilee Line":"Jubilee","TfL Rail":"TfL Rail","Central Line":"Central","District Line":"District","Circle Line":"Circle",Thameslink:"Thameslink","Hammersmith & City Line":"H&C","Victoria Line":"Victoria","Metropolitan Line":"Metropolitan",Trams:"Trams","London Overground":"Overground","Cable Car":"CableCar",DLR:"DLR","Piccadilly Line":"Piccadilly"},k={Bakerloo:"#B36305",Northern:"#000000",Jubilee:"#A0A5A9","TfL Rail":"rgb(0, 25, 168)",Central:"rgb(220, 36, 31)",District:"rgb(0, 125, 50)",Circle:"rgb(255, 211, 41)",Thameslink:"#E9438D","H&C":"rgb(244, 169, 190)",Victoria:"rgb(0, 152, 216)",Metropolitan:"rgb(155, 0, 88)",Trams:"rgb(0, 189, 25)",Overground:"rgb(239, 123, 16)",CableCar:"rgb(220, 36, 31)",DLR:"rgb(0, 175, 173)",Piccadilly:"rgb(0, 25, 168)"},L="https://devnull-as-a-service.com/dev/null",N=[["???","???",L,"???","???"]],C=[["???","???",L,"???","???"]],F=s(60),T=s(338),S=function(e){return Object(n.jsxs)(T.a,{striped:!0,bordered:!0,responsive:!0,children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{children:"Link"}),e.allowVenues?Object(n.jsx)("th",{children:"Venue"}):null,Object(n.jsx)("th",{children:"Line 1"}),Object(n.jsx)("th",{children:"Votes"}),Object(n.jsx)("th",{children:"%"}),Object(n.jsx)("th",{children:"Line 2"}),Object(n.jsx)("th",{children:"Votes"}),Object(n.jsx)("th",{children:"%"}),Object(n.jsx)("th",{children:"\u2206"}),Object(n.jsx)("th",{children:"Total"})]})}),Object(n.jsx)("tbody",{children:e.results.map((function(t){return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:Object(n.jsx)("a",{href:t.link,children:"View"})}),e.allowVenues?Object(n.jsx)("td",{children:t.venue||"???"}):null,Object(n.jsxs)("td",{className:t.one.className,children:[t.one.name," ",1===t.winner?Object(n.jsx)(v.a,{icon:F.a}):""]}),Object(n.jsx)("td",{children:t.one.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((t.one.votes/(t.one.votes+t.two.votes)*100||0).toFixed(1),"%")},className:t.one.className,children:[(t.one.votes/(t.one.votes+t.two.votes)*100||0).toFixed(1),"%"]}),Object(n.jsxs)("td",{className:t.two.className,children:[t.two.name," ",2===t.winner?Object(n.jsx)(v.a,{icon:F.a}):""]}),Object(n.jsx)("td",{children:t.two.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((t.two.votes/(t.one.votes+t.two.votes)*100||0).toFixed(1),"%")},className:t.two.className,children:[(t.two.votes/(t.one.votes+t.two.votes)*100||0).toFixed(1),"%"]}),Object(n.jsx)("td",{children:t.one.votes>t.two.votes?t.one.votes-t.two.votes:t.two.votes-t.one.votes}),Object(n.jsx)("td",{children:t.one.votes+t.two.votes})]})}))})]})},P=s(340),D=s(345),V=s(347),R=s(356),A=s(348),z=s(351),G=s(350),W=s(354),U=s(349),H=Object(D.a)("zoom","voronoi"),_=function(e){return Object(n.jsx)(n.Fragment,{children:e.results.filter((function(t){var s;return t.today===(null===(s=e.isToday)||void 0===s||s)})).map((function(t){var s=e.history[t.gameName];if("undefined"!==typeof s){var a=s.results.map((function(e){return{x:(e.timestamp-s.results[0].timestamp)/1e3/60/60,y:e.votes.one}})),o=s.results.map((function(e){return{x:(e.timestamp-s.results[1].timestamp)/1e3/60/60,y:e.votes.two}})),i=s.results.map((function(e){return{x:(e.timestamp-s.results[1].timestamp)/1e3/60/60,y:e.votes.one>e.votes.two?e.votes.one-e.votes.two:e.votes.two-e.votes.one}}));return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(P.a,{sm:!0,md:!0,lg:!0,children:Object(n.jsxs)(V.a,{horizontal:!0,domainPadding:{x:100},categories:{x:[t.one.name,t.two.name]},height:350,width:500,padding:{top:0,bottom:80,right:10,left:10},children:[Object(n.jsx)(R.a,{dependentAxis:!0,label:"Votes",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:30,padding:40},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}}),Object(n.jsx)(A.a,{style:{data:{fill:function(e){var t=e.datum;return k[t.xName]},width:60},labels:{fill:"#ffffff",fontSize:30}},alignment:"middle",labels:function(e){var t=e.datum;return"".concat(t.x)},labelComponent:Object(n.jsx)(z.a,{textAnchor:"end",dx:-20}),data:[{y:t.one.votes,x:t.one.name},{y:t.two.votes,x:t.two.name}]}),Object(n.jsx)(R.a,{fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:0,padding:0},tickLabels:{fontSize:0,padding:0},grid:{stroke:"grey",strokeWidth:0},ticks:{strokeWidth:0}}})]})}),Object(n.jsx)(P.a,{sm:!0,md:!0,lg:!0,children:Object(n.jsxs)(V.a,{theme:G.a.material,height:475,width:750,domainPadding:{y:100},padding:{top:0,bottom:80,left:100},containerComponent:Object(n.jsx)(H,{voronoiDimension:"x",radius:1e5,labels:function(e){var t=e.datum;return"".concat(t.y)},labelComponent:Object(n.jsx)(W.a,{cornerRadius:0,flyoutStyle:{fill:"white",fontSize:20}})}),children:[Object(n.jsx)(R.a,{dependentAxis:!0,label:"Votes",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:20,padding:70},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}},0),Object(n.jsx)(R.a,{label:"Time (hrs)",fixLabelOverlap:!0,style:{axis:{stroke:"#756f6a"},axisLabel:{fontSize:20,padding:40},tickLabels:{fontSize:20,padding:5},grid:{stroke:"grey"},ticks:{stroke:"grey"}}}),"DLR"===t.one.name&&"Piccadilly"===t.two.name?Object(n.jsx)(U.a,{name:t.one.name,style:{data:{stroke:k.DLR,strokeWidth:3},parent:{border:"1px solid #ccc"}},data:[{x:0,y:1711},{x:(o[o.length-1]||{x:0}).x,y:1711}]}):null,"DLR"===t.one.name&&"Piccadilly"===t.two.name?Object(n.jsx)(U.a,{style:{data:{stroke:k.Piccadilly,strokeWidth:3},parent:{border:"1px solid #ccc"}},data:[{x:0,y:1882},{x:(o[o.length-1]||{x:0}).x,y:1882}]}):null,Object(n.jsx)(U.a,{style:{data:{stroke:"rgb(65, 75, 86)",strokeWidth:2},parent:{border:"1px solid #ccc"}},data:i}),Object(n.jsx)(U.a,{style:{data:{stroke:k[t.one.name],strokeWidth:3},parent:{border:"1px solid #ccc"},labels:{fill:k[t.one.name]}},data:a}),Object(n.jsx)(U.a,{style:{data:{stroke:k[t.two.name],strokeWidth:3},parent:{border:"1px solid #ccc"},labels:{fill:k[t.two.name]}},data:o})]})})]})}}))})},B=function(e){return Object(n.jsx)(p.a,{children:e.results.map((function(e){return Object(n.jsx)(p.a,{children:Object(n.jsxs)(f.a,{className:"align-items-center",children:[Object(n.jsx)(P.a,{children:Object(n.jsxs)(T.a,{striped:!0,bordered:!0,responsive:!0,children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{children:"Line"}),Object(n.jsx)("th",{children:"Votes"}),Object(n.jsx)("th",{children:"%"})]})}),Object(n.jsxs)("tbody",{children:[Object(n.jsxs)("tr",{children:[Object(n.jsxs)("td",{className:e.one.className,children:[e.one.name," ",1===e.winner?Object(n.jsx)(v.a,{icon:F.a}):""]}),Object(n.jsx)("td",{children:e.one.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.one.className,children:[(e.one.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]})]}),Object(n.jsxs)("tr",{children:[Object(n.jsxs)("td",{className:e.two.className,children:[e.two.name," ",2===e.winner?Object(n.jsx)(v.a,{icon:F.a}):""]}),Object(n.jsx)("td",{children:e.two.votes}),Object(n.jsxs)("td",{style:{backgroundSize:"100% ".concat((e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%")},className:e.two.className,children:[(e.two.votes/(e.one.votes+e.two.votes)*100||0).toFixed(1),"%"]})]})]})]})}),Object(n.jsx)(P.a,{lg:2,className:"compact-headers",children:Object(n.jsxs)("h6",{className:"align-middle",children:["Difference: ",e.one.votes>e.two.votes?e.one.votes-e.two.votes:e.two.votes-e.one.votes,Object(n.jsx)("br",{}),"Total: ",e.one.votes+e.two.votes,Object(n.jsx)("br",{}),"Vote here: ",Object(n.jsx)("a",{href:e.link,children:"Link"})]})})]})})}))})},I=s(189),J=s.n(I),K="ga-disable-G-D3GT5HVZRG";function M(e){document.cookie=K+"=".concat(e?"true":"false","; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/"),window[K]=e}var E={quartera1:"Waterloo",quartera2:"Blackfriars",quarterb1:"King's Cross",quarterb2:"Shadwell",semia1:"West Hampstead",semib1:"Aldwych Disused",final:"???",playoff:"???"},Q={Waterloo:'BREAKING: A reporter for the Geoff Broadcasting Corporation (GBC), at Waterloo, has informed us that "a socially distanced crowd wearing face coverings has turned up at the Waterloo ticket hall concourse to see this highly anticipated match"'},q=function(e){Object(x.a)(s,e);var t=Object(m.a)(s);function s(e){var n;return Object(u.a)(this,s),(n=t.call(this,e)).state={resultsKnockout:[],resultsQFinals:[],resultsHistories:{},pairedPastGames:[],resultsSemiFinals:[],resultsFinals:[],resultsPlayoff:[]},n}return Object(b.a)(s,[{key:"updateHistory",value:function(){var e=Object(j.a)(d.a.mark((function e(){var t,s,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.davwheat.dev/fullhistory");case 2:return t=e.sent,e.t0=this,e.next=6,t.json();case 6:e.t1=e.sent,e.t2={resultsHistories:e.t1},e.t0.setState.call(e.t0,e.t2),s=[],(n=[].concat(Object(h.a)(this.state.resultsKnockout),Object(h.a)(this.state.resultsQFinals),Object(h.a)(this.state.resultsSemiFinals)).filter((function(e){return!e.today&&"undefined"!==typeof e.link}))).forEach((function(e,t){t%2===0&&s.push([e,n[t+1]])})),this.setState({pairedPastGames:s});case 13:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"setGaAnalytics",value:function(){}},{key:"componentWillMount",value:function(){this.setGaAnalytics()}},{key:"componentDidMount",value:function(){this.updateResults(),this.updateHistory();var e=this.updateResults.bind(this);setInterval((function(){return e()}),6e4);var t=this.updateHistory.bind(this);setInterval((function(){return t()}),6e4)}},{key:"getUpdates",value:function(e,t){var s=e.filter((function(e){return e.game.includes(t)})).map((function(e){return console.log(y[e.poll.options[0].label]),{gameName:e.game,one:{name:y[e.poll.options[0].label]||"???",votes:e.poll.options[0].votes,className:w[y[e.poll.options[0].label]||"???"]},two:{name:y[e.poll.options[1].label]||"???",votes:e.poll.options[1].votes,className:w[y[e.poll.options[1].label]||"???"]},winner:e.poll.options[0].votes>e.poll.options[1].votes?1:2,link:"https://twitter.com/geofftech/status/"+e.tweetId,today:"open"===e.poll.voting_status,venue:E[e.game]||"???"}}));return console.log("getUpdates DONE"),s}},{key:"getUpdatesOld",value:function(e){return{gameName:"unknown",one:{name:e[0],votes:0,className:w[e[0]]},two:{name:e[1],votes:0,className:w[e[1]]},winner:0,link:e[2].split("url=")[1],today:"true"===e[3],venue:e[4]}}},{key:"updateResults",value:function(){var e=Object(j.a)(d.a.mark((function e(){var t,s,n,a,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("UPDATING"),e.next=3,fetch("https://api.davwheat.dev/getpolls");case 3:return t=e.sent,e.next=6,t.json();case 6:s=e.sent,n=[this.getUpdatesOld(N[0])],a=[this.getUpdatesOld(C[0])],o={resultsKnockout:this.getUpdates(s,"knockout"),resultsQFinals:this.getUpdates(s,"quarter"),resultsSemiFinals:[].concat(Object(h.a)(this.getUpdates(s,"semi")),Object(h.a)(this.getUpdates(s,"unknown"))),resultsFinals:[].concat(Object(h.a)(this.getUpdates(s,"final")),n),resultsPlayoff:[].concat(Object(h.a)(this.getUpdates(s,"playoff")),a)},console.log("Setting state..."),this.setState(o),console.log("DONE");case 13:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsxs)("div",{className:"header",children:[Object(n.jsx)("h1",{children:"Tube Lines World Cup:"}),Object(n.jsx)("h5",{children:"Updated every 60 secs. Please view in landscape."}),Object(n.jsx)("h6",{children:"Note: if no votes are showing, the API this site uses has gone down and should be back up in a few mins."})]}),Object(n.jsx)("h3",{children:"Semifinals:"}),Object(n.jsx)(S,{results:this.state.resultsSemiFinals,allowVenues:!0}),Object(n.jsx)("h3",{children:"Today's games:"}),Object(n.jsx)("h6",{children:"Straight lines represent votes in the same match from previous years."}),Object(n.jsx)("h6",{children:"Thin grey lines represent the difference between options."}),this.state.resultsQFinals.filter((function(e){return e.today})).map((function(e){return"undefined"!==typeof e.venue&&"undefined"!==typeof Q[e.venue]?Object(n.jsx)(p.a,{className:"quotedReport",children:Object(n.jsx)("h5",{children:Q[e.venue]})}):null})),Object(n.jsx)(p.a,{children:Object(n.jsx)(f.a,{children:Object(n.jsx)(_,{results:[].concat(Object(h.a)(this.state.resultsQFinals),Object(h.a)(this.state.resultsKnockout),Object(h.a)(this.state.resultsSemiFinals)),history:this.state.resultsHistories})})}),Object(n.jsx)("h3",{children:"3rd/4th Playoff:"}),Object(n.jsx)(B,{results:this.state.resultsPlayoff,allowVenues:!0}),Object(n.jsx)("h3",{children:"THE FINAL:"}),Object(n.jsx)(B,{results:this.state.resultsFinals,allowVenues:!0}),Object(n.jsx)("h3",{children:"Quarterfinal Results:"}),Object(n.jsx)(S,{results:this.state.resultsQFinals,allowVenues:!0}),Object(n.jsx)("h3",{children:"Knockout stage results:"}),Object(n.jsx)(S,{results:this.state.resultsKnockout}),Object(n.jsx)("h3",{children:"Past games:"}),Object(n.jsx)(p.a,{children:this.state.pairedPastGames.map((function(t){var s=Object(c.a)(t,2),a=s[0],o=s[1];return Object(n.jsx)(f.a,{children:Object(n.jsx)(_,{results:"undefined"!==typeof o?[a,o]:[a],history:e.state.resultsHistories,isToday:!1})})}))}),Object(n.jsx)(O.a,{fixed:"bottom",children:Object(n.jsxs)(J.a,{enableDeclineButton:!0,declineButtonText:"No thanks",onAccept:function(){M(!1),window.location.reload()},onDecline:function(){M(!0),window.location.reload()},children:["This website uses cookies (via Google Analytics) for analytics.",Object(n.jsx)("a",{href:"/tube-world-cup/privacy.html",children:"View Privacy Policy"})]})}),Object(n.jsx)("footer",{children:Object(n.jsxs)(p.a,{children:["Created by @k_sam_mighty for ",Object(n.jsx)("a",{href:"https://twitter.com/geofftech",children:"Geoff Marshall's"})," World Cup of Tube Lines.",Object(n.jsx)("br",{}),"Find me (@k_sam_mighty) here:",Object(n.jsx)("br",{}),Object(n.jsxs)("a",{href:"https://github.com/Gum-Joe",children:[Object(n.jsx)(v.a,{icon:g.a})," Gum-Joe"]})," ",Object(n.jsx)("br",{}),Object(n.jsxs)("a",{href:"hhttps://twitter.com/official_gumjoe",children:[Object(n.jsx)(v.a,{icon:g.c})," @official_gumjoe"]})," ",Object(n.jsx)("br",{}),Object(n.jsxs)("a",{href:"https://www.instagram.com/k_sam_mighty",children:[Object(n.jsx)(v.a,{icon:g.b})," @k_sam_mighty"]})," ",Object(n.jsx)("br",{}),Object(n.jsxs)("a",{href:"https://www.youtube.com/channel/UCIwdVs7v-WL7_5erRzNv6sw",children:[Object(n.jsx)(v.a,{icon:g.d})," Gum Joe"]}),Object(n.jsx)("br",{}),"Special thanks to ",Object(n.jsx)("a",{href:"https://github.com/davwheat",children:"@davwheat"})," for the API, and ",Object(n.jsx)("a",{href:"https://twitter.com/_FlaiFlai",children:"@_FlaiFlai"})," for the original API.",Object(n.jsx)("br",{}),"Thank you to all the memebers of the community who contributed ideas!",Object(n.jsx)("br",{}),Object(n.jsx)("a",{href:"/tube-world-cup/privacy.html",children:"View Privacy Policy"})]})})]})}}]),s}(a.Component),Z=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,357)).then((function(t){var s=t.getCLS,n=t.getFID,a=t.getFCP,o=t.getLCP,i=t.getTTFB;s(e),n(e),a(e),o(e),i(e)}))};s(324);r.a.render(Object(n.jsx)(o.a.StrictMode,{children:Object(n.jsx)(q,{})}),document.getElementById("root")),Z()}},[[325,1,2]]]);
//# sourceMappingURL=main.974e8797.chunk.js.map