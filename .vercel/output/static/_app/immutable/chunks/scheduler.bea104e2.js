function k(){}const R=t=>t;function M(t,n){for(const e in n)t[e]=n[e];return t}function U(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function P(t){return t()}function V(){return Object.create(null)}function B(t){t.forEach(P)}function L(t){return typeof t=="function"}function X(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function Y(t){return Object.keys(t).length===0}function N(t,...n){if(t==null){for(const i of n)i(void 0);return k}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function Z(t){let n;return N(t,e=>n=e)(),n}function $(t,n,e){t.$$.on_destroy.push(N(n,e))}function tt(t,n,e,i){if(t){const r=j(t,n,e,i);return t[0](r)}}function j(t,n,e,i){return t[1]&&i?M(e.ctx.slice(),t[1](i(n))):e.ctx}function nt(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const u=[],c=Math.max(n.dirty.length,r.length);for(let s=0;s<c;s+=1)u[s]=n.dirty[s]|r[s];return u}return n.dirty|r}return n.dirty}function et(t,n,e,i,r,u){if(r){const c=j(n,e,i,u);t.p(c,r)}}function it(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function rt(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function ct(t,n){const e={};n=new Set(n);for(const i in t)!n.has(i)&&i[0]!=="$"&&(e[i]=t[i]);return e}function lt(t,n,e){return t.set(e),n}function st(t){return t&&L(t.destroy)?t.destroy:k}let p=!1;function ut(){p=!0}function ot(){p=!1}function O(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function T(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let o=0;o<n.length;o++){const a=n[o];a.claim_order!==void 0&&l.push(a)}n=l}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let l=0;l<n.length;l++){const o=n[l].claim_order,a=(r>0&&n[e[r]].claim_order<=o?r+1:O(1,r,D=>n[e[D]].claim_order,o))-1;i[l]=e[a]+1;const w=a+1;e[w]=l,r=Math.max(w,r)}const u=[],c=[];let s=n.length-1;for(let l=e[r]+1;l!=0;l=i[l-1]){for(u.push(n[l-1]);s>=l;s--)c.push(n[s]);s--}for(;s>=0;s--)c.push(n[s]);u.reverse(),c.sort((l,o)=>l.claim_order-o.claim_order);for(let l=0,o=0;l<c.length;l++){for(;o<u.length&&c[l].claim_order>=u[o].claim_order;)o++;const a=o<u.length?u[o]:null;t.insertBefore(c[l],a)}}function q(t,n){if(p){for(T(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function at(t,n,e){p&&!e?q(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function ft(t){t.parentNode&&t.parentNode.removeChild(t)}function _t(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function H(t){return document.createElement(t)}function z(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function v(t){return document.createTextNode(t)}function dt(){return v(" ")}function ht(){return v("")}function mt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function pt(t){return function(n){return n.preventDefault(),t.call(this,n)}}function yt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function bt(t){return t.dataset.svelteH}function gt(t){return Array.from(t.childNodes)}function F(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function A(t,n,e,i,r=!1){F(t);const u=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(n(s)){const l=e(s);return l===void 0?t.splice(c,1):t[c]=l,r||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(n(s)){const l=e(s);return l===void 0?t.splice(c,1):t[c]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function S(t,n,e,i){return A(t,r=>r.nodeName===n,r=>{const u=[];for(let c=0;c<r.attributes.length;c++){const s=r.attributes[c];e[s.name]||u.push(s.name)}u.forEach(c=>r.removeAttribute(c))},()=>i(n))}function xt(t,n,e){return S(t,n,e,H)}function vt(t,n,e){return S(t,n,e,z)}function I(t,n){return A(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>v(n),!0)}function wt(t){return I(t," ")}function Et(t,n){n=""+n,t.data!==n&&(t.data=n)}function kt(t,n){t.value=n??""}function Nt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function W(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}function jt(t,n){return new t(n)}let m;function y(t){m=t}function d(){if(!m)throw new Error("Function called outside component initialization");return m}function At(t){d().$$.on_mount.push(t)}function St(t){d().$$.after_update.push(t)}function Ct(t){d().$$.on_destroy.push(t)}function Dt(){const t=d();return(n,e,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[n];if(r){const u=W(n,e,{cancelable:i});return r.slice().forEach(c=>{c.call(t,u)}),!u.defaultPrevented}return!0}}function Mt(t,n){return d().$$.context.set(t,n),n}function Pt(t){return d().$$.context.get(t)}const h=[],E=[];let _=[];const g=[],C=Promise.resolve();let x=!1;function G(){x||(x=!0,C.then(K))}function Bt(){return G(),C}function J(t){_.push(t)}function Lt(t){g.push(t)}const b=new Set;let f=0;function K(){if(f!==0)return;const t=m;do{try{for(;f<h.length;){const n=h[f];f++,y(n),Q(n.$$)}}catch(n){throw h.length=0,f=0,n}for(y(null),h.length=0,f=0;E.length;)E.pop()();for(let n=0;n<_.length;n+=1){const e=_[n];b.has(e)||(b.add(e),e())}_.length=0}while(h.length);for(;g.length;)g.pop()();x=!1,b.clear(),y(t)}function Q(t){if(t.fragment!==null){t.update(),B(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(J)}}function Ot(t){const n=[],e=[];_.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),_=n}export{h as $,M as A,R as B,Z as C,bt as D,mt as E,z as F,vt as G,Pt as H,Mt as I,Ct as J,d as K,ct as L,rt as M,N,B as O,L as P,kt as Q,pt as R,_t as S,V as T,K as U,Y as V,J as W,Ot as X,m as Y,y as Z,P as _,dt as a,G as a0,ut as a1,ot as a2,U as a3,st as a4,Dt as a5,Lt as a6,lt as a7,St as b,wt as c,ft as d,ht as e,H as f,xt as g,gt as h,at as i,yt as j,Nt as k,v as l,I as m,Et as n,At as o,E as p,jt as q,tt as r,X as s,Bt as t,et as u,it as v,nt as w,q as x,k as y,$ as z};