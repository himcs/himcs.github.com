import{_ as n,p as a,q as s,a1 as e}from"./framework-fa6fd9c7.js";const i="/assets/image-20201211110004761-a0c2b3de.png",t={},p=e('<h1 id="openfeign-服务间调用" tabindex="-1"><a class="header-anchor" href="#openfeign-服务间调用" aria-hidden="true">#</a> OpenFeign 服务间调用</h1><h2 id="feign-与-openfeign" tabindex="-1"><a class="header-anchor" href="#feign-与-openfeign" aria-hidden="true">#</a> Feign 与 OpenFeign</h2><p>Feign 是一个开源声明式的 WebService 客户端，用来简化服务通信</p><p>OpenFeign 是 SpringCloud 对 Feign 的增强，简化Feign开发</p><h2 id="feign-处理流程" tabindex="-1"><a class="header-anchor" href="#feign-处理流程" aria-hidden="true">#</a> Feign 处理流程</h2><p>服务向注册中心注册</p><p>A获取B的IP和端口（Feign 在这一步通过不同的策略获得IP)</p><p>A发起HTTP调用B获得结果</p><h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战" aria-hidden="true">#</a> 实战</h2><p>调用端主类添加注解<code>@EnableFeignClients</code></p><p><img src="'+i+`" alt="image-20201211110004761"></p><h3 id="创建-feignclient" tabindex="-1"><a class="header-anchor" href="#创建-feignclient" aria-hidden="true">#</a> 创建 feignclient</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span><span class="token string">&quot;service-provider&quot;</span><span class="token punctuation">)</span> <span class="token comment">//这是一个 OpenFeign 客户端</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IPFeignClient</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/Server/ip&quot;</span><span class="token punctuation">)</span>
        <span class="token comment">// 对于 调用微服务的 地址</span>
    <span class="token class-name">ResultModel</span> <span class="token function">getIp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RestController
@RequestMapping(&quot;/client&quot;)
public class ClientRest {
    @Autowired
    IPFeignClient ipInfoService;

    @RequestMapping(value = &quot;/ip&quot;, method = {RequestMethod.GET})
    public ResultModel ip() {
        return ipInfoService.getIp();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单元测试" tabindex="-1"><a class="header-anchor" href="#单元测试" aria-hidden="true">#</a> 单元测试</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">IPFeignClientTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">IPFeignClient</span> ipFeignClient<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testGetIp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ResultModel</span> ip <span class="token operator">=</span> ipFeignClient<span class="token punctuation">.</span><span class="token function">getIp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>ip<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),c=[p];function l(o,d){return a(),s("div",null,c)}const r=n(t,[["render",l],["__file","OpenFeign.html.vue"]]);export{r as default};
