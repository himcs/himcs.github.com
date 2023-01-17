import{_ as n,p as s,q as a,a1 as t}from"./framework-fa6fd9c7.js";const p={},e=t(`<h1 id="todo-api" tabindex="-1"><a class="header-anchor" href="#todo-api" aria-hidden="true">#</a> todo-api</h1><p>本文将 ToDo 应用 扩展为一个 REST 服务，将数据保存在数据库中，也就是CRUD。</p><h2 id="扩展前准备" tabindex="-1"><a class="header-anchor" href="#扩展前准备" aria-hidden="true">#</a> 扩展前准备</h2><p>在写任何代码之前，我们要搞清楚要把应用搞成什么样子。</p><p>把ToDo 扩展为 REST 服务就是说，原来本地的操作要以 REST 的方式提供。此外，Repository 要提供一个基于数据库的实现。</p><p>我们暂时不考虑多用户的情况，专注与测试本身，增加更多的功能时需求实现的事情。</p><p>确定好了需求目标，我们进入到具体的实现过程。我们可以建立一个新的模块来放置这些代码，叫做 todo-api。具体的技术栈，使用当前社区常用的 Spring Boot。</p><p>同之前一样，我们先来实现 Repository 的部分，然后再来做接口。</p><p>为什么我们不是实现业务核心部分？</p><p>因为我们之前将业务核心部分隔离了出来，让它不依赖具体的实现。虽然我们是将命令行改写成一个 RESTful API，但业务核心没有任何改变，所以也不用重写编写一份。这就是软件设计的价值所在。</p><h2 id="数据访问" tabindex="-1"><a class="header-anchor" href="#数据访问" aria-hidden="true">#</a> 数据访问</h2><p>我们选择 MySQL 这给数据库，访问数据库的程序库选择 Spring Data JPA，它可以让我尽可能少写代码。</p><h3 id="技术选型" tabindex="-1"><a class="header-anchor" href="#技术选型" aria-hidden="true">#</a> 技术选型</h3><p>数据库常用的程序库有 MyBatis 和 JPA。MyBatis 倾向于手工编写 SQL 语句， JPA 采用更加面向对象的角度，JPA 访问数据库的 SQL 通常由框架生成。</p><p>两者的主要差异是 Mybatis 更倾向于具体实现 , JPA 提供了更好的抽象能力。</p><h3 id="数据库迁移" tabindex="-1"><a class="header-anchor" href="#数据库迁移" aria-hidden="true">#</a> 数据库迁移</h3><p>编码工作之前，我们要先确定好 Todo 项存储的数据结构。也就是数据库要创建那些表</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> todo_items
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">\`</span>id<span class="token punctuation">\`</span></span>      <span class="token keyword">int</span> <span class="token keyword">auto_increment</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">\`</span>content<span class="token punctuation">\`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">\`</span>done<span class="token punctuation">\`</span></span>    <span class="token keyword">tinyint</span>      <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">\`</span>id<span class="token punctuation">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb4<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们为实体类加上一些 JPA 的注解</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;todo_items&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@NoArgsConstructor</span><span class="token punctuation">(</span>access <span class="token operator">=</span> <span class="token class-name">AccessLevel</span><span class="token punctuation">.</span><span class="token constant">PUBLIC</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TodoItem</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> index<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Column</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> content<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Column</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> done<span class="token punctuation">;</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本项目采用了 Flyway 迁移数据库，所以我们把sql文件放到</p><p>$rootDir/gradle/config/migration，执行我们的 gradle 任务就可以创建好表(flywayMigrate 是我们编写的gradle task)。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./gradlew flywayMigrate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>数据库表已经生成好了，我们要准备测试了。</p><h3 id="编写测试" tabindex="-1"><a class="header-anchor" href="#编写测试" aria-hidden="true">#</a> 编写测试</h3><p>测试数据库相关的内容属于兼具继承测试和单元测试两种属性的测试，</p><p>一方面它要对数据库做集成，另一方面，它要测的内容本身属于验证一个单元代码是否编写正确的范畴。</p><p>Spring 对数据库相关测试提供了很好的支持。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@DataJpaTest</span>
<span class="token annotation punctuation">@AutoConfigureTestDatabase</span><span class="token punctuation">(</span>replace <span class="token operator">=</span> <span class="token class-name">AutoConfigureTestDatabase<span class="token punctuation">.</span>Replace</span><span class="token punctuation">.</span><span class="token constant">NONE</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@TestPropertySource</span><span class="token punctuation">(</span><span class="token string">&quot;classpath:test.properties&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">TodoItemJpaRepositoryTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">TodoItemJpaRepository</span> repository<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">should_find_nothing_for_empty_repository</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TodoItem</span><span class="token punctuation">&gt;</span></span> items <span class="token operator">=</span> repository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertThat</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>@DataJpaTest</strong> ，表示这个测试采用 Spring Data JPA. 有了这个注解，Spring 会替我们把 Repository 实例生成出来。</p><p>我们来看看 TodoItemJpaRepository 接口</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">TodoItemJpaRepository</span> <span class="token keyword">extends</span> <span class="token class-name">TodoItemRepository</span><span class="token punctuation">,</span> <span class="token class-name">JpaRepository</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TodoItem</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">TodoItem</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">TodoItem</span> todoItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同之前相比，方法没有变化，只是扩展了 JpaRepository, 这是一个标记接口，没有方法。</p><p>实现这个接口是 Spring Data JPA 的要求，它会在运行时为接口生成实例，所以我们不许编写具体实现。</p><p>按照 Spring Data JPA 的要求，我们要配置一下 实体类 和 Repository 的扫描路径。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableJpaRepositories</span><span class="token punctuation">(</span>basePackages <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;io.github.himcs.todo.api&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EntityScan</span><span class="token punctuation">(</span><span class="token string">&quot;io.github.himcs.todo&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Bootstrap</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果一切顺利，测试会一次性通过。</p><p>测试并不会在数据库留下痕迹，测试在运行后回滚了数据, 这是 SpringJpaTest的缺省行为。</p><h2 id="restful-api" tabindex="-1"><a class="header-anchor" href="#restful-api" aria-hidden="true">#</a> RESTful API</h2><p>有了 Repository ，接下来我们来设计实现 API 接口。</p><h3 id="设计-restful-api" tabindex="-1"><a class="header-anchor" href="#设计-restful-api" aria-hidden="true">#</a> 设计 RESTful API</h3><p>回顾一下 ToDo 应用的能力，包括</p><ul><li>添加一个 Todo 项；</li><li>完成一个 Todo 项；</li><li>Todo 项列表。</li></ul><p>所有的能力都是围绕这 Todo 项进行的，所以我们把他们设计在一个资源下，可以把 URI 设计为 /todo-items。</p><ul><li>首先是添加一个 Todo 项</li></ul><p>一般创建会用 POST ， 格式我们采用最常用的 JSON 。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /todo-items

{
  &quot;content&quot;: &quot;foo&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>完成一个 Todo 项</li></ul><p>修改一般会使用 PUT</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PUT /todo-items/{index}

{
  done: true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>todo 项列表</li></ul><p>查询一般使用 GET。我们的需求里的查询会有一个是否查询所有的参数，所以我们添加一个参数 all，默认为false。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /todo-items?all=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="测试-restful-api" tabindex="-1"><a class="header-anchor" href="#测试-restful-api" aria-hidden="true">#</a> 测试 RESTful API</h3><p>同 Repository 部分一样，我们这部分测试从之前的测试借鉴过来，所以本篇不重点分析测试场景，而来看如何编写测试。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token annotation punctuation">@SpringBootTest</span>
<span class="token annotation punctuation">@AutoConfigureMockMvc</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TodoItemResourceTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">MockMvc</span> mockMvc<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">TodoItemRepository</span> repository<span class="token punctuation">;</span>
    
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    
<span class="token punctuation">.</span>    
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
    
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个类 是测试 添加 Todo项的，开头有几个注解</p><ul><li>@SpringBootTest， 表示接下来的测试是集成测试，因为最外面的接口很薄，所以把集成测试和单元测试放到了一起。</li><li>@AutoConfigureMockMvc，表示我们要使用的是模拟的网络环境，也就不是真实的网络环境，这样做可以让访问速度快一些。</li><li>@Transactional，说明这个测试是事务性的，在缺省的测试事务中，执行完测试之后，数据是要回滚，也就是不对数据库造成实际的影响。这要单独标记，否则就会有数据写入到数据库里面。而之前的 @DataJpaTest 自身就包含了这个 Annotation，所以不用特别声明。</li></ul><p>有了上面这些基础，我们可以测试了。我们可以认为，当我们执行测试时服务已经起好了，我们就像一个普通客户端一样取访问服务。</p><p>核心部分是下面这段。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
todoItem <span class="token operator">=</span> <span class="token string">&quot;{ &quot;</span> <span class="token operator">+</span>
               <span class="token string">&quot;\\&quot;content\\&quot;: \\&quot;foo\\&quot;&quot;</span> <span class="token operator">+</span>
           <span class="token string">&quot;}&quot;</span><span class="token punctuation">;</span>
mockMvc<span class="token punctuation">.</span><span class="token function">perform</span><span class="token punctuation">(</span><span class="token class-name">MockMvcRequestBuilders</span><span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&quot;/todo-items&quot;</span><span class="token punctuation">)</span>
                   <span class="token punctuation">.</span><span class="token function">contentType</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>
                   <span class="token punctuation">.</span><span class="token function">content</span><span class="token punctuation">(</span>todoItem<span class="token punctuation">)</span><span class="token punctuation">)</span>
       <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建了一个请求，设置了请求的信息, 使用 POST ,JSON格式，设置内容等等。然后预期返回上面。</p><p>这里我们使用的是 MockMVC ，因为我们配置了 @AutoConfigureMockMvc，它创建了一个模拟的网络环境。这就是 Spring 在测试做的很好的地方，正常情况下这些接口都是标准的网络环境，但 Spring 为我们提供了测试专用的实现，也就是不同的运行时，这就是做好了软件设计的结果。</p><p>我们还可以测试一些输入外部接口行为，例如传入空串会怎么办。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">should_fail_to_add_unknown_request</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> todoItem <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

    mockMvc<span class="token punctuation">.</span><span class="token function">perform</span><span class="token punctuation">(</span><span class="token class-name">MockMvcRequestBuilders</span><span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&quot;/todo-items&quot;</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">contentType</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">content</span><span class="token punctuation">(</span>todoItem<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">is4xxClientError</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编写-restful-api" tabindex="-1"><a class="header-anchor" href="#编写-restful-api" aria-hidden="true">#</a> 编写 RESTful API</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/todo-items&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TodoItemResource</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">TodoItemService</span> service<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">public</span> <span class="token class-name">TodoItemResource</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">TodoItemService</span> service<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>service <span class="token operator">=</span> service<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PostMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span> <span class="token function">addTodoItem</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token keyword">final</span> <span class="token class-name">AddTodoItemRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Strings</span><span class="token punctuation">.</span><span class="token function">isNullOrEmpty</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">badRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">final</span> <span class="token class-name">TodoParameter</span> parameter <span class="token operator">=</span> <span class="token class-name">TodoParameter</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">TodoItem</span> todoItem <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>service<span class="token punctuation">.</span><span class="token function">addTodoItem</span><span class="token punctuation">(</span>parameter<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">final</span> <span class="token class-name">URI</span> uri <span class="token operator">=</span> <span class="token class-name">ServletUriComponentsBuilder</span>
                <span class="token punctuation">.</span><span class="token function">fromCurrentRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">path</span><span class="token punctuation">(</span><span class="token string">&quot;/{id}&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">buildAndExpand</span><span class="token punctuation">(</span>todoItem<span class="token punctuation">.</span><span class="token function">getIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">toUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">created</span><span class="token punctuation">(</span>uri<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一段普通的 MVC 代码。</p><p>这里我们要注意，使用 <code>AddTodoItemRequest</code> 实体来接收请求体.HTTP 请求传输的是文本 , Spring 框架会帮我们把文本转换为 Java 对象。我们要把转换规则声明出来，Spring Boot 采用的 JSON 框架是 Jackson, 所以我们要在类上加上 Jackson 的规则。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AddTodoItemRequest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Getter</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> content<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonCreator</span>
    <span class="token keyword">public</span> <span class="token class-name">AddTodoItemRequest</span><span class="token punctuation">(</span><span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;content&quot;</span><span class="token punctuation">)</span> <span class="token keyword">final</span> <span class="token class-name">String</span> content<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>content <span class="token operator">=</span> content<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>扩展 ToDo 应用为 REST 服务</p><p>框架</p><ul><li>Sping Data JPA 数据库交互</li><li>Flyway 数据库迁移</li></ul><p>集成测试</p><ul><li>@SpringBootTest</li><li>@DataJpaTest 默认回滚</li><li>@Transactional 测试完成，数据库回滚</li></ul><p>设计</p><ul><li>防腐层，接口层，请求参数与业务参数隔离</li></ul><p>如果今天的内容你只能记住一句话，那么请记住，<strong>集成测试回滚数据，保证测试的可重复性</strong>。</p>`,79),o=[e];function c(i,l){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","todo_api.html.vue"]]);export{d as default};
