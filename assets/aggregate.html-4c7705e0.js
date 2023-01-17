import{_ as n,M as d,p as s,q as r,R as e,t as a,N as l,a1 as t}from"./framework-fa6fd9c7.js";const c={},v=e("h1",{id:"聚合查询",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#聚合查询","aria-hidden":"true"},"#"),a(" 聚合查询")],-1),o=e("p",null,"数据聚合查询，类似于unix管道，数据流从一个个中间件经过。",-1),u={href:"https://docs.mongodb.com/manual/meta/aggregation-quick-reference/",target:"_blank",rel:"noopener noreferrer"},m=t(`<h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h2><p>使用<code>aggregate()</code>,参数为一个聚合处理数组</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.getCollection(&quot;unicorns&quot;).aggregate([
{$group:{_id:\`$gender\`,total:{$sum:1}}}
])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参数模式" tabindex="-1"><a class="header-anchor" href="#参数模式" aria-hidden="true">#</a> 参数模式</h2><p>模式 数组形式 {&lt;操作符&gt;:[&lt;参数1&gt;,&lt;参数2&gt;...]} 单参数 {&lt;操作符&gt;:&lt;参数&gt;}</p><p>为了避免参数是文字数组解析起义，文字数组必须使用$前缀</p><h2 id="group-分组" tabindex="-1"><a class="header-anchor" href="#group-分组" aria-hidden="true">#</a> $group 分组</h2><p>配套 $avg</p><p>SQL中<code>gourp by</code>=&gt;</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{$group:{
		_id:\`$field\`,
		total:{$sum:1}
		avgVamp:{$avg:&#39;$field2&#39;}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>_id</code>是固定语法</p><h2 id="match-过滤" tabindex="-1"><a class="header-anchor" href="#match-过滤" aria-hidden="true">#</a> $match 过滤</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{$match: {weight:{$lt:600}}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="排序" tabindex="-1"><a class="header-anchor" href="#排序" aria-hidden="true">#</a> 排序</h2><p><code>1</code>=递增</p><p><code>-1</code>=递减</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$sort:{avgVamp:-1}} ])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="添加字段" tabindex="-1"><a class="header-anchor" href="#添加字段" aria-hidden="true">#</a> 添加字段</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
{
            $addFields: {
                &#39;total&#39;: {
                    $toDouble: &#39;$total&#39;
                },

}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="条件" tabindex="-1"><a class="header-anchor" href="#条件" aria-hidden="true">#</a> 条件</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
            $addFields: {
                score_mianji: {
                    $cond: [
                        {
                               $lt: [&#39;$mianji&#39;, 150],
                        },
                        1,
                        -1
                    ]
                }
            }
        }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="用途" tabindex="-1"><a class="header-anchor" href="#用途" aria-hidden="true">#</a> 用途</h2><p>处理中间处理，可以聚合出最终结果.</p>`,23);function h(g,b){const i=d("ExternalLinkIcon");return s(),r("div",null,[v,o,e("p",null,[a("官方文档"),e("a",u,[a("aggregation-quick-reference"),l(i)])]),m])}const x=n(c,[["render",h],["__file","aggregate.html.vue"]]);export{x as default};
