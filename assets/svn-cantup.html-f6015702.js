import{_ as e,p as a,q as n,a1 as d}from"./framework-fa6fd9c7.js";const i={},t=d(`<h1 id="svn-cant-up" tabindex="-1"><a class="header-anchor" href="#svn-cant-up" aria-hidden="true">#</a> svn-cant up</h1><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Skipped &#39;index.html&#39; -- Node remains in conflict
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="答案" tabindex="-1"><a class="header-anchor" href="#答案" aria-hidden="true">#</a> 答案</h2><p>恢复文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>svn revert --depth=infinity index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="checksum-错误" tabindex="-1"><a class="header-anchor" href="#checksum-错误" aria-hidden="true">#</a> Checksum 错误</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>svn: E155017: Checksum mismatch while updating &#39;/EMRCV5/BIN_ARM/emrc_main&#39;:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解决方法 删除文件,然后更新</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>svn update --set-depth empty
svn update --set-depth infinity
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意第一步， 这会清理文件， 如果比较重要， 请先备份。</p>`,11),s=[t];function r(c,l){return a(),n("div",null,s)}const h=e(i,[["render",r],["__file","svn-cantup.html.vue"]]);export{h as default};