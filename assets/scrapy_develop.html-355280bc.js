import{_ as e,p as a,q as d,a1 as i}from"./framework-fa6fd9c7.js";const r={},n=i(`<h1 id="服务器" tabindex="-1"><a class="header-anchor" href="#服务器" aria-hidden="true">#</a> 服务器</h1><p><code>pip install scrapyd </code></p><h1 id="客户端" tabindex="-1"><a class="header-anchor" href="#客户端" aria-hidden="true">#</a> 客户端</h1><p><code>pip install scrapyd-client</code></p><p><code>scrapyd-deploy</code>命令部署</p><h1 id="修改项目配置" tabindex="-1"><a class="header-anchor" href="#修改项目配置" aria-hidden="true">#</a> 修改项目配置</h1><p>url 为 服务器地址</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Automatically created by: scrapy startproject
#
# For more information about the [deploy] section see:
# https://scrapyd.readthedocs.io/en/latest/deploy.html

[settings]
default = tutorial.settings

[deploy]
url = http://172.19.0.2:6800/
project = tutorial

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2><p>项目目录运行<code>scrapyd-deploy</code></p><h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2><p>https://scrapyd.readthedocs.io/en/stable/api.html</p><h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> Demo</h2><p>为了方便使用，使用<code>Docker</code>来管理环境</p><h3 id="创建镜像-并安装好依赖" tabindex="-1"><a class="header-anchor" href="#创建镜像-并安装好依赖" aria-hidden="true">#</a> 创建镜像,并安装好依赖</h3><p>配置好网络，客户端使用<code>scrapyd-deploy</code>上传到服务器。</p><p>通过<code>POST</code>API 来运行爬虫。</p>`,17),s=[n];function c(t,l){return a(),d("div",null,s)}const h=e(r,[["render",c],["__file","scrapy_develop.html.vue"]]);export{h as default};
