import{_ as e,p as d,q as i,a1 as t}from"./framework-fa6fd9c7.js";const n={},a=t(`<h1 id="全文检索" tabindex="-1"><a class="header-anchor" href="#全文检索" aria-hidden="true">#</a> 全文检索</h1><h2 id="分词" tabindex="-1"><a class="header-anchor" href="#分词" aria-hidden="true">#</a> 分词</h2><p>将文本转换为单词的过程，称为分词</p><p>例如 <code>Good Day</code> 分词后<code>good</code> <code>day</code></p><h3 id="分词器" tabindex="-1"><a class="header-anchor" href="#分词器" aria-hidden="true">#</a> 分词器</h3><p>分词的技术实现</p><h2 id="倒排索引" tabindex="-1"><a class="header-anchor" href="#倒排索引" aria-hidden="true">#</a> 倒排索引</h2><p>由词到文档</p><p>例如有以下下文档</p><table><thead><tr><th>DocId</th><th>Doc</th></tr></thead><tbody><tr><td>1</td><td>谷歌地图之父跳槽 Facebook</td></tr><tr><td>2</td><td>谷歌地图之父加盟 Facebook</td></tr><tr><td>3</td><td>谷歌地图创始人拉斯离开谷歌加盟 Facebook</td></tr><tr><td>4</td><td>谷歌地图之父跳槽 Facebook 与 Wave 项目取消有关</td></tr><tr><td>5</td><td>谷歌地图之父拉斯加盟社交网站 Facebook</td></tr></tbody></table><p>倒排后</p><table><thead><tr><th>WordId</th><th>Word</th><th>DocIds</th></tr></thead><tbody><tr><td>1</td><td>谷歌</td><td>1, 2, 3, 4, 5</td></tr><tr><td>2</td><td>地图</td><td>1, 2, 3, 4, 5</td></tr><tr><td>3</td><td>之父</td><td>1, 2, 4, 5</td></tr><tr><td>4</td><td>跳槽</td><td>1, 4</td></tr><tr><td>5</td><td>Facebook</td><td>1, 2, 3, 4, 5</td></tr><tr><td>6</td><td>加盟</td><td>2, 3, 5</td></tr><tr><td>7</td><td>创始人</td><td>3</td></tr><tr><td>8</td><td>拉斯</td><td>3, 5</td></tr><tr><td>9</td><td>离开</td><td>3</td></tr><tr><td>10</td><td>与</td><td>4</td></tr></tbody></table><h2 id="相关性算法" tabindex="-1"><a class="header-anchor" href="#相关性算法" aria-hidden="true">#</a> 相关性算法</h2><p>例如搜索<code>谷歌</code>匹配了多个文档，对多个文档计算相关分进行排序</p><h3 id="tf-idf-算法" tabindex="-1"><a class="header-anchor" href="#tf-idf-算法" aria-hidden="true">#</a> TF-IDF 算法</h3><p><code>ES5</code>前使用。</p><ul><li>TF（Term Frequency): 检索词在一篇文档中出现的频率</li><li>DF（Document Frequency): 检索词在所有文档出现的频率</li><li>IDF(Inverse Document Frequency) <ul><li>IDF = log(全部文档数/检索词出现过的文档总数)</li><li>词条权重</li></ul></li></ul><p>TF-IDF 公式</p><p><code>(TF(WORD)*IDF(WORD))</code></p><h3 id="bm25" tabindex="-1"><a class="header-anchor" href="#bm25" aria-hidden="true">#</a> BM25</h3><p>ES 当前版本 默认算法</p><h2 id="uri-检索" tabindex="-1"><a class="header-anchor" href="#uri-检索" aria-hidden="true">#</a> URI 检索</h2><p>URI QUERY</p><p><code>GET {{LOCAL_ES}}/some_index/_search?q=李白</code></p><h2 id="dsl-检索" tabindex="-1"><a class="header-anchor" href="#dsl-检索" aria-hidden="true">#</a> DSL 检索</h2><p><code>{{LOCAL_ES}}/some_index/_search</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;from&quot;: 0,
    &quot;size&quot;: 10,
    &quot;sort&quot;: [
        {
            &quot;id&quot;: &quot;desc&quot;
        }
    ],
    &quot;query&quot;: {
        &quot;match_all&quot;: {}
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="精准匹配-term" tabindex="-1"><a class="header-anchor" href="#精准匹配-term" aria-hidden="true">#</a> 精准匹配 <code>term</code></h3><p>{ &quot;query&quot;: { &quot;term&quot;: { &quot;author&quot;:&quot;李白&quot; } } } 多值匹配，使用 <code>terms</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;query&quot;: {
        &quot;terms&quot;: {
        	&quot;author&quot;:[&quot;李白&quot;,&quot;杜甫&quot;]
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模糊查询" tabindex="-1"><a class="header-anchor" href="#模糊查询" aria-hidden="true">#</a> 模糊查询</h3><p>查询 <code>author</code>包含&quot;李&quot;的数据</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;query&quot;: {
        &quot;match&quot;: {
        	&quot;author&quot;:&quot;李&quot;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询所有文档" tabindex="-1"><a class="header-anchor" href="#查询所有文档" aria-hidden="true">#</a> 查询所有文档</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;query&quot;: {
        &quot;match_all&quot;: {
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="不查询任何文档" tabindex="-1"><a class="header-anchor" href="#不查询任何文档" aria-hidden="true">#</a> 不查询任何文档</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;query&quot;: {
        &quot;match_none&quot;: {
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多字段查询" tabindex="-1"><a class="header-anchor" href="#多字段查询" aria-hidden="true">#</a> 多字段查询</h3><p><code>contents</code>和<code>author</code>都包含李</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;query&quot;: {
        &quot;multi_match&quot;: {
            &quot;query&quot;:&quot;李&quot;,
            &quot;fields&quot;:[&quot;author&quot;,&quot;contents&quot;]
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="boolean-查询" tabindex="-1"><a class="header-anchor" href="#boolean-查询" aria-hidden="true">#</a> boolean 查询</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;query&quot;: {
        &quot;match&quot;: {
            &quot;contents&quot;: {
                &quot;query&quot;: &quot;天 下&quot;, # 两个词都存在
                &quot;operator&quot;: &quot;and&quot;
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="phrase-查询" tabindex="-1"><a class="header-anchor" href="#phrase-查询" aria-hidden="true">#</a> phrase 查询</h3><p>短语查询 <code>天下 \`\`红颜</code>按先后顺序存在，中间最多出现一个额外词。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;query&quot;: {
        &quot;match_phrase&quot;: {
            &quot;contents&quot;:{
                &quot;query&quot;: &quot;天下 红颜&quot;,
                &quot;slop&quot;:1
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="范围查询" tabindex="-1"><a class="header-anchor" href="#范围查询" aria-hidden="true">#</a> 范围查询</h3><p>查询 10 &lt;= cont_length &lt;= 50</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;query&quot;: {
        &quot;range&quot;: {
            &quot;cont_length&quot;:{
                &quot;gte&quot;:10,
                &quot;lte&quot;:50
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="正则表达式查询" tabindex="-1"><a class="header-anchor" href="#正则表达式查询" aria-hidden="true">#</a> 正则表达式查询</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;query&quot;: {
        &quot;regexp&quot;:{
            &quot;type&quot;:{
                &quot;value&quot;:&quot;[七|五]言&quot;
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多字段复合查询" tabindex="-1"><a class="header-anchor" href="#多字段复合查询" aria-hidden="true">#</a> 多字段复合查询</h2>`,51),r=[a];function s(l,u){return d(),i("div",null,r)}const c=e(n,[["render",s],["__file","es_search.html.vue"]]);export{c as default};
