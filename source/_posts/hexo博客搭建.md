---
title: hexo博客搭建
date: 2019-06-11 15:43:08
tags:
---

# 运行环境

hexo构建重新运行在`Node.js`环境下。  
搭建步骤如下：  

1. 安装 Node.js 环境

2. 安装`hexo-cli`

`npm install -g hexo-cli`

# hexo命令

## 初始化

1. 初始化目录

`hexo init <folder>`
2. 安装依赖
`npm install`
创建完成后目录结构

## 新建文章

`hexo new [layout] <title>`，如果没有设置`layout`,会使用`_config.yml`中的`default_layout`.

## 生成网站

`hexo generate` or `hexo g`

## 部署

`hexo deploy` or `hexo d`

生成和部署可以一起使用，例如`hexo g -d`

## Server模式

`hexo server` or `hexo s`

## 清除缓存和已生成的文件

`hexo clean`
