import{_ as n,p as s,q as e,a1 as a}from"./framework-fa6fd9c7.js";const i={},l=a(`<h1 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> Mysql</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql-community-server
systemctl start  mysqld.service
systemctl status mysqld.service
systemctl enable mysqld
systemctl daemon-reload
grep &quot;password&quot; /var/log/mysqld.log
mysql -u root -p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="防火墙" tabindex="-1"><a class="header-anchor" href="#防火墙" aria-hidden="true">#</a> 防火墙</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl status firewalld
systemctl start firewalld
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">3306</span>/tcp --permanent<span class="token punctuation">;</span>
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> epel-release <span class="token parameter variable">-y</span>
yum <span class="token function">install</span> nginx
<span class="token function">service</span> nginx status
systemctl start nginx.service
systemctl <span class="token builtin class-name">enable</span> nginx
systemctl daemon-reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="php" tabindex="-1"><a class="header-anchor" href="#php" aria-hidden="true">#</a> PHP</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /etc/yum.repos.d
<span class="token function">wget</span> http://dev.centos.org/centos/5/CentOS-Testing.repo
<span class="token function">rpm</span> –import http://dev.centos.org/centos/RPM-GPG-KEY-CentOS-testing
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> php php-mysql php-gd libjpeg* php-imap php-ldap php-odbc php-pear php-xml php-xmlrpc php-mbstring php-mcrypt php-bcmath php-mhash libmcrypt libmcrypt-devel php-fpm
systemctl <span class="token builtin class-name">enable</span> php-fpm
systemctl daemon-reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="配置-nginx" tabindex="-1"><a class="header-anchor" href="#配置-nginx" aria-hidden="true">#</a> 配置 Nginx</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cp</span> /etc/nginx/nginx.conf /etc/nginx/nginx.confbak
<span class="token function">vi</span> /etc/nginx/nginx.conf
<span class="token function">cp</span> /etc/php-fpm.d/www.conf /etc/php-fpm.d/www.confbak
<span class="token function">vi</span> /etc/php-fpm.d/www.conf
systemctl restart mysqld.service
systemctl restart nginx.service
systemctl restart php-fpm
<span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> /var/lib/php/session
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="svn" tabindex="-1"><a class="header-anchor" href="#svn" aria-hidden="true">#</a> Svn</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>svn list https://svnSite/svn/
svn checkout https://svnSite/svn/ /mnt/nginx/
<span class="token builtin class-name">cd</span> /mnt/nginx/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="定时服务" tabindex="-1"><a class="header-anchor" href="#定时服务" aria-hidden="true">#</a> 定时服务</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">crontab</span> <span class="token parameter variable">-e</span>
systemctl start crond
systemctl status crond
systemctl reload crond
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),d=[l];function t(c,r){return s(),e("div",null,d)}const m=n(i,[["render",t],["__file","srv.html.vue"]]);export{m as default};
