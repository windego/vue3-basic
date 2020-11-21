<template>
  <div class="fullscreen" ref="containerRef">
    <div class="content">
      <div id="nav">
        <router-link to="/">TodoMvc</router-link>|
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watchEffect, nextTick, ref } from 'vue'

import { useStore } from '@/store'

export default defineComponent({
  setup () {
    const containerRef = ref<HTMLElement>()
    const store = useStore()

    const fetchBingImg = () => store.dispatch('basic/fetchBingImg')
    const setBackground = (url: string) => {
      const img = new Image()
      img.src = url
      img.onload = () => {
        nextTick(() => {
          if (containerRef.value) {
            // 为 dom 元素设置背景
            // containerRef.value 是原生DOM对象
            containerRef.value.style.background = `url(${img.src})`
            containerRef.value.style.backgroundSize = 'cover'
            containerRef.value.style.backgroundPosition = '50% 50%'
          }
        })
      }
    }

    onMounted(() => {
      fetchBingImg()
      watchEffect(() => {
        const url = store.state.basic.bingImg
        setBackground(url)
      })
    })

    return {
      containerRef,
    }
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  // width: 500px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.fullscreen {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.content {
  margin: 0 auto;
  width: 500px;
}
</style>
