import{_ as i,p as e,q as n,a1 as s}from"./framework-fa6fd9c7.js";const d={},t=s(`<h1 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h1><h2 id="转发到php" tabindex="-1"><a class="header-anchor" href="#转发到php" aria-hidden="true">#</a> 转发到PHP</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
    listen       80;
	listen       443 ssl;
    server_name  test.com;

	client_max_body_size 1024M;
	
	ssl_certificate   /etc/nginx/cert/4069670_test.com.pem;
	ssl_certificate_key /etc/nginx/cert/4069670_test.com.key;
	
	ssl_session_cache    shared:SSL:10m; #SSL会话缓存10MB
	ssl_session_timeout  10m; #SSL会话超时间10分钟
	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	ssl_prefer_server_ciphers on;
	
	location / {
		root   /mnt/nginx/test;
	    index index.php index.html index.htm;
		#访问路径的文件不存在则重写URL转交给ThinkPHP处理  
		if (!-e $request_filename) {  
	       rewrite  ^/(.*)$  /index.php/$1  last;  
	       break;  
	    }  
	
	}
	
	#最终运行
	location ~ \\.php/?.*$ {  
	    root        	/mnt/nginx/test;
	    fastcgi_pass   127.0.0.1:9000;  
	    fastcgi_index  index.php;  
	    #加载Nginx默认&quot;服务器环境变量&quot;配置  
	    include        fastcgi_params;  
	      
	    #设置PATH_INFO并改写SCRIPT_FILENAME,SCRIPT_NAME服务器环境变量  
	    set $fastcgi_script_name2 $fastcgi_script_name;  
	    if ($fastcgi_script_name ~ &quot;^(.+\\.php)(/.+)$&quot;) {  
	        set $fastcgi_script_name2 $1;  
	        set $path_info $2;  
	    }  
	    fastcgi_param   PATH_INFO $path_info;  
	    fastcgi_param   SCRIPT_FILENAME   $document_root$fastcgi_script_name2;  
	    fastcgi_param   SCRIPT_NAME   $fastcgi_script_name2;  
	}  

} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="反向代理某个目录" tabindex="-1"><a class="header-anchor" href="#反向代理某个目录" aria-hidden="true">#</a> 反向代理某个目录</h2><p>例如 映射<code>/java</code>目录到<code>8090</code>端口 server 里加上</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>	location ^~ /java/ {
            proxy_pass   http://127.0.0.1:8090/;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),a=[t];function l(c,r){return e(),n("div",null,a)}const m=i(d,[["render",l],["__file","nginx.html.vue"]]);export{m as default};
