import{s as V,f as g,l as x,a as y,g as E,h as b,m as P,d as c,c as A,j as k,i as u,x as j,n as q,y as C,S as w}from"../chunks/scheduler.bea104e2.js";import{e as D}from"../chunks/each.3d878967.js";import{S as z,i as B}from"../chunks/index.520d9713.js";function H(o,t,i){const n=o.slice();return n[1]=t[i],n}function I(o){let t,i=o[1].title+"",n,f;return{c(){t=g("a"),n=x(i),this.h()},l(s){t=E(s,"A",{href:!0});var r=b(t);n=P(r,i),r.forEach(c),this.h()},h(){k(t,"href",f="/m/"+o[0].id+"/"+o[1].id)},m(s,r){u(s,t,r),j(t,n)},p(s,r){r&1&&i!==(i=s[1].title+"")&&q(n,i),r&1&&f!==(f="/m/"+s[0].id+"/"+s[1].id)&&k(t,"href",f)},d(s){s&&c(t)}}}function F(o){let t,i=o[0].title+"",n,f,s,r=o[0].content+"",p,v,_,m=D(o[0].moons),a=[];for(let e=0;e<m.length;e+=1)a[e]=I(H(o,m,e));return{c(){t=g("h1"),n=x(i),f=y(),s=g("p"),p=x(r),v=y(),_=g("div");for(let e=0;e<a.length;e+=1)a[e].c();this.h()},l(e){t=E(e,"H1",{class:!0});var h=b(t);n=P(h,i),h.forEach(c),f=A(e),s=E(e,"P",{});var l=b(s);p=P(l,r),l.forEach(c),v=A(e),_=E(e,"DIV",{class:!0});var d=b(_);for(let S=0;S<a.length;S+=1)a[S].l(d);d.forEach(c),this.h()},h(){k(t,"class","text-xl mb-2"),k(_,"class","flex flex-col mt-6")},m(e,h){u(e,t,h),j(t,n),u(e,f,h),u(e,s,h),j(s,p),u(e,v,h),u(e,_,h);for(let l=0;l<a.length;l+=1)a[l]&&a[l].m(_,null)},p(e,[h]){if(h&1&&i!==(i=e[0].title+"")&&q(n,i),h&1&&r!==(r=e[0].content+"")&&q(p,r),h&1){m=D(e[0].moons);let l;for(l=0;l<m.length;l+=1){const d=H(e,m,l);a[l]?a[l].p(d,h):(a[l]=I(d),a[l].c(),a[l].m(_,null))}for(;l<a.length;l+=1)a[l].d(1);a.length=m.length}},i:C,o:C,d(e){e&&(c(t),c(f),c(s),c(v),c(_)),w(a,e)}}}function G(o,t,i){let{data:n}=t;return o.$$set=f=>{"data"in f&&i(0,n=f.data)},[n]}class M extends z{constructor(t){super(),B(this,t,G,F,V,{data:0})}}export{M as component};
