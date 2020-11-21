/*
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import { BASE_FONT_SIZE, BASE_SCREEN_WIDTH } from '~/config';

function computeFontScale() {
  const el = document.createElement('p');
  el.setAttribute('style', 'position:absolute;font-size:16px;opacity:0');
  el.innerText = '_';
  document.body.appendChild(el);
  const scale = parseInt(getComputedStyle(el).fontSize, 10) / 16;
  document.body.removeChild(el);
  return scale;
}

function resizeFontSize() {
  const docEl = document.documentElement!;
  const screenWidth = docEl.getBoundingClientRect().width || window.innerWidth;
  const fontSize = Math.min((screenWidth / BASE_SCREEN_WIDTH) * BASE_FONT_SIZE, BASE_FONT_SIZE);
  const fontScale = computeFontScale();
  docEl.style.fontSize = `${fontSize / fontScale}px`;
}

function flexibleRem() {
  resizeFontSize();

  window.addEventListener('resize', resizeFontSize);
  window.addEventListener('orientationchange', resizeFontSize);
}

export default flexibleRem;
