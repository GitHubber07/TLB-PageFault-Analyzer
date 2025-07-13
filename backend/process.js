const PageTable = require("./pageTable");

class Process {
  constructor(pid) {
    this.pid = pid;
    this.pageTable = new PageTable();
  }

  accessPage(pageId) {
    return this.pageTable.getFrameIndex(pageId);
  }

  loadPage(pageId, frameIndex) {
    this.pageTable.setPage(pageId, frameIndex);
  }
}

module.exports = Process;