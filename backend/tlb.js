class TLB {
  constructor(size = 4) {
    this.size = size;
    this.buffer = [];
  }

  lookup(pageId) {
    const entry = this.buffer.find(e => e.pageId === pageId);
    return entry ? entry.frameIndex : null;
  }

  insert(pageId, frameIndex) {
    if (this.buffer.length >= this.size) this.buffer.shift();
    this.buffer.push({ pageId, frameIndex });
  }
}

module.exports = TLB;