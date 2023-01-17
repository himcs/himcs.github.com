import{_ as e,p as n,q as i,a1 as s}from"./framework-fa6fd9c7.js";const a={},l=s(`<h1 id="安装python3" tabindex="-1"><a class="header-anchor" href="#安装python3" aria-hidden="true">#</a> 安装Python3</h1><p>这里使用的是源码安装方式，其他版本类似</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum -y groupinstall &quot;Development tools&quot; 

yum -y install gcc

yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel

yum -y install libffi-devel


wget http://npm.taobao.org/mirrors/python/3.7.7/Python-3.7.7.tgz

tar -zxvf Python-3.7.7.tgz

cd Python-3.7.7

./configure --prefix=/usr/local/python3

make &amp;&amp; make install

ln -s /usr/local/python3/bin/python3.7 /usr/bin/python3

ln -s /usr/local/python3/bin/pip3 /usr/bin/pip3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="pip安装依赖" tabindex="-1"><a class="header-anchor" href="#pip安装依赖" aria-hidden="true">#</a> pip安装依赖</h1><p><code>-i</code> 是使用指定源下载</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple scrapy
pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple pymongo

ln -s /usr/local/python3/bin/scrapy  /usr/bin/scrapy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="mongo-恢复数据" tabindex="-1"><a class="header-anchor" href="#mongo-恢复数据" aria-hidden="true">#</a> mongo 恢复数据</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mongoimport -h 127.0.0.1 -d test --type=json --file=shangquan.json
mongoimport -h 127.0.0.1 -d test --type=json --file=quyu.json
mongoimport -h 127.0.0.1 -d test --type=json --file=house.json

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="运行脚本" tabindex="-1"><a class="header-anchor" href="#运行脚本" aria-hidden="true">#</a> 运行脚本</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>scrapy crawl mySpider
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,10),d=[l];function t(r,c){return n(),i("div",null,d)}const o=e(a,[["render",t],["__file","scrapy-env.html.vue"]]);export{o as default};
