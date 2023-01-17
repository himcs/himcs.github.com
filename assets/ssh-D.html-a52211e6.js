import{_ as e,p as s,q as a,a1 as d}from"./framework-fa6fd9c7.js";const n={},t=d(`<h1 id="ssh-代理" tabindex="-1"><a class="header-anchor" href="#ssh-代理" aria-hidden="true">#</a> SSH 代理</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
ssh -D 127.0.0.1:1090 root@11.2.3.1

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>-D [bind_address:]port</code> 即可转发流量，实现代理功能</p><p>本地配置代理端口为<code>127.0.0.1:1090</code></p>`,4),c=[t];function i(r,o){return s(),a("div",null,c)}const h=e(n,[["render",i],["__file","ssh-D.html.vue"]]);export{h as default};
