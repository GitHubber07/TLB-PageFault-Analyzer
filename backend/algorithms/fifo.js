module.exports = function fifo(pages, totalFrames) {
  const frames = [];
  const steps = [];
  let pointer = 0;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const hit = frames.includes(page);

    if (!hit) {
      if (frames.length < totalFrames) {
        frames.push(page);
      } else {
        frames[pointer] = page;
        pointer = (pointer + 1) % totalFrames;
      }
    }

    steps.push({
      step: i + 1,
      page,
      frames: [...frames, ...Array(totalFrames - frames.length).fill("-")],
      hit
    });
  }

  return { steps };
};
