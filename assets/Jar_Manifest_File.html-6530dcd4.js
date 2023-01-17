import{_ as t,M as l,p as r,q as d,R as e,t as a,N as i,a1 as s}from"./framework-fa6fd9c7.js";const c={},o=s(`<h1 id="jar-manifest-file" tabindex="-1"><a class="header-anchor" href="#jar-manifest-file" aria-hidden="true">#</a> Jar <strong>Manifest File</strong></h1><p>Jar 包的描述清单文件。</p><p>我们先来 看下清单文件是什么。</p><h2 id="the-manifest-file" tabindex="-1"><a class="header-anchor" href="#the-manifest-file" aria-hidden="true">#</a> <strong>The Manifest File</strong></h2><p>清单文件名为MANIFEST.MF，位于 Jar 包的 META-INF</p><p>目录。它是一个简单的键值对列表。如下所示</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Manifest-Version: 1.0
Main-Class: io.github.himcs.todo.cli.BootStrap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这些键值对提供元数据，描述 Jar 的各种信息，例如包的版本，执行的类，类路径，签名等等</p><h2 id="创建-manifest-file" tabindex="-1"><a class="header-anchor" href="#创建-manifest-file" aria-hidden="true">#</a> 创建 Manifest File</h2><h3 id="默认-manifest" tabindex="-1"><a class="header-anchor" href="#默认-manifest" aria-hidden="true">#</a> 默认 Manifest</h3><p>默认，构建 Jar 包, 不常用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jar cf MyJar.jar classes/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看生成的文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Manifest-Version: 1.0
Created-By: 11.0.3 (AdoptOpenJDK)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="maven" tabindex="-1"><a class="header-anchor" href="#maven" aria-hidden="true">#</a> Maven</h3><p>清单文件会由工具生成。</p><p>例如，Maven 添加了额外的头</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Manifest-Version: 1.0
Archiver-Version: Plexus Archiver
Created-By: Apache Maven 3.3.9
Built-By: baeldung
Build-Jdk: 11.0.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以添加自定义的头，在 pom 文件修改</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;plugin&gt;
    &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
    &lt;artifactId&gt;maven-jar-plugin&lt;/artifactId&gt;
    &lt;version&gt;3.1.2&lt;/version&gt;
    &lt;configuration&gt;
        &lt;archive&gt;
            &lt;manifest&gt;
                &lt;packageName&gt;com.baeldung.java&lt;/packageName&gt;
            &lt;/manifest&gt;
            &lt;manifestEntries&gt;
                &lt;Created-By&gt;baeldung&lt;/Created-By&gt;
            &lt;/manifestEntries&gt;
        &lt;/archive&gt;
    &lt;/configuration&gt;
&lt;/plugin&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会生成下面的MANIFEST.MF文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Manifest-Version: 1.0
Build-Jdk-Spec: 11
Package: com.baeldung.java
Created-By: baeldung
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),u={href:"https://maven.apache.org/plugins/maven-jar-plugin/",target:"_blank",rel:"noopener noreferrer"},v=s(`<h3 id="gradle" tabindex="-1"><a class="header-anchor" href="#gradle" aria-hidden="true">#</a> Gradle</h3><p>在构建脚本 build.gradle 添加</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tasks.named(&#39;jar&#39;) {
    manifest {
        attributes(&#39;Implementation-Title&#39;: project.name,
                   &#39;Implementation-Version&#39;: project.version)
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打包 <code>./gradlew jar</code></p><p>生成的 META-INF/MANIFEST.MF</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Manifest-Version: 1.0
Implementation-Title: lib
Implementation-Version: 0.1.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),m={href:"https://docs.gradle.org/current/samples/sample_building_kotlin_libraries.html#customize_the_library_jar",target:"_blank",rel:"noopener noreferrer"},h=e("h2",{id:"headers",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#headers","aria-hidden":"true"},"#"),a(" Headers")],-1),p=e("h3",{id:"主要的-headers",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#主要的-headers","aria-hidden":"true"},"#"),a(" 主要的 Headers")],-1),g=e("li",null,[e("em",null,"Manifest-Version"),a(": the version of the specification")],-1),b=e("li",null,[e("em",null,"Created-By"),a(": the tool version and vendor that created the manifest file")],-1),f=e("em",null,"Multi-Release",-1),_=e("em",null,"true",-1),x={href:"https://www.baeldung.com/java-multi-release-jar",target:"_blank",rel:"noopener noreferrer"},M=e("li",null,[e("em",null,"Built-By"),a(": this custom header gives the name of the user that created the manifest file")],-1),j=s(`<h3 id="启动入口-和-classpath" tabindex="-1"><a class="header-anchor" href="#启动入口-和-classpath" aria-hidden="true">#</a> 启动入口 和 ClassPath</h3><ul><li><em>Main-Class</em>: 包含main方法的启动类</li><li><em>Class-Path</em>: 空格分割的库或资源的相对路径列表</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Main-Class: com.baeldung.Application
Class-Path: core.jar lib/ properties/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>其他属性 参考</p>`,4),B={href:"https://www.baeldung.com/java-jar-manifest",target:"_blank",rel:"noopener noreferrer"};function k(I,C){const n=l("ExternalLinkIcon");return r(),d("div",null,[o,e("p",null,[e("a",u,[a("Maven Jar插件文档"),i(n)])]),v,e("p",null,[e("a",m,[a("Gradle jar文档"),i(n)])]),h,p,e("ul",null,[g,b,e("li",null,[f,a(": if "),_,a(", then this is a "),e("a",x,[a("Multi-Release Jar"),i(n)])]),M]),j,e("p",null,[e("a",B,[a("jar-manifest"),i(n)])])])}const J=t(c,[["render",k],["__file","Jar_Manifest_File.html.vue"]]);export{J as default};
