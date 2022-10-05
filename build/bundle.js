var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function a(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n||null)}function i(t){t.parentNode.removeChild(t)}function l(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function u(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function p(){return d(" ")}function m(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function f(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function h(t){return""===t?null:+t}function v(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function g(t,e){t.value=null==e?"":e}function A(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}t.selectedIndex=-1}let $;function b(t){$=t}const N=[],x=[],L=[],_=[],O=Promise.resolve();let y=!1;function E(t){L.push(t)}const z=new Set;let C=0;function S(){const t=$;do{for(;C<N.length;){const t=N[C];C++,b(t),I(t.$$)}for(b(null),N.length=0,C=0;x.length;)x.pop()();for(let t=0;t<L.length;t+=1){const e=L[t];z.has(e)||(z.add(e),e())}L.length=0}while(N.length);for(;_.length;)_.pop()();y=!1,z.clear(),b(t)}function I(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(E)}}const R=new Set;function F(t,e){t&&t.i&&(R.delete(t),t.i(e))}function M(t,e,n,o){if(t&&t.o){if(R.has(t))return;R.add(t),undefined.c.push((()=>{R.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}function T(t){t&&t.c()}function P(t,n,s,a){const{fragment:c,on_mount:i,on_destroy:l,after_update:u}=t.$$;c&&c.m(n,s),a||E((()=>{const n=i.map(e).filter(r);l?l.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(E)}function D(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function H(t,e){-1===t.$$.dirty[0]&&(N.push(t),y||(y=!0,O.then(S)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function B(e,r,s,a,c,l,u,d=[-1]){const p=$;b(e);const m=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(p?p.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:r.target||p.$$.root};u&&u(m.root);let f=!1;if(m.ctx=s?s(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return m.ctx&&c(m.ctx[t],m.ctx[t]=r)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](r),f&&H(e,t)),n})):[],m.update(),f=!0,o(m.before_update),m.fragment=!!a&&a(m.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);m.fragment&&m.fragment.l(t),t.forEach(i)}else m.fragment&&m.fragment.c();r.intro&&F(e.$$.fragment),P(e,r.target,r.anchor,r.customElement),S()}b(p)}class U{$destroy(){D(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const k=[];function w(e,n=t){let o;const r=new Set;function a(t){if(s(e,t)&&(e=t,o)){const t=!k.length;for(const t of r)t[1](),k.push(t,e);if(t){for(let t=0;t<k.length;t+=2)k[t][0](k[t+1]);k.length=0}}}return{set:a,update:function(t){a(t(e))},subscribe:function(s,c=t){const i=[s,c];return r.add(i),1===r.size&&(o=n(a)||t),s(e),()=>{r.delete(i),0===r.size&&(o(),o=null)}}}}const G={subscribe:w({comparisons:[{name:"Arroz",price:17,amount:5,points:75},{name:"Feijão",price:6,amount:1,points:15},{name:"Leite",price:7,amount:1,points:10},{name:"Óleo",price:8,amount:1,points:10},{name:"Macarrão",price:8,amount:2,points:10},{name:"Lacre",price:100,amount:20,points:3400}],expenses:[{store:"Requetelo",item:"Bandeira",price:100,amount:1},{store:"Santa Helena",item:"Cano PVC",price:12,amount:1},{store:"Usadão Bady",item:"Garrafas Pets",price:.3,amount:80},{store:"Centro de Reciclagem",item:"Lacres",price:5,amount:30},{store:"Tema Print",item:"Posters",price:23,amount:2},{store:"Papelaria Central",item:"Bilhetes",price:18,amount:1}],donators:[{name:"MARIA NÍVEA 6° ANO",donation:0},{name:"MATHEUS 6° ANO",donation:0},{name:"MIGUEL 6° ANO",donation:0},{name:"RAFAEL 6º ANO",donation:0},{name:"VALENTINA 6° ANO",donation:0},{name:"ISABELLE 6° ANO",donation:0},{name:"AGATHA 7° ANO",donation:0},{name:"BETHINA 7º ANO",donation:0},{name:"ENZO 7° ANO",donation:20},{name:"FELIPE 7º ANO",donation:20},{name:"GABRIELLA 7° ANO",donation:20},{name:"JOÃO MATEUS 7° ANO",donation:30},{name:"WARLLEY 7° ANO",donation:0},{name:"LUCAS 8º ANO",donation:20},{name:"LUÍS FELIPE 8º ANO",donation:20},{name:"LUIZA 8° ANO",donation:0},{name:"MARIA CLARA 8° ANO",donation:20},{name:"MARIA FERNANDA 8° ANO",donation:50},{name:"MARIANA 8° ANO",donation:20},{name:"MATHEUS 8° ANO",donation:20},{name:"THÉO 8° ANO",donation:20},{name:"ANGELINA 9° ANO",donation:0},{name:"DANITCHELE 9° ANO",donation:20},{name:"EDUARDO 9° ANO",donation:20},{name:"GIOVANNA 9° ANO",donation:0},{name:"GUILHERME 9º ANO",donation:20},{name:"ENZO 1° MÉDIO",donation:80},{name:"MATHEUS 1° MÉDIO",donation:50}]},j).subscribe};var j;function q(t,e,n){const o=t.slice();return o[8]=e[n].name,o[9]=e[n].price,o[10]=e[n].amount,o[11]=e[n].points,o}function V(t){let e,n,o,r,s,l,m,h,g,A,$,b,N,x,L,_=t[8]+"",O=t[9]+"",y=t[10]+"",E=t[11]+"";return{c(){e=u("tr"),n=u("td"),o=d(_),r=p(),s=u("td"),l=d("R$"),m=d(O),h=d(",00"),g=p(),A=u("td"),$=d(y),b=p(),N=u("td"),x=d(E),L=p(),f(n,"class","svelte-15zvcps"),f(s,"class","svelte-15zvcps"),f(A,"class","svelte-15zvcps"),f(N,"class","svelte-15zvcps")},m(t,i){c(t,e,i),a(e,n),a(n,o),a(e,r),a(e,s),a(s,l),a(s,m),a(s,h),a(e,g),a(e,A),a(A,$),a(e,b),a(e,N),a(N,x),a(e,L)},p(t,e){1&e&&_!==(_=t[8]+"")&&v(o,_),1&e&&O!==(O=t[9]+"")&&v(m,O),1&e&&y!==(y=t[10]+"")&&v($,y),1&e&&E!==(E=t[11]+"")&&v(x,E)},d(t){t&&i(e)}}}function Q(e){let n,r,s,d,v,$,b,N,x,L,_,O,y,z,C,S,I,R,F=e[0],M=[];for(let t=0;t<F.length;t+=1)M[t]=V(q(e,F,t));return{c(){n=u("div"),r=u("h1"),r.textContent="Comparador",s=p(),d=u("p"),d.textContent="Aqui você pode alterar os valores e fazer as comparações necessárias",v=p(),$=u("select"),b=u("option"),b.textContent="Padrão",N=u("option"),N.textContent="Preço",x=u("option"),x.textContent="Quantidade",L=u("option"),L.textContent="Pontos",_=p(),O=u("input"),y=p(),z=u("table"),C=u("tr"),C.innerHTML='<th class="svelte-15zvcps">Nome</th> \n    \t\t<th class="svelte-15zvcps">Preço</th> \n    \t\t<th class="svelte-15zvcps">Quantidade</th> \n    \t\t<th class="svelte-15zvcps">Pontos</th>',S=p();for(let t=0;t<M.length;t+=1)M[t].c();b.__value="default",b.value=b.__value,N.__value="price",N.value=N.__value,x.__value="amount",x.value=x.__value,L.__value="points",L.value=L.__value,void 0===e[1]&&E((()=>e[4].call($))),f(O,"type","number"),f(z,"class","svelte-15zvcps")},m(t,o){c(t,n,o),a(n,r),a(n,s),a(n,d),a(n,v),a(n,$),a($,b),a($,N),a($,x),a($,L),A($,e[1]),a(n,_),a(n,O),g(O,e[2]),a(n,y),a(n,z),a(z,C),a(z,S);for(let t=0;t<M.length;t+=1)M[t].m(z,null);I||(R=[m($,"change",e[4]),m($,"change",e[3]),m(O,"input",e[5]),m(O,"input",e[3])],I=!0)},p(t,[e]){if(2&e&&A($,t[1]),4&e&&h(O.value)!==t[2]&&g(O,t[2]),1&e){let n;for(F=t[0],n=0;n<F.length;n+=1){const o=q(t,F,n);M[n]?M[n].p(o,e):(M[n]=V(o),M[n].c(),M[n].m(z,null))}for(;n<M.length;n+=1)M[n].d(1);M.length=F.length}},i:t,o:t,d(t){t&&i(n),l(M,t),I=!1,o(R)}}}function Z(t,e){let{name:n}=t;return{name:n,price:e,amount:Y(t.price,t.amount)(e).toFixed(0),points:Y(t.price,t.points)(e).toFixed(0)}}function J(t,e){let{name:n}=t;return{name:n,price:Y(t.amount,t.price)(e).toFixed(0),amount:e,points:Y(t.amount,t.points)(e).toFixed(0)}}function W(t,e){let{name:n}=t;return{name:n,price:Y(t.points,t.price)(e).toFixed(0),amount:Y(t.points,t.amount)(e).toFixed(0),points:e}}function Y(t,e){return n=>n*e/t}function K(t,e,n){let o,r;G.subscribe((t=>o=n(0,r=t.comparisons)));let s="default",a=0;return[r,s,a,function(){return"default"==s||0==a||null==a?n(0,r=o):void n(0,r=function(t,e){const n={price:Z,amount:J,points:W};return o.map((o=>n[t](o,e)))}(s,a))},function(){s=function(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}(this),n(1,s)},function(){a=h(this.value),n(2,a)}]}class X extends U{constructor(t){super(),B(this,t,K,Q,s,{})}}function tt(t,e,n){const o=t.slice();return o[3]=e[n].store,o[4]=e[n].item,o[5]=e[n].price,o[6]=e[n].amount,o}function et(t){let e,n,o,r,s,l,m,h,g,A,$,b,N,x,L,_=t[4]+"",O=t[5].toLocaleString("pt-br",{minimumFractionDigits:2,style:"currency",currency:"BRL"})+"",y=t[6]+"",E=t[5]*t[6]+"";return{c(){e=u("tr"),n=u("td"),o=d(_),r=p(),s=u("td"),l=d(O),m=p(),h=u("td"),g=d(y),A=p(),$=u("td"),b=d("R$"),N=d(E),x=d(",00"),L=p(),f(n,"class","svelte-15zvcps"),f(s,"class","svelte-15zvcps"),f(h,"class","svelte-15zvcps"),f($,"class","svelte-15zvcps")},m(t,i){c(t,e,i),a(e,n),a(n,o),a(e,r),a(e,s),a(s,l),a(e,m),a(e,h),a(h,g),a(e,A),a(e,$),a($,b),a($,N),a($,x),a(e,L)},p(t,e){1&e&&_!==(_=t[4]+"")&&v(o,_),1&e&&O!==(O=t[5].toLocaleString("pt-br",{minimumFractionDigits:2,style:"currency",currency:"BRL"})+"")&&v(l,O),1&e&&y!==(y=t[6]+"")&&v(g,y),1&e&&E!==(E=t[5]*t[6]+"")&&v(N,E)},d(t){t&&i(e)}}}function nt(e){let n,o,r,s,d,m,h,v,g,A,$=e[0],b=[];for(let t=0;t<$.length;t+=1)b[t]=et(tt(e,$,t));return{c(){n=u("div"),o=u("h1"),o.textContent="Gastos",r=p(),s=u("p"),s.textContent="Recibo de todos os gastos ( Não necessariamente realizados )",d=p(),m=u("p"),m.textContent=`Total: ${e[1].toLocaleString("pt-br",{minimumFractionDigits:2,style:"currency",currency:"BRL"})}`,h=p(),v=u("table"),g=u("tr"),g.innerHTML='<th class="svelte-15zvcps">Item</th> \n\t\t<th class="svelte-15zvcps">Preço</th> \n\t\t<th class="svelte-15zvcps">Quantidade</th> \n        <th class="svelte-15zvcps">Total</th>',A=p();for(let t=0;t<b.length;t+=1)b[t].c();f(v,"class","svelte-15zvcps")},m(t,e){c(t,n,e),a(n,o),a(n,r),a(n,s),a(n,d),a(n,m),a(n,h),a(n,v),a(v,g),a(v,A);for(let t=0;t<b.length;t+=1)b[t].m(v,null)},p(t,[e]){if(1&e){let n;for($=t[0],n=0;n<$.length;n+=1){const o=tt(t,$,n);b[n]?b[n].p(o,e):(b[n]=et(o),b[n].c(),b[n].m(v,null))}for(;n<b.length;n+=1)b[n].d(1);b.length=$.length}},i:t,o:t,d(t){t&&i(n),l(b,t)}}}function ot(t,e,n){let o;G.subscribe((t=>n(0,o=t.expenses)));let r=o.reduce(((t,e)=>t+e.price*e.amount),0);return[o,r]}class rt extends U{constructor(t){super(),B(this,t,ot,nt,s,{})}}function st(t,e,n){const o=t.slice();return o[6]=e[n].name,o[7]=e[n].donation,o}function at(t){let e,n,o,r,s,l,m,h,g,A,$,b,N,x,L=t[6]+"",_=t[7].toLocaleString("pt-br",t[1])+"",O=(100*t[7]/t[2]).toFixed(2)+"",y=(t[7]-t[4]).toLocaleString("pt-br",t[1])+"";return{c(){e=u("tr"),n=u("td"),o=d(L),r=p(),s=u("td"),l=d(_),m=p(),h=u("td"),g=d(O),A=d("%"),$=p(),b=u("td"),N=d(y),x=p(),f(n,"class","svelte-15zvcps"),f(s,"class","svelte-15zvcps"),f(h,"class","svelte-15zvcps"),f(b,"class","svelte-15zvcps")},m(t,i){c(t,e,i),a(e,n),a(n,o),a(e,r),a(e,s),a(s,l),a(e,m),a(e,h),a(h,g),a(h,A),a(e,$),a(e,b),a(b,N),a(e,x)},p(t,e){1&e&&L!==(L=t[6]+"")&&v(o,L),1&e&&_!==(_=t[7].toLocaleString("pt-br",t[1])+"")&&v(l,_),1&e&&O!==(O=(100*t[7]/t[2]).toFixed(2)+"")&&v(g,O),1&e&&y!==(y=(t[7]-t[4]).toLocaleString("pt-br",t[1])+"")&&v(N,y)},d(t){t&&i(e)}}}function ct(e){let n,o,r,s,d,m,h,v,g,A,$=e[0],b=[];for(let t=0;t<$.length;t+=1)b[t]=at(st(e,$,t));return{c(){n=u("div"),o=u("h1"),o.textContent="Controle de Fundos",r=p(),s=u("p"),s.textContent=`Arrecadações: ${e[2].toLocaleString("pt-br",e[1])}`,d=p(),m=u("p"),m.textContent=`Despesas: ${e[3].toLocaleString("pt-br",e[1])}`,h=p(),v=u("table"),g=u("tr"),g.innerHTML='<th class="svelte-15zvcps">Nome</th> \n            <th class="svelte-15zvcps">Doação</th> \n            <th class="svelte-15zvcps">Parcela</th> \n            <th class="svelte-15zvcps">Cashback</th>',A=p();for(let t=0;t<b.length;t+=1)b[t].c();f(v,"class","svelte-15zvcps")},m(t,e){c(t,n,e),a(n,o),a(n,r),a(n,s),a(n,d),a(n,m),a(n,h),a(n,v),a(v,g),a(v,A);for(let t=0;t<b.length;t+=1)b[t].m(v,null)},p(t,[e]){if(23&e){let n;for($=t[0],n=0;n<$.length;n+=1){const o=st(t,$,n);b[n]?b[n].p(o,e):(b[n]=at(o),b[n].c(),b[n].m(v,null))}for(;n<b.length;n+=1)b[n].d(1);b.length=$.length}},i:t,o:t,d(t){t&&i(n),l(b,t)}}}function it(t,e,n){let o,r;G.subscribe((t=>{n(0,o=t.donators),r=t.expenses}));let s=o.reduce(((t,e)=>t+e.donation),0),a=r.reduce(((t,e)=>t+e.price*e.amount),0),c=a/o.length;return t.$$.update=()=>{1&t.$$.dirty&&o.sort(((t,e)=>e.donation-t.donation))},[o,{minimumFractionDigits:2,style:"currency",currency:"BRL"},s,a,c]}class lt extends U{constructor(t){super(),B(this,t,it,ct,s,{})}}function ut(e){let n,o,r,s,a,l;return n=new X({}),r=new rt({}),a=new lt({}),{c(){T(n.$$.fragment),o=p(),T(r.$$.fragment),s=p(),T(a.$$.fragment)},m(t,e){P(n,t,e),c(t,o,e),P(r,t,e),c(t,s,e),P(a,t,e),l=!0},p:t,i(t){l||(F(n.$$.fragment,t),F(r.$$.fragment,t),F(a.$$.fragment,t),l=!0)},o(t){M(n.$$.fragment,t),M(r.$$.fragment,t),M(a.$$.fragment,t),l=!1},d(t){D(n,t),t&&i(o),D(r,t),t&&i(s),D(a,t)}}}return new class extends U{constructor(t){super(),B(this,t,null,ut,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
