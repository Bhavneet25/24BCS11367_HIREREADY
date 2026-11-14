const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_FILE = path.join(__dirname, '..', 'data', 'local_database.json');

// Initial default state
let memoryDb = {
  users: [],
  aptitudequestions: [],
  aptitudetests: [],
  testresults: [],
  codingproblems: [],
  codesubmissions: [],
  companies: [],
  mockinterviews: [],
  resumes: [],
  placementstatistics: [],
};

// Load from disk if exists
function loadDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      memoryDb = JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to load local json db:', err.message);
  }
}

// Persist to disk
function saveDb() {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(memoryDb, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save local json db:', err.message);
  }
}

loadDb();

class MockCollection {
  constructor(name) {
    this.name = name.toLowerCase() + (name.endsWith('s') ? '' : 's');
    if (!memoryDb[this.name]) {
      memoryDb[this.name] = [];
    }
  }

  get items() {
    return memoryDb[this.name] || [];
  }

  set items(val) {
    memoryDb[this.name] = val;
  }

  async find(filter = {}) {
    let result = [...this.items];
    for (const [key, val] of Object.entries(filter)) {
      if (val !== undefined && val !== null) {
        if (typeof val === 'object' && val.$in) {
          result = result.filter(item => val.$in.includes(item[key]));
        } else if (typeof val === 'object' && val.$regex) {
          const re = new RegExp(val.$regex, val.$options || 'i');
          result = result.filter(item => re.test(item[key]));
        } else {
          result = result.filter(item => String(item[key]) === String(val));
        }
      }
    }
    return result;
  }

  async findById(id) {
    return this.items.find(item => String(item._id) === String(id) || String(item.id) === String(id)) || null;
  }

  async findOne(filter = {}) {
    const list = await this.find(filter);
    return list[0] || null;
  }

  async create(data) {
    const id = data._id || 'mock_' + crypto.randomBytes(8).toString('hex');
    const doc = {
      _id: id,
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.items.push(doc);
    saveDb();
    return doc;
  }

  async insertMany(docs) {
    const created = [];
    for (const doc of docs) {
      created.push(await this.create(doc));
    }
    return created;
  }

  async findByIdAndUpdate(id, updates, options = { new: true }) {
    const index = this.items.findIndex(item => String(item._id) === String(id) || String(item.id) === String(id));
    if (index === -1) return null;
    const old = this.items[index];
    const updated = { ...old, ...updates, updatedAt: new Date().toISOString() };
    this.items[index] = updated;
    saveDb();
    return updated;
  }

  async findByIdAndDelete(id) {
    const index = this.items.findIndex(item => String(item._id) === String(id) || String(item.id) === String(id));
    if (index === -1) return null;
    const removed = this.items.splice(index, 1)[0];
    saveDb();
    return removed;
  }

  async deleteMany(filter = {}) {
    if (Object.keys(filter).length === 0) {
      this.items = [];
      saveDb();
      return { deletedCount: 0 };
    }
    const toKeep = [];
    for (const item of this.items) {
      let matches = true;
      for (const [key, val] of Object.entries(filter)) {
        if (String(item[key]) !== String(val)) matches = false;
      }
      if (!matches) toKeep.push(item);
    }
    const deletedCount = this.items.length - toKeep.length;
    this.items = toKeep;
    saveDb();
    return { deletedCount };
  }

  async countDocuments(filter = {}) {
    const results = await this.find(filter);
    return results.length;
  }
}

module.exports = {
  MockCollection,
  getMockCollection: (name) => new MockCollection(name),
  saveDb,
  loadDb,
  rawDb: memoryDb,
};
