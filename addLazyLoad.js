const LAZY = 'lazy'
const lazyCssSelector = '.' + LAZY;
const LAZY_LOADED = 'lazy--loaded';
const LAZY_ANIMATED = 'lazy--animated';
const LAZY_FINISHED = 'lazy--finished';

const toPathName = (url) => {
  let result;

  try {
    result = (new URL(url)).pathname;
  } catch {
    result = url;
  }

  return result;
};

const loadingFinished = (image) => {
  image.classList.add(LAZY_FINISHED);
  image.classList.add(LAZY_ANIMATED);
  image.classList.add(LAZY_LOADED);
  image.classList.remove(LAZY);

  const onloadEvent = new CustomEvent('imageLazyLoaded', {detail: image});
  window.dispatchEvent(onloadEvent);
  image.classList.remove(LAZY_LOADED);
};

const animateLazyLoaded = (lazyLoadedAnimationEvent) => {
  const target = lazyLoadedAnimationEvent.target;

  if (!target.classList.contains(LAZY_ANIMATED)) {
    return;
  }

  setTimeout(() => {
    target.classList.remove(LAZY_FINISHED);
  }, 10);

  target.classList.remove(LAZY_ANIMATED);
};

const hasElementParameter = (element, parameter) => {
  const source = element.querySelector('source');

  if (source) {
    return source.hasAttribute(parameter);
  }

  return element.hasAttribute(parameter);
};

const getElementParameter = (element, parameter) => {
  const source = element.querySelector('source');

  if (source) {
    return source.getAttribute(parameter);
  }

  return element.getAttribute(parameter);
}

const onLoadEventEmitter = (onloadEvent) => {
  const target = onloadEvent.target;
  const pathNameBySrc = toPathName(getElementParameter(target, 'src'));
  const pathNameByDataSrc = toPathName(getElementParameter(target, 'data-src'));
  const targetSrcset = getElementParameter(target, 'srcset');
  const targetDataSrcset = getElementParameter(target, 'data-srcset');
  const isLoadedBySrc = hasElementParameter(target, 'data-src') && (pathNameByDataSrc === pathNameBySrc);
  const isLoadedBySrcset = hasElementParameter(target, 'data-srcset') && (targetDataSrcset === targetSrcset);
  const isNotLoaded = !(isLoadedBySrc || isLoadedBySrcset);

  if (isNotLoaded) {
    return;
  }

  loadingFinished(target);
};

const lazyLoadImages = (image) => {
  image.onload = onLoadEventEmitter;

  if (image.dataset.src) {
    image.src = image.dataset.src;
  }

  if (image.dataset.srcset) {
    image.srcset = image.dataset.srcset;
  }

  const video = image.closest('video');

  if (!video) {
    return;
  }

  for (let source in video.children) {
    const videoSource = video.children[source];
    if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
      videoSource.src = videoSource.dataset.src;
    }
  }

  video.onloadeddata = onLoadEventEmitter;

  video.load();
};

export function addLazyLoad() {
  document.addEventListener('DOMContentLoaded', function() {
    // TODO: set to CustomEvent
    window.addEventListener('transitionend', animateLazyLoaded);

    const lazyloadImages = document.querySelectorAll(lazyCssSelector);

    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        const image = entry.target;

        lazyLoadImages(image);

        imageObserver.unobserve(image);
      });
    }, {rootMargin: '30%'});

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  });
}
