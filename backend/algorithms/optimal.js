module.exports = function optimal(pages, frameCount) {
  const frames = [];
  const steps = [];

  pages.forEach((page, index) => {
    const hit = frames.includes(page);
    if (!hit) {
      if (frames.length >= frameCount) {
        const future = pages.slice(index + 1);
        const nextUse = frames.map(f => {
          const idx = future.indexOf(f);
          return idx === -1 ? Infinity : idx;
        });
        const replaceIndex = nextUse.indexOf(Math.max(...nextUse));
        frames[replaceIndex] = page;
      } else {
        frames.push(page);
      }
    }
    steps.push({ page, frames: [...frames], hit });
  });

  return { steps };
};