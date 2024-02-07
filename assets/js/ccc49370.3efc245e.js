"use strict";(self.webpackChunkpackage_based=self.webpackChunkpackage_based||[]).push([[103],{5203:(e,n,t)=>{t.r(n),t.d(n,{default:()=>p});t(7294);var a=t(512),i=t(1944),r=t(5281),s=t(9460),l=t(7215),o=t(2115),c=t(5999),d=t(2244),u=t(5893);function m(e){var n=e.nextItem,t=e.prevItem;return(0,u.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,c.I)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"}),children:[t&&(0,u.jsx)(d.Z,Object.assign({},t,{subLabel:(0,u.jsx)(c.Z,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post",children:"Newer Post"})})),n&&(0,u.jsx)(d.Z,Object.assign({},n,{subLabel:(0,u.jsx)(c.Z,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post",children:"Older Post"}),isNext:!0}))]})}function v(){var e,n=(0,s.C)(),t=n.assets,a=n.metadata,r=a.title,l=a.description,o=a.date,c=a.tags,d=a.authors,m=a.frontMatter,v=m.keywords,f=null!=(e=t.image)?e:m.image;return(0,u.jsxs)(i.d,{title:r,description:l,keywords:v,image:f,children:[(0,u.jsx)("meta",{property:"og:type",content:"article"}),(0,u.jsx)("meta",{property:"article:published_time",content:o}),d.some((function(e){return e.url}))&&(0,u.jsx)("meta",{property:"article:author",content:d.map((function(e){return e.url})).filter(Boolean).join(",")}),c.length>0&&(0,u.jsx)("meta",{property:"article:tag",content:c.map((function(e){return e.label})).join(",")})]})}var f=t(7171),g=t(2212);function h(e){var n=e.sidebar,t=e.children,a=(0,s.C)(),i=a.metadata,r=a.toc,c=i.nextItem,d=i.prevItem,v=i.frontMatter,h=i.unlisted,p=v.hide_table_of_contents,x=v.toc_min_heading_level,b=v.toc_max_heading_level;return(0,u.jsxs)(l.Z,{sidebar:n,toc:!p&&r.length>0?(0,u.jsx)(f.Z,{toc:r,minHeadingLevel:x,maxHeadingLevel:b}):void 0,children:[h&&(0,u.jsx)(g.Z,{}),(0,u.jsx)(o.Z,{children:t}),(c||d)&&(0,u.jsx)(m,{nextItem:c,prevItem:d})]})}function p(e){var n=e.content;return(0,u.jsx)(s.n,{content:e.content,isBlogPostPage:!0,children:(0,u.jsxs)(i.FG,{className:(0,a.Z)(r.k.wrapper.blogPages,r.k.page.blogPostPage),children:[(0,u.jsx)(v,{}),(0,u.jsx)(h,{sidebar:e.sidebar,children:(0,u.jsx)(n,{})})]})})}},7171:(e,n,t)=>{t.d(n,{Z:()=>u});var a=t(3366),i=(t(7294),t(512)),r=t(3743);const s={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"};var l=t(5893),o=["className"],c="table-of-contents__link toc-highlight",d="table-of-contents__link--active";function u(e){var n=e.className,t=(0,a.Z)(e,o);return(0,l.jsx)("div",{className:(0,i.Z)(s.tableOfContents,"thin-scrollbar",n),children:(0,l.jsx)(r.Z,Object.assign({},t,{linkClassName:c,linkActiveClassName:d}))})}},3743:(e,n,t)=>{t.d(n,{Z:()=>x});var a=t(3366),i=t(7294),r=t(6668),s=["parentIndex"];function l(e){var n=e.map((function(e){return Object.assign({},e,{parentIndex:-1,children:[]})})),t=Array(7).fill(-1);n.forEach((function(e,n){var a=t.slice(2,e.level);e.parentIndex=Math.max.apply(Math,a),t[e.level]=n}));var i=[];return n.forEach((function(e){var t=e.parentIndex,r=(0,a.Z)(e,s);t>=0?n[t].children.push(r):i.push(r)})),i}function o(e){var n=e.toc,t=e.minHeadingLevel,a=e.maxHeadingLevel;return n.flatMap((function(e){var n=o({toc:e.children,minHeadingLevel:t,maxHeadingLevel:a});return function(e){return e.level>=t&&e.level<=a}(e)?[Object.assign({},e,{children:n})]:n}))}function c(e){var n=e.getBoundingClientRect();return n.top===n.bottom?c(e.parentNode):n}function d(e,n){var t,a,i=n.anchorTopOffset,r=e.find((function(e){return c(e).top>=i}));return r?function(e){return e.top>0&&e.bottom<window.innerHeight/2}(c(r))?r:null!=(a=e[e.indexOf(r)-1])?a:null:null!=(t=e[e.length-1])?t:null}function u(){var e=(0,i.useRef)(0),n=(0,r.L)().navbar.hideOnScroll;return(0,i.useEffect)((function(){e.current=n?0:document.querySelector(".navbar").clientHeight}),[n]),e}function m(e){var n=(0,i.useRef)(void 0),t=u();(0,i.useEffect)((function(){if(!e)return function(){};var a=e.linkClassName,i=e.linkActiveClassName,r=e.minHeadingLevel,s=e.maxHeadingLevel;function l(){var e=function(e){return Array.from(document.getElementsByClassName(e))}(a),l=function(e){for(var n=e.minHeadingLevel,t=e.maxHeadingLevel,a=[],i=n;i<=t;i+=1)a.push("h"+i+".anchor");return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:r,maxHeadingLevel:s}),o=d(l,{anchorTopOffset:t.current}),c=e.find((function(e){return o&&o.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)}));e.forEach((function(e){!function(e,t){t?(n.current&&n.current!==e&&n.current.classList.remove(i),e.classList.add(i),n.current=e):e.classList.remove(i)}(e,e===c)}))}return document.addEventListener("scroll",l),document.addEventListener("resize",l),l(),function(){document.removeEventListener("scroll",l),document.removeEventListener("resize",l)}}),[e,t])}var v=t(3692),f=t(5893);function g(e){var n=e.toc,t=e.className,a=e.linkClassName,i=e.isChild;return n.length?(0,f.jsx)("ul",{className:i?void 0:t,children:n.map((function(e){return(0,f.jsxs)("li",{children:[(0,f.jsx)(v.Z,{to:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,f.jsx)(g,{isChild:!0,toc:e.children,className:t,linkClassName:a})]},e.id)}))}):null}const h=i.memo(g);var p=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function x(e){var n=e.toc,t=e.className,s=void 0===t?"table-of-contents table-of-contents__left-border":t,c=e.linkClassName,d=void 0===c?"table-of-contents__link":c,u=e.linkActiveClassName,v=void 0===u?void 0:u,g=e.minHeadingLevel,x=e.maxHeadingLevel,b=(0,a.Z)(e,p),j=(0,r.L)(),L=null!=g?g:j.tableOfContents.minHeadingLevel,C=null!=x?x:j.tableOfContents.maxHeadingLevel,N=function(e){var n=e.toc,t=e.minHeadingLevel,a=e.maxHeadingLevel;return(0,i.useMemo)((function(){return o({toc:l(n),minHeadingLevel:t,maxHeadingLevel:a})}),[n,t,a])}({toc:n,minHeadingLevel:L,maxHeadingLevel:C});return m((0,i.useMemo)((function(){if(d&&v)return{linkClassName:d,linkActiveClassName:v,minHeadingLevel:L,maxHeadingLevel:C}}),[d,v,L,C])),(0,f.jsx)(h,Object.assign({toc:N,className:s,linkClassName:d},b))}},2212:(e,n,t)=>{t.d(n,{Z:()=>v});t(7294);var a=t(512),i=t(5999),r=t(5742),s=t(5893);function l(){return(0,s.jsx)(i.Z,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function o(){return(0,s.jsx)(i.Z,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function c(){return(0,s.jsx)(r.Z,{children:(0,s.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}var d=t(5281),u=t(526);function m(e){var n=e.className;return(0,s.jsx)(u.Z,{type:"caution",title:(0,s.jsx)(l,{}),className:(0,a.Z)(n,d.k.common.unlistedBanner),children:(0,s.jsx)(o,{})})}function v(e){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(c,{}),(0,s.jsx)(m,Object.assign({},e))]})}}}]);