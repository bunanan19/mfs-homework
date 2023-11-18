<template>
  <div class="article">
    <div class="col md-8 main">
      <article-item :showDetail="true"  :data="articles[1]"></article-item>
    </div>
    <div class="col md-4 xs-10 list">
      <lastest-article :data="lastestArticles"></lastest-article>
      <archive :data="archives"></archive>
      <target :data="targets"></target>
    </div>
  </div>
</template>

<script>
import LastestArticle from '../components/LastestArticle'
import Archive from '../components/Archive'
import Target from '../components/Target'
import ArticleItem from '../components/ArticleItem'
export default {
  name: 'article',
  data () {
    return {
      articles: [
        {
          id: 1,
          title: "前端自动化测试探索",
          target: "前端",
          date: "2023.11.17",
          clickTimes: "34",
          content: "随着屏幕的大小变换，内容区域的元素会匹配屏幕重新布局，就是我们说的自适应效果。我们在.col列中追加class类就可以实现自适应效果。如超小屏幕(xs)、超大屏幕(xl)。栅格系统首先会匹配移动手机版小屏幕，所以每个.col都需要一个class如：.xs-*，这样的话如果大屏幕的类没有设置，它就会使用这个.xs-*。本文不会探讨单元测试方向，因为单测已经有完善的工具体系。但前端开发中，除了一些框架和库，愿意去写单测的少之又少。另外单测维护成本较高，而且也没法满足前端测试的所有需求。 用户可以基于 首先本文不会探讨单元测试方向，因为单测已经有完善的工具体系。但前端开发中，除了一些框架和库，愿意去写单测的少之又少。另外单测维护成本较高，而且也没法满足前端测试的所有需求。 用户可以基于 tag 来快速筛选感兴趣的文章，文章也可以依照 而且人工设置难免不规范和不完全。"
        },
        {
          id: 2,
          title: "前端自动化测试探索",
          target: "前端",
          date: "2023.11.17",
          clickTimes: "34",
          content: "随着屏幕的大小变换，内容区域的元素会匹配屏幕重新布局，就是我们说的自适应效果。我们在.col列中追加class类就可以实现自适应效果。如超小屏幕(xs)、超大屏幕(xl)。栅格系统首先会匹配移动手机版小屏幕，所以每个.col都需要一个class如：.xs-*，这样的话如果大屏幕的类没有设置，它就会使用这个.xs-*。本文不会探讨单元测试方向，因为单测已经有完善的工具体系。但前端开发中，除了一些框架和库，愿意去写单测的少之又少。另外单测维护成本较高，而且也没法满足前端测试的所有需求。 用户可以基于 首先本文不会探讨单元测试方向，因为单测已经有完善的工具体系。但前端开发中，除了一些框架和库，愿意去写单测的少之又少。另外单测维护成本较高，而且也没法满足前端测试的所有需求。 用户可以基于 tag 来快速筛选感兴趣的文章，文章也可以依照 而且人工设置难免不规范和不完全。"
        },
        {
          id: 3,
          title: "前端自动化测试探索",
          target: "前端",
          date: "2023.11.17",
          clickTimes: "34",
          content: "随着屏幕的大小变换，内容区域的元素会匹配屏幕重新布局，就是我们说的自适应效果。我们在.col列中追加class类就可以实现自适应效果。如超小屏幕(xs)、超大屏幕(xl)。栅格系统首先会匹配移动手机版小屏幕，所以每个.col都需要一个class如：.xs-*，这样的话如果大屏幕的类没有设置，它就会使用这个.xs-*。本文不会探讨单元测试方向，因为单测已经有完善的工具体系。但前端开发中，除了一些框架和库，愿意去写单测的少之又少。另外单测维护成本较高，而且也没法满足前端测试的所有需求。 用户可以基于 首先本文不会探讨单元测试方向，因为单测已经有完善的工具体系。但前端开发中，除了一些框架和库，愿意去写单测的少之又少。另外单测维护成本较高，而且也没法满足前端测试的所有需求。 用户可以基于 tag 来快速筛选感兴趣的文章，文章也可以依照 而且人工设置难免不规范和不完全。"
        },
      ],
      lastestArticles: [
        {
          id: 1,
          title: "JavaScript 最新特性实现的三大黑科技"
        },
        {
          id: 2,
          title: "使用 Node.js 对文本内容分词和关键词抽取"
        },
        {
          id: 3,
          title: "轻松管理你的 Node 版本"
        },
      ],
      archives: [
        {
          year: 2023,
          month: 11,
          articleNum: 2
        },
        {
          year: 2023,
          month: 10,
          articleNum: 1
        },
        {
          year: 2023,
          month: 9,
          articleNum: 4
        },
        {
          year: 2023,
          month: 6,
          articleNum: 3
        },
      ],
      targets: [
        {
          id: 1,
          name: "前端"
        },
        {
          id: 2,
          name: "css"
        },
        {
          id: 3,
          name: "Java"
        },
        {
          id: 4,
          name: "Nodejs"
        },
        {
          id: 5,
          name: "UI"
        },
        {
          id: 6,
          name: "数据库"
        },
      ]
    }
  },
  components: {
    LastestArticle,
    Archive,
    Target,
    ArticleItem
  },
  created () {
    console.log(this.$route.name)
    console.log(this.$route.params)
  },//可以获取路由信息name params，
  //但是在同一个组件中，只要组件被created那一刻才会打印路由信息，
  //组件创建好了后，即使点击链接route信息改变，也不会打印，
  watch: {
    '$route': function(newVal) {
      console.log(newVal.name)
      console.log(newVal.params)
    }
  }//使用watch函数跟踪route的变化
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  padding: 5px
}
.list {
  padding: 20px;
}
</style>
