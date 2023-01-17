import{_ as t,M as l,p as o,q as i,R as n,t as s,N as e,a1 as c}from"./framework-fa6fd9c7.js";const p={},r=n("h1",{id:"hexo-流程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#hexo-流程","aria-hidden":"true"},"#"),s(" Hexo 流程")],-1),u={href:"https://hexo.io/zh-cn/docs/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://hexo.io/zh-cn/docs/writing",target:"_blank",rel:"noopener noreferrer"},k=n("li",null,"[ ] 安装主题",-1),m=n("li",null,"[X] 部署",-1),v=c(`<h1 id="通过travis方式部署" tabindex="-1"><a class="header-anchor" href="#通过travis方式部署" aria-hidden="true">#</a> 通过travis方式部署</h1><ul><li>[X] 在Travis官网配置环境变量GitHub Token<code>GH_TOKEN</code></li><li>[X] 网站源码文件夹创建<code>.travis.yml</code></li><li>[X] 推送到Github 触发CI,更新GitPage</li></ul><p><code>travis.yml</code>内容如下,主要完成了下载依赖，生成hexo静态网页，通过<code>provider: pages</code>上传到gitpage</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">sudo</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">language</span><span class="token punctuation">:</span> node_js
<span class="token key atrule">node_js</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token number">10</span> <span class="token comment"># use nodejs v10 LTS</span>
<span class="token comment"># cache: npm</span>
<span class="token key atrule">install</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> git clone https<span class="token punctuation">:</span>//github.com/kaiiiz/hexo<span class="token punctuation">-</span>theme<span class="token punctuation">-</span>book.git themes/book
  <span class="token punctuation">-</span> npm install
<span class="token key atrule">branches</span><span class="token punctuation">:</span>
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master <span class="token comment"># build master branch only</span>
<span class="token key atrule">script</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> hexo generate <span class="token comment"># generate static files</span>
<span class="token key atrule">deploy</span><span class="token punctuation">:</span>
  <span class="token key atrule">provider</span><span class="token punctuation">:</span> pages
  <span class="token key atrule">skip-cleanup</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">github-token</span><span class="token punctuation">:</span> $GH_TOKEN
  <span class="token key atrule">keep-history</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">on</span><span class="token punctuation">:</span>
    <span class="token key atrule">branch</span><span class="token punctuation">:</span> master
  <span class="token key atrule">local-dir</span><span class="token punctuation">:</span> public
<span class="token comment"># gitpage 仓库</span>
  <span class="token key atrule">repo</span><span class="token punctuation">:</span> himcs/himcs.github.io
<span class="token comment"># gitpage 更新分支</span>
  <span class="token key atrule">target_branch</span><span class="token punctuation">:</span> master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="hexo-插件部署" tabindex="-1"><a class="header-anchor" href="#hexo-插件部署" aria-hidden="true">#</a> Hexo 插件部署</h1>`,5),h={href:"https://hexo.io/zh-cn/docs/one-command-deployment",target:"_blank",rel:"noopener noreferrer"},b=n("p",null,[s("运行"),n("code",null,"hexo -d")],-1);function _(g,y){const a=l("ExternalLinkIcon");return o(),i("div",null,[r,n("ul",null,[n("li",null,[s("[X] "),n("a",u,[s("安装Hexo"),e(a)])]),n("li",null,[s("[X] "),n("a",d,[s("写作"),e(a)])]),k,m]),v,n("blockquote",null,[n("p",null,[n("a",h,[s("部署插件"),e(a)])])]),b])}const f=t(p,[["render",_],["__file","travis-with-hexo.html.vue"]]);export{f as default};
