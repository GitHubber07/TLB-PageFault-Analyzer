module.exports = function clock(pages, frameCount) {
  const frames = Array(frameCount).fill(null);
  const useBits = Array(frameCount).fill(0);
  let pointer = 0;
  const steps = [];

  pages.forEach(page => {
    let index = frames.indexOf(page);
    const hit = index !== -1;

    if (hit) {
      useBits[index] = 1;
    } else {
      let replaced = false;
      let startPointer = pointer;
      
      while (!replaced) {
        if (useBits[pointer] === 0) {
          frames[pointer] = page;
          useBits[pointer] = 1;
          replaced = true;
        } else {
          useBits[pointer] = 0;
        }
        pointer = (pointer + 1) % frameCount;
        
        // Prevent infinite loop
        if (pointer === startPointer && !replaced) {
          frames[pointer] = page;
          useBits[pointer] = 1;
          replaced = true;
        }
      }
    }

    steps.push({ page, frames: [...frames], hit });
  });

  return { steps };
};