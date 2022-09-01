/**
 * Vue 插件：开启关闭rem支持
 * @author huangqin@gmail.com
 */

const dpr = window.devicePixelRatio || 1;
const docEl = document.documentElement; // ts请相信我这个不会是null

export default {
  /**
   * 安装Vue插件
   * @param Vue
   * @param options 插件引入的参数对象
   */
  install(
    Vue,
    options = {
      pxToRem: 75,
      auto: true,
    },
  ) {
    // 是否启用
    let isflag = false;

    const pxToRem = options.pxToRem;

    const setRemUnit = () => {
      const rem = docEl.clientWidth <= pxToRem * 10 ? docEl.clientWidth / 10 : pxToRem;
      docEl.style.fontSize = `${rem}px`;
      // console.log(rem);
    };
    const pageShow = (event) => {
      if (event.persisted) {
        setTimeout(() => {
          setRemUnit();
        }, 10);
      }
    };

    const setBodyFontSize = () => {
      if (document.body) {
        document.body.style.fontSize = docEl.clientWidth <= pxToRem * 10
          ? `${12 * dpr}px`
          : `${pxToRem}px`;
      } else {
        document.addEventListener('DOMContentLoaded', setBodyFontSize, false);
      }
    };

    Vue.prototype.$pluginRem = (flag) => {
      if (flag) {
        console.log('Rem插件: 启动');
        // setBodyFontSize();
        setRemUnit();
        if (dpr >= 2) {
          const fakeBody = document.createElement('body');
          const testElement = document.createElement('div');
          testElement.style.border = '.5px solid transparent';
          fakeBody.appendChild(testElement);
          docEl.appendChild(fakeBody);
          if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines');
          }
          docEl.removeChild(fakeBody);
        }
        window.addEventListener('resize', setRemUnit, false);
        window.addEventListener('pageShow', pageShow, false);
        isflag = true;
      } else {
        console.log('Rem插件: 关闭');
        document.body.style.fontSize = null;
        docEl.style.fontSize = null;
        window.removeEventListener('resize', setRemUnit, false);
        window.removeEventListener('pageShow', pageShow, false);
        isflag = false;
      }
    };

    // mixin 全局注入方式自启动
    if (options.auto) {
      Vue.mixin({
        beforeCreate() {
          if (!isflag) this.$pluginRem(true);
        },
      });
    }
  },
};
