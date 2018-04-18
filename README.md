# 基础知识
#### 页面加载过程：
url解析-》
dns查询（dns缓存）域名对应的ip地址-》
请求服务器中的资源-
requestHeader+(参数url[get请求]或body[post请求])
status+ responseHeader-》
浏览器解析(dom树->js(会破坏dom树)->dom->渲染树->布局->绘制)

#### 框架对比
~|angular|react|vue.js
-|-|-|-
组织方式   | mvc            | 模块化    |  模块化
数据绑定   | 双向           | 单向      |  双向
模块能力   | 强大（大而全）  | 自由      |  简洁
自由度     | 较小           | 大        |  较大
路由       | 静态           | 动态      |  动态
背景       |  google        | Facebook |  阿里巴巴

# github
#### 给github添加公钥，使其通过克隆ssh路径而不用输入密码：
* ssh-keygen -t rsa -C '562792542@qq.com'
* cd c/Users/rd08/.ssh/
* cat id_rsa.pub  ->得到公钥
* 打开github项目->settings->deploy keys->add->放入公钥保存,勾选读写权限
* git clone SSH方式就被允许了


# yarn
#### yarn安装：
* npm install yarn -g

#### yarn包管理工具，代替npm：
* yarn init === npm init
* yarn === npm install
* yarn global add xxx === npm install xxx -g     //全局安装
* yarn add xxx === npm install xxx --save       //dependencies项目运行必需
* yarn add xxx --dev === npm install xxx --save-dev //devDependencies开发时需要
* yarn remove xxx === npm uninstall xxx --save-dev
* yarn run xxx === npm run xxx
* 

# 项目构建
#### 环境配置：
* cd 项目目录
* yarn init
```
> error An unexpected error occurred: "Can't answer a question unless a user TTY"
yarn add yarn
node ./node_modules/yarn/bin/yarn.js init
```
* yarn add webpack@3.10.0 --dev
* 创建webpack.config.js和src/app.js
* ./node_modules/.bin/webpack   打包
* 
* yarn add html-webpack-plugin@2.30.1 --dev
* yarn add babel-core@6.26.0 babel-preset-env@1.6.1 babel-loader@7.1.2 --dev
* yarn add babel-preset-react@6.24.1 --dev
* yarn add react@16.2.0 react-dom@16.2.0
* yarn add style-loader@0.19.1 css-loader@0.28.8 --dev
* yarn add extract-text-webpack-plugin@3.0.2 --dev
* yarn add sass-loader@6.0.6 --dev
* yarn add node-sass@4.7.2 --dev
* yarn add file-loader@1.1.6 url-loader@0.6.2 --dev
* yarn add font-awesome
* yarn add webpack-dev-server@2.9.7 --dev //提供了一个简单的 web 服务器，并且能够实时重新加载
* 
* package.json中添加"scripts"，即可以添加yarn run xxx操作命令
* 现在就可以运行文件，图片，scss，jsx
* 

# git操作
#### 配置git信息以及git操作简写：
* vim ~/.gitconfig
```
  [user]
        name = yangliOMG
        email = 562792542@qq.com
  [alias]
        co=checkout
        。。。。
```
#### 代码提交：
* git checkout -b admin-v2 切换到分支
* git checkout master
* git branch 查看有哪些分支
* git add .     保存到缓存区（.不包括被删除的文件，-u不包括新增，-A二者合集）
* git commit -m "xxx"   保存在本地仓库  
```
中断这一步会导致留下锁lock
所以删除项目目录下，和./git下的lock。
```
* git push      保存到服务器仓库
* git pull origin master 同步
* 接下来管理员 点击new pull request可以开始处理分支上的代码，merge合并到master上









