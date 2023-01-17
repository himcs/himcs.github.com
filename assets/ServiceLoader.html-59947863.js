import{_ as n,p as s,q as a,a1 as e}from"./framework-fa6fd9c7.js";const i={},t=e(`<h1 id="serviceloader" tabindex="-1"><a class="header-anchor" href="#serviceloader" aria-hidden="true">#</a> ServiceLoader</h1><p>JDK 实现的 service 装载。</p><blockquote><p>A service provider is a specific implementation of a service</p></blockquote><p>实例：JDBC 驱动</p><h2 id="how-to-use" tabindex="-1"><a class="header-anchor" href="#how-to-use" aria-hidden="true">#</a> How to use</h2><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3><ol><li>provider-configuration file in the resource directory META-INF/services.</li><li>注释使用 <code>#</code></li><li>必须 <code>UTF-8</code></li><li>配置文件和代码可以放于不同的jar</li><li>懒加载&amp;懒获取</li></ol><h3 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h3><p>我们有 抽象类<code>com.example.CodecSet </code></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">CodecSet</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">Encoder</span> <span class="token function">getEncoder</span><span class="token punctuation">(</span><span class="token class-name">String</span> encodingName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">Decoder</span> <span class="token function">getDecoder</span><span class="token punctuation">(</span><span class="token class-name">String</span> encodingName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还有实现<code>com.example.impl.StandardCodecs</code></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StandardCodecs</span> <span class="token keyword">extends</span> <span class="token class-name">CodecSet</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Encoder</span> <span class="token function">getEncoder</span><span class="token punctuation">(</span><span class="token class-name">String</span> encodingName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Decoder</span> <span class="token function">getDecoder</span><span class="token punctuation">(</span><span class="token class-name">String</span> encodingName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现类注册文件</p><p>META-INF/services/com.example.CodecSet This file contains the single line:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>com.example.impl.StandardCodecs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>获取实例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>        <span class="token class-name">ServiceLoader</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CodecSet</span><span class="token punctuation">&gt;</span></span> codecSetLoader <span class="token operator">=</span> <span class="token class-name">ServiceLoader</span><span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token class-name">CodecSet</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">CodecSet</span> codecSet <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">CodecSet</span> cp <span class="token operator">:</span> codecSetLoader<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            codecSet <span class="token operator">=</span> cp<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>codecSet<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class com.example.impl.StandardCodecs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="fun-point" tabindex="-1"><a class="header-anchor" href="#fun-point" aria-hidden="true">#</a> fun point</h2><h3 id="懒加载-serviceloader-lazyiterator" tabindex="-1"><a class="header-anchor" href="#懒加载-serviceloader-lazyiterator" aria-hidden="true">#</a> 懒加载 <code>ServiceLoader.LazyIterator</code></h3><p><code>ServiceLoader</code> 实习了 <code>Iterable</code>接口，内部实际执行委托给<code>LazyIterator</code></p><p>关键流程</p><p>hasNextService</p><ol><li>加载相关文件</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    	Class&lt;S&gt; service;
        ClassLoader loader;
        Enumeration&lt;URL&gt; configs = null;
          try {
                    String fullName = PREFIX + service.getName();
                    if (loader == null)
                        configs = ClassLoader.getSystemResources(fullName);
                    else
                        configs = loader.getResources(fullName);
                } catch (IOException x) {
                    fail(service, &quot;Error locating configuration files&quot;, x);
                }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>逐步解析</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>            while ((pending == null) || !pending.hasNext()) {
                if (!configs.hasMoreElements()) {
                    return false;
                }
                pending = parse(service, configs.nextElement());
            }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>next</p><p>加载类</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>            String cn = nextName;
            nextName = null;
            Class&lt;?&gt; c = null;
            try {
                c = Class.forName(cn, false, loader);
            } catch (ClassNotFoundException x) {
                fail(service,
                     &quot;Provider &quot; + cn + &quot; not found&quot;);
            }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>放入缓存</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>                S p = service.cast(c.newInstance());
                providers.put(cn, p);
                return p;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="缓存机制" tabindex="-1"><a class="header-anchor" href="#缓存机制" aria-hidden="true">#</a> 缓存机制</h3><p>reload 方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token comment">// Cached providers, in instantiation order</span>
    <span class="token keyword">private</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">S</span><span class="token punctuation">&gt;</span></span> providers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reload</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        providers<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        lookupIterator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LazyIterator</span><span class="token punctuation">(</span>service<span class="token punctuation">,</span> loader<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>迭代器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>        return new Iterator&lt;S&gt;() {

            Iterator&lt;Map.Entry&lt;String,S&gt;&gt; knownProviders
                = providers.entrySet().iterator();

            public boolean hasNext() {
                if (knownProviders.hasNext())
                    return true;
                return lookupIterator.hasNext();
            }

            public S next() {
                if (knownProviders.hasNext())
                    return knownProviders.next().getValue();
                return lookupIterator.next();
            }

            public void remove() {
                throw new UnsupportedOperationException();
            }

        };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本原理</p><p><code>knownProviders</code> 在创建时，内容是个快照.</p>`,40),c=[t];function l(o,p){return s(),a("div",null,c)}const r=n(i,[["render",l],["__file","ServiceLoader.html.vue"]]);export{r as default};
