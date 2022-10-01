var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function s(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function l(t){t.parentNode.removeChild(t)}function i(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function u(t){return document.createElement(t)}function p(t){return document.createTextNode(t)}function f(){return p(" ")}function d(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function m(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function h(t){return""===t?null:+t}function v(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function g(t,e){t.value=null==e?"":e}function $(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}t.selectedIndex=-1}let _;function x(t){_=t}const y=[],b=[],z=[],C=[],L=Promise.resolve();let F=!1;function P(t){z.push(t)}const k=new Set;let S=0;function w(){const t=_;do{for(;S<y.length;){const t=y[S];S++,x(t),E(t.$$)}for(x(null),y.length=0,S=0;b.length;)b.pop()();for(let t=0;t<z.length;t+=1){const e=z[t];k.has(e)||(k.add(e),e())}z.length=0}while(y.length);for(;C.length;)C.pop()();F=!1,k.clear(),x(t)}function E(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}const R=new Set;function B(t,e){t&&t.i&&(R.delete(t),t.i(e))}function M(t,e,n,o){if(t&&t.o){if(R.has(t))return;R.add(t),undefined.c.push((()=>{R.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}function T(t){t&&t.c()}function A(t,n,c,s){const{fragment:a,on_mount:l,on_destroy:i,after_update:u}=t.$$;a&&a.m(n,c),s||P((()=>{const n=l.map(e).filter(r);i?i.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(P)}function D(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function H(t,e){-1===t.$$.dirty[0]&&(y.push(t),F||(F=!0,L.then(w)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function N(e,r,c,s,a,i,u,p=[-1]){const f=_;x(e);const d=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(f?f.$$.context:[])),callbacks:n(),dirty:p,skip_bound:!1,root:r.target||f.$$.root};u&&u(d.root);let m=!1;if(d.ctx=c?c(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return d.ctx&&a(d.ctx[t],d.ctx[t]=r)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](r),m&&H(e,t)),n})):[],d.update(),m=!0,o(d.before_update),d.fragment=!!s&&s(d.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);d.fragment&&d.fragment.l(t),t.forEach(l)}else d.fragment&&d.fragment.c();r.intro&&B(e.$$.fragment),A(e,r.target,r.anchor,r.customElement),w()}x(f)}class j{$destroy(){D(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function q(t,e,n){const o=t.slice();return o[8]=e[n].name,o[9]=e[n].price,o[10]=e[n].amount,o[11]=e[n].points,o}function G(t){let e,n,o,r,c,i,d,h,g,$,_,x,y,b,z,C=t[8]+"",L=t[9]+"",F=t[10]+"",P=t[11]+"";return{c(){e=u("tr"),n=u("td"),o=p(C),r=f(),c=u("td"),i=p("R$"),d=p(L),h=p(",00"),g=f(),$=u("td"),_=p(F),x=f(),y=u("td"),b=p(P),z=f(),m(n,"class","svelte-15zvcps"),m(c,"class","svelte-15zvcps"),m($,"class","svelte-15zvcps"),m(y,"class","svelte-15zvcps")},m(t,l){a(t,e,l),s(e,n),s(n,o),s(e,r),s(e,c),s(c,i),s(c,d),s(c,h),s(e,g),s(e,$),s($,_),s(e,x),s(e,y),s(y,b),s(e,z)},p(t,e){1&e&&C!==(C=t[8]+"")&&v(o,C),1&e&&L!==(L=t[9]+"")&&v(d,L),1&e&&F!==(F=t[10]+"")&&v(_,F),1&e&&P!==(P=t[11]+"")&&v(b,P)},d(t){t&&l(e)}}}function O(e){let n,r,c,p,v,_,x,y,b,z,C,L,F,k,S,w,E=e[0],R=[];for(let t=0;t<E.length;t+=1)R[t]=G(q(e,E,t));return{c(){n=u("div"),r=u("h1"),r.textContent="Comparador",c=f(),p=u("select"),v=u("option"),v.textContent="Padrão",_=u("option"),_.textContent="Preço",x=u("option"),x.textContent="Quantidade",y=u("option"),y.textContent="Pontos",b=f(),z=u("input"),C=f(),L=u("table"),F=u("tr"),F.innerHTML='<th class="svelte-15zvcps">Nome</th> \n\t\t<th class="svelte-15zvcps">Preço</th> \n\t\t<th class="svelte-15zvcps">Quantidade</th> \n\t\t<th class="svelte-15zvcps">Pontos</th>',k=f();for(let t=0;t<R.length;t+=1)R[t].c();v.__value="default",v.value=v.__value,_.__value="price",_.value=_.__value,x.__value="amount",x.value=x.__value,y.__value="points",y.value=y.__value,void 0===e[1]&&P((()=>e[4].call(p))),m(z,"type","number"),m(L,"class","svelte-15zvcps")},m(t,o){a(t,n,o),s(n,r),s(n,c),s(n,p),s(p,v),s(p,_),s(p,x),s(p,y),$(p,e[1]),s(n,b),s(n,z),g(z,e[2]),s(n,C),s(n,L),s(L,F),s(L,k);for(let t=0;t<R.length;t+=1)R[t].m(L,null);S||(w=[d(p,"change",e[4]),d(p,"change",e[3]),d(z,"input",e[5]),d(z,"input",e[3])],S=!0)},p(t,[e]){if(2&e&&$(p,t[1]),4&e&&h(z.value)!==t[2]&&g(z,t[2]),1&e){let n;for(E=t[0],n=0;n<E.length;n+=1){const o=q(t,E,n);R[n]?R[n].p(o,e):(R[n]=G(o),R[n].c(),R[n].m(L,null))}for(;n<R.length;n+=1)R[n].d(1);R.length=E.length}},i:t,o:t,d(t){t&&l(n),i(R,t),S=!1,o(w)}}}function Q(t,e){let{name:n}=t;return{name:n,price:e,amount:V(t.price,t.amount)(e).toFixed(0),points:V(t.price,t.points)(e).toFixed(0)}}function I(t,e){let{name:n}=t;return{name:n,price:V(t.amount,t.price)(e).toFixed(0),amount:e,points:V(t.amount,t.points)(e).toFixed(0)}}function U(t,e){let{name:n}=t;return{name:n,price:V(t.points,t.price)(e).toFixed(0),amount:V(t.points,t.amount)(e).toFixed(0),points:e}}function V(t,e){return n=>n*e/t}function J(t,e,n){let o=[{name:"Arroz",price:17,amount:5,points:75},{name:"Feijão",price:6,amount:1,points:15},{name:"Leite",price:7,amount:1,points:10},{name:"Óleo",price:8,amount:1,points:10},{name:"Macarrão",price:8,amount:2,points:10},{name:"Lacre",price:100,amount:20,points:3400}],r=o,c="default",s=0;return[r,c,s,function(){return"default"==c||0==s||null==s?n(0,r=o):void n(0,r=function(t,e){const n={price:Q,amount:I,points:U};return o.map((o=>n[t](o,e)))}(c,s))},function(){c=function(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}(this),n(1,c)},function(){s=h(this.value),n(2,s)}]}class K extends j{constructor(t){super(),N(this,t,J,O,c,{})}}function W(t,e,n){const o=t.slice();return o[3]=e[n].store,o[4]=e[n].item,o[5]=e[n].price,o[6]=e[n].amount,o}function X(e){let n,o,r,c,i,d,h,v,g,$,_,x,y,b,z,C=e[4]+"",L=e[5].toLocaleString("pt-br",{minimumFractionDigits:2,style:"currency",currency:"BRL"})+"",F=e[6]+"",P=e[5]*e[6]+"";return{c(){n=u("tr"),o=u("td"),r=p(C),c=f(),i=u("td"),d=p(L),h=f(),v=u("td"),g=p(F),$=f(),_=u("td"),x=p("R$"),y=p(P),b=p(",00"),z=f(),m(o,"class","svelte-15zvcps"),m(i,"class","svelte-15zvcps"),m(v,"class","svelte-15zvcps"),m(_,"class","svelte-15zvcps")},m(t,e){a(t,n,e),s(n,o),s(o,r),s(n,c),s(n,i),s(i,d),s(n,h),s(n,v),s(v,g),s(n,$),s(n,_),s(_,x),s(_,y),s(_,b),s(n,z)},p:t,d(t){t&&l(n)}}}function Y(e){let n,o,r,c,p,d,h,v,g=e[0],$=[];for(let t=0;t<g.length;t+=1)$[t]=X(W(e,g,t));return{c(){n=u("div"),o=u("h1"),o.textContent="Gastos",r=f(),c=u("p"),c.textContent=`Total: ${e[1].toLocaleString("pt-br",{minimumFractionDigits:2,style:"currency",currency:"BRL"})}`,p=f(),d=u("table"),h=u("tr"),h.innerHTML='<th class="svelte-15zvcps">Item</th> \n\t\t<th class="svelte-15zvcps">Preço</th> \n\t\t<th class="svelte-15zvcps">Quantidade</th> \n        <th class="svelte-15zvcps">Total</th>',v=f();for(let t=0;t<$.length;t+=1)$[t].c();m(d,"class","svelte-15zvcps")},m(t,e){a(t,n,e),s(n,o),s(n,r),s(n,c),s(n,p),s(n,d),s(d,h),s(d,v);for(let t=0;t<$.length;t+=1)$[t].m(d,null)},p(t,[e]){if(1&e){let n;for(g=t[0],n=0;n<g.length;n+=1){const o=W(t,g,n);$[n]?$[n].p(o,e):($[n]=X(o),$[n].c(),$[n].m(d,null))}for(;n<$.length;n+=1)$[n].d(1);$.length=g.length}},i:t,o:t,d(t){t&&l(n),i($,t)}}}function Z(t){let e=[{store:"Requetelo",item:"Bandeira",price:100,amount:1},{store:"Santa Helena",item:"Cano PVC",price:10,amount:1},{store:"Usadão Bady",item:"Garrafas Pets",price:.3,amount:80},{store:"Centro de Reciclagem",item:"Lacres",price:5,amount:40}],n=e.reduce(((t,e)=>t+e.price*e.amount),0);return[e,n]}class tt extends j{constructor(t){super(),N(this,t,Z,Y,c,{})}}function et(t,e,n){const o=t.slice();return o[6]=e[n].name,o[7]=e[n].donation,o}function nt(e){let n,o,r,c,i,d,h,v,g,$,_,x,y,b,z=e[6]+"",C=e[7]+"",L=(100*e[7]/e[2]).toFixed(2)+"",F=(e[7]/e[2]*e[4]).toLocaleString("pt-br",e[1])+"";return{c(){n=u("tr"),o=u("td"),r=p(z),c=f(),i=u("td"),d=p(C),h=f(),v=u("td"),g=p(L),$=p("%"),_=f(),x=u("td"),y=p(F),b=f(),m(o,"class","svelte-15zvcps"),m(i,"class","svelte-15zvcps"),m(v,"class","svelte-15zvcps"),m(x,"class","svelte-15zvcps")},m(t,e){a(t,n,e),s(n,o),s(o,r),s(n,c),s(n,i),s(i,d),s(n,h),s(n,v),s(v,g),s(v,$),s(n,_),s(n,x),s(x,y),s(n,b)},p:t,d(t){t&&l(n)}}}function ot(e){let n,o,r,c,p,d,h,v,g,$,_=e[0],x=[];for(let t=0;t<_.length;t+=1)x[t]=nt(et(e,_,t));return{c(){n=u("div"),o=u("h1"),o.textContent="Controle de Fundos",r=f(),c=u("p"),c.textContent=`Arrecadações: ${e[2].toLocaleString("pt-br",e[1])}`,p=f(),d=u("p"),d.textContent=`Despesas: ${e[3].toLocaleString("pt-br",e[1])}`,h=f(),v=u("table"),g=u("tr"),g.innerHTML='<th class="svelte-15zvcps">Nome</th> \n            <th class="svelte-15zvcps">Doação</th> \n            <th class="svelte-15zvcps">Parcela</th> \n            <th class="svelte-15zvcps">Cashback</th>',$=f();for(let t=0;t<x.length;t+=1)x[t].c();m(v,"class","svelte-15zvcps")},m(t,e){a(t,n,e),s(n,o),s(n,r),s(n,c),s(n,p),s(n,d),s(n,h),s(n,v),s(v,g),s(v,$);for(let t=0;t<x.length;t+=1)x[t].m(v,null)},p(t,[e]){if(23&e){let n;for(_=t[0],n=0;n<_.length;n+=1){const o=et(t,_,n);x[n]?x[n].p(o,e):(x[n]=nt(o),x[n].c(),x[n].m(v,null))}for(;n<x.length;n+=1)x[n].d(1);x.length=_.length}},i:t,o:t,d(t){t&&l(n),i(x,t)}}}function rt(t){let e=[{name:"Enzo",donation:20},{name:"Maria Fernanda",donation:50},{name:"Mariana",donation:20}],n=e.reduce(((t,e)=>t+e.donation),0),o=[{store:"Requetelo",item:"Bandeira",price:100,amount:1},{store:"Santa Helena",item:"Cano PVC",price:10,amount:1},{store:"Usadão Bady",item:"Garrafas Pets",price:.3,amount:80},{store:"Centro de Reciclagem",item:"Lacres",price:5,amount:40}].reduce(((t,e)=>t+e.price*e.amount),0),r=n-o;return console.log({revenue:n,expenses:o,remaining:r}),[e,{minimumFractionDigits:2,style:"currency",currency:"BRL"},n,o,r]}class ct extends j{constructor(t){super(),N(this,t,rt,ot,c,{})}}function st(e){let n,o,r,c,s,i;return n=new K({}),r=new tt({}),s=new ct({}),{c(){T(n.$$.fragment),o=f(),T(r.$$.fragment),c=f(),T(s.$$.fragment)},m(t,e){A(n,t,e),a(t,o,e),A(r,t,e),a(t,c,e),A(s,t,e),i=!0},p:t,i(t){i||(B(n.$$.fragment,t),B(r.$$.fragment,t),B(s.$$.fragment,t),i=!0)},o(t){M(n.$$.fragment,t),M(r.$$.fragment,t),M(s.$$.fragment,t),i=!1},d(t){D(n,t),t&&l(o),D(r,t),t&&l(c),D(s,t)}}}return new class extends j{constructor(t){super(),N(this,t,null,st,c,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map