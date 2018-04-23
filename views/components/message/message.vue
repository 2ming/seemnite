// by emelent

<template>
  <transition name="fade">
    <div
      :class="[
        'message',
        `message-${ type }`,
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass]"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      role="alert"
    >
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="message__content">{{ message }}</p>
        <p v-else v-html="message" class="message__content"></p>
      </slot>
    </div>
  </transition>
</template>

<script type="text/babel">
export default {
  data() {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'info',
      iconClass: '',
      customClass: '',
      onClose: null,
      showClose: false,
      closed: false,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    close() {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },
    clearTimer() {
      clearTimeout(this.timer)
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    keydown(e) {
      if (e.keyCode === 27) {
        // esc关闭消息
        if (!this.closed) {
          this.close()
        }
      }
    }
  },
  mounted() {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown)
  }
}
</script>

<style lang="less">
.message(@color) {
  min-width: 300px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background-color: @color;
  transition: opacity 0.3s, transform 0.4s;
  overflow: hidden;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .message__content {
      padding-right: 16px;
    }

  p {
    margin: 0;
  }
}

.message-info {
  .message(#fff);
  .message__content {
    color: #333;
  }
}

.message-success {
  .message(#67c23a);
  border-color: #67c23a;

  .message__content {
    color: #ccc
  }
}

.message-warning {
  .message(#e6a23c);
  border-color: #e6a23c;

  .message__content {
    color: #fff;
  }
}

.message-error {
  .message(#f56c6c);
  border-color: #f56c6c;
}

.message-fade-enter,
.message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
