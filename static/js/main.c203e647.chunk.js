(this["webpackJsonpblog-platform"]=this["webpackJsonpblog-platform"]||[]).push([[0],{124:function(e,t,a){e.exports=a(196)},134:function(e,t,a){},135:function(e,t,a){},137:function(e,t,a){},138:function(e,t,a){},139:function(e,t,a){},140:function(e,t,a){},188:function(e,t){},191:function(e,t,a){},192:function(e,t,a){},193:function(e,t,a){},194:function(e,t,a){},195:function(e,t,a){},196:function(e,t,a){"use strict";a.r(t);var r,n=a(0),l=a.n(n),c=a(24),s=a.n(c),o=a(54),i=a(14),m=a(93),u=(a(133),a(134),a(25)),p=a(9),d=a(6),E=a.n(d),b=a(13),g=(a(135),function(e){return l.a.createElement("div",{className:"button-group"},l.a.createElement("button",{className:"btn header__signin",onClick:function(){return e.history.push("/sign-in")}},"Sign in"),l.a.createElement("button",{className:"btn header__signup",onClick:function(){return e.history.push("/sign-up")}},"Sign up"))}),h=function(e){return l.a.createElement("div",{className:"button-group"},l.a.createElement("button",{className:"btn btn-create-article",onClick:e.handleCreateArticle},"Create article"),l.a.createElement("div",{className:"user-name"},l.a.createElement(u.b,{to:"/profile",className:"user-name-link"},e.user.username)," ",l.a.createElement(u.b,{to:"/profile"},l.a.createElement("img",{src:e.user.image,alt:"User"}))),l.a.createElement("button",{className:"btn btn-logout",onClick:e.handleLogOut},"Log Out"))},f=Object(p.e)((function(e){var t=Object(i.c)(),a=Object(i.d)((function(e){return e})),r=a.isLoggedIn,n=a.errorsResponse;console.log("errorsResponse: ",n);var c=r?a.user:null;return l.a.createElement("header",{className:"header"},l.a.createElement("h3",{className:"header__title"},l.a.createElement(u.b,{to:"/",className:"home-link"},"Realworld Blog")),c?l.a.createElement(h,{user:c,handleLogOut:function(){t({type:"LOG_OUT"}),localStorage.removeItem("user"),localStorage.removeItem("token"),localStorage.removeItem("isLoggedIn"),e.history.push("/sign-in")},handleCreateArticle:function(){r?e.history.push("/new-article"):e.history.push("/")}}):l.a.createElement(g,e))})),N=(a(137),function(){return l.a.createElement("div",{className:"loadingio-spinner-spinner-5wj8y9evdvn"},l.a.createElement("div",{className:"ldio-jrp5avnkwr"},l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null)))}),v=a(94),_=a.n(v),y=(a(138),function(){return l.a.createElement("div",{className:"card classErrorMessage"},l.a.createElement("div",{className:"card-screen"},l.a.createElement("div",{className:"card-body",style:{textAlign:"center"}},l.a.createElement("img",{className:"card-img-top",src:_.a,style:{width:50,margin:"10px auto"},alt:"Error message"}),l.a.createElement("h2",null,"\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a."),l.a.createElement("p",null,"\u041f\u0435\u0440\u0435\u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443?"),l.a.createElement("button",{type:"button",onClick:function(){return window.location.reload()},className:"btn-err"},"\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c"))),l.a.createElement("div",{className:"myShadow1"}),l.a.createElement("div",{className:"myShadow2"}))}),O=a(198),S=a(199),T=(a(139),a(95)),C=a.n(T),j=function(e){var t=e.article,a=t.title,r=t.description,n=t.tagList,c=t.createdAt,s=t.favoritesCount,o=t.slug,i=t.author,m=i.username,p=i.image;return l.a.createElement("div",{className:"article-item"},l.a.createElement("div",{className:"article-item__header"},l.a.createElement("div",{className:"article-item__block"},l.a.createElement("div",{className:"article-item__info"},l.a.createElement("h2",{className:"article-item__title"},l.a.createElement(u.b,{to:"/articles/".concat(o)},a)),l.a.createElement("span",{className:"article-item__likes"},s)),l.a.createElement("div",{className:"article-item__tags"},0!==n.length?n.map((function(e,t){return l.a.createElement("span",{className:"tag",key:t},e)})):null)),l.a.createElement("div",{className:"article-item__block flex-row"},l.a.createElement("div",{className:"article-item__creator"},l.a.createElement("div",{className:"article-item__author"},m),l.a.createElement("span",{className:"article-item__date"},Object(S.a)(new Date(c),"MMMM d, y"))),l.a.createElement("img",{src:p||C.a,className:"article-item__avatar",alt:"User's avatar"}))),l.a.createElement("div",{className:"article-item__annotation"},r))},w=(a(140),Object(i.b)((function(e){return{togglePage:e.togglePage,articles:e.articles,pageCurrent:e.pageCurrent,articlesCount:e.articlesCount}}),{getArticlesList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return function(){var t=Object(b.a)(E.a.mark((function t(a){var r,n;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a({type:"GET_ARTICLES_REQUEST"}),t.prev=1,t.next=4,fetch("https://conduit.productionready.io/api/articles?offset=".concat(e));case 4:return r=t.sent,t.next=7,r.json();case 7:n=t.sent,a({type:"GET_ARTICLES_SUCCESS",articles:n.articles,articlesCount:n.articlesCount}),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(1),a({type:"GET_ARTICLES_FAILURE"}),console.error("\u0412\u043e\u0437\u043d\u0438\u043a\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0438: ",t.t0);case 15:case 16:case"end":return t.stop()}}),t,null,[[1,11]])})));return function(e){return t.apply(this,arguments)}}()},togglePage:function(e){return{type:"TOGGLE_PAGE",payload:e}}})((function(e){var t=e.getArticlesList,a=e.togglePage,r=e.articles,n=e.pageCurrent,c=e.articlesCount;0===r.length&&t();return l.a.createElement("div",null,l.a.createElement("div",null,r.map((function(e){return l.a.createElement(j,{key:e.slug,article:e})}))),l.a.createElement("div",{className:"pagination"},l.a.createElement(O.a,{size:"small",total:c,pageSize:20,showSizeChanger:!1,current:n,onChange:function(e){a(e),t(20*e-20)}})))}))),A=a(118),I=(a(191),function(e){var t=e.title,a=e.description,r=e.body,n=e.createdAt,c=e.favoritesCount,s=e.tagList,o=e.author;return l.a.createElement("div",{className:"article"},l.a.createElement("div",{className:"article-item__header"},l.a.createElement("div",{className:"article-item__block"},l.a.createElement("div",{className:"article-item__info"},l.a.createElement("h2",{className:"article-item__title"},t),l.a.createElement("span",{className:"article-item__likes"},c)),l.a.createElement("div",{className:"article-item__tags"},0!==s.length?s.map((function(e,t){return l.a.createElement("span",{className:"tag",key:t},e)})):null)),l.a.createElement("div",{className:"article-item__block flex-row"},l.a.createElement("div",{className:"article-item__creator"},l.a.createElement("div",{className:"article-item__author"},o.username),l.a.createElement("span",{className:"article-item__date"},Object(S.a)(new Date(n),"MMMM d, y"))),l.a.createElement("img",{src:o.image,className:"article-item__avatar",alt:"User's avatar"}))),l.a.createElement("div",{className:"article-item__annotation"},a),l.a.createElement("div",{className:"article-body"},l.a.createElement(A.a,{markdown:r,options:{tables:!0,emoji:!0}})))}),R=Object(i.b)((function(e){return{article:e.article,loader:e.loader}}),{getArticle:function(e){return function(){var t=Object(b.a)(E.a.mark((function t(a){var r,n;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a({type:"GET_ONE_ARTICLE_REQUEST"}),t.prev=1,t.next=4,fetch("https://conduit.productionready.io/api/articles/".concat(e));case 4:return r=t.sent,t.next=7,r.json();case 7:n=t.sent,a({type:"GET_ONE_ARTICLE_SUCCESS",article:n.article}),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(1),a({type:"GET_ONE_ARTICLE_FAILURE"}),console.error("\u0412\u043e\u0437\u043d\u0438\u043a\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0438: ",t.t0);case 15:case 16:case"end":return t.stop()}}),t,null,[[1,11]])})));return function(e){return t.apply(this,arguments)}}()}})((function(e){var t=e.slug,a=e.article,r=e.loader,c=e.getArticle;return Object(n.useEffect)((function(){function e(){return(e=Object(b.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c(t);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[t,c]),r?l.a.createElement(N,null):Object.keys(a).length?I(a):null})),U=a(63),x=a(3),L=a.n(x),k=(a(192),Object(p.e)((function(e){var t,a,r,n=Object(i.d)((function(e){return e})),c=n.isLoggedIn,s=n.errorsResponse,o=Object(i.c)(),m=Object(U.a)(),p=m.register,d=m.handleSubmit,g=m.errors;if(console.log("errorsResponse in sign-in: ",s),s)return l.a.createElement("div",{className:"sign-in-accaunt"},l.a.createElement("h3",null,"Email or password is invalid"),l.a.createElement("button",{type:"button",className:"btn btn-primary",onClick:function(){return o({type:"RESET_ERRORS_RESPONSE"})}},"Try again"));c&&e.history.push("/");return l.a.createElement("div",{className:"sign-in-accaunt"},l.a.createElement("form",{action:"",className:"form-create",onSubmit:d((function(e){o(function(e){return function(){var t=Object(b.a)(E.a.mark((function t(a){var r,n,l,c,s;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a({type:"AUTHENTICATION_REQUEST"}),t.prev=1,t.next=4,fetch("https://conduit.productionready.io/api/users/login",{method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify({user:{email:e.email,password:e.password}})});case 4:return r=t.sent,console.log("result: ",r),t.next=8,r.json();case 8:if(n=t.sent,!r.ok){t.next=17;break}a({type:"AUTHENTICATION_SUCCESS",payload:n}),a({type:"LOG_IN"}),l=n.user,c=l.username,s=l.token,localStorage.setItem("localUser",JSON.stringify(c)),localStorage.setItem("token",s),t.next=19;break;case 17:return a({type:"AUTHENTICATION_SUCCESS_ERRORS",payload:n}),t.abrupt("return");case 19:t.next=25;break;case 21:t.prev=21,t.t0=t.catch(1),console.error("\u0412\u043e\u0437\u043d\u0438\u043a\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430: ",t.t0),a({type:"AUTHENTICATION_FAILURE"});case 25:case 26:case"end":return t.stop()}}),t,null,[[1,21]])})));return function(e){return t.apply(this,arguments)}}()}(e))}))},l.a.createElement("h3",null,"Sign In"),l.a.createElement("label",{htmlFor:"email",className:"label"},"Email address"),l.a.createElement("input",{type:"email",name:"email",className:L()({"input-form":!0,"input-error":g.email}),placeholder:"Email address",ref:p({required:!0})}),g.email&&l.a.createElement("span",{className:"text-danger"},"The field must be filled"),l.a.createElement("label",{htmlFor:"password",className:"label"},"Password"),l.a.createElement("input",{type:"password",name:"password",className:L()({"input-form":!0,"input-error":g.password}),placeholder:"Password",ref:p({required:!0,minLength:6,maxLength:40})}),"required"===(null===(t=g.password)||void 0===t?void 0:t.type)&&l.a.createElement("span",{className:"text-danger"},"The field must be filled"),"minLength"===(null===(a=g.password)||void 0===a?void 0:a.type)&&l.a.createElement("span",{className:"text-danger"},"Your password needs to be at least 6 characters"),"maxLength"===(null===(r=g.password)||void 0===r?void 0:r.type)&&l.a.createElement("span",{className:"text-danger"},"Your password must be no more than 40 characters long"),l.a.createElement("button",{type:"submit",className:"btn-primary"},"Login"),l.a.createElement("span",{className:"footnote"},"Don't have an account? ",l.a.createElement(u.b,{to:"/sign-up"},"Sign Up."))))}))),G=(a(193),function(){return l.a.createElement("div",{className:"create-new-accaunt"},l.a.createElement("form",{action:"",className:"form-create"},l.a.createElement("h3",null,"Create new account"),l.a.createElement("label",{htmlFor:"username",className:"label"},"Username"),l.a.createElement("input",{type:"text",className:"input",placeholder:"Username"}),l.a.createElement("label",{htmlFor:"email",className:"label"},"Email address"),l.a.createElement("input",{type:"email",className:"input",placeholder:"Email address"}),l.a.createElement("label",{htmlFor:"password",className:"label"},"Password"),l.a.createElement("input",{type:"password",className:"input",placeholder:"Password"}),l.a.createElement("label",{htmlFor:"password",className:"label"},"Repeat Password"),l.a.createElement("input",{type:"password",className:"input",placeholder:"Password"}),l.a.createElement("div",{className:"hr"}),l.a.createElement("div",{className:"rules-block"},l.a.createElement("input",{type:"checkbox",id:"checkbox"}),l.a.createElement("label",{htmlFor:"checkbox",className:"rules"},"I agree to the processing of my personal information")),l.a.createElement("button",{type:"button",className:"btn-primary"},"Create"),l.a.createElement("span",{className:"footnote"},"Already have an account? ",l.a.createElement(u.b,{to:"/sign-in"},"Sign In"))))}),F=(a(194),function(){return l.a.createElement("div",{className:"edit-profile"},l.a.createElement("form",{action:"",className:"form-create"},l.a.createElement("h3",null,"Edit Profile"),l.a.createElement("label",{htmlFor:"username",className:"label"},"Username"),l.a.createElement("input",{type:"text",className:"input",placeholder:"Username"}),l.a.createElement("label",{htmlFor:"email",className:"label"},"Email address"),l.a.createElement("input",{type:"email",className:"input",placeholder:"Email address"}),l.a.createElement("label",{htmlFor:"password",className:"label"},"New password"),l.a.createElement("input",{type:"password",className:"input",placeholder:"New password"}),l.a.createElement("label",{htmlFor:"password",className:"label"},"Avatar image (url)"),l.a.createElement("input",{type:"text",className:"input",placeholder:"Avatar image"}),l.a.createElement("button",{type:"button",className:"btn-primary"},"Save")))}),P=a(30),D=(a(195),Object(p.e)((function(e){var t=Object(U.a)(),a=t.register,r=t.handleSubmit,c=(t.errors,Object(i.c)()),s=localStorage.getItem("token"),o=Object(n.useState)(""),m=Object(P.a)(o,2),u=m[0],p=m[1],d=Object(n.useState)(""),g=Object(P.a)(d,2),h=g[0],f=g[1],N=Object(n.useState)(""),v=Object(P.a)(N,2),_=v[0],y=v[1],O=Object(n.useState)([]),S=Object(P.a)(O,2);S[0],S[1];return l.a.createElement("div",{className:"create-article",onSubmit:r((function(t){console.log("New article: ",t),c(function(e,t){return function(){var a=Object(b.a)(E.a.mark((function a(r){return E.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:r({type:"CREATE_NEW_ARTICLE_REQUEST"});try{fetch("https://conduit.productionready.io/api/articles",{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8",Authorization:"Token "+t},body:JSON.stringify({article:{title:e.title,description:e.description,body:e.body,tagList:e.tagList}})})}catch(n){r({type:"CREATE_NEW_ARTICLE_FAILURE"})}case 2:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()}(t,s)),e.history.push("/")}))},l.a.createElement("h2",null,"Create new article"),l.a.createElement("form",{className:"form-create-article"},l.a.createElement("label",{htmlFor:"title",className:"label"},"Title"),l.a.createElement("input",{type:"text",name:"title",id:"title",onChange:function(e){var t=e.target.value;console.log("Title: ",t),p(t)},value:u,ref:a,className:"input",placeholder:"Title"}),l.a.createElement("label",{htmlFor:"description",className:"label"},"Short description"),l.a.createElement("input",{type:"text",name:"description",id:"description",onChange:function(e){var t=e.target.value;console.log("Description: ",t),f(t)},value:h,ref:a,className:"input",placeholder:"Title"}),l.a.createElement("label",{htmlFor:"",className:"label"},"Text"),l.a.createElement("textarea",{className:"input textarea",name:"body",id:"body",onChange:function(e){var t=e.target.value;console.log("Body: ",t),y(t)},value:_,ref:a,placeholder:"Text"}),l.a.createElement("label",{htmlFor:"text",className:"label"},"Tags",l.a.createElement("br",null),l.a.createElement("input",{type:"text",name:"tag",id:"tag",className:"input w300",placeholder:"Tag"}),l.a.createElement("button",{type:"button",className:"btn-del"},"Delete"),l.a.createElement("button",{type:"button",className:"btn-add"},"Add tag")),l.a.createElement("button",{type:"submit",className:"btn-primary w300"},"Send")))}))),M=Object(i.b)((function(e){return{loader:e.loader,error:e.error}}))((function(e){var t=e.loader;return e.error?l.a.createElement(y,null):l.a.createElement("div",null,l.a.createElement(u.a,null,l.a.createElement(f,null),l.a.createElement("main",{className:"main"},l.a.createElement(p.a,{path:"/",exact:!0,component:t?N:w}),l.a.createElement(p.a,{path:"/sign-in",component:k}),l.a.createElement(p.a,{path:"/sign-up",component:G}),l.a.createElement(p.a,{path:"/profile",component:F}),l.a.createElement(p.a,{path:"/new-article",component:D}),l.a.createElement(p.a,{path:"/articles/:slug",render:function(e){var t=e.match.params.slug;return l.a.createElement(R,{slug:t})}}))))})),H=a(7),Q={isLoggedIn:!1,loader:!1,error:!1,errorsResponse:null,user:null,articles:[],articlesCount:null,pageCurrent:1,article:{}},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOG_IN":return Object(H.a)(Object(H.a)({},e),{},{isLoggedIn:!0});case"LOG_OUT":return Object(H.a)(Object(H.a)({},e),{},{isLoggedIn:!1,user:null});case"RESET_ERRORS_RESPONSE":return Object(H.a)(Object(H.a)({},e),{},{errorsResponse:null});case"UPDATE_USER_SUCCESS":return Object(H.a)(Object(H.a)({},e),{},{isLoggedIn:!0,user:t.payload.user});case"GET_ARTICLES_REQUEST":return Object(H.a)(Object(H.a)({},e),{},{loader:!0,error:!1});case"GET_ARTICLES_SUCCESS":return Object(H.a)(Object(H.a)({},e),{},{articles:t.articles,articlesCount:t.articlesCount,loader:!1,error:!1});case"GET_ARTICLES_FAILURE":return Object(H.a)(Object(H.a)({},e),{},{loader:!1,error:!0});case"TOGGLE_PAGE":return Object(H.a)(Object(H.a)({},e),{},{pageCurrent:t.payload});case"GET_ONE_ARTICLE_REQUEST":return Object(H.a)(Object(H.a)({},e),{},{loader:!0});case"GET_ONE_ARTICLE_SUCCESS":return console.log("action.article in reducer: ",t.article.author.username),Object(H.a)(Object(H.a)({},e),{},{loader:!1,article:t.article});case"AUTHENTICATION_REQUEST":return Object(H.a)(Object(H.a)({},e),{},{loader:!0});case"AUTHENTICATION_SUCCESS":return Object(H.a)(Object(H.a)({},e),{},{loader:!1,isLoggedIn:!0,user:t.payload.user});case"AUTHENTICATION_SUCCESS_ERRORS":return Object(H.a)(Object(H.a)({},e),{},{loader:!1,errorsResponse:t.payload.errors});case"AUTHENTICATION_FAILURE":return Object(H.a)(Object(H.a)({},e),{},{loader:!1,error:!0});default:return e}},J=Object(o.c)(z,Object(o.a)(m.a));localStorage.getItem("token")&&(console.log("update store"),J.dispatch((r=localStorage.getItem("token"),function(){var e=Object(b.a)(E.a.mark((function e(t){var a,n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:"UPDATE_USER_REQUEST"}),e.prev=1,e.next=4,fetch("https://conduit.productionready.io/api/user",{method:"GET",headers:{"Content-Type":"application/json;charset=utf-8",Authorization:"Token "+r}});case 4:return a=e.sent,console.log("response updateUser: ",a),e.next=8,a.json();case 8:n=e.sent,console.log("result updateUser: ",n),t({type:"UPDATE_USER_SUCCESS",payload:n}),t({type:"LOG_IN"}),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(1),console.error("\u0412\u043e\u0437\u043d\u0438\u043a\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430: ",e.t0),t({type:"UPDATE_USER_FAILURE"});case 18:case 19:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}()))),s.a.render(l.a.createElement(i.a,{store:J},l.a.createElement(M,null)),document.getElementById("root"))},94:function(e,t,a){e.exports=a.p+"static/media/attention.cb284d33.png"},95:function(e,t,a){e.exports=a.p+"static/media/user.1197b293.svg"}},[[124,1,2]]]);
//# sourceMappingURL=main.c203e647.chunk.js.map