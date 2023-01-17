import{_ as n,p as e,q as s,a1 as a}from"./framework-fa6fd9c7.js";const i="/assets/image-20201230163638686-0ea7d5a2.png",t="/assets/image-20201230163722629-a3dabe1b.png",o={},l=a(`<h1 id="es-基本使用" tabindex="-1"><a class="header-anchor" href="#es-基本使用" aria-hidden="true">#</a> ES 基本使用</h1><h2 id="部署服务" tabindex="-1"><a class="header-anchor" href="#部署服务" aria-hidden="true">#</a> 部署服务</h2><p>使用 安装包 或者 容器 下载 启动 <code>elasticserch</code></p><p>https://www.elastic.co/cn/start</p><p>docker 命令如下</p><p><code>docker run -p 9200:9200 -p 9300:9300 -e &quot;discovery.type=single-node&quot; docker.elastic.co/elasticsearch/elasticsearch:7.10.1</code></p><p>默认会在 <code>9200</code>端口运行</p><p><code>GET localhost:9200</code></p><p>如果有相应代表运行成功</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1a22b65b032e&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;cluster_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;docker-cluster&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;cluster_uuid&quot;</span><span class="token operator">:</span> <span class="token string">&quot;T08GpTq8QWWkglHr04oiZA&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;number&quot;</span><span class="token operator">:</span> <span class="token string">&quot;7.10.1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;build_flavor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;build_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;docker&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;build_hash&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1c34507e66d7db1211f66f3513706fdf548736aa&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;build_date&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2020-12-05T01:00:33.671820Z&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;build_snapshot&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;lucene_version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;8.7.0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;minimum_wire_compatibility_version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;6.8.0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;minimum_index_compatibility_version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;6.0.0-beta1&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;tagline&quot;</span><span class="token operator">:</span> <span class="token string">&quot;You Know, for Search&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="索引" tabindex="-1"><a class="header-anchor" href="#索引" aria-hidden="true">#</a> 索引</h2><p>我们通过HTTP请求与ES服务进行交互</p><h3 id="创建索引" tabindex="-1"><a class="header-anchor" href="#创建索引" aria-hidden="true">#</a> 创建索引</h3><p><code>PUT {{LOCAL_ES}}/user</code></p><p>创建了一个名为<code>user</code>的索引</p><h3 id="查看索引列表" tabindex="-1"><a class="header-anchor" href="#查看索引列表" aria-hidden="true">#</a> 查看索引列表</h3><p><code>GET {{LOCAL_ES}}/_all</code></p><p>简单版本：</p><p><code>GET {{LOCAL_ES}}/_cat/indices?v</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>health status index uuid                   pri rep docs.count docs.deleted store.size pri.store.size
yellow open   user  AG5bAWgpRyWFTwegKhaE_w   1   1          0            0       208b           208b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看索引" tabindex="-1"><a class="header-anchor" href="#查看索引" aria-hidden="true">#</a> 查看索引</h3><p><code>GET {{LOCAL_ES}}/user</code></p><h3 id="删除索引" tabindex="-1"><a class="header-anchor" href="#删除索引" aria-hidden="true">#</a> 删除索引</h3><p><code>DELETE {{LOCAL_ES}}/user</code></p><h3 id="索引状态变更" tabindex="-1"><a class="header-anchor" href="#索引状态变更" aria-hidden="true">#</a> 索引状态变更</h3><p>开启： <code>POST{{LOCAL_ES}}/user/_open</code></p><p>关闭： <code>POST{{LOCAL_ES}}/user/_close</code></p><h2 id="mapping" tabindex="-1"><a class="header-anchor" href="#mapping" aria-hidden="true">#</a> Mapping</h2><h3 id="字段类型" tabindex="-1"><a class="header-anchor" href="#字段类型" aria-hidden="true">#</a> 字段类型</h3><p>https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html</p><p>字符串：</p><ul><li>text: 需要被全文搜索的内容。设置text类型后，字段内容会被分析，升到倒排索引以前，字符串会被分析器拆分成一个个词项。text字段不用于排序，很少用于聚合</li><li>keyword : 全字匹配，用于过滤和排序</li></ul><p>日期类型:</p><ul><li>date</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>     &quot;date&quot;: {
        &quot;type&quot;:   &quot;date&quot;,
        &quot;format&quot;: &quot;yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis&quot;
      }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数值类型:</p><ul><li>long</li><li>integer</li><li>short</li><li>byte</li><li>double</li><li>float</li><li>half_float</li><li>scaled_float</li><li>unsigned_long</li></ul><p>范围类型:</p><ul><li>integer_range</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>    &quot;properties&quot;: {
      &quot;expected_attendees&quot;: {
        &quot;type&quot;: &quot;integer_range&quot;
      },
      &quot;time_frame&quot;: {
        &quot;type&quot;: &quot;date_range&quot;, 
        &quot;format&quot;: &quot;yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis&quot;
      }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>float_range</li><li>long_range</li><li>double_range</li><li>date_range</li><li>ip_range</li></ul><h3 id="映射创建" tabindex="-1"><a class="header-anchor" href="#映射创建" aria-hidden="true">#</a> 映射创建</h3><p>ES 只能新增映射,不能修改或删除，只能数据重建。</p><h3 id="新增映射" tabindex="-1"><a class="header-anchor" href="#新增映射" aria-hidden="true">#</a> 新增映射</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST {{LOCAL_ES}}/ts300/_mapping

{
    &quot;properties&quot;: {
        &quot;contents&quot;: {
            &quot;type&quot;: &quot;text&quot;
        },
        &quot;type&quot;: {
            &quot;type&quot;: &quot;keyword&quot;
        },
        &quot;author&quot;: {
            &quot;type&quot;: &quot;keyword&quot;
        },
        &quot;title&quot;: {
            &quot;type&quot;: &quot;keyword&quot;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="原有映射修改" tabindex="-1"><a class="header-anchor" href="#原有映射修改" aria-hidden="true">#</a> 原有映射修改</h3><ol><li>创建一个新的权限索引，包含调整后的字段或类型 #job job2</li><li>将原有索引(reindex)到新索引 #job reindex-&gt;#job2</li><li>删除原有索引 #DELETE job</li><li>将新索引别名设置为原有索引名 # job2 alias-&gt;job</li></ol><h2 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h2><h3 id="添加文档" tabindex="-1"><a class="header-anchor" href="#添加文档" aria-hidden="true">#</a> 添加文档</h3><p><code>POST {{LOCAL_ES}}/ts300/_create/1</code></p><p>请求体：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>  <span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;contents&quot;</span><span class="token operator">:</span> <span class="token string">&quot;孤鸿海上来，池潢不敢顾。\\n侧见双翠鸟，巢在三珠树。\\n矫矫珍木巅，得无金丸惧。\\n美服患人指，高明逼神恶。\\n今我游冥冥，弋者何所慕。&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;五言古诗&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;author&quot;</span><span class="token operator">:</span> <span class="token string">&quot;张九龄&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;感遇四首之一&quot;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回值：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ts300&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;_version&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;result&quot;</span><span class="token operator">:</span> <span class="token string">&quot;created&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;_shards&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token property">&quot;successful&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;failed&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;_seq_no&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;_primary_term&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新文档-全部替换" tabindex="-1"><a class="header-anchor" href="#更新文档-全部替换" aria-hidden="true">#</a> 更新文档（全部替换）</h3><p><code>POST {{LOCAL_ES}}/ts300/_doc/1</code></p><p>如果id原来没有则创建</p><h3 id="获取文档" tabindex="-1"><a class="header-anchor" href="#获取文档" aria-hidden="true">#</a> 获取文档</h3><p><code>GET{{LOCAL_ES}}/ts300/_doc/1</code></p><h3 id="获取多个文档" tabindex="-1"><a class="header-anchor" href="#获取多个文档" aria-hidden="true">#</a> 获取多个文档</h3><p><code>POST {{LOCAL_ES}}/ts300/_mget</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;ids&quot;: [
        1
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新文档字段" tabindex="-1"><a class="header-anchor" href="#更新文档字段" aria-hidden="true">#</a> 更新文档字段</h3><p><strong>不推荐使用</strong></p><p><code>POST {{LOCAL_ES}}/ts300/_update/1</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  {
   &quot;script&quot;: &quot;ctx._source.title=\\&quot;感遇四首之1一\\&quot;&quot;   
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除字段</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  {
   &quot;script&quot;: &quot;ctx._source.remove(\\&quot;title\\&quot;)&quot;
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除文档" tabindex="-1"><a class="header-anchor" href="#删除文档" aria-hidden="true">#</a> 删除文档</h3><p><code>DELETE {{LOCAL_ES}}/ts300/_doc/1</code></p><h2 id="ingest" tabindex="-1"><a class="header-anchor" href="#ingest" aria-hidden="true">#</a> ingest</h2><p>文档预处理</p><h3 id="创建" tabindex="-1"><a class="header-anchor" href="#创建" aria-hidden="true">#</a> 创建</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PUT {{LOCAL_ES}}/_ingest/pipeline/indexed_at

{
  &quot;description&quot;: &quot;Adds timestamp  to documents&quot;,
  &quot;processors&quot;: [
    {
      &quot;set&quot;: {
        &quot;field&quot;: &quot;_source.timestamp&quot;,
        &quot;value&quot;: &quot;{{_ingest.timestamp}}&quot;
      }
    },
    {
      &quot;script&quot;: {
        &quot;source&quot;: &quot;ctx.cont_length = ctx.contents.length();&quot;
      }
    }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模板" tabindex="-1"><a class="header-anchor" href="#模板" aria-hidden="true">#</a> 模板</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PUT _template/my_template
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;index_patterns&quot;: [
    &quot;some_index*&quot;
  ],
  &quot;aliases&quot;: {
    &quot;some_index&quot;: {}
  },
  &quot;settings&quot;: {
    &quot;index.default_pipeline&quot;: &quot;indexed_at&quot;,
    &quot;number_of_replicas&quot;: 1,
    &quot;refresh_interval&quot;: &quot;30s&quot;
  },
  &quot;mappings&quot;: {
    &quot;properties&quot;: {
      &quot;cont_length&quot;:{
        &quot;type&quot;:&quot;long&quot;
      },
      &quot;author&quot;: {
        &quot;type&quot;: &quot;text&quot;,
        &quot;fields&quot;: {
          &quot;field&quot;: {
            &quot;type&quot;: &quot;keyword&quot;
          }
        },
        &quot;analyzer&quot;: &quot;ik_max_word&quot;
      },
      &quot;contents&quot;: {
        &quot;type&quot;: &quot;text&quot;,
        &quot;fields&quot;: {
          &quot;field&quot;: {
            &quot;type&quot;: &quot;keyword&quot;
          }
        },
        &quot;analyzer&quot;: &quot;ik_max_word&quot;,
        &quot;fielddata&quot;: true
      },
      &quot;timestamp&quot;: {
        &quot;type&quot;: &quot;date&quot;
      },
      &quot;title&quot;: {
        &quot;type&quot;: &quot;text&quot;,
        &quot;fields&quot;: {
          &quot;field&quot;: {
            &quot;type&quot;: &quot;keyword&quot;
          }
        },
        &quot;analyzer&quot;: &quot;ik_max_word&quot;
      },
      &quot;type&quot;: {
        &quot;type&quot;: &quot;text&quot;,
        &quot;fields&quot;: {
          &quot;field&quot;: {
            &quot;type&quot;: &quot;keyword&quot;
          }
        },
        &quot;analyzer&quot;: &quot;ik_max_word&quot;
      }
    }
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ik-分词器安装" tabindex="-1"><a class="header-anchor" href="#ik-分词器安装" aria-hidden="true">#</a> IK 分词器安装</h2><p><code>./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.10.1/elasticsearch-analysis-ik-7.10.1.zip</code></p><h2 id="配置-kibnana-数据可视化-展示" tabindex="-1"><a class="header-anchor" href="#配置-kibnana-数据可视化-展示" aria-hidden="true">#</a> 配置 kibnana 数据可视化 展示</h2><p>点击<code>visulizaiton</code></p><p><img src="`+i+'" alt="image-20201230163638686"></p><p>选择图标</p><p>点击 <code>Split Slices</code></p><p>然后点击<code>Run</code>生成图表</p><p><img src="'+t+'" alt="image-20201230163722629"></p>',86),d=[l];function u(r,c){return e(),s("div",null,d)}const v=n(o,[["render",u],["__file","es_base.html.vue"]]);export{v as default};
