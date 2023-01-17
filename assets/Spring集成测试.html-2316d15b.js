import{_ as n,p as s,q as a,a1 as t}from"./framework-fa6fd9c7.js";const e={},p=t(`<h1 id="spring-集成测试" tabindex="-1"><a class="header-anchor" href="#spring-集成测试" aria-hidden="true">#</a> Spring 集成测试</h1><h2 id="数据库测试" tabindex="-1"><a class="header-anchor" href="#数据库测试" aria-hidden="true">#</a> 数据库测试</h2><p>数据库测试通常有两种做法</p><ul><li>采用嵌入式内存数据</li><li>采用真实的数据库，事务回滚</li></ul><h3 id="测试配置" tabindex="-1"><a class="header-anchor" href="#测试配置" aria-hidden="true">#</a> 测试配置</h3><p>我们做测试的一个关键点就是不能随意修改代码，切记，<strong>不能为了测试的需要而修改代码</strong>。如果真的要修改，也许应该修改的是设计，而不仅仅是代码。</p><p>不能修改代码，但我们可以提供不同的配置。然测试连接到不同的数据库上。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">SpringExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@DataJpaTest</span>
<span class="token annotation punctuation">@AutoConfigureTestDatabase</span><span class="token punctuation">(</span>replace <span class="token operator">=</span> <span class="token class-name">AutoConfigureTestDatabase<span class="token punctuation">.</span>Replace</span><span class="token punctuation">.</span><span class="token constant">NONE</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@TestPropertySource</span><span class="token punctuation">(</span><span class="token string">&quot;classpath:test.properties&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TodoItemRepositoryTest</span> <span class="token punctuation">{</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="嵌入式内存数据库" tabindex="-1"><a class="header-anchor" href="#嵌入式内存数据库" aria-hidden="true">#</a> 嵌入式内存数据库</h3><p>在 Java 世界中，常见的嵌入式内存数据库有 H2、HSQLDB、Apache 的 Derby 等。我们配置一个测试的依赖就好，以 H2 为例，像下面这样。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>testImplementation &quot;com.h2database:h2:$h2Version&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后提供一个配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jdbc.driverClassName=org.h2.Driver
jdbc.url=jdbc:h2:mem:todo;DB_CLOSE_DELAY=-1
hibernate.dialect=org.hibernate.dialect.H2Dialect
hibernate.hbm2ddl.auto=create
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果运气好，测试可以顺利运行。</p><p>为什么会归结于运气呢？这不是嵌入式数据库的问题，是每个数据库SQL不一致的问题，真实情况下总有一部分 SQL 只能运行在特定的引擎上。</p><p>所以，实际项目嵌入式数据库测试用的不多。</p><h3 id="事务回滚" tabindex="-1"><a class="header-anchor" href="#事务回滚" aria-hidden="true">#</a> 事务回滚</h3><p>采用标准的应用配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring.datasource.url=jdbc:mysql://localhost:3306/todo_test?useUnicode=true&amp;characterEncoding=utf-8&amp;useSSL=false&amp;allowPublicKeyRetrieval=true
spring.datasource.username=todo
spring.datasource.password=geektime
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>采用这种做法，就不必担心 SQL 不兼容的问题了。</p><p>我们的事务回滚体现在 @DataJpaTest 上, 它把数据库回滚做成默认配置，所以我们什么都不用做。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">SpringExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@DataJpaTest</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExampleRepositoryTests</span> <span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Autowired</span>
  <span class="token keyword">private</span> <span class="token class-name">TestEntityManager</span> entityManager<span class="token punctuation">;</span>

  <span class="token annotation punctuation">@Test</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">should_work</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>entityManager<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;sboot&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你用的不是 JPA 而是其它的数据访问方式，Spring 也给我们提供了 @JdbcTest，只要有 DataSource， 它就可以很好地工作起来，这适用于绝大多数的测试情况。模拟数据可以直接使用 sql。如下</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@JdbcTest</span>
<span class="token annotation punctuation">@Sql</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;test-data.sql&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">EmployeeDAOIntegrationTest</span> <span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Autowired</span>
  <span class="token keyword">private</span> <span class="token class-name">DataSource</span> dataSource<span class="token punctuation">;</span>
  
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="web-接口测试" tabindex="-1"><a class="header-anchor" href="#web-接口测试" aria-hidden="true">#</a> Web 接口测试</h2><p>我们采用整体集成的方式对系统进行测试，关键点是 @SpringBootTest</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token annotation punctuation">@AutoConfigureMockMvc</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TodoItemResourceTest</span> <span class="token punctuation">{</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>集成测试分两种</p><ul><li>所有代码都集成的测试</li><li>针对外部组件的测试</li></ul><p>测试 web 接口也有类似单元测试的方式</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@WebMvcTest</span><span class="token punctuation">(</span><span class="token class-name">TodoItemResource</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TodoItemResourceTest</span> <span class="token punctuation">{</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们指定了要测试的组件 TodoItemResource.这个测试里，它只会集成与 TodoItemResource 相关的部分。</p><p>如果把它视为单元测试，服务层后面的代码都是外部的，我们可以采用模拟对象把它控制在可控范围内，MockBean 就开始发挥作用了。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@WebMvcTest</span><span class="token punctuation">(</span><span class="token class-name">TodoItemResource</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TodoItemResourceTest</span> <span class="token punctuation">{</span>
  <span class="token annotation punctuation">@MockBean</span>
  <span class="token keyword">private</span> <span class="token class-name">TodoItemService</span> service<span class="token punctuation">;</span>
  
  <span class="token annotation punctuation">@Test</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">should_add_item</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token function">when</span><span class="token punctuation">(</span>service<span class="token punctuation">.</span><span class="token function">addTodoItem</span><span class="token punctuation">(</span><span class="token class-name">TodoParameter</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;foo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TodoItem</span><span class="token punctuation">(</span><span class="token string">&quot;foo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@MockBean 标记的模拟对象会参与到组件组装的过程，我们就可以设置他的行为。如果 web 层与服务处有复杂交互，这种做法就可以很好的处理。但是，不建议做的这么复杂。</p><p>当年 Spring 摆脱了大部分对于应用服务器的依赖，但是 Web 却是它一直没有摆脱的。所以，怎么更好地不依赖于 Web 服务器进行测试，就是摆在 Spring 面前的问题。答案是 <strong>Spring 提供了模拟的 Web 环境</strong>。</p><p>我们再来回顾一下</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token annotation punctuation">@SpringBootTest</span>
<span class="token annotation punctuation">@AutoConfigureMockMvc</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TodoItemResourceTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">MockMvc</span> mockMvc<span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">should_add_item</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> todoItem <span class="token operator">=</span> <span class="token string">&quot;{ &quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;\\&quot;content\\&quot;: \\&quot;foo\\&quot;&quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;}&quot;</span><span class="token punctuation">;</span>
        mockMvc<span class="token punctuation">.</span><span class="token function">perform</span><span class="token punctuation">(</span><span class="token class-name">MockMvcRequestBuilders</span><span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&quot;/todo-items&quot;</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">contentType</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">content</span><span class="token punctuation">(</span>todoItem<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertThat</span><span class="token punctuation">(</span>repository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>item <span class="token operator">-&gt;</span> item<span class="token punctuation">.</span><span class="token function">getContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;foo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键是 <strong>@AutoConfigureMockMvc</strong>，它为我们配置好了 MockMvc，剩下的就是我们使用这个配置好的环境进行访问。</p><p>所谓的模拟环境就是它根本没有启动真正的 Web 服务器，而是直接调用了我们的代码，省略了请求走网络的过程。但是请求进入服务器后的主要处理都在(无论是各种 Filter 的处理，还是从请求体到请求对象的转换)。所以MockMvc 是 Spring 轻量级开发的一个重要的组成部分。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>Spring 集成测试</p><ul><li>数据库 <ul><li>事务回滚 <ul><li>@DataJpaTest</li><li>@JdbcTest</li><li>@Transactional</li></ul></li><li>内存数据库</li></ul></li><li>Web 接口 <ul><li>集成测试 @SpingBootTest</li><li>一个单元集成测试 @WebMvcTest</li><li>模拟对象 @MockBean</li></ul></li></ul><p><strong>采用轻量级的测试手段，保证代码的正确性</strong>。</p>`,44),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","Spring集成测试.html.vue"]]);export{d as default};
