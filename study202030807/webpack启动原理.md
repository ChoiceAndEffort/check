# webpack

## 参考链接

- https://juejin.cn/post/6949040393165996040?searchId=2023080515404588BF2BD5C7A69298A40E

## 专业名词介绍

- Compiler：编译管理器，webpack 启动后会创建 compiler 对象，该对象一直存活知道结束退出
- Compilation：单次编辑过程的管理器，比如 watch = true 时，运行过程中只有一个 compiler 但每次文件变更触发重新编译时，都会创建一个新的 compilation 对象
- Dependence：依赖对象，webpack 基于该类型记录模块间依赖关系
- Module：webpack 内部所有资源都会以“module”对象形式存在，所有关于资源的操作、转译、合并都是以 “module” 为基本单位进行的
- Loader：资源内容转换器，其实就是实现从内容 A 转换 B 的转换器
- Chunk：编译完成准备输出时，webpack 会将 module 按特定的规则组织成一个一个的 chunk，这些 chunk 某种程度上跟最终输出一一对应
- Plugin：webpack 构建过程中，会在特定的时机广播对应的事件，插件监听这些事件，在特定时间点介入编译过程

## webpack 启动的几个步骤:

> 分为三个阶段: 初始化阶段[1,2,3,4],构建阶段[5,6],生成阶段[7,8]

1. 解析配置文件:

   > Webpack 在启动时会读取并解析项目中的配置文件（如 webpack.config.js），获取构建的配置信息。

2. 创建 Compiler 对象:

   > Webpack 根据解析得到的配置信息创建一个 Compiler 对象，Compiler 对象是整个打包过程的核心，负责管理所有的插件和负责打包的事件流。

3. 初始化 Compiler 对象

   > 在创建 Compiler 对象后，Webpack 会调用 Compiler 对象的 run 方法进行初始化。在初始化过程中，会加载所有配置文件中的插件，并根据配置文件中的各项配置进行初始化设置(包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等)。

4. 确定入口起点:

   > Webpack 会根据配置文件中的 entry 配置确定打包的入口起点，即要从哪个模块开始构建内部的依赖图。

5. 解析模块依赖:

   > Webpack 会从入口模块开始递归地解析模块依赖关系。对于每个模块，Webpack 会通过加载器（Loader）对其进行转换和处理，加载器可以将各种类型的文件转换成 JavaScript 模块。(调用 JS 解释器将内容转换为 AST 对象，从中找出该模块依赖的模块，再 递归 本步骤直到所有入口依赖的文件都经过了本步骤的处理)

6. 构建内部依赖:

   > Webpack 会根据模块之间的依赖关系，构建一个内部的依赖图（Dependency Graph），用于记录所有模块的依赖关系和资源引用关系。(上一步递归处理所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的 依赖关系图)

7. 模块打包:

   > 在构建完内部依赖图后，Webpack 会根据配置文件中的各项设置对模块进行各种转换和优化操作，例如合并模块、拆分代码、处理样式文件、压缩代码等.[根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会]

8. 生成输出文件
   > 最后，Webpack 会根据配置文件中的 output 配置，将打包后的模块输出到指定的目录中，生成最终的输出文件。

> ::: 在整个启动过程中，Webpack 会通过事件流机制不断触发各个插件的生命周期钩子函数，以实现各种自定义的功能和扩展。

## webpack 事件流机制

### Webpack 使用事件流机制来处理和触发各个插件的生命周期函数。整个事件流分为以下几个主要阶段:

1. 初始化阶段（Initialization）：

   > 在这个阶段，Webpack 会创建 Compiler 对象，并触发 initialize 事件。插件可以在 initialize 阶段监听该事件，并执行一些初始化操作。

2. 编译阶段（Compilation）：

   > 在这个阶段，Webpack 会根据 entry 配置和模块依赖关系，构建内部的依赖图，并进行模块的解析、转换和优化操作。Webpack 会触发一系列与编译相关的事件，例如 beforeCompile、compile、make、afterCompile 等。插件可以监听这些事件，并在其中执行自定义的操作。

3. 流程控制阶段（Flow Control）：

   > 在这个阶段，Webpack 会根据依赖图和模块的状态，决定是否需要继续编译或停止编译。Webpack 会触发 shouldEmit、needAdditionalPass 等事件，插件可以监听这些事件，在其中修改控制流程的行为。

4. 生成输出阶段（Output Generation）：

   > 在这个阶段，Webpack 会根据配置文件中的 output 配置，将打包后的模块生成最终的输出文件。Webpack 会触发 emit 事件，插件可以监听该事件，并在其中执行一些自定义的输出操作。

5. 完成阶段（Completion）：
   > 在整个编译过程完成后，Webpack 会触发 done 事件，插件可以监听该事件，并在其中执行一些收尾的操作，例如输出统计信息、生成生产环境的构建报告等。

## webpack 插件生命周期函数

> Webpack 插件可以通过监听 Compiler 和 Compilation 对象上的不同生命周期钩子函数来执行相应的操作。以下是一些常用的插件生命周期函数：

- apply：插件的入口函数，用于接收 Webpack 的 Compiler 对象，并进行相应的初始化操作。
-
- environment：在 Webpack 环境初始化之后被调用，可以通过参数访问到环境变量。

- afterEnvironment：在环境变量初始化之后被调用。

- initialize：在 Webpack 开始编译之前被调用，可以在该阶段做一些初始化的准备工作。

- beforeRun：在 Webpack 开始编译之前被调用，在该阶段可以执行一些准备工作。

- run：在开始编译时被调用。

- watchRun：在使用 watch 模式编译时，每次重新编译之前被调用。

- normalModuleFactory：在创建 NormalModuleFactory 之后被调用，可以通过该钩子修改模块的解- 析逻辑。

- contextModuleFactory：在创建 ContextModuleFactory 之后被调用。

- beforeCompile：在即将开始编译新的 Compilation 之前被调用。

- compile：在开始编译新的 Compilation 之前被调用。

- thisCompilation：在每次开始新的 Compilation 时被调用。

- compilation：在每次开始新的 Compilation 时被调用。

- make：在完成一次 Compilation 之前被调用，该阶段是生成资源的主要阶段。

- afterCompile：在完成一次 Compilation 之后被调用，可以对 Compilation 进行后续处理。

- emit：在生成资源到 output 目录之前被调用。

- afterEmit：在生成资源到 output 目录之后被调用。

- done：在所有 Compilation 完成之后被调用。

- failed：在编译失败之后被调用。

- invalid：在编译无效（文件被修改）之后被调用。
  > 插件可以通过注册这些生命周期钩子函数，并提供相应的回调函数来执行自定义操作

## webpack 几个阶段细究

### 初始化阶段

https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8ce6474c85247829475ba1f2ec9a047~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp

- 将 process.args + webpack.config.js 合并成用户配置
- 调用 validateSchema 校验配置
- 调用 getNormalizedWebpackOptions + applyWebpackOptionsBaseDefaults 合并出最终配置
- 创建 compiler 对象
- 遍历用户定义的 plugins 集合，执行插件的 apply 方法
- 调用 new WebpackOptionsApply().process 方法，加载各种内置插件

#### 主要逻辑集中在 WebpackOptionsApply 类，webpack 内置了数百个插件，这些插件并不需要我们手动配置，WebpackOptionsApply 会在初始化阶段根据配置内容动态注入对应的插件，包括：

- 注入 EntryOptionPlugin 插件，处理 entry 配置
- 根据 devtool 值判断后续用那个插件处理 sourcemap，可选值：EvalSourceMapDevToolPlugin、SourceMapDevToolPlugin、EvalDevToolModulePlugin
- 注入 RuntimePlugin ，用于根据代码内容动态注入 webpack 运行时
- 到这里，compiler 实例就被创建出来了，相应的环境参数也预设好了，紧接着开始调用 compiler.compile 函数：

### 构建阶段

> 构建阶段从 entry 开始递归解析资源与资源的依赖，在 compilation 对象内逐步构建出 module 集合以及 module 之间的依赖关系
> 核心流程：
> https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69c49d365f894fc19e42bce73d674b08~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp

- 调用 handleModuleCreate ，根据文件类型构建 module 子类
- 调用 loader-runner 仓库的 runLoaders 转译 module 内容，通常是从各类资源类型转译为 JavaScript 文本
- 调用 acorn 将 JS 文本解析为 AST
- 遍历 AST，触发各种钩子
- AST 遍历完毕后，调用 module.handleParseResult 处理模块依赖
- 对于 module 新增的依赖，调用 handleModuleCreate ，控制流回到第一步
- 所有依赖都解析完毕后，构建阶段结束

> 这个过程中数据流 module => ast => dependences => module ，先转 AST 再从 AST 找依赖。这就要求 loaders 处理完的最后结果必须是可以被 acorn 处理的标准 JavaScript 语法，比如说对于图片，需要从图像二进制转换成类似于 export default "data:image/png;base64,xxx" 这类 base64 格式或者 export default "http://xxx" 这类 url 格式。

> compilation 按这个流程递归处理，逐步解析出每个模块的内容以及 module 依赖关系，后续就可以根据这些内容打包输出。

1. Webpack 编译过程会将源码解析为 AST 吗？webpack 与 babel 分别实现了什么？

- 构建阶段会读取源码，解析为 AST 集合。
- Webpack 读出 AST 之后仅遍历 AST 集合；babel 则对源码做等价转换

2. Webpack 编译过程中，如何识别资源对其他资源的依赖？

- Webpack 遍历 AST 集合过程中，识别 require/ import 之类的导入语句，确定模块对其他资源的依赖关系

3. 相对于 grant、gulp 等流式构建工具，为什么 webpack 会被认为是新一代的构建工具？

- Grant、Gulp 仅执行开发者预定义的任务流；而 webpack 则深入处理资源的内容，功能上更强大

### 生成阶段

#### 生成阶段

> 构建阶段围绕 module 展开，生成阶段则围绕 chunks 展开。经过构建阶段之后，webpack 得到足够的模块内容与模块关系信息，接下来开始生成最终资源了。代码层面，就是开始执行 **compilation.seal**函数：

- 构建本次编译的 ChunkGraph 对象；
- 遍历 compilation.modules 集合，将 module 按 entry/动态引入 的规则分配给不同的 Chunk 对象；
- compilation.modules 集合遍历完毕后，得到完整的 chunks 集合对象，调用 createXxxAssets 方法
- createXxxAssets 遍历 module/chunk ，调用 compilation.emitAssets 方法将资 assets 信息记录到 compilation.assets 对象中
- 触发 seal 回调，控制流回到 compiler 对象

这一步的关键逻辑是将 module 按规则组织成 chunks ，webpack 内置的 chunk 封装规则比较简单：

- **entry 及 entry 触达到的模块，组合成一个 chunk**
- **使用动态引入语句引入的模块，各自组合成一个 chunk**

> chunk 是输出的基本单位，默认情况下这些 chunks 与最终输出的资源一一对应，那按上面的规则大致上可以推导出一个**entry 会对应打包出一个资源**，而**通过动态引入语句引入的模块，也对应会打包出相应的资源**。

### webpack 的 compiler 和 compilation 是什么关系？

> compiler 是 webpack 的入口执行实例，其主要功能是监控代码、启动和终止一个 compilation 等宏观任务。compilation 是具体负责核心编译工作的，主要是模块依赖分析，优化、连接，打包等工作。打个粗略的比方，compiler 是人，compilation 是人的大脑，架构设计上是类似的。给 webpack 写 plugin 的时候，我们需要通过 compiler 提供的钩子来 tap 宏观生命周期，其中一个最主要的阶段就是 compilation（创建编译对象）的 hook，通过该 hook，我们拿到编译对象，从而得以进一步 tap 入实际的编译过程。

#### SplitChunksPlugin 的作用(用于将共享代码（如第三方库、公共模块）拆分成单独的文件，以减小打包后的文件大小并提高加载速度)

> SplitChunksPlugin 是 webpack 架构高扩展的一个绝好的示例，我们上面说了 webpack 主流程里面是按 entry / 动态引入 两种情况组织 chunks 的，这必然会引发一些不必要的重复打包，webpack 通过插件的形式解决这个问题。

回顾 compilation.seal 函数的代码，大致上可以梳理成这么 4 个步骤：

- 遍历 compilation.modules ，记录下模块与 chunk 关系
- 触发各种模块优化钩子，这一步优化的主要是模块依赖关系
- 遍历 module 构建 chunk 集合
- 触发各种优化钩子
- 触发的 optimizeChunks 钩子，这个时候已经跑完主流程的逻辑，得到 chunks 集合，SplitChunksPlugin 正是使用这个钩子，分析 chunks 集合的内容，按配置规则增加一些通用的 chunk ：

#### 写入文件系统

> 经过构建阶段后，compilation 会获知资源模块的内容与依赖关系，也就知道“输入”是什么；而经过 seal 阶段处理后， compilation 则获知资源输出的图谱，也就是知道怎么“输出”：哪些模块跟那些模块“绑定”在一起输出到哪里。seal 后大致的数据结构：

#### 资源形态流转

https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe923c3d560241d38815d549786eab4f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp

## webpack 几个阶段细究 --之调用方法

1. compiler.make 阶段：

- entry 文件以 dependence 对象形式加入 compilation 的依赖列表，dependence 对象记录有 entry 的类型、路径等信息
  根据 dependence 调用对应的工厂函数创建 module 对象，之后读入 module 对应的文件内容，调用 loader-runner 对内容做转化，转化结果若有其它依赖则继续读入依赖资源，重复此过程直到所有依赖均被转化为 module

2. compilation.seal 阶段：

- 遍历 module 集合，根据 entry 配置及引入资源的方式，将 module 分配到不同的 chunk
- 遍历 chunk 集合，调用 compilation.emitAsset 方法标记 chunk 的输出规则，即转化为 assets 集合

3. compiler.emitAssets 阶段：

- 将 assets 写入文件系统
