import{_ as i,p as n,q as e,a1 as s}from"./framework-fa6fd9c7.js";const d={},a=s(`<h1 id="nginx-配置" tabindex="-1"><a class="header-anchor" href="#nginx-配置" aria-hidden="true">#</a> nginx 配置</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
    listen       80;
    server_name  sg.com;

	client_max_body_size 1024M;
	
    location / {
		root   /mnt/shequshangou;
        index index.php index.html index.htm;
		#访问路径的文件不存在则重写URL转交给ThinkPHP处理  
		if (!-e $request_filename) {  
           rewrite  ^/(.*)$  /index.php/$1  last;  
           break;  
        }  

    }
	
	#最终运行
	location ~ \\.php/?.*$ {  
        root        	/mnt/shequshangou;
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),l=[a];function c(v,t){return n(),e("div",null,l)}const m=i(d,[["render",c],["__file","nginxconf.html.vue"]]);export{m as default};
