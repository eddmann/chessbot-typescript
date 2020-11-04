(this["webpackJsonpchessbot-typescript"]=this["webpackJsonpchessbot-typescript"]||[]).push([[0],{10:function(e,t,n){"use strict";var o=n(2),s=n.n(o),a=function(e,t){return function(){var n=new Worker(e),o=null;return n.addEventListener("message",(function(e){var t=e.data.match(/^bestmove\s([a-h][1-8])([a-h][1-8])/);t&&o&&(o({from:t[1],to:t[2]}),o=null)})),function(e){return new Promise((function(s,a){o?a("Pending move is present"):(o=s,n.postMessage("ucinewgame"),n.postMessage("position fen ".concat(e)),t.forEach((function(e){return n.postMessage(e)})))}))}}},c={Random:function(){return function(e){return new Promise((function(t){var n=s()(e).moves({verbose:!0}),o=n[Math.floor(Math.random()*n.length)],a=o.from,c=o.to;setTimeout((function(){return t({from:a,to:c})}),500)}))}},"nmrugg/stockfish (l:1,d:10)":a("bots/stockfish.js-10.0.2/stockfish.js",["setoption name Skill Level value 1","go depth 10"]),"nmrugg/stockfish (l:20,d:10)":a("bots/stockfish.js-10.0.2/stockfish.js",["setoption name Skill Level value 20","go depth 10"]),"nmrugg/stockfish (l:20,t:1s)":a("bots/stockfish.js-10.0.2/stockfish.js",["setoption name Skill Level value 20","go movetime 1000"]),"op12no2/lozza (l:1,d:10)":a("bots/lozza-1.18/lozza.js",["setoption name Skill Level value 1","go depth 10"]),"op12no2/lozza (l:20,d:10)":a("bots/lozza-1.18/lozza.js",["setoption name Skill Level value 20","go depth 10"]),"op12no2/lozza (l:20,t:1s)":a("bots/lozza-1.18/lozza.js",["setoption name Skill Level value 20","go movetime 1000"])};t.a=c},12:function(e,t,n){"use strict";var o=n(11),s=n(4),a=n(0),c=n(1),r=n(9),i=n.n(r),l=n(2),u=n.n(l),b=function(){return"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},f=function(e){return"b"===u()(e).turn()},j=function(e){return"w"===u()(e).turn()},v=n(3),d=n.n(v),m=function(e){var t=e.playerName,n=e.availableBots,o=e.selectedBot,s=e.setSelectedBot,c=e.disabled;return Object(a.jsxs)("div",{className:d.a.BotSelector,children:[Object(a.jsx)("label",{children:t}),Object(a.jsxs)("select",{value:null===o||void 0===o?void 0:o.name,onChange:function(e){var t=e.target.value;s(t?{name:t,move:n[t]()}:null)},disabled:c,children:[Object(a.jsx)("option",{value:"",children:"User"},"User"),Object.keys(n).map((function(e){return Object(a.jsx)("option",{children:e},e)}))]})]})},p=function(e){var t=e.history,n=Object(c.useRef)(null);return Object(c.useEffect)((function(){var e;null===(e=n.current)||void 0===e||e.scrollIntoView()}),[t]),Object(a.jsxs)("pre",{className:d.a.History,children:[t.map((function(e){var t=e.color,n=e.piece,o=e.from,s=e.san;return"".concat(t).concat(n).concat(o," ").concat(s)})).join("\n"),Object(a.jsx)("div",{ref:n})]})};t.a=function(e){var t=e.bots,n=e.onGameCompleted,r=Object(c.useState)(!1),l=Object(s.a)(r,2),v=l[0],h=l[1],O=Object(c.useState)(b),g=Object(s.a)(O,2),k=g[0],x=g[1],B=Object(c.useState)([]),S=Object(s.a)(B,2),_=S[0],y=S[1],z=Object(c.useState)(null),N=Object(s.a)(z,2),w=N[0],P=N[1],C=Object(c.useState)(null),q=Object(s.a)(C,2),L=q[0],M=q[1],R=function(){h(!1),x(b),y([])},E=Object(c.useCallback)((function(e,t,a){var c=function(e,t,n){var o=u()(e),s=o.move({from:t,to:n,promotion:"q"});return s?[o.fen(),s]:null}(e,t,a);if(c){var r=Object(s.a)(c,2),i=r[0],l=r[1];if(function(e){return u()(e).game_over()}(i))return n(function(e){var t=u()(e);return t.in_checkmate()?"w"===t.turn()?"b":"w":null}(i)),void R();x(i),y((function(e){return[].concat(Object(o.a)(e),[l])}))}}),[n]);return Object(c.useEffect)((function(){if(v){var e=!0;return w&&j(k)&&w.move(k).then((function(t){var n=t.from,o=t.to;e&&E(k,n,o)})),L&&f(k)&&L.move(k).then((function(t){var n=t.from,o=t.to;e&&E(k,n,o)})),function(){e=!1}}}),[v,k,w,L,E]),Object(a.jsxs)("div",{className:d.a.App,children:[Object(a.jsx)("header",{children:Object(a.jsx)("h1",{children:"\u265b Chessbot"})}),Object(a.jsxs)("div",{className:d.a.TopNav,children:[Object(a.jsx)(m,{playerName:"White",availableBots:t,selectedBot:w,setSelectedBot:P,disabled:v}),Object(a.jsx)(m,{playerName:"Black",availableBots:t,selectedBot:L,setSelectedBot:M,disabled:v}),Object(a.jsx)("button",{className:d.a.Button,onClick:function(){return h((function(e){return!e}))},children:v?"Pause":"Play"}),Object(a.jsx)("button",{className:d.a.Button,onClick:R,children:"Reset"})]}),Object(a.jsx)("div",{className:d.a.Chessboard,children:Object(a.jsx)(i.a,{position:k,allowDrag:function(e){var t=e.sourceSquare,n=w&&j(k),o=L&&f(k);return v&&function(e,t){return new u.a(e).moves({square:t}).length>0}(k,t)&&!(n||o)},onDrop:function(e){var t=e.sourceSquare,n=e.targetSquare;E(k,t,n)}})}),Object(a.jsx)(p,{history:_})]})}},13:function(e,t,n){"use strict";n.r(t),function(e){var t=n(0),o=n(1),s=n.n(o),a=n(8),c=n.n(a),r=n(12),i=n(10);n(23);c.a.render(Object(t.jsx)(s.a.StrictMode,{children:Object(t.jsx)(r.a,{bots:i.a,onGameCompleted:function(t){e.alert("".concat("b"===t?"Black":"w"===t?"White":"No one"," is the winner!"))}})}),document.getElementById("root"))}.call(this,n(14))},23:function(e,t,n){},3:function(e,t,n){e.exports={App:"styles_App__fFNuF",TopNav:"styles_TopNav__3Zi02",Button:"styles_Button__3HbKX",BotSelector:"styles_BotSelector__1sHbn",Chessboard:"styles_Chessboard__owj1A",History:"styles_History__7Rgl8"}}},[[13,1,2]]]);
//# sourceMappingURL=main.455b9a83.chunk.js.map