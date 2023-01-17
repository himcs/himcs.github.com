import{_ as t,p as r,q as a,a1 as d}from"./framework-fa6fd9c7.js";const n={},o=d('<h1 id="java-内存模型" tabindex="-1"><a class="header-anchor" href="#java-内存模型" aria-hidden="true">#</a> Java 内存模型</h1><h2 id="并发编程的两个关键问题" tabindex="-1"><a class="header-anchor" href="#并发编程的两个关键问题" aria-hidden="true">#</a> 并发编程的两个关键问题</h2><ul><li>线程间如何通信？</li><li>线程间如何同步？</li></ul><p>有两种模型解决这两个问题。</p><ul><li>消息传递并发模型</li><li>共享内存并发模型</li></ul><table><thead><tr><th></th><th>通信</th><th>同步</th></tr></thead><tbody><tr><td>消息传递</td><td>线程间<strong>没有公共状态</strong>，通过发送消息来显式通信。</td><td>发送消息天然同步，因为发送消息总是在接收消息之前，同步是隐式的。</td></tr><tr><td>共享内存</td><td>通过<strong>写-读内存中的公共状态</strong>来隐式通信。</td><td><strong>必须显式指定某段代码在线程间互斥执行</strong>，同步时显式的。</td></tr></tbody></table><p><strong>Java 使用的是共享内存并发模型</strong></p><h2 id="java-内存模型抽象结构" tabindex="-1"><a class="header-anchor" href="#java-内存模型抽象结构" aria-hidden="true">#</a> Java 内存模型抽象结构</h2><h3 id="运行时内存的划分" tabindex="-1"><a class="header-anchor" href="#运行时内存的划分" aria-hidden="true">#</a> 运行时内存的划分</h3><table><thead><tr><th>线程共享数据区</th><th>线程私有数据区</th></tr></thead><tbody><tr><td>方法区</td><td>虚拟机栈</td></tr><tr><td>堆</td><td>本地方法栈</td></tr><tr><td></td><td>程序计数器</td></tr></tbody></table><p>对于每一个线程来说，栈是私有的，堆是共享的。</p><p>栈中变量（局部变量，方法定义参数，异常处理器参数）不在线程中共享，也就不会有内存可见性的问题，也不受内存模型的影响。</p><p>内存可见性针对的是<strong>共享变量</strong>。</p><h3 id="堆是共享的-为什么会有内存不可见的问题" tabindex="-1"><a class="header-anchor" href="#堆是共享的-为什么会有内存不可见的问题" aria-hidden="true">#</a> 堆是共享的，为什么会有内存不可见的问题？</h3><p>因为现代计算器为了高效，往往会在<strong>高速缓存区</strong>缓存<strong>共享变量</strong>，因为cpu访问缓存区比内存速度快的多。</p><blockquote><p>线程间共享变量存在于主内存，每个线程都一个私有的本地内存，存储了共享变量的副本。</p><p>线程只能堆共享变量的副本进行读-写操作。</p></blockquote><ul><li><strong>共享变量</strong>都在<strong>主内存</strong></li><li>每个<strong>线程</strong>都保存了一份共享变量的<strong>副本</strong></li><li>如果线程A与线程B之间要通信，要经历下面的步骤 <ul><li><strong>线程A</strong>将本地内存A更新的<strong>副本</strong>刷新到<strong>主内存</strong>中</li><li>线程B从主内存读取线程A更新的共享变量</li></ul></li></ul><p>线程A<strong>无法</strong>直接访问线程B的<strong>本地内存</strong>。</p><p>线程B并不是直接读取主内存的值，而是在本地内存B找到这个共享变量，发现已经被更新了，然后本地内存B去主内存读取最新的共享变量的值，并拷贝的本地内存B，然后线程B从本地内存B获取到值。</p><p><strong>如何直到共享变量被其他线程更新了呢？</strong></p><p>Java 内存模型( JMM )通过控制主内存与各线程本地内存的交互，来提供内存可见性保证。</p>',21),e=[o];function s(h,i){return r(),a("div",null,e)}const g=t(n,[["render",s],["__file","内存模型.html.vue"]]);export{g as default};
