import{_ as n,p as a,q as s,a1 as t,R as e}from"./framework-fa6fd9c7.js";const i={},l=t(`<h1 id="lock-接口和类" tabindex="-1"><a class="header-anchor" href="#lock-接口和类" aria-hidden="true">#</a> Lock 接口和类</h1><p>Java 原生的锁-基于对象的锁，一般配合 <code>synchronized</code> 关键字使用。 Java 在 <code>java.util.concurrent.locks</code> 包下，提供了几个关于锁的接口和类，他们有更强大的功能和性能</p><h2 id="synchronized-的不足" tabindex="-1"><a class="header-anchor" href="#synchronized-的不足" aria-hidden="true">#</a> synchronized 的不足</h2><ul><li>临界区是只读操作，可以多线程一起执行，<code>synchronized</code> 只能有一个线程执行</li><li><code>synchronized</code> 无法直到当前线程有没有成功获取到锁</li><li>使用 <code>synchronized</code>, 如果临界区因为 <code>IO</code> 或者 <code>sleep</code>等阻塞了，当前线程又未释放锁，会导致所有线程等待。</li></ul><p>这些问题都是<code>locks</code>包下的锁可以解决的</p><h2 id="锁的分类" tabindex="-1"><a class="header-anchor" href="#锁的分类" aria-hidden="true">#</a> 锁的分类</h2><h3 id="是否可重入" tabindex="-1"><a class="header-anchor" href="#是否可重入" aria-hidden="true">#</a> 是否可重入</h3><p>重入锁，就是说支持一个<strong>线程对资源重复加锁</strong>。</p><p><code>synchronized</code> 使用的重入锁，就是 <code>synchronized</code>实例方法里可以调用另一个本实例的<code>synchronized</code>实例方法。</p><p><code>ReentrantLock</code> 也是重入锁，是本文介绍的重点类。</p><h3 id="是否公平" tabindex="-1"><a class="header-anchor" href="#是否公平" aria-hidden="true">#</a> 是否公平</h3><p>公平，就是FIFO，是否是先来后到的顺序来获取锁。</p><p>非公平锁是一种抢占机制，随机获得锁。</p><p>一般情况下，<strong>非公平锁</strong>会提升一定的<strong>效率</strong>。</p><p>非公平说可能会发生线程饥饿。</p><h3 id="读写锁和排他锁" tabindex="-1"><a class="header-anchor" href="#读写锁和排他锁" aria-hidden="true">#</a> 读写锁和排他锁</h3><p><code>synchronized</code>用的锁和<code>ReentrantLock</code> 都是<strong>排他锁</strong>，即这些锁只能有一个线程访问。</p><p>读写锁可以运行多个线程同时访问。<code>Java</code>提供了 <code>ReentrantReadWriteLock</code> 作为读写锁的默认实现，内部维护了两个锁：读锁和写锁。</p><blockquote><p>读写锁，在写线程访问时，所有的读线程和其它写线程均被阻塞。</p></blockquote><h2 id="jdk-有关锁的接口" tabindex="-1"><a class="header-anchor" href="#jdk-有关锁的接口" aria-hidden="true">#</a> JDK 有关锁的接口</h2><h3 id="抽象类-aqs-aqls-aos" tabindex="-1"><a class="header-anchor" href="#抽象类-aqs-aqls-aos" aria-hidden="true">#</a> 抽象类 AQS/AQLS/AOS</h3><p>AQS 是抽象队列同步器，资源使用 <code>int</code>类型的 <code>state</code> 来表示， AQLS （AbstractQueuedLongSynchronizer）代码和AQS 几乎一样，资源类型变成了 <code>long</code></p><p>AQS 和 AQLS 继承了 <code>AOS</code>（AbstractOwnableSynchronizer）.这个类用来表示锁和持有者的关系（独占模式)</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 独占模式，锁的持有者  </span>
<span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token class-name">Thread</span> exclusiveOwnerThread<span class="token punctuation">;</span>  

<span class="token comment">// 设置锁持有者  </span>
<span class="token keyword">protected</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">setExclusiveOwnerThread</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>  
    exclusiveOwnerThread <span class="token operator">=</span> t<span class="token punctuation">;</span>  
<span class="token punctuation">}</span>  

<span class="token comment">// 获取锁的持有线程  </span>
<span class="token keyword">protected</span> <span class="token keyword">final</span> <span class="token class-name">Thread</span> <span class="token function">getExclusiveOwnerThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
    <span class="token keyword">return</span> exclusiveOwnerThread<span class="token punctuation">;</span>  
<span class="token punctuation">}</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="接口-condition-lock-readwritelock" tabindex="-1"><a class="header-anchor" href="#接口-condition-lock-readwritelock" aria-hidden="true">#</a> 接口 Condition/Lock/ReadWriteLock</h3><p>Lock 里有释放和获取锁的方法声明，Lock 可以获得 <code>Condition</code></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Condition</span> <span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>ReadWriteLock 里有两个方法, 分别返回 <strong>读锁</strong> 和 <strong>写锁</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ReadWriteLock</span> <span class="token punctuation">{</span>  
    <span class="token doc-comment comment">/**  
     * Returns the lock used for reading.     *     * @return the lock used for reading  
     */</span> 
        <span class="token class-name">Lock</span> <span class="token function">readLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
    <span class="token doc-comment comment">/**  
     * Returns the lock used for writing.     *     * @return the lock used for writing  
     */</span>  
       <span class="token class-name">Lock</span> <span class="token function">writeLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对象锁是继承<code>Object</code>的<code>wait/notify</code>方法实现 等待/通知 机制。<code>Condition</code>接口提供了类似的方法，通过<code>Lock</code>来实现 通知/等待 机制。 我们来做一下总结</p><table><thead><tr><th>项目</th><th>对象锁</th><th>Condition</th></tr></thead><tbody><tr><td>前置条件</td><td>synchronized 获取对象锁</td><td>通过Lock.lock 获取锁，调用Lock.newCondition 获取 Condition 对象</td></tr><tr><td>调用方式</td><td>object.wait/notify()</td><td>condition.await/signal()</td></tr><tr><td>等待队列个数</td><td>1个</td><td>多个</td></tr><tr><td>释放锁进入 等待/超时等待 模式</td><td>支持</td><td>支持</td></tr><tr><td>释放锁进入等待，状态不中断</td><td>不支持</td><td>支持</td></tr><tr><td>唤醒队列中一个/全部线程</td><td>支持</td><td>支持</td></tr></tbody></table><p>Condition 和 Object 的 wait / notify 类似。</p><p>Condition 中的 await 对用 Object 的wait，signal/signal 对应 Object 的 notify/notifyuAll().</p><h3 id="reentrantlock" tabindex="-1"><a class="header-anchor" href="#reentrantlock" aria-hidden="true">#</a> ReentrantLock</h3><p>JDK 中 <code>Lock</code> 的默认实现，实现了锁的基本功能。内部有一个抽象类 <code>Sync</code>，<code>Sync</code>继承了 <code>AQS</code>。</p><p>ReentrantLock内部有两个非抽象类<code>NonfairSync</code>和<code>FairSync</code>，它们都继承了Sync。这意味着 <code>ReentrantLock</code> 可以支持公平锁和非公平锁。</p><blockquote><p>在ReentrantLock的构造方法里，可以传入一个<code>boolean</code>类型的参数，来指定它是否是一个公平锁，默认情况下是非公平的。这个参数一旦实例化后就不能修改，只能通过<code>isFair()</code>方法来查看。</p></blockquote><h3 id="reentrantreadwritelock" tabindex="-1"><a class="header-anchor" href="#reentrantreadwritelock" aria-hidden="true">#</a> ReentrantReadWriteLock</h3><p>JDK 中 <code>ReadWriteLock</code> 的默认实现，与<code>ReentrantLock</code> 类似，可重入，支持公平锁和非公平锁，不同的时，它支持<strong>读写锁</strong>。</p>`,39),d={"aria-labelledby":"chart-title-mermaid-1673936823768 chart-desc-mermaid-1673936823768",role:"img",viewBox:"0 0 1498.296875 224",style:{"max-width":"1498.3px","background-color":"white","font-family":'"trebuchet ms",verdana,arial,sans-serif',"font-size":"16px",fill:"#333"},height:"224","xmlns:xlink":"http://www.w3.org/1999/xlink",xmlns:"http://www.w3.org/2000/svg",width:"100%"},r=e("title",{id:"chart-title-mermaid-1673936823768"},null,-1),c=e("desc",{id:"chart-desc-mermaid-1673936823768"},null,-1),o=e("g",{transform:"translate(0, 0)"},[e("defs",null,[e("marker",{orient:"auto",markerHeight:"240",markerWidth:"190",refY:"7",refX:"0",class:"marker aggregation classDiagram",id:"classDiagram-aggregationStart"},[e("path",{d:"M 18,7 L9,13 L1,7 L9,1 Z"})])]),e("defs",null,[e("marker",{orient:"auto",markerHeight:"28",markerWidth:"20",refY:"7",refX:"19",class:"marker aggregation classDiagram",id:"classDiagram-aggregationEnd"},[e("path",{d:"M 18,7 L9,13 L1,7 L9,1 Z"})])]),e("defs",null,[e("marker",{orient:"auto",markerHeight:"240",markerWidth:"190",refY:"7",refX:"0",class:"marker extension classDiagram",id:"classDiagram-extensionStart"},[e("path",{d:"M 1,7 L18,13 V 1 Z"})])]),e("defs",null,[e("marker",{orient:"auto",markerHeight:"28",markerWidth:"20",refY:"7",refX:"19",class:"marker extension classDiagram",id:"classDiagram-extensionEnd"},[e("path",{d:"M 1,1 V 13 L18,7 Z"})])]),e("defs",null,[e("marker",{orient:"auto",markerHeight:"240",markerWidth:"190",refY:"7",refX:"0",class:"marker composition classDiagram",id:"classDiagram-compositionStart"},[e("path",{d:"M 18,7 L9,13 L1,7 L9,1 Z"})])]),e("defs",null,[e("marker",{orient:"auto",markerHeight:"28",markerWidth:"20",refY:"7",refX:"19",class:"marker composition classDiagram",id:"classDiagram-compositionEnd"},[e("path",{d:"M 18,7 L9,13 L1,7 L9,1 Z"})])]),e("defs",null,[e("marker",{orient:"auto",markerHeight:"240",markerWidth:"190",refY:"7",refX:"0",class:"marker dependency classDiagram",id:"classDiagram-dependencyStart"},[e("path",{d:"M 5,7 L9,13 L1,7 L9,1 Z"})])]),e("defs",null,[e("marker",{orient:"auto",markerHeight:"28",markerWidth:"20",refY:"7",refX:"19",class:"marker dependency classDiagram",id:"classDiagram-dependencyEnd"},[e("path",{d:"M 18,7 L9,13 L14,7 L9,1 Z"})])]),e("g",{class:"root"},[e("g",{class:"clusters"}),e("g",{class:"edgePaths"},[e("path",{"marker-end":"url(#classDiagram-dependencyEnd)",style:{fill:"none"},class:"edge-pattern-solid relation",id:"id1",d:"M147.9609375,148L147.9609375,142C147.9609375,136,147.9609375,124,162.3969840116279,112C176.83303052325581,100,205.7051235465116,88,220.14117005813952,82L234.57721656976744,76"}),e("path",{"marker-end":"url(#classDiagram-dependencyEnd)",style:{fill:"none"},class:"edge-pattern-solid relation",id:"id2",d:"M458.3359375,148L458.3359375,142C458.3359375,136,458.3359375,124,443.89989098837214,112C429.4638444767442,100,400.59175145348837,88,386.1557049418605,82L371.7196584302326,76"}),e("path",{"marker-end":"url(#classDiagram-dependencyEnd)",style:{fill:"none"},class:"edge-pattern-dashed relation",id:"id3",d:"M1001,148L1001,142C1001,136,1001,124,1001,113.83333333333333C1001,103.66666666666667,1001,95.33333333333333,1001,91.16666666666667L1001,87"}),e("path",{"marker-end":"url(#classDiagram-dependencyEnd)",style:{fill:"none"},class:"edge-pattern-dashed relation",id:"id4",d:"M1217.4453125,148L1217.4453125,142C1217.4453125,136,1217.4453125,124,1217.4453125,113.83333333333333C1217.4453125,103.66666666666667,1217.4453125,95.33333333333333,1217.4453125,91.16666666666667L1217.4453125,87"})]),e("g",{class:"edgeLabels"},[e("g",{class:"edgeLabel"},[e("g",{transform:"translate(0, 0)",class:"label"},[e("foreignObject",{height:"0",width:"0"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"edgeLabel"})])])])]),e("g",{class:"edgeLabel"},[e("g",{transform:"translate(0, 0)",class:"label"},[e("foreignObject",{height:"0",width:"0"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"edgeLabel"})])])])]),e("g",{class:"edgeLabel"},[e("g",{transform:"translate(0, 0)",class:"label"},[e("foreignObject",{height:"0",width:"0"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"edgeLabel"})])])])]),e("g",{class:"edgeLabel"},[e("g",{transform:"translate(0, 0)",class:"label"},[e("foreignObject",{height:"0",width:"0"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"edgeLabel"})])])])])]),e("g",{class:"nodes"},[e("g",{transform:"translate(303.1484375, 47.5)",id:"classid-AbstractOwnableSynchronizer-0",class:"node default"},[e("rect",{height:"57",width:"247.953125",y:"-28.5",x:"-123.9765625",class:"outer title-state"}),e("line",{y2:"1.5",y1:"1.5",x2:"123.9765625",x1:"-123.9765625",class:"divider"}),e("line",{y2:"17.5",y1:"17.5",x2:"123.9765625",x1:"-123.9765625",class:"divider"}),e("g",{class:"label"},[e("foreignObject",{height:"0",width:"0"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"})])]),e("foreignObject",{transform:"translate( -116.4765625, -21)",height:"18",width:"232.953125",class:"classTitle"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"},"AbstractOwnableSynchronizer")])])])]),e("g",{transform:"translate(147.9609375, 176.5)",id:"classid-AbstractQueuedLongSynchronizer-1",class:"node default"},[e("rect",{height:"57",width:"279.921875",y:"-28.5",x:"-139.9609375",class:"outer title-state"}),e("line",{y2:"1.5",y1:"1.5",x2:"139.9609375",x1:"-139.9609375",class:"divider"}),e("line",{y2:"17.5",y1:"17.5",x2:"139.9609375",x1:"-139.9609375",class:"divider"}),e("g",{class:"label"},[e("foreignObject",{height:"0",width:"0"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"})])]),e("foreignObject",{transform:"translate( -132.4609375, -21)",height:"18",width:"264.921875",class:"classTitle"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"},"AbstractQueuedLongSynchronizer")])])])]),e("g",{transform:"translate(458.3359375, 176.5)",id:"classid-AbstractQueuedSynchronizer-2",class:"node default"},[e("rect",{height:"57",width:"240.828125",y:"-28.5",x:"-120.4140625",class:"outer title-state"}),e("line",{y2:"1.5",y1:"1.5",x2:"120.4140625",x1:"-120.4140625",class:"divider"}),e("line",{y2:"17.5",y1:"17.5",x2:"120.4140625",x1:"-120.4140625",class:"divider"}),e("g",{class:"label"},[e("foreignObject",{height:"0",width:"0"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"})])]),e("foreignObject",{transform:"translate( -112.9140625, -21)",height:"18",width:"225.828125",class:"classTitle"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"},"AbstractQueuedSynchronizer")])])])]),e("g",{transform:"translate(676.28125, 176.5)",id:"classid-Condition-3",class:"node default"},[e("rect",{height:"79",width:"95.0625",y:"-39.5",x:"-47.53125",class:"outer title-state"}),e("line",{y2:"12.5",y1:"12.5",x2:"47.53125",x1:"-47.53125",class:"divider"}),e("line",{y2:"28.5",y1:"28.5",x2:"47.53125",x1:"-47.53125",class:"divider"}),e("g",{class:"label"},[e("foreignObject",{transform:"translate( -40.03125, -32)",height:"18",width:"80.0625"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"},"«Interface»")])]),e("foreignObject",{transform:"translate( -37.3203125, -10)",height:"18",width:"74.640625",class:"classTitle"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"},"Condition")])])])]),e("g",{transform:"translate(1001, 47.5)",id:"classid-Lock-4",class:"node default"},[e("rect",{height:"79",width:"95.0625",y:"-39.5",x:"-47.53125",class:"outer title-state"}),e("line",{y2:"12.5",y1:"12.5",x2:"47.53125",x1:"-47.53125",class:"divider"}),e("line",{y2:"28.5",y1:"28.5",x2:"47.53125",x1:"-47.53125",class:"divider"}),e("g",{class:"label"},[e("foreignObject",{transform:"translate( -40.03125, -32)",height:"18",width:"80.0625"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"},"«Interface»")])]),e("foreignObject",{transform:"translate( -18.671875, -10)",height:"18",width:"37.34375",class:"classTitle"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"},"Lock")])])])]),e("g",{transform:"translate(830.6484375, 176.5)",id:"classid-LockSupport-5",class:"node default"},[e("rect",{height:"57",width:"113.671875",y:"-28.5",x:"-56.8359375",class:"outer title-state"}),e("line",{y2:"1.5",y1:"1.5",x2:"56.8359375",x1:"-56.8359375",class:"divider"}),e("line",{y2:"17.5",y1:"17.5",x2:"56.8359375",x1:"-56.8359375",class:"divider"}),e("g",{class:"label"},[e("foreignObject",{height:"0",width:"0"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"})])]),e("foreignObject",{transform:"translate( -49.3359375, -21)",height:"18",width:"98.671875",class:"classTitle"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"},"LockSupport")])])])]),e("g",{transform:"translate(1217.4453125, 47.5)",id:"classid-ReadWriteLock-6",class:"node default"},[e("rect",{height:"79",width:"131.1875",y:"-39.5",x:"-65.59375",class:"outer title-state"}),e("line",{y2:"12.5",y1:"12.5",x2:"65.59375",x1:"-65.59375",class:"divider"}),e("line",{y2:"28.5",y1:"28.5",x2:"65.59375",x1:"-65.59375",class:"divider"}),e("g",{class:"label"},[e("foreignObject",{transform:"translate( -40.03125, -32)",height:"18",width:"80.0625"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"},"«Interface»")])]),e("foreignObject",{transform:"translate( -58.09375, -10)",height:"18",width:"116.1875",class:"classTitle"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"},"ReadWriteLock")])])])]),e("g",{transform:"translate(1001, 176.5)",id:"classid-ReentrantLock-7",class:"node default"},[e("rect",{height:"57",width:"127.03125",y:"-28.5",x:"-63.515625",class:"outer title-state"}),e("line",{y2:"1.5",y1:"1.5",x2:"63.515625",x1:"-63.515625",class:"divider"}),e("line",{y2:"17.5",y1:"17.5",x2:"63.515625",x1:"-63.515625",class:"divider"}),e("g",{class:"label"},[e("foreignObject",{height:"0",width:"0"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"})])]),e("foreignObject",{transform:"translate( -56.015625, -21)",height:"18",width:"112.03125",class:"classTitle"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"},"ReentrantLock")])])])]),e("g",{transform:"translate(1217.4453125, 176.5)",id:"classid-ReentrantReadWriteLock-8",class:"node default"},[e("rect",{height:"57",width:"205.859375",y:"-28.5",x:"-102.9296875",class:"outer title-state"}),e("line",{y2:"1.5",y1:"1.5",x2:"102.9296875",x1:"-102.9296875",class:"divider"}),e("line",{y2:"17.5",y1:"17.5",x2:"102.9296875",x1:"-102.9296875",class:"divider"}),e("g",{class:"label"},[e("foreignObject",{height:"0",width:"0"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"})])]),e("foreignObject",{transform:"translate( -95.4296875, -21)",height:"18",width:"190.859375",class:"classTitle"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"},"ReentrantReadWriteLock")])])])]),e("g",{transform:"translate(1430.3359375, 176.5)",id:"classid-StampedLock-9",class:"node default"},[e("rect",{height:"57",width:"119.921875",y:"-28.5",x:"-59.9609375",class:"outer title-state"}),e("line",{y2:"1.5",y1:"1.5",x2:"59.9609375",x1:"-59.9609375",class:"divider"}),e("line",{y2:"17.5",y1:"17.5",x2:"59.9609375",x1:"-59.9609375",class:"divider"}),e("g",{class:"label"},[e("foreignObject",{height:"0",width:"0"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"})])]),e("foreignObject",{transform:"translate( -52.4609375, -21)",height:"18",width:"104.921875",class:"classTitle"},[e("div",{style:{display:"inline-block","white-space":"nowrap"},xmlns:"http://www.w3.org/1999/xhtml"},[e("span",{class:"nodeLabel"},"StampedLock")])])])])])])],-1),p=[r,c,o];function h(w,g){return a(),s("div",null,[l,(a(),s("svg",d,p))])}const k=n(i,[["render",h],["__file","Lock接口.html.vue"]]);export{k as default};
