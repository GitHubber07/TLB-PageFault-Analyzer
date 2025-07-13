class Disk {
  constructor() {
    this.storage = {};
  }

  read(pageId) {
    return this.storage[pageId] || null;
  }

  write(pageId, data) {
    this.storage[pageId] = data;
  }
}

module.exports = Disk;