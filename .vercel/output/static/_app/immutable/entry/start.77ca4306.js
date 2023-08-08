import{o as $e,t as ge}from"../chunks/scheduler.bea104e2.js";import{S as Fe,a as Me,I as C,g as je,f as Te,b as ye,c as le,s as F,d as Q,i as we,e as H,P as De,h as ze}from"../chunks/singletons.a723794f.js";function Ge(t,s){return t==="/"||s==="ignore"?t:s==="never"?t.endsWith("/")?t.slice(0,-1):t:s==="always"&&!t.endsWith("/")?t+"/":t}function Ye(t){return t.split("%25").map(decodeURI).join("%25")}function We(t){for(const s in t)t[s]=decodeURIComponent(t[s]);return t}const Xe=["href","pathname","search","searchParams","toString","toJSON"];function Ze(t,s){const f=new URL(t);for(const o of Xe)Object.defineProperty(f,o,{get(){return s(),t[o]},enumerable:!0,configurable:!0});return Qe(f),f}function Qe(t){Object.defineProperty(t,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const et="/__data.json";function tt(t){return t.replace(/\/$/,"")+et}function Be(t){try{return JSON.parse(sessionStorage[t])}catch{}}function Ce(t,s){const f=JSON.stringify(s);try{sessionStorage[t]=f}catch{}}function nt(...t){let s=5381;for(const f of t)if(typeof f=="string"){let o=f.length;for(;o;)s=s*33^f.charCodeAt(--o)}else if(ArrayBuffer.isView(f)){const o=new Uint8Array(f.buffer,f.byteOffset,f.byteLength);let p=o.length;for(;p;)s=s*33^o[--p]}else throw new TypeError("value must be a string or TypedArray");return(s>>>0).toString(36)}const fe=window.fetch;window.fetch=(t,s)=>((t instanceof Request?t.method:s?.method||"GET")!=="GET"&&te.delete(Se(t)),fe(t,s));const te=new Map;function at(t,s){const f=Se(t,s),o=document.querySelector(f);if(o?.textContent){const{body:p,...l}=JSON.parse(o.textContent),S=o.getAttribute("data-ttl");return S&&te.set(f,{body:p,init:l,ttl:1e3*Number(S)}),Promise.resolve(new Response(p,l))}return fe(t,s)}function rt(t,s,f){if(te.size>0){const o=Se(t,f),p=te.get(o);if(p){if(performance.now()<p.ttl&&["default","force-cache","only-if-cached",void 0].includes(f?.cache))return new Response(p.body,p.init);te.delete(o)}}return fe(s,f)}function Se(t,s){let o=`script[data-sveltekit-fetched][data-url=${JSON.stringify(t instanceof Request?t.url:t)}]`;if(s?.headers||s?.body){const p=[];s.headers&&p.push([...new Headers(s.headers)].join(",")),s.body&&(typeof s.body=="string"||ArrayBuffer.isView(s.body))&&p.push(s.body),o+=`[data-hash="${nt(...p)}"]`}return o}const ot=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function st(t){const s=[];return{pattern:t==="/"?/^\/$/:new RegExp(`^${ct(t).map(o=>{const p=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(o);if(p)return s.push({name:p[1],matcher:p[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const l=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(o);if(l)return s.push({name:l[1],matcher:l[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!o)return;const S=o.split(/\[(.+?)\](?!\])/);return"/"+S.map((y,g)=>{if(g%2){if(y.startsWith("x+"))return ve(String.fromCharCode(parseInt(y.slice(2),16)));if(y.startsWith("u+"))return ve(String.fromCharCode(...y.slice(2).split("-").map(T=>parseInt(T,16))));const d=ot.exec(y);if(!d)throw new Error(`Invalid param: ${y}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,U,I,b,L]=d;return s.push({name:b,matcher:L,optional:!!U,rest:!!I,chained:I?g===1&&S[0]==="":!1}),I?"(.*?)":U?"([^/]*)?":"([^/]+?)"}return ve(y)}).join("")}).join("")}/?$`),params:s}}function it(t){return!/^\([^)]+\)$/.test(t)}function ct(t){return t.slice(1).split("/").filter(it)}function lt(t,s,f){const o={},p=t.slice(1);let l=0;for(let S=0;S<s.length;S+=1){const i=s[S];let y=p[S-l];if(i.chained&&i.rest&&l&&(y=p.slice(S-l,S+1).filter(g=>g).join("/"),l=0),y===void 0){i.rest&&(o[i.name]="");continue}if(!i.matcher||f[i.matcher](y)){o[i.name]=y;const g=s[S+1],d=p[S+1];g&&!g.rest&&g.optional&&d&&i.chained&&(l=0);continue}if(i.optional&&i.chained){l++;continue}return}if(!l)return o}function ve(t){return t.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function ft({nodes:t,server_loads:s,dictionary:f,matchers:o}){const p=new Set(s);return Object.entries(f).map(([i,[y,g,d]])=>{const{pattern:U,params:I}=st(i),b={id:i,exec:L=>{const T=U.exec(L);if(T)return lt(T,I,o)},errors:[1,...d||[]].map(L=>t[L]),layouts:[0,...g||[]].map(S),leaf:l(y)};return b.errors.length=b.layouts.length=Math.max(b.errors.length,b.layouts.length),b});function l(i){const y=i<0;return y&&(i=~i),[y,t[i]]}function S(i){return i===void 0?i:[p.has(i),t[i]]}}class ee{constructor(s,f){this.status=s,typeof f=="string"?this.body={message:f}:f?this.body=f:this.body={message:`Error: ${s}`}}toString(){return JSON.stringify(this.body)}}class Ve{constructor(s,f){this.status=s,this.location=f}}async function ut(t){for(const s in t)if(typeof t[s]?.then=="function")return Object.fromEntries(await Promise.all(Object.entries(t).map(async([f,o])=>[f,await o])));return t}const dt=-1,pt=-2,ht=-3,mt=-4,_t=-5,gt=-6;function yt(t,s){if(typeof t=="number")return p(t,!0);if(!Array.isArray(t)||t.length===0)throw new Error("Invalid input");const f=t,o=Array(f.length);function p(l,S=!1){if(l===dt)return;if(l===ht)return NaN;if(l===mt)return 1/0;if(l===_t)return-1/0;if(l===gt)return-0;if(S)throw new Error("Invalid input");if(l in o)return o[l];const i=f[l];if(!i||typeof i!="object")o[l]=i;else if(Array.isArray(i))if(typeof i[0]=="string"){const y=i[0],g=s?.[y];if(g)return o[l]=g(p(i[1]));switch(y){case"Date":o[l]=new Date(i[1]);break;case"Set":const d=new Set;o[l]=d;for(let b=1;b<i.length;b+=1)d.add(p(i[b]));break;case"Map":const U=new Map;o[l]=U;for(let b=1;b<i.length;b+=2)U.set(p(i[b]),p(i[b+1]));break;case"RegExp":o[l]=new RegExp(i[1],i[2]);break;case"Object":o[l]=Object(i[1]);break;case"BigInt":o[l]=BigInt(i[1]);break;case"null":const I=Object.create(null);o[l]=I;for(let b=1;b<i.length;b+=2)I[i[b]]=p(i[b+1]);break;default:throw new Error(`Unknown type ${y}`)}}else{const y=new Array(i.length);o[l]=y;for(let g=0;g<i.length;g+=1){const d=i[g];d!==pt&&(y[g]=p(d))}}else{const y={};o[l]=y;for(const g in i){const d=i[g];y[g]=p(d)}}return o[l]}return p(0)}const He=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...He];const wt=new Set([...He]);[...wt];function vt(t){return t.filter(s=>s!=null)}const bt="x-sveltekit-invalidated",J=Be(Fe)??{},Z=Be(Me)??{};function be(t){J[t]=Q()}function Et(t,s){const f=ft(t),o=t.nodes[0],p=t.nodes[1];o(),p();const l=document.documentElement,S=[],i=[];let y=null;const g={before_navigate:[],after_navigate:[]};let d={branch:[],error:null,url:null},U=!1,I=!1,b=!0,L=!1,T=!1,M=!1,B=!1,K,O=history.state?.[C];O||(O=Date.now(),history.replaceState({...history.state,[C]:O},"",location.href));const ue=J[O];ue&&(history.scrollRestoration="manual",scrollTo(ue.x,ue.y));let q,ne,G;async function ke(){if(G=G||Promise.resolve(),await G,!G)return;G=null;const e=new URL(location.href),a=W(e,!0);y=null;const n=ne={},r=a&&await he(a);if(n===ne&&r){if(r.type==="redirect")return ae(new URL(r.location,e).href,{},[e.pathname],n);r.props.page!==void 0&&(q=r.props.page),K.$set(r.props)}}function Re(e){i.some(a=>a?.snapshot)&&(Z[e]=i.map(a=>a?.snapshot?.capture()))}function Ae(e){Z[e]?.forEach((a,n)=>{i[n]?.snapshot?.restore(a)})}function Ie(){be(O),Ce(Fe,J),Re(O),Ce(Me,Z)}async function ae(e,{noScroll:a=!1,replaceState:n=!1,keepFocus:r=!1,state:c={},invalidateAll:u=!1},m,v){return typeof e=="string"&&(e=new URL(e,je(document))),ie({url:e,scroll:a?Q():null,keepfocus:r,redirect_chain:m,details:{state:c,replaceState:n},nav_token:v,accepted:()=>{u&&(B=!0)},blocked:()=>{},type:"goto"})}async function Le(e){return y={id:e.id,promise:he(e).then(a=>(a.type==="loaded"&&a.state.error&&(y=null),a))},y.promise}async function re(...e){const n=f.filter(r=>e.some(c=>r.exec(c))).map(r=>Promise.all([...r.layouts,r.leaf].map(c=>c?.[1]())));await Promise.all(n)}function Oe(e){d=e.state;const a=document.querySelector("style[data-sveltekit]");a&&a.remove(),q=e.props.page,K=new t.root({target:s,props:{...e.props,stores:F,components:i},hydrate:!0}),Ae(O);const n={from:null,to:{params:d.params,route:{id:d.route?.id??null},url:new URL(location.href)},willUnload:!1,type:"enter"};g.after_navigate.forEach(r=>r(n)),I=!0}async function Y({url:e,params:a,branch:n,status:r,error:c,route:u,form:m}){let v="never";for(const h of n)h?.slash!==void 0&&(v=h.slash);e.pathname=Ge(e.pathname,v),e.search=e.search;const E={type:"loaded",state:{url:e,params:a,branch:n,error:c,route:u},props:{constructors:vt(n).map(h=>h.node.component)}};m!==void 0&&(E.props.form=m);let w={},A=!q,_=0;for(let h=0;h<Math.max(n.length,d.branch.length);h+=1){const P=n[h],V=d.branch[h];P?.data!==V?.data&&(A=!0),P&&(w={...w,...P.data},A&&(E.props[`data_${_}`]=w),_+=1)}return(!d.url||e.href!==d.url.href||d.error!==c||m!==void 0&&m!==q.form||A)&&(E.props.page={error:c,params:a,route:{id:u?.id??null},status:r,url:new URL(e),form:m??null,data:A?w:q.data}),E}async function de({loader:e,parent:a,url:n,params:r,route:c,server_data_node:u}){let m=null;const v={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},E=await e();if(E.universal?.load){let w=function(..._){for(const k of _){const{href:h}=new URL(k,n);v.dependencies.add(h)}};const A={route:{get id(){return v.route=!0,c.id}},params:new Proxy(r,{get:(_,k)=>(v.params.add(k),_[k])}),data:u?.data??null,url:Ze(n,()=>{v.url=!0}),async fetch(_,k){let h;_ instanceof Request?(h=_.url,k={body:_.method==="GET"||_.method==="HEAD"?void 0:await _.blob(),cache:_.cache,credentials:_.credentials,headers:_.headers,integrity:_.integrity,keepalive:_.keepalive,method:_.method,mode:_.mode,redirect:_.redirect,referrer:_.referrer,referrerPolicy:_.referrerPolicy,signal:_.signal,...k}):h=_;const P=new URL(h,n);return w(P.href),P.origin===n.origin&&(h=P.href.slice(n.origin.length)),I?rt(h,P.href,k):at(h,k)},setHeaders:()=>{},depends:w,parent(){return v.parent=!0,a()}};m=await E.universal.load.call(null,A)??null,m=m?await ut(m):null}return{node:E,loader:e,server:u,universal:E.universal?.load?{type:"data",data:m,uses:v}:null,data:m??u?.data??null,slash:E.universal?.trailingSlash??u?.slash}}function Pe(e,a,n,r,c){if(B)return!0;if(!r)return!1;if(r.parent&&e||r.route&&a||r.url&&n)return!0;for(const u of r.params)if(c[u]!==d.params[u])return!0;for(const u of r.dependencies)if(S.some(m=>m(new URL(u))))return!0;return!1}function pe(e,a){return e?.type==="data"?e:e?.type==="skip"?a??null:null}async function he({id:e,invalidating:a,url:n,params:r,route:c}){if(y?.id===e)return y.promise;const{errors:u,layouts:m,leaf:v}=c,E=[...m,v];u.forEach(R=>R?.().catch(()=>{})),E.forEach(R=>R?.[1]().catch(()=>{}));let w=null;const A=d.url?e!==d.url.pathname+d.url.search:!1,_=d.route?c.id!==d.route.id:!1;let k=!1;const h=E.map((R,N)=>{const j=d.branch[N],$=!!R?.[0]&&(j?.loader!==R[1]||Pe(k,_,A,j.server?.uses,r));return $&&(k=!0),$});if(h.some(Boolean)){try{w=await qe(n,h)}catch(R){return oe({status:R instanceof ee?R.status:500,error:await X(R,{url:n,params:r,route:{id:c.id}}),url:n,route:c})}if(w.type==="redirect")return w}const P=w?.nodes;let V=!1;const x=E.map(async(R,N)=>{if(!R)return;const j=d.branch[N],$=P?.[N];if((!$||$.type==="skip")&&R[1]===j?.loader&&!Pe(V,_,A,j.universal?.uses,r))return j;if(V=!0,$?.type==="error")throw $;return de({loader:R[1],url:n,params:r,route:c,parent:async()=>{const me={};for(let _e=0;_e<N;_e+=1)Object.assign(me,(await x[_e])?.data);return me},server_data_node:pe($===void 0&&R[0]?{type:"skip"}:$??null,R[0]?j?.server:void 0)})});for(const R of x)R.catch(()=>{});const D=[];for(let R=0;R<E.length;R+=1)if(E[R])try{D.push(await x[R])}catch(N){if(N instanceof Ve)return{type:"redirect",location:N.location};let j=500,$;if(P?.includes(N))j=N.status??j,$=N.error;else if(N instanceof ee)j=N.status,$=N.body;else{if(await F.updated.check())return await z(n);$=await X(N,{params:r,url:n,route:{id:c.id}})}const ce=await Ue(R,D,u);return ce?await Y({url:n,params:r,branch:D.slice(0,ce.idx).concat(ce.node),status:j,error:$,route:c}):await Ne(n,{id:c.id},$,j)}else D.push(void 0);return await Y({url:n,params:r,branch:D,status:200,error:null,route:c,form:a?void 0:null})}async function Ue(e,a,n){for(;e--;)if(n[e]){let r=e;for(;!a[r];)r-=1;try{return{idx:r+1,node:{node:await n[e](),loader:n[e],data:{},server:null,universal:null}}}catch{continue}}}async function oe({status:e,error:a,url:n,route:r}){const c={};let u=null;if(t.server_loads[0]===0)try{const w=await qe(n,[!0]);if(w.type!=="data"||w.nodes[0]&&w.nodes[0].type!=="data")throw 0;u=w.nodes[0]??null}catch{(n.origin!==location.origin||n.pathname!==location.pathname||U)&&await z(n)}const v=await de({loader:o,url:n,params:c,route:r,parent:()=>Promise.resolve({}),server_data_node:pe(u)}),E={node:await p(),loader:p,universal:null,server:null,data:null};return await Y({url:n,params:c,branch:[v,E],status:e,error:a,route:null})}function W(e,a){if(we(e,H))return;const n=se(e);for(const r of f){const c=r.exec(n);if(c)return{id:e.pathname+e.search,invalidating:a,route:r,params:We(c),url:e}}}function se(e){return Ye(e.pathname.slice(H.length)||"/")}function xe({url:e,type:a,intent:n,delta:r}){let c=!1;const u={from:{params:d.params,route:{id:d.route?.id??null},url:d.url},to:{params:n?.params??null,route:{id:n?.route?.id??null},url:e},willUnload:!n,type:a};r!==void 0&&(u.delta=r);const m={...u,cancel:()=>{c=!0}};return T||g.before_navigate.forEach(v=>v(m)),c?null:u}async function ie({url:e,scroll:a,keepfocus:n,redirect_chain:r,details:c,type:u,delta:m,nav_token:v={},accepted:E,blocked:w}){const A=W(e,!1),_=xe({url:e,type:u,delta:m,intent:A});if(!_){w();return}const k=O;E(),T=!0,I&&F.navigating.set(_),ne=v;let h=A&&await he(A);if(!h){if(we(e,H))return await z(e);h=await Ne(e,{id:null},await X(new Error(`Not found: ${e.pathname}`),{url:e,params:{},route:{id:null}}),404)}if(e=A?.url||e,ne!==v)return!1;if(h.type==="redirect")if(r.length>10||r.includes(e.pathname))h=await oe({status:500,error:await X(new Error("Redirect loop"),{url:e,params:{},route:{id:null}}),url:e,route:{id:null}});else return ae(new URL(h.location,e).href,{},[...r,e.pathname],v),!1;else h.props.page?.status>=400&&await F.updated.check()&&await z(e);if(S.length=0,B=!1,L=!0,be(k),Re(k),h.props.page?.url&&h.props.page.url.pathname!==e.pathname&&(e.pathname=h.props.page?.url.pathname),c){const x=c.replaceState?0:1;if(c.state[C]=O+=x,history[c.replaceState?"replaceState":"pushState"](c.state,"",e),!c.replaceState){let D=O+1;for(;Z[D]||J[D];)delete Z[D],delete J[D],D+=1}}y=null,I?(d=h.state,h.props.page&&(h.props.page.url=e),K.$set(h.props)):Oe(h);const{activeElement:P}=document;if(await ge(),b){const x=e.hash&&document.getElementById(decodeURIComponent(e.hash.slice(1)));a?scrollTo(a.x,a.y):x?x.scrollIntoView():scrollTo(0,0)}const V=document.activeElement!==P&&document.activeElement!==document.body;!n&&!V&&Ee(),b=!0,h.props.page&&(q=h.props.page),T=!1,u==="popstate"&&Ae(O),g.after_navigate.forEach(x=>x(_)),F.navigating.set(null),L=!1}async function Ne(e,a,n,r){return e.origin===location.origin&&e.pathname===location.pathname&&!U?await oe({status:r,error:n,url:e,route:a}):await z(e)}function z(e){return location.href=e.href,new Promise(()=>{})}function Ke(){let e;l.addEventListener("mousemove",u=>{const m=u.target;clearTimeout(e),e=setTimeout(()=>{r(m,2)},20)});function a(u){r(u.composedPath()[0],1)}l.addEventListener("mousedown",a),l.addEventListener("touchstart",a,{passive:!0});const n=new IntersectionObserver(u=>{for(const m of u)m.isIntersecting&&(re(se(new URL(m.target.href))),n.unobserve(m.target))},{threshold:0});function r(u,m){const v=Te(u,l);if(!v)return;const{url:E,external:w,download:A}=ye(v,H);if(w||A)return;const _=le(v);if(!_.reload)if(m<=_.preload_data){const k=W(E,!1);k&&Le(k)}else m<=_.preload_code&&re(se(E))}function c(){n.disconnect();for(const u of l.querySelectorAll("a")){const{url:m,external:v,download:E}=ye(u,H);if(v||E)continue;const w=le(u);w.reload||(w.preload_code===De.viewport&&n.observe(u),w.preload_code===De.eager&&re(se(m)))}}g.after_navigate.push(c),c()}function X(e,a){return e instanceof ee?e.body:t.hooks.handleError({error:e,event:a})??{message:a.route.id!=null?"Internal Error":"Not Found"}}return{after_navigate:e=>{$e(()=>(g.after_navigate.push(e),()=>{const a=g.after_navigate.indexOf(e);g.after_navigate.splice(a,1)}))},before_navigate:e=>{$e(()=>(g.before_navigate.push(e),()=>{const a=g.before_navigate.indexOf(e);g.before_navigate.splice(a,1)}))},disable_scroll_handling:()=>{(L||!I)&&(b=!1)},goto:(e,a={})=>ae(e,a,[]),invalidate:e=>{if(typeof e=="function")S.push(e);else{const{href:a}=new URL(e,location.href);S.push(n=>n.href===a)}return ke()},invalidate_all:()=>(B=!0,ke()),preload_data:async e=>{const a=new URL(e,je(document)),n=W(a,!1);if(!n)throw new Error(`Attempted to preload a URL that does not belong to this app: ${a}`);await Le(n)},preload_code:re,apply_action:async e=>{if(e.type==="error"){const a=new URL(location.href),{branch:n,route:r}=d;if(!r)return;const c=await Ue(d.branch.length,n,r.errors);if(c){const u=await Y({url:a,params:d.params,branch:n.slice(0,c.idx).concat(c.node),status:e.status??500,error:e.error,route:r});d=u.state,K.$set(u.props),ge().then(Ee)}}else e.type==="redirect"?ae(e.location,{invalidateAll:!0},[]):(K.$set({form:null,page:{...q,form:e.data,status:e.status}}),await ge(),K.$set({form:e.data}),e.type==="success"&&Ee())},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",e=>{let a=!1;if(Ie(),!T){const n={from:{params:d.params,route:{id:d.route?.id??null},url:d.url},to:null,willUnload:!0,type:"leave",cancel:()=>a=!0};g.before_navigate.forEach(r=>r(n))}a?(e.preventDefault(),e.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ie()}),navigator.connection?.saveData||Ke(),l.addEventListener("click",e=>{if(e.button||e.which!==1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.defaultPrevented)return;const a=Te(e.composedPath()[0],l);if(!a)return;const{url:n,external:r,target:c,download:u}=ye(a,H);if(!n)return;if(c==="_parent"||c==="_top"){if(window.parent!==window)return}else if(c&&c!=="_self")return;const m=le(a);if(!(a instanceof SVGAElement)&&n.protocol!==location.protocol&&!(n.protocol==="https:"||n.protocol==="http:")||u)return;if(r||m.reload){xe({url:n,type:"link"})?T=!0:e.preventDefault();return}const[E,w]=n.href.split("#");if(w!==void 0&&E===location.href.split("#")[0]){if(d.url.hash===n.hash){e.preventDefault(),a.ownerDocument.getElementById(w)?.scrollIntoView();return}if(M=!0,be(O),d.url=n,F.page.set({...q,url:n}),F.page.notify(),!m.replace_state)return;M=!1,e.preventDefault()}ie({url:n,scroll:m.noscroll?Q():null,keepfocus:m.keep_focus??!1,redirect_chain:[],details:{state:{},replaceState:m.replace_state??n.href===location.href},accepted:()=>e.preventDefault(),blocked:()=>e.preventDefault(),type:"link"})}),l.addEventListener("submit",e=>{if(e.defaultPrevented)return;const a=HTMLFormElement.prototype.cloneNode.call(e.target),n=e.submitter;if((n?.formMethod||a.method)!=="get")return;const c=new URL(n?.hasAttribute("formaction")&&n?.formAction||a.action);if(we(c,H))return;const u=e.target,{keep_focus:m,noscroll:v,reload:E,replace_state:w}=le(u);if(E)return;e.preventDefault(),e.stopPropagation();const A=new FormData(u),_=n?.getAttribute("name");_&&A.append(_,n?.getAttribute("value")??""),c.search=new URLSearchParams(A).toString(),ie({url:c,scroll:v?Q():null,keepfocus:m??!1,redirect_chain:[],details:{state:{},replaceState:w??c.href===location.href},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",async e=>{if(e.state?.[C]){if(e.state[C]===O)return;const a=J[e.state[C]];if(d.url.href.split("#")[0]===location.href.split("#")[0]){J[O]=Q(),O=e.state[C],scrollTo(a.x,a.y);return}const n=e.state[C]-O;await ie({url:new URL(location.href),scroll:a,keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{O=e.state[C]},blocked:()=>{history.go(-n)},type:"popstate",delta:n})}}),addEventListener("hashchange",()=>{M&&(M=!1,history.replaceState({...history.state,[C]:++O},"",location.href))});for(const e of document.querySelectorAll("link"))e.rel==="icon"&&(e.href=e.href);addEventListener("pageshow",e=>{e.persisted&&F.navigating.set(null)})},_hydrate:async({status:e=200,error:a,node_ids:n,params:r,route:c,data:u,form:m})=>{U=!0;const v=new URL(location.href);({params:r={},route:c={id:null}}=W(v,!1)||{});let E;try{const w=n.map(async(k,h)=>{const P=u[h];return P?.uses&&(P.uses=Je(P.uses)),de({loader:t.nodes[k],url:v,params:r,route:c,parent:async()=>{const V={};for(let x=0;x<h;x+=1)Object.assign(V,(await w[x]).data);return V},server_data_node:pe(P)})}),A=await Promise.all(w),_=f.find(({id:k})=>k===c.id);if(_){const k=_.layouts;for(let h=0;h<k.length;h++)k[h]||A.splice(h,0,void 0)}E=await Y({url:v,params:r,branch:A,status:e,error:a,form:m,route:_??null})}catch(w){if(w instanceof Ve){await z(new URL(w.location,location.href));return}E=await oe({status:w instanceof ee?w.status:500,error:await X(w,{url:v,params:r,route:c}),url:v,route:c})}Oe(E)}}}async function qe(t,s){const f=new URL(t);f.pathname=tt(t.pathname),f.searchParams.append(bt,s.map(p=>p?"1":"0").join(""));const o=await fe(f.href);if(!o.ok)throw new ee(o.status,await o.json());return new Promise(async p=>{const l=new Map,S=o.body.getReader(),i=new TextDecoder;function y(d){return yt(d,{Promise:U=>new Promise((I,b)=>{l.set(U,{fulfil:I,reject:b})})})}let g="";for(;;){const{done:d,value:U}=await S.read();if(d&&!g)break;for(g+=!U&&g?`
`:i.decode(U);;){const I=g.indexOf(`
`);if(I===-1)break;const b=JSON.parse(g.slice(0,I));if(g=g.slice(I+1),b.type==="redirect")return p(b);if(b.type==="data")b.nodes?.forEach(L=>{L?.type==="data"&&(L.uses=Je(L.uses),L.data=y(L.data))}),p(b);else if(b.type==="chunk"){const{id:L,data:T,error:M}=b,B=l.get(L);l.delete(L),M?B.reject(y(M)):B.fulfil(y(T))}}}})}function Je(t){return{dependencies:new Set(t?.dependencies??[]),params:new Set(t?.params??[]),parent:!!t?.parent,route:!!t?.route,url:!!t?.url}}function Ee(){const t=document.querySelector("[autofocus]");if(t)t.focus();else{const s=document.body,f=s.getAttribute("tabindex");s.tabIndex=-1,s.focus({preventScroll:!0,focusVisible:!1}),f!==null?s.setAttribute("tabindex",f):s.removeAttribute("tabindex");const o=getSelection();if(o&&o.type!=="None"){const p=[];for(let l=0;l<o.rangeCount;l+=1)p.push(o.getRangeAt(l));setTimeout(()=>{if(o.rangeCount===p.length){for(let l=0;l<o.rangeCount;l+=1){const S=p[l],i=o.getRangeAt(l);if(S.commonAncestorContainer!==i.commonAncestorContainer||S.startContainer!==i.startContainer||S.endContainer!==i.endContainer||S.startOffset!==i.startOffset||S.endOffset!==i.endOffset)return}o.removeAllRanges()}})}}}async function Rt(t,s,f){const o=Et(t,s);ze({client:o}),f?await o._hydrate(f):o.goto(location.href,{replaceState:!0}),o._start_router()}export{Rt as start};
