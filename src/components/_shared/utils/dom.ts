import { Ref } from 'vue';
import { isString } from './is';
import { unrefElement } from './vue-utils';
// 是否是服务端渲染
export const isServerRendering = (() => {
  try {
    return !(typeof window !== 'undefined' && document !== undefined);
  } catch (e) {
    return true;
  }
})();

// 查询
export const querySelector = (
  selectors: string,
  container?: Document | HTMLElement
) => {
  if (isServerRendering) {
    return undefined;
  }
  return (
    (container ?? document).querySelector<HTMLElement>(selectors) ?? undefined
  );
};

// 获取html元素
export const getElement = (
  target: string | HTMLElement | undefined,
  container?: Document | HTMLElement
): HTMLElement | undefined => {
  if (isString(target)) {
    const selector = target[0] === '#' ? `[id='${target.slice(1)}']` : target;
    return querySelector(selector, container);
  }
  return target;
};

// 提取 DOM 元素内所有文本内容
export function getDomText(dom: Ref<HTMLElement | undefined>): string {
  return unrefElement(dom)?.innerText || '';
}

// 查找元素的第一个可滚动父元素
export function findFirstScrollableParent(element?: HTMLElement) {
  if (!element || element === document.body) {
    return;
  }
  let currentElement: HTMLElement | null = element.parentElement;
  while (currentElement && currentElement !== document.body) {
    const style = window.getComputedStyle(currentElement);
    const overflow = style.overflowY || style.overflow;
    const isScrollable = ['auto', 'scroll'].includes(overflow);
    const canScroll = currentElement.scrollHeight > currentElement.clientHeight;
    if (isScrollable && canScroll) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
}
