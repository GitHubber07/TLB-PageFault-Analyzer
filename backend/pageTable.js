class PageTable {
  constructor() {
    this.pages = {};
  }

  setPage(pageId, frameIndex) {
    this.pages[pageId] = { frameIndex, valid: true };
  }

  invalidate(pageId) {
    if (this.pages[pageId]) this.pages[pageId].valid = false;
  }

  getFrameIndex(pageId) {
    const entry = this.pages[pageId];
    return entry && entry.valid ? entry.frameIndex : null;
  }
}

module.exports = PageTable;