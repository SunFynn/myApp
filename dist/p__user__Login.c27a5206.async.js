(self["webpackChunkant_design_pro"]=self["webpackChunkant_design_pro"]||[]).push([[531],{34687:function(e){e.exports={container:"container___1sYa-",lang:"lang___l6cji",content:"content___2zk1-",icon:"icon___rzGKO"}},19319:function(e,r,t){"use strict";t.r(r);t(18106);var a=t(41052),s=t(39428),n=(t(34792),t(48086)),c=t(3182),i=t(2824),o=(t(17462),t(76772)),u=t(67294),l=t(36108),p=t(48107),m=t(39464),d=t(89366),x=t(2603),h=t(29985),f=t(70469),g=t(5966),j=t(16434),Z=t(63434),y=t(41427),b=t(81197),w=t(28216),v=t(34687),_=t.n(v),k=t(85893),N=function(e){var r=e.content;return(0,k.jsx)(o.Z,{style:{marginBottom:24},message:r,type:"error",showIcon:!0})},C=function(e){var r=e.dispatch,t=(0,u.useState)({}),o=(0,i.Z)(t,2),w=o[0],v=o[1],C=(0,u.useState)("account"),z=(0,i.Z)(C,2),P=z[0],I=z[1],T=function(){var e=(0,c.Z)((0,s.Z)().mark((function e(t){var a,c,i,o,u;return(0,s.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,"account"===P&&["admin","user"].includes(t.username||"")&&"121828"===t.password?(a={status:"ok",type:"account",currentAuthority:t.username},r({type:"user/fetch",payload:{name:t.username}}),r({type:"user/fetchCurrent",payload:{name:t.username}}),r({type:"user/saveCurrentUser",payload:{msg:"\u76f4\u63a5\u8c03\u7528reducer\u4e2d\u7684\u51fd\u6570"}})):a="mobile"===P&&"121828"===t.captcha?{status:"ok",type:"mobile",currentAuthority:t.mobile}:"account"===P?{status:"error",type:"account"}:{status:"error",type:"mobile"},"ok"!==a.status){e.next=12;break}if(c={data:{username:t.username},time:Date.now(),storageTime:6e5},localStorage.setItem("isLogin",JSON.stringify(c)),n.default.success("\u767b\u5f55\u6210\u529f"),y.m8){e.next=8;break}return e.abrupt("return");case 8:return i=y.m8.location.query,o=i,u=o.redirect,y.m8.push(u||"/home"),e.abrupt("return");case 12:v(a),e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](0),n.default.error("\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01");case 18:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(r){return e.apply(this,arguments)}}(),q=w.status,O=w.type;return(0,k.jsxs)("div",{className:_().container,children:[(0,k.jsx)("div",{className:_().content,children:(0,k.jsxs)(f.U,{title:"\u4e2a\u4eba\u6280\u672f\u6587\u6863",subTitle:"wtz\u7684\u4e2a\u4eba\u6280\u672f\u6587\u6863",initialValues:{autoLogin:!0},actions:["\u5176\u4ed6\u767b\u5f55\u65b9\u5f0f",(0,k.jsx)(l.Z,{className:_().icon},"AlipayCircleOutlined"),(0,k.jsx)(p.Z,{className:_().icon},"TaobaoCircleOutlined"),(0,k.jsx)(m.Z,{className:_().icon},"WeiboCircleOutlined")],onFinish:function(){var e=(0,c.Z)((0,s.Z)().mark((function e(r){return(0,s.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,T(r);case 2:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),children:[(0,k.jsxs)(a.Z,{activeKey:P,onChange:I,children:[(0,k.jsx)(a.Z.TabPane,{tab:"\u8d26\u6237\u5bc6\u7801\u767b\u5f55"},"account"),(0,k.jsx)(a.Z.TabPane,{tab:"\u624b\u673a\u53f7\u767b\u5f55"},"mobile")]}),"error"===q&&"account"===O&&(0,k.jsx)(N,{content:"\u8d26\u6237\u6216\u5bc6\u7801\u9519\u8bef"}),"account"===P&&(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(g.Z,{name:"username",fieldProps:{size:"large",prefix:(0,k.jsx)(d.Z,{className:_().prefixIcon})},placeholder:"\u7528\u6237\u540d: admin or user",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d!"}]}),(0,k.jsx)(g.Z.Password,{name:"password",fieldProps:{size:"large",prefix:(0,k.jsx)(x.Z,{className:_().prefixIcon})},rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801\uff01"}]})]}),"error"===q&&"mobile"===O&&(0,k.jsx)(N,{content:"\u9a8c\u8bc1\u7801\u9519\u8bef"}),"mobile"===P&&(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(g.Z,{fieldProps:{size:"large",prefix:(0,k.jsx)(h.Z,{className:_().prefixIcon})},name:"mobile",placeholder:"\u624b\u673a\u53f7",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7\uff01"},{pattern:/^1\d{10}$/,message:"\u624b\u673a\u53f7\u683c\u5f0f\u9519\u8bef\uff01"}]}),(0,k.jsx)(j.Z,{fieldProps:{size:"large",prefix:(0,k.jsx)(x.Z,{className:_().prefixIcon})},captchaProps:{size:"large"},placeholder:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",captchaTextRender:function(e,r){return e?"".concat(r," '\u83b7\u53d6\u9a8c\u8bc1\u7801'"):"\u83b7\u53d6\u9a8c\u8bc1\u7801"},name:"captcha",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801\uff01"}],onGetCaptcha:(0,c.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.default.success("\u83b7\u53d6\u9a8c\u8bc1\u7801\u6210\u529f!");case 1:case"end":return e.stop()}}),e)})))})]}),(0,k.jsxs)("div",{style:{marginBottom:24},children:[(0,k.jsx)(Z.Z,{noStyle:!0,name:"autoLogin",children:"\u81ea\u52a8\u767b\u5f55"}),(0,k.jsx)("a",{style:{float:"right"},children:"\u5fd8\u8bb0\u5bc6\u7801"})]})]})}),(0,k.jsx)(b.Z,{})]})};r["default"]=(0,w.$j)()(C)}}]);