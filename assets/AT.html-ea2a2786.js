import{_ as n,p as s,q as a,a1 as t}from"./framework-fa6fd9c7.js";const e="/assets/XA-8c6d68f2.svg",p="/assets/XA-rollback-5ceb2be6.svg",o={},c=t('<h1 id="at-模式" tabindex="-1"><a class="header-anchor" href="#at-模式" aria-hidden="true">#</a> AT 模式</h1><h2 id="要求" tabindex="-1"><a class="header-anchor" href="#要求" aria-hidden="true">#</a> 要求</h2><ul><li>基于ACID关系数据库</li><li>Java应用，基于JDBC</li></ul><h2 id="机制" tabindex="-1"><a class="header-anchor" href="#机制" aria-hidden="true">#</a> 机制</h2><p>两阶段提交</p><ul><li>一阶段： 业务数据和回滚日志记录在一个本地事务提交，释放本地锁和连接资源</li><li>二阶段： <ul><li>成功： 提交异步化，快速完成</li><li>失败： 通过一阶段回滚日志进行反向补偿</li></ul></li></ul><h2 id="写隔离" tabindex="-1"><a class="header-anchor" href="#写隔离" aria-hidden="true">#</a> 写隔离</h2><ul><li>一阶段本地事务提交前，确保拿到全局锁</li><li>拿不到全局锁，不能提交本地事务</li><li>拿全局锁尝试限制一定范围内，超出范围将放弃，并释放本地锁</li></ul><h3 id="成功案例" tabindex="-1"><a class="header-anchor" href="#成功案例" aria-hidden="true">#</a> 成功案例</h3><blockquote><p>tx1 先开始，开启本地事务，拿到本地锁，更新操作 m = 1000 - 100 = 900。本地事务提交前，先拿到该记录的 <strong>全局锁</strong> ，本地提交释放本地锁。 tx2 后开始，开启本地事务，拿到本地锁，更新操作 m = 900 - 100 = 800。本地事务提交前，尝试拿该记录的 <strong>全局锁</strong> ，tx1 全局提交前，该记录的全局锁被 tx1 持有，tx2 需要重试等待 <strong>全局锁</strong> 。</p><p>tx1 二阶段全局提交，释放 <strong>全局锁</strong> 。tx2 拿到 <strong>全局锁</strong> 提交本地事务。</p></blockquote><p><img src="'+e+'" alt="XA"></p><h3 id="回滚案例" tabindex="-1"><a class="header-anchor" href="#回滚案例" aria-hidden="true">#</a> 回滚案例</h3><blockquote><p>如果 tx1 的二阶段全局回滚，则 tx1 需要重新获取该数据的本地锁，进行反向补偿的更新操作，实现分支的回滚。</p><p>此时，如果 tx2 仍在等待该数据的 <strong>全局锁</strong>，同时持有本地锁，则 tx1 的分支回滚会失败。分支的回滚会一直重试，直到 tx2 的 <strong>全局锁</strong> 等锁超时，放弃 <strong>全局锁</strong> 并回滚本地事务释放本地锁，tx1 的分支回滚最终成功。</p><p>因为整个过程 <strong>全局锁</strong> 在 tx1 结束前一直是被 tx1 持有的，所以不会发生 <strong>脏写</strong> 的问题。</p></blockquote><p><img src="'+p+`" alt="XA-rollback"></p><h2 id="读隔离" tabindex="-1"><a class="header-anchor" href="#读隔离" aria-hidden="true">#</a> 读隔离</h2><p>AT模式默认全局级别是读未提交(Read Uncommitted)</p><p>特点场景下，必须要求全局的 读已提交 ， 目前通过 <code>SELECT FOR UPDATE</code> 语句代理。</p><p><img src="https://img.alicdn.com/tfs/TB138wuwYj1gK0jSZFuXXcrHpXa-724-521.png" alt="Read Isolation: SELECT FOR UPDATE"></p><blockquote><p>SELECT FOR UPDATE 语句的执行会申请 <strong>全局锁</strong> ，如果 <strong>全局锁</strong> 被其他事务持有，则释放本地锁（回滚 SELECT FOR UPDATE 语句的本地执行）并重试。这个过程中，查询是被 block 住的，直到 <strong>全局锁</strong> 拿到，即读取的相关数据是 <strong>已提交</strong> 的，才返回。</p><p>出于总体性能上的考虑，Seata 目前的方案并没有对所有 SELECT 语句都进行代理，仅针对 FOR UPDATE 的 SELECT 语句。</p></blockquote><h2 id="工作机制" tabindex="-1"><a class="header-anchor" href="#工作机制" aria-hidden="true">#</a> 工作机制</h2><p>TC TM 向 TC 注册</p><p>TC 发起 全局事务 ,</p><p>通知RM 执行，RM会执行并向TC汇报结果</p><p>TC根据结果 全局提交或回滚</p><h3 id="一阶段" tabindex="-1"><a class="header-anchor" href="#一阶段" aria-hidden="true">#</a> 一阶段</h3><ol><li><p>解析SQL，获得SQL类型条件</p></li><li><p>查询前镜像：根据解析得到的条件信息，生成查询语句，定位数据</p></li><li><p>执行业务SQL</p></li><li><p>查询后镜像</p></li><li><p>插入回滚日志，将前后镜像及业务SQL组成一条回滚日志，插入<code>UNDO_LOG</code>表</p></li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
	<span class="token property">&quot;branchId&quot;</span><span class="token operator">:</span> <span class="token number">641789253</span><span class="token punctuation">,</span>
	<span class="token property">&quot;undoItems&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
		<span class="token property">&quot;afterImage&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token property">&quot;rows&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
				<span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
					<span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span>
					<span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
					<span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
					<span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span>
					<span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
					<span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;GTS&quot;</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
					<span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;since&quot;</span><span class="token punctuation">,</span>
					<span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
					<span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2014&quot;</span>
				<span class="token punctuation">}</span><span class="token punctuation">]</span>
			<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
			<span class="token property">&quot;tableName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;product&quot;</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token property">&quot;beforeImage&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token property">&quot;rows&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
				<span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
					<span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span>
					<span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
					<span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
					<span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span>
					<span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
					<span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;TXC&quot;</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
					<span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;since&quot;</span><span class="token punctuation">,</span>
					<span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
					<span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2014&quot;</span>
				<span class="token punctuation">}</span><span class="token punctuation">]</span>
			<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
			<span class="token property">&quot;tableName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;product&quot;</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token property">&quot;sqlType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UPDATE&quot;</span>
	<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
	<span class="token property">&quot;xid&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xid:xxx&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li>提交前，向 TC 注册分支，申请 <code>product</code> 表中，主键值等于 1 的记录的 <strong>全局锁</strong> 。</li><li>本地事务提交 ，业务数据和 <code>UNDO_LOG</code>一并提交</li><li>将本地事务提交结果上报给 TC</li></ol><h3 id="二阶段" tabindex="-1"><a class="header-anchor" href="#二阶段" aria-hidden="true">#</a> 二阶段</h3><h4 id="提交" tabindex="-1"><a class="header-anchor" href="#提交" aria-hidden="true">#</a> 提交</h4><ol><li>收到 TC 的分支提交请求，把请求放入一个异步任务的队列中，马上返回提交成功的结果给 TC。</li><li>异步任务阶段的分支提交请求将异步和批量地删除相应 UNDO LOG 记录。</li></ol><h4 id="回滚" tabindex="-1"><a class="header-anchor" href="#回滚" aria-hidden="true">#</a> 回滚</h4><ol><li>收到 TC 的分支回滚请求，开启一个本地事务，执行如下操作。</li><li>通过 XID 和 Branch ID 查找到相应的 UNDO LOG 记录。</li><li>数据校验：拿 UNDO LOG 中的后镜与当前数据进行比较，如果有不同，说明数据被当前全局事务之外的动作做了修改。这种情况，需要根据配置策略来做处理，详细的说明在另外的文档中介绍。</li><li>根据 UNDO LOG 中的前镜像和业务 SQL 的相关信息生成并执行回滚的语句：</li></ol><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">update</span> product <span class="token keyword">set</span> name <span class="token operator">=</span> <span class="token string">&#39;TXC&#39;</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5"><li>提交本地事务。并把本地事务的执行结果（即分支事务回滚的结果）上报给 TC。</li></ol><h2 id="coding" tabindex="-1"><a class="header-anchor" href="#coding" aria-hidden="true">#</a> Coding</h2><p>基于 <code>Spring Cloud</code>微服务</p><h3 id="建表" tabindex="-1"><a class="header-anchor" href="#建表" aria-hidden="true">#</a> 建表</h3><p><code>TM</code>和<code>RM</code>业务数据库添加<code>undo_log</code>表</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 注意此处0.7.0+ 增加字段 context</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>undo_log<span class="token punctuation">\`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">\`</span>id<span class="token punctuation">\`</span></span> <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">\`</span>branch_id<span class="token punctuation">\`</span></span> <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">\`</span>xid<span class="token punctuation">\`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">\`</span>context<span class="token punctuation">\`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">\`</span>rollback_info<span class="token punctuation">\`</span></span> <span class="token keyword">longblob</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">\`</span>log_status<span class="token punctuation">\`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">\`</span>log_created<span class="token punctuation">\`</span></span> <span class="token keyword">datetime</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">\`</span>log_modified<span class="token punctuation">\`</span></span> <span class="token keyword">datetime</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">\`</span>id<span class="token punctuation">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">UNIQUE</span> <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">\`</span>ux_undo_log<span class="token punctuation">\`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">\`</span>xid<span class="token punctuation">\`</span></span><span class="token punctuation">,</span><span class="token identifier"><span class="token punctuation">\`</span>branch_id<span class="token punctuation">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="依赖" tabindex="-1"><a class="header-anchor" href="#依赖" aria-hidden="true">#</a> 依赖</h3><p>引入 <code>Spring Cloud</code> 和 <code>seata</code> 依赖</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-netflix-eureka-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!-- 使用ribbon时才用的上 --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-netflix-ribbon<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

        <span class="token comment">&lt;!-- 使用feign时才用的上 --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-data-jpa<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>druid-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.2.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-alibaba-seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.1.0.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>io.himcs<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>common<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>0.0.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加文件" tabindex="-1"><a class="header-anchor" href="#添加文件" aria-hidden="true">#</a> 添加文件</h3><p>项目 <code>resources</code>添加以下两个文件</p><h4 id="registry-conf" tabindex="-1"><a class="header-anchor" href="#registry-conf" aria-hidden="true">#</a> registry.conf</h4><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = &quot;eureka&quot;

  nacos {
    serverAddr = &quot;localhost&quot;
    namespace = &quot;&quot;
    cluster = &quot;default&quot;
  }
  eureka {
    serviceUrl = &quot;http://localhost:8761/eureka&quot;
    application = &quot;default&quot;
    weight = &quot;1&quot;
  }
  redis {
    serverAddr = &quot;localhost:6379&quot;
    db = &quot;0&quot;
    password = &quot;&quot;
    cluster = &quot;default&quot;
    timeout = &quot;0&quot;
  }
  zk {
    cluster = &quot;default&quot;
    serverAddr = &quot;127.0.0.1:2181&quot;
    session.timeout = 6000
    connect.timeout = 2000
    username = &quot;&quot;
    password = &quot;&quot;
  }
  consul {
    cluster = &quot;default&quot;
    serverAddr = &quot;127.0.0.1:8500&quot;
  }
  etcd3 {
    cluster = &quot;default&quot;
    serverAddr = &quot;http://localhost:2379&quot;
  }
  sofa {
    serverAddr = &quot;127.0.0.1:9603&quot;
    application = &quot;default&quot;
    region = &quot;DEFAULT_ZONE&quot;
    datacenter = &quot;DefaultDataCenter&quot;
    cluster = &quot;default&quot;
    group = &quot;SEATA_GROUP&quot;
    addressWaitTime = &quot;3000&quot;
  }
  file {
    name = &quot;file.conf&quot;
  }
}

config {
  # file、nacos 、apollo、zk、consul、etcd3、springCloudConfig
  type = &quot;file&quot;

  nacos {
    serverAddr = &quot;localhost&quot;
    namespace = &quot;&quot;
    group = &quot;SEATA_GROUP&quot;
  }
  consul {
    serverAddr = &quot;127.0.0.1:8500&quot;
  }
  apollo {
    app.id = &quot;seata-server&quot;
    apollo.meta = &quot;http://192.168.1.204:8801&quot;
    namespace = &quot;application&quot;
  }
  zk {
    serverAddr = &quot;127.0.0.1:2181&quot;
    session.timeout = 6000
    connect.timeout = 2000
    username = &quot;&quot;
    password = &quot;&quot;
  }
  etcd3 {
    serverAddr = &quot;http://localhost:2379&quot;
  }
  file {
    name = &quot;file.conf&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="file-conf" tabindex="-1"><a class="header-anchor" href="#file-conf" aria-hidden="true">#</a> file.conf</h4><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>transport {
  # tcp udt unix-domain-socket
  type = &quot;TCP&quot;
  #NIO NATIVE
  server = &quot;NIO&quot;
  #enable heartbeat
  heartbeat = true
  # the client batch send request enable
  enableClientBatchSendRequest = true
  #thread factory for netty
  threadFactory {
    bossThreadPrefix = &quot;NettyBoss&quot;
    workerThreadPrefix = &quot;NettyServerNIOWorker&quot;
    serverExecutorThread-prefix = &quot;NettyServerBizHandler&quot;
    shareBossWorker = false
    clientSelectorThreadPrefix = &quot;NettyClientSelector&quot;
    clientSelectorThreadSize = 1
    clientWorkerThreadPrefix = &quot;NettyClientWorkerThread&quot;
    # netty boss thread size,will not be used for UDT
    bossThreadSize = 1
    #auto default pin or 8
    workerThreadSize = &quot;default&quot;
  }
  shutdown {
    # when destroy server, wait seconds
    wait = 3
  }
  serialization = &quot;seata&quot;
  compressor = &quot;none&quot;
}
service {
 #vgroup-&gt;rgroup
  vgroup_mapping.my_test_tx_group = &quot;default&quot;
  #only support when registry.type=file, please don&#39;t set multiple addresses
  default.grouplist = &quot;127.0.0.1:8091&quot;
  #degrade, current not support
  enableDegrade = false
  #disable seata
  disableGlobalTransaction = false
}

client {
  rm {
    asyncCommitBufferLimit = 10000
    lock {
      retryInterval = 10
      retryTimes = 30
      retryPolicyBranchRollbackOnConflict = true
    }
    reportRetryCount = 5
    tableMetaCheckEnable = false
    reportSuccessEnable = false
  }
  tm {
    commitRetryCount = 5
    rollbackRetryCount = 5
  }
  undo {
    dataValidation = true
    logSerialization = &quot;jackson&quot;
    logTable = &quot;undo_log&quot;
  }
  log {
    exceptionRate = 100
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3><p>配置 <code>eureka</code> 和 <code>datasource</code>和<code>seata</code>，其中 <code>tx-service-group</code> 要和<code>file.conf</code>的<code>vgroup_mapping</code>一致</p><h4 id="application-yml" tabindex="-1"><a class="header-anchor" href="#application-yml" aria-hidden="true">#</a> application.yml</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">MYSQL_HOST</span><span class="token punctuation">:</span> himcs.io
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8811</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> business<span class="token punctuation">-</span>service
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//$<span class="token punctuation">{</span>MYSQL_HOST<span class="token punctuation">:</span>localhost<span class="token punctuation">}</span><span class="token punctuation">:</span>3306/seata<span class="token punctuation">-</span>business<span class="token punctuation">?</span>useUnicode=true<span class="token important">&amp;characterEncoding=UTF8&amp;zeroDateTimeBehavior=convertToNull&amp;serverTimezone=Asia/Shanghai</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> root
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">alibaba</span><span class="token punctuation">:</span>
      <span class="token key atrule">seata</span><span class="token punctuation">:</span>
        <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> my_test_tx_group <span class="token comment"># 事务分组</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> localhost
    <span class="token key atrule">prefer-ip-address</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">serviceUrl</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//$<span class="token punctuation">{</span>eureka.instance.hostname<span class="token punctuation">}</span><span class="token punctuation">:</span>8761/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="数据源代理" tabindex="-1"><a class="header-anchor" href="#数据源代理" aria-hidden="true">#</a> 数据源代理</h4><p>配置 <code>Seata</code>数据源代理</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataSourceConfiguration</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;spring.datasource&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DruidDataSource</span> <span class="token function">druidDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DruidDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Primary</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSourceProxy</span> <span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token class-name">DruidDataSource</span> druidDataSource<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DataSourceProxy</span><span class="token punctuation">(</span>druidDataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tm-端" tabindex="-1"><a class="header-anchor" href="#tm-端" aria-hidden="true">#</a> TM 端</h3><p>主类添加 SpringCloud 相关依赖</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableEurekaClient</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token annotation punctuation">@EnableJpaRepositories</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BusinessServerApplication</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">BusinessServerApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加相关<code>FeignClient</code></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span><span class="token string">&quot;\${services.order-service}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/create&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">OrderDTO</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">OrderDTO</span> order<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="全局事务" tabindex="-1"><a class="header-anchor" href="#全局事务" aria-hidden="true">#</a> 全局事务</h4><p>在方法上添加 <code> @GlobalTransactional(name = &quot;fsp-sale&quot;, timeoutMills = 20000, rollbackFor = Exception.class)</code></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BusinessServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">BusinessService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">PointsService</span> pointsService<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">StorageService</span> storageService<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">OrderService</span> orderService<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 商品销售
     *
     * <span class="token keyword">@param</span> <span class="token parameter">goodsCode</span> 商品编码
     * <span class="token keyword">@param</span> <span class="token parameter">quantity</span>  销售数量
     * <span class="token keyword">@param</span> <span class="token parameter">username</span>  用户名
     * <span class="token keyword">@param</span> <span class="token parameter">points</span>    增加积分
     * <span class="token keyword">@param</span> <span class="token parameter">amount</span>    订单金额
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token comment">// TM 向 TC发起全局事务 生成 XID(全局锁）</span>
<span class="token comment">//</span>
    <span class="token annotation punctuation">@GlobalTransactional</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;fsp-sale&quot;</span><span class="token punctuation">,</span> timeoutMills <span class="token operator">=</span> <span class="token number">20000</span><span class="token punctuation">,</span> rollbackFor <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">OrderDTO</span> <span class="token function">sale</span><span class="token punctuation">(</span><span class="token class-name">String</span> goodsCode<span class="token punctuation">,</span> <span class="token class-name">Integer</span> quantity<span class="token punctuation">,</span> <span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">Integer</span> points<span class="token punctuation">,</span> <span class="token class-name">Integer</span> amount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">PointsDTO</span> pointsDTO <span class="token operator">=</span> <span class="token class-name">PointsDTO</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">username</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">points</span><span class="token punctuation">(</span>points<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">StorageDTO</span> storageDTO <span class="token operator">=</span> <span class="token class-name">StorageDTO</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">goodsCode</span><span class="token punctuation">(</span>goodsCode<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">quantity</span><span class="token punctuation">(</span>quantity<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">OrderDTO</span> request <span class="token operator">=</span> <span class="token class-name">OrderDTO</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">username</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">points</span><span class="token punctuation">(</span>points<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">goodsCode</span><span class="token punctuation">(</span>goodsCode<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">quantity</span><span class="token punctuation">(</span>quantity<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">amount</span><span class="token punctuation">(</span>amount<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//写表 UNDO_LOG 记录回滚日志（BranchID),通知TC操作结果</span>
        pointsService<span class="token punctuation">.</span><span class="token function">increase</span><span class="token punctuation">(</span>pointsDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//写表 UNDO_LOG 记录回滚日志（BranchID),通知TC操作结果</span>
        storageService<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>storageDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//写表 UNDO_LOG 记录回滚日志（BranchID),通知TC操作结果</span>
        <span class="token class-name">OrderDTO</span> order <span class="token operator">=</span> orderService<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 分支 a 执行成功 TM 通知 TC 全局提交</span>
        <span class="token comment">// 分支 a TC 通知所有RM 提交成功， 删除 UNDO_LOG 回滚日志</span>

        <span class="token comment">// 分支 b 执行失败 TM 通知 TC 全局 Rollback</span>
        <span class="token comment">// 分支 b TC 通知所有RM 进行回滚， 根据 UNDO_LOG 反向操作 还原数据 删除 UNDO_LOG</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> order<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rm-端" tabindex="-1"><a class="header-anchor" href="#rm-端" aria-hidden="true">#</a> RM 端</h3><p>按照配置依次配置依赖，添加文件，配置代理源即可</p>`,67),i=[c];function l(u,r){return s(),a("div",null,i)}const k=n(o,[["render",l],["__file","AT.html.vue"]]);export{k as default};
