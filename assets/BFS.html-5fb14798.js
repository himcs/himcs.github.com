import{_ as e,p as i,q as n,a1 as d}from"./framework-fa6fd9c7.js";const l={},s=d(`<h1 id="bfs" tabindex="-1"><a class="header-anchor" href="#bfs" aria-hidden="true">#</a> BFS</h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>找到两样东西之间的最短距离。</p><ul><li>迷宫路径</li><li>国际跳棋AI</li><li>根据人际关系找到关系最近的医生</li></ul><h2 id="可以解决的问题" tabindex="-1"><a class="header-anchor" href="#可以解决的问题" aria-hidden="true">#</a> 可以解决的问题</h2><ul><li><p>有没有路径</p></li><li><p>那条路径最短</p></li></ul><h2 id="核心思路" tabindex="-1"><a class="header-anchor" href="#核心思路" aria-hidden="true">#</a> 核心思路</h2><p>例如人际关系找到关系最近的医生</p><h3 id="建模" tabindex="-1"><a class="header-anchor" href="#建模" aria-hidden="true">#</a> 建模</h3><p>首先要建模，创建一度关系，二度关系</p><p>代码中可以种<code>HashSet</code>模拟</p><h3 id="查找" tabindex="-1"><a class="header-anchor" href="#查找" aria-hidden="true">#</a> 查找</h3><p>首先搜索一度关系，然后才是二度关系</p><p>使用队列存储待遍历的节点。</p><p>首先将一度关系，加入队列，</p><p>然后出队列，将出队列元素的关系降入到队列末尾</p><p>伪代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Queue queue;
while(!queue.isEmpty())
{
	// 去节点
	curr = queue.poll();
	// 将孩子节点加入队列末尾
	qeue.addAll(curr.chirend);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了防止死循环(A-B,B-A)，还有结束状态还要加入检测机制</p><p>改进后</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Queue queue;
Set visted;
while(!queue.isEmpty())
{
	// 去节点
	curr = queue.poll();
	//是否结束
	if(curr == end)
	{
		return;
	}
	//已经遍历过 不加入队列
	if(visted.contains(curr))
	{
		continue;
	}
	// 将孩子节点加入队列末尾
	qeue.addAll(curr.chirend);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了输出路径，要加上指向上一节点的机制，然后可以根据最后一个节点找到每一个节点。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Queue queue;
Set visted;
while(!queue.isEmpty())
{
	// 去节点
	curr = queue.poll();
	//是否结束
	if(curr == end)
	{
		return;
	}
	//已经遍历过 不加入队列
	if(visted.contains(curr))
	{
		continue;
	}
	//孩子节点的上一步 保存
	for(t:curr.chirend)
	{
		t.pre = curr;
	}
	// 将孩子节点加入队列末尾
	qeue.addAll(curr.chirend);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),a=[s];function r(u,v){return i(),n("div",null,a)}const c=e(l,[["render",r],["__file","BFS.html.vue"]]);export{c as default};
