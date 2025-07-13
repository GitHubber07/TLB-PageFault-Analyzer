const config = require("./config");
const Disk = require("./disk");
const Frame = require("./frame");
const Process = require("./process");
const TLB = require("./tlb");

const fifo = require("./algorithms/fifo");
const lru = require("./algorithms/lru");
const optimal = require("./algorithms/optimal");
const clock = require("./algorithms/clock");

module.exports = function runAlgorithm(algorithm, pages, totalFrames) {
  const disk = new Disk();
  const process = new Process("P1");
  const tlb = new TLB();
  const frames = Array.from({ length: totalFrames }, () => new Frame());
  const steps = [];

  let replaceStrategy;

  switch (algorithm.toLowerCase()) {
    case "fifo": replaceStrategy = fifo; break;
    case "lru": replaceStrategy = lru; break;
    case "optimal": replaceStrategy = optimal; break;
    case "clock": replaceStrategy = clock; break;
    default: return { error: "Invalid algorithm" };
  }

  const result = replaceStrategy(pages, totalFrames);

  result.steps.forEach((step, index) => {
    const pageId = step.page;
    const tlbHit = tlb.lookup(pageId);
    let hit = false;

    if (tlbHit !== null) {
      hit = true;
    } else {
      const frameIndex = process.accessPage(pageId);
      if (frameIndex !== null) {
        tlb.insert(pageId, frameIndex);
        hit = true;
      } else {
        const freeIndex = frames.findIndex(f => f.pageId === null);
        let usedIndex;

        if (freeIndex !== -1) {
          usedIndex = freeIndex;
        } else {
          const evicted = result.steps[index - 1]?.frames || [];
          const toReplace = evicted.find(f => !result.steps[index].frames.includes(f));
          usedIndex = frames.findIndex(f => f.pageId === toReplace);
        }

        frames[usedIndex] = new Frame();
        frames[usedIndex].pageId = pageId;
        frames[usedIndex].used = true;

        process.loadPage(pageId, usedIndex);
        tlb.insert(pageId, usedIndex);
      }
    }

    steps.push({
      step: index + 1,
      page: pageId,
      frames: frames.map(f => f.pageId ?? "-"),
      hit
    });
  });

  return { steps };
};