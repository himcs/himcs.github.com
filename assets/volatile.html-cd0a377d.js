import{_ as n,p as s,q as a,a1 as e}from"./framework-fa6fd9c7.js";const t={},l=e(`<h1 id="volatile" tabindex="-1"><a class="header-anchor" href="#volatile" aria-hidden="true">#</a> volatile</h1><h2 id="内存语义" tabindex="-1"><a class="header-anchor" href="#内存语义" aria-hidden="true">#</a> 内存语义</h2><ul><li>保证变量的<strong>内存可见性</strong></li><li>禁止 volatile 变量与普通变量<strong>重排序</strong></li></ul><h3 id="内存可见性" tabindex="-1"><a class="header-anchor" href="#内存可见性" aria-hidden="true">#</a> 内存可见性</h3><p>所谓内存可见性，</p><ul><li>一个线程对 <code>volatile</code> 变量进行写操作， JMM 会立即将该线程本地内存中的共享变量刷新到主内存</li><li>一个线程对 <code>volatile</code> 变量进行读操作，JMM会立即吧该线程本地内存中的共享变量置为无效，从主内存中读取共享变量的值</li></ul><h3 id="禁止重排序" tabindex="-1"><a class="header-anchor" href="#禁止重排序" aria-hidden="true">#</a> 禁止重排序</h3><p>如果 volatile 变量于普通变量发生了重排序，虽然 volatile 变量能保证内存可见性，也可能导致普通变量读取错误。</p><ul><li>JMM 如何限制处理器的重排序呢？</li></ul><p>它是通过内存屏障实现的。</p><ul><li>什么是内存屏障呢？</li></ul><p>硬件层面，内存屏障分两种：读屏障（Load Barrier）和写屏障（Store Barrier）。内存屏障有两个作用:</p><ol><li>防止屏障两侧指令重排序</li><li>强制把缓冲区数据刷回主内存，或者让缓存中数据失效。</li></ol><h2 id="volatile-用途" tabindex="-1"><a class="header-anchor" href="#volatile-用途" aria-hidden="true">#</a> volatile 用途</h2><p>volatile 可以保证<strong>内存可见性</strong>和<strong>禁止重排序</strong>。</p><p>保证内存可见性上，volatile 与锁有着相同的内存语义，可以当作轻量级的锁来使用。</p><p><strong>volatile</strong> 仅保证对于<strong>单个</strong> volatile 变量读写具有<strong>原子</strong>性，</p><p><strong>锁</strong>可以保证整个<strong>临界区</strong>代码 的执行具有<strong>原子</strong>性。</p><p><strong>功能</strong>上，<strong>锁</strong>更<strong>强大</strong>，<strong>性能</strong>上，<strong>volatile</strong> 更有优势。</p><p>单例 double check</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span> 
    
    <span class="token comment">// 双重锁检验</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 第7行</span>
            <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 第10行</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 instance 声明不使用 volatile 关键字，可能会发生重排序，得到错误结果。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>instance = new Singleton(); // 第10行

// 可以分解为以下三个步骤
1 memory=allocate();// 分配内存 相当于c的malloc
2 ctorInstanc(memory) //初始化对象
3 s=memory //设置s指向刚分配的地址

// 上述三个步骤可能会被重排序为 1-3-2，也就是：
1 memory=allocate();// 分配内存 相当于c的malloc
3 s=memory //设置s指向刚分配的地址
2 ctorInstanc(memory) //初始化对象
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦发生这样的重排序，另一个线程可能会到的一个未初始化完成的 <strong>instance</strong>!</p>`,24),i=[l];function o(c,p){return s(),a("div",null,i)}const d=n(t,[["render",o],["__file","volatile.html.vue"]]);export{d as default};
