import{_ as i,M as s,p as t,q as d,R as e,t as a,N as o,a1 as l}from"./framework-fa6fd9c7.js";const r={},c=l(`<h1 id="运行中的docker-容器-暴露端口" tabindex="-1"><a class="header-anchor" href="#运行中的docker-容器-暴露端口" aria-hidden="true">#</a> 运行中的Docker 容器 暴露端口</h1><h2 id="修改文件" tabindex="-1"><a class="header-anchor" href="#修改文件" aria-hidden="true">#</a> 修改文件</h2><p>找到需要修改的容器ID</p><p><code>docker ps -a</code></p><p>进入到容器目录</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd /var/lib/docker/containers/&lt;conainerID&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>容器停止</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker stop &lt;NAME&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改目录下的文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi config.v2.json

&quot;Config&quot;: {
    ....
    &quot;ExposedPorts&quot;: {
        &quot;80/tcp&quot;: {},
        &quot;8888/tcp&quot;: {}
    },
    ....
},
&quot;NetworkSettings&quot;: {
....
&quot;Ports&quot;: {
     &quot;80/tcp&quot;: [
         {
             &quot;HostIp&quot;: &quot;&quot;,
             &quot;HostPort&quot;: &quot;80&quot;
         }
     ],

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi hostconfig.json

&quot;PortBindings&quot;: {
     &quot;80/tcp&quot;: [
         {
             &quot;HostIp&quot;: &quot;&quot;,
             &quot;HostPort&quot;: &quot;80&quot;
         }
     ],
     &quot;8888/tcp&quot;: [
         {
             &quot;HostIp&quot;: &quot;&quot;,
             &quot;HostPort&quot;: &quot;8888&quot;
         } 
     ]
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启docker，重启服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,14),u={href:"https://stackoverflow.com/questions/19335444/how-do-i-assign-a-port-mapping-to-an-existing-docker-container/26622041#26622041",target:"_blank",rel:"noopener noreferrer"};function v(m,b){const n=s("ExternalLinkIcon");return t(),d("div",null,[c,e("blockquote",null,[e("p",null,[e("a",u,[a("How do I assign a port mapping to an existing Docker container? - Stack Overflow"),o(n)])])])])}const q=i(r,[["render",v],["__file","docker-expose.html.vue"]]);export{q as default};
