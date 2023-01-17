import{_ as n,p as s,q as a,a1 as e}from"./framework-fa6fd9c7.js";const t={},p=e(`<h1 id="svn-提交后自动更新测试服务器" tabindex="-1"><a class="header-anchor" href="#svn-提交后自动更新测试服务器" aria-hidden="true">#</a> SVN 提交后自动更新测试服务器</h1><p>原理</p><p>​ 提交后触发服务器的 post-commit hook</p><p>​ svn服务器调用更新脚本或者更新URL</p><h2 id="php-执行svn-up" tabindex="-1"><a class="header-anchor" href="#php-执行svn-up" aria-hidden="true">#</a> PHP 执行SVN UP</h2><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token variable">$username</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;svn用户名&#39;</span><span class="token punctuation">;</span>
<span class="token variable">$password</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;svn密码&#39;</span><span class="token punctuation">;</span>
<span class="token variable">$path</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;更新目录&#39;</span><span class="token punctuation">;</span>
<span class="token comment">//echo t 接受不安全的连接</span>
<span class="token function">exec</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;export LANG=\\&quot;en_US.UTF-8\\&quot;;echo t | /usr/bin/svn up --username <span class="token interpolation"><span class="token variable">$username</span></span> --password <span class="token interpolation"><span class="token variable">$password</span></span>  --no-auth-cache <span class="token interpolation"><span class="token variable">$path</span></span> 2&gt;&amp;1&quot;</span><span class="token punctuation">,</span><span class="token variable">$output</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">print_r</span><span class="token punctuation">(</span><span class="token variable">$output</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[p];function i(c,l){return s(),a("div",null,o)}const u=n(t,[["render",i],["__file","svn_auto_update.html.vue"]]);export{u as default};
