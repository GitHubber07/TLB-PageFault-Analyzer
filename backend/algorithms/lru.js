module.exports = function lru(pages, frameCount) {
  const frames = [];
  const history = [];
  const steps = [];

  pages.forEach(page => {
    const frameIndex = frames.indexOf(page);
    const hit = frameIndex !== -1;
    
    if (hit) {
      history.splice(history.indexOf(page), 1);
      history.push(page);
    } else {
      if (frames.length >= frameCount) {
        const lruPage = history.shift();
        const replaceIndex = frames.indexOf(lruPage);
        frames[replaceIndex] = page;
      } else {
        frames.push(page);
      }
      history.push(page);
    }
    
    steps.push({ page, frames: [...frames], hit });
  });

  return { steps };
};