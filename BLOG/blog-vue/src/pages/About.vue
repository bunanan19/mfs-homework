<template>
    <div class="about col md-12 xs-12">
      <h2>About Me </h2>
      <div class="pic"><img src="../assets/pics/me.jpg" alt=""></div>
      <article>
        <p>
          Responsive web design offers us a way forward, finally allowing us to design for the ebb and flow of things. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly.
        </p>
        <p>
          Responsive web design offers us a way forward, finally allowing us to design for the ebb and flow of things. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly.
        </p>
      </article>
    </div>
  </template>
  
  <script>
  export default {
    name: 'about',
    data () {
      return {
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="stylus">
  @import '../assets/css/base.css';
  
  .about {
    text-align center
    h2 {
      text-align center
      font-size: 36px;
      font-weight: 700;
    }
    .pic {
      text-align center
    }
    article {
      font-size: 20px;
      line-height: 150%;
      margin: 30px 50px 100px 50px;
      text-align start
    }
    p {
      margin: 10px 0;
      padding: 10px;
      border: 0;
      font: inherit;
      font-size: 100%;
      line-height: inherit;
      vertical-align: baseline;
      background: 0 0;
    }
  }
  </style>
  