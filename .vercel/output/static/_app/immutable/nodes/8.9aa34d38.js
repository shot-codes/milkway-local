import{s as E,f as p,l as _,a as P,g as d,h as u,m as v,d as r,c as S,j as b,i as h,x,n as g,y}from"../chunks/scheduler.bea104e2.js";import{S as j,i as q}from"../chunks/index.520d9713.js";function C(o){let a,n=o[0].title+"",s,l,i,c=o[0].content+"",m;return{c(){a=p("h1"),s=_(n),l=P(),i=p("p"),m=_(c),this.h()},l(t){a=d(t,"H1",{class:!0});var e=u(a);s=v(e,n),e.forEach(r),l=S(t),i=d(t,"P",{});var f=u(i);m=v(f,c),f.forEach(r),this.h()},h(){b(a,"class","text-xl mb-2")},m(t,e){h(t,a,e),x(a,s),h(t,l,e),h(t,i,e),x(i,m)},p(t,[e]){e&1&&n!==(n=t[0].title+"")&&g(s,n),e&1&&c!==(c=t[0].content+"")&&g(m,c)},i:y,o:y,d(t){t&&(r(a),r(l),r(i))}}}function H(o,a,n){let{data:s}=a;return console.log(s),o.$$set=l=>{"data"in l&&n(0,s=l.data)},[s]}class z extends j{constructor(a){super(),q(this,a,H,C,E,{data:0})}}export{z as component};