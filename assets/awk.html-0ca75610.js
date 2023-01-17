import{_ as e,p as n,q as a,a1 as i}from"./framework-fa6fd9c7.js";const t={},d=i(`<h1 id="awk" tabindex="-1"><a class="header-anchor" href="#awk" aria-hidden="true">#</a> awk</h1><h2 id="起步" tabindex="-1"><a class="header-anchor" href="#起步" aria-hidden="true">#</a> 起步</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> netstat.txt
Proto Recv-Q Send-Q Local-Address          Foreign-Address             State
tcp        <span class="token number">0</span>      <span class="token number">0</span> <span class="token number">0.0</span>.0.0:3306           <span class="token number">0.0</span>.0.0:*                   LISTEN
tcp        <span class="token number">0</span>      <span class="token number">0</span> <span class="token number">0.0</span>.0.0:80             <span class="token number">0.0</span>.0.0:*                   LISTE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基础用法 $1 代表第一列</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">awk</span> <span class="token string">&#39;{print $1, $4}&#39;</span> netstat.txt
Proto Local-Address
tcp <span class="token number">0.0</span>.0.0:3306
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="过滤" tabindex="-1"><a class="header-anchor" href="#过滤" aria-hidden="true">#</a> 过滤</h2><h3 id="过滤-1" tabindex="-1"><a class="header-anchor" href="#过滤-1" aria-hidden="true">#</a> 过滤</h3><p>第三列为0&amp;&amp;第6列==&quot;LISTEN&quot;</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>awk &#39;$3==0 &amp;&amp; $6==&quot;LISTEN&quot;&#39; netstat.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>加入表头</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>awk &#39;$3==0 &amp;&amp; $6==&quot;LISTEN&quot; || NR==1 &#39; netstat.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>组合 print</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>awk &#39;$3==0 &amp;&amp; $6==&quot;LISTEN&quot; {print $1}&#39; netstat.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="内建变量" tabindex="-1"><a class="header-anchor" href="#内建变量" aria-hidden="true">#</a> 内建变量</h3><table><thead><tr><th>$0</th><th style="text-align:left;">当前记录（这个变量中存放着整个行的内容）</th></tr></thead><tbody><tr><td>$1-$n</td><td style="text-align:left;">当前记录的第n个字段，字段间由FS分隔</td></tr><tr><td>FS</td><td style="text-align:left;">字段分割 默认空格或Tab</td></tr><tr><td>OFS</td><td style="text-align:left;">输出字段分割 默认空格或Tab</td></tr><tr><td>NR</td><td style="text-align:left;">行号 1开始</td></tr><tr><td>NF</td><td style="text-align:left;">多少列</td></tr><tr><td>FILENAME</td><td style="text-align:left;">当前输出文件名</td></tr></tbody></table><p>指定分隔符</p><p><code>awk &#39;BEGIN{FS=&quot;:&quot;} {print $1,$3,$6}&#39; /etc/passwd</code></p><p><code>awk -F: &#39;{print NR $1,$3,$6}&#39; /etc/passwd</code></p><p>多个分隔符</p><p><code>awk -F &#39;[;:]&#39;</code></p><h3 id="字符串匹配" tabindex="-1"><a class="header-anchor" href="#字符串匹配" aria-hidden="true">#</a> 字符串匹配</h3><p>表示 第6行 匹配 FIN</p><p><code>awk &#39;$6 ~ /FIN/ || NR ==1 {print NR,$4,$5,$6}&#39; OFS=&#39;\\t&#39; netstat.txt</code></p><p><code>awk &#39;$6 ~ /WAIT/ || NR ==1 {print NR,$4,$5,$6}&#39; OFS=&#39;\\t&#39; netstat.txt</code></p><p>匹配一行</p><p><code>awk &#39;/LISTEN/&#39; netstat.txt</code></p><p>或</p><p><code>awk &#39;$6 ~ /FIN|TIME/ || NR==1 {print NR,$4,$5,$6}&#39; OFS=&quot;\\t&quot; netstat.txt</code></p><p>取反1</p><p><code> awk &#39;$6 !~ /WAIT/ || NR==1 {print NR,$4,$5,$6}&#39; OFS=&quot;\\t&quot; netstat.txt</code></p><p>取反2</p><p><code>awk &#39;!/WAIT/&#39; netstat.txt</code></p><h3 id="拆分文件" tabindex="-1"><a class="header-anchor" href="#拆分文件" aria-hidden="true">#</a> 拆分文件</h3><p><code>&gt;</code>就是重定向</p><p>按照第6列分割（其中的NR!=1表示不处理表头）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ awk &#39;NR!=1{print &gt; $6}&#39; netstat.txt
$ ls
ESTABLISHED  FIN_WAIT1  FIN_WAIT2  LAST_ACK  LISTEN  netstat.txt  TIME_WAIT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出指定列</p><p><code> awk &#39;$6 !~ /WAIT/ || NR==1 {print NR,$4,$5,$6}&#39; OFS=&quot;\\t&quot; netstat.txt</code></p><p>if,else</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> awk &#39;NR!=1{if($6 ~ /TIME|ESTABLISHED/) print &gt; &quot;1.txt&quot;;
else if($6 ~ /LISTEN/) print &gt; &quot;2.txt&quot;;
else print &gt; &quot;3.txt&quot; }&#39; netstat.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="统计" tabindex="-1"><a class="header-anchor" href="#统计" aria-hidden="true">#</a> 统计</h3><p>下面的命令计算所有的C文件，CPP文件和H文件的文件大小总和</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ls -l  *.cpp *.c *.h | awk &#39;{sum+=$5} END {print sum}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>统计各个connection状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>awk &#39;NR!=1{a[$6]++;} END {for (i in a) print i &quot;, &quot; a[i];}&#39; netstat.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>每个用户占了多少内存</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ps aux | awk &#39;NR!=1{a[$1]+=$6;} END { for(i in a) print i &quot;, &quot; a[i]&quot;KB&quot;;}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="awk-脚本" tabindex="-1"><a class="header-anchor" href="#awk-脚本" aria-hidden="true">#</a> awk 脚本</h2><ul><li>BEGIN{ 这里面放的是执行前的语句 }</li><li>END {这里面放的是处理完所有的行后要执行的语句 }</li><li>{这里面放的是处理每一行时要执行的语句}</li></ul><p>Example:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ cat score.txt
Marry   2143 78 84 77
Jack    2321 66 78 45
Tom     2122 48 77 71
Mike    2537 87 97 95
Bob     2415 40 57 62
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>脚本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ cat cal.awk
#!/bin/awk -f
#运行前
BEGIN {
    math = 0
    english = 0
    computer = 0
    printf &quot;NAME    NO.   MATH  ENGLISH  COMPUTER   TOTAL\\n&quot;
    printf &quot;---------------------------------------------\\n&quot;
}
#运行中
{
    math+=$3
    english+=$4
    computer+=$5
    printf &quot;%-6s %-6s %4d %8d %8d %8d\\n&quot;, $1, $2, $3,$4,$5, $3+$4+$5
}
#运行后
END {
    printf &quot;---------------------------------------------\\n&quot;
    printf &quot;  TOTAL:%10d %8d %8d \\n&quot;, math, english, computer
    printf &quot;AVERAGE:%10.2f %8.2f %8.2f\\n&quot;, math/NR, english/NR, computer/NR
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行(也可以<code>./cal.awk score.txt</code>)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ awk -f cal.awk score.txt
NAME    NO.   MATH  ENGLISH  COMPUTER   TOTAL
---------------------------------------------
Marry  2143     78       84       77      239
Jack   2321     66       78       45      189
Tom    2122     48       77       71      196
Mike   2537     87       97       95      279
Bob    2415     40       57       62      159
---------------------------------------------
  TOTAL:       319      393      350
AVERAGE:     63.80    78.60    70.00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h3><blockquote><p>使用-v参数和ENVIRON，使用ENVIRON的环境变量需要export）</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ x=5

$ y=10
$ export y

$ echo $x $y
5 10

$ awk -v val=$x &#39;{print $1, $2, $3, $4+val, $5+ENVIRON[&quot;y&quot;]}&#39; OFS=&quot;\\t&quot; score.txt
Marry   2143    78      89      87
Jack    2321    66      83      55
Tom     2122    48      82      81
Mike    2537    87      102     105
Bob     2415    40      62      72
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="awk-函数" tabindex="-1"><a class="header-anchor" href="#awk-函数" aria-hidden="true">#</a> awk 函数</h3><p><code>man awk</code> 查看</p><p>awk 可以进行多次匹配</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>awk -F &#39;:&#39; &#39;/root/ {print $1,$3} /test/ {print $1,$3}&#39; test.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>替换 Tom &gt; Tim(1代表下次匹配成立 省略了 print)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ awk &#39;$1==&quot;Tom&quot;{sub(&quot;Tom&quot;,&quot;Tim&quot;)} 1&#39; score.txt 
Marry   2143 78 84 77
Jack    2321 66 78 45
Tim     2122 48 77 71
Mike    2537 87 97 95
Bob     2415 40 57 62
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="几个花活" tabindex="-1"><a class="header-anchor" href="#几个花活" aria-hidden="true">#</a> 几个花活</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#从file文件中找出长度大于80的行
awk &#39;length&gt;80&#39; file

#按连接数查看客户端IP
netstat -ntu | awk &#39;{print $5}&#39; | cut -d: -f1 | sort | uniq -c | sort -nr

#打印99乘法表
seq 9 | sed &#39;H;g&#39; | awk -v RS=&#39;&#39; &#39;{for(i=1;i&lt;=NF;i++)printf(&quot;%dx%d=%d%s&quot;, i, NR, i*NR, i==NR?&quot;\\n&quot;:&quot;\\t&quot;)}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2><blockquote><p>https://coolshell.cn/articles/9070.html#%E8%B5%B7%E6%AD%A5%E4%B8%8A%E5%8F%B0 https://linux.cn/article-13177-1.html</p></blockquote>`,68),s=[d];function l(r,c){return n(),a("div",null,s)}const v=e(t,[["render",l],["__file","awk.html.vue"]]);export{v as default};
