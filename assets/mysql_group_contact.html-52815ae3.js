import{_ as e,p as n,q as s,a1 as a}from"./framework-fa6fd9c7.js";const i={},d=a(`<h1 id="group-concat" tabindex="-1"><a class="header-anchor" href="#group-concat" aria-hidden="true">#</a> GROUP_CONCAT()</h1><p>Mysql 聚合函数</p><p>语法</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>GROUP_CONCAT([DISTINCT] expr [,expr ...]
             [ORDER BY {unsigned_integer | col_name | expr}
                 [ASC | DESC] [,col_name ...]]
             [SEPARATOR str_val])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT student_name,
         GROUP_CONCAT(DISTINCT test_score
                      ORDER BY test_score DESC SEPARATOR &#39; &#39;)
       FROM student
       GROUP BY student_name;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>限制：</p><p>默认长度为1024</p><h2 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档" aria-hidden="true">#</a> 参考文档</h2><p><strong>https://dev.mysql.com/doc/refman/5.7/en/aggregate-functions.html#function_group-concat</strong></p>`,10),r=[d];function l(t,c){return n(),s("div",null,r)}const m=e(i,[["render",l],["__file","mysql_group_contact.html.vue"]]);export{m as default};
