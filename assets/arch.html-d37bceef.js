import{_ as r,M as a,p as s,q as c,R as e,t as n,N as d,V as t,a1 as l}from"./framework-fa6fd9c7.js";const h={},u=l(`<h1 id="架构" tabindex="-1"><a class="header-anchor" href="#架构" aria-hidden="true">#</a> 架构</h1><h2 id="技术选型" tabindex="-1"><a class="header-anchor" href="#技术选型" aria-hidden="true">#</a> 技术选型</h2><p><code>vue-cli</code> vue封装的webpack</p><p><code>element-ui</code> 基于vue的组件库</p><p><code>vuex</code>存储全局状态</p><p><code>vue-router</code>前端路由</p><p><code>axios</code>封装请求</p><h2 id="工程结构" tabindex="-1"><a class="header-anchor" href="#工程结构" aria-hidden="true">#</a> 工程结构</h2><p>核心结构</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── icons                  // 项目所有 svg icons
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── views                   // 视图
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限管理
├── .gitignore                 // git 忽略项
└── package.json               // package.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>api</code>用于管理与后端的交互</p><p><code>view</code>用于管理展示的页面,每个页面可以是一个目录下面可以单独放用到的<code>utils</code>和<code>components</code></p><p><code>router</code>用于管理路由</p><p><code>vuex</code>用于管理全局的状态,例如<code>token</code>和主题配置等</p><h2 id="前后端交互" tabindex="-1"><a class="header-anchor" href="#前后端交互" aria-hidden="true">#</a> 前后端交互</h2><h4 id="跨域" tabindex="-1"><a class="header-anchor" href="#跨域" aria-hidden="true">#</a> 跨域</h4><p>后端配置<code>cros</code></p><h4 id="交互" tabindex="-1"><a class="header-anchor" href="#交互" aria-hidden="true">#</a> 交互</h4>`,18),p=e("p",null,[n("可以导入"),e("code",null,"swagger")],-1),v=e("h4",{id:"图标库",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#图标库","aria-hidden":"true"},"#"),n(" 图标库")],-1),m={href:"http://iconfont.cn/",target:"_blank",rel:"noopener noreferrer"};function b(_,x){const i=a("RouterLink"),o=a("ExternalLinkIcon");return s(),c("div",null,[u,e("p",null,[n("推荐使用 淘宝的"),d(i,{to:"/other/vue/rap2.taobao.org/"},{default:t(()=>[n("rap2.taobao.org")]),_:1})]),p,v,e("p",null,[n("推荐阿里的"),e("a",m,[n("iconfont"),d(o)])])])}const g=r(h,[["render",b],["__file","arch.html.vue"]]);export{g as default};
