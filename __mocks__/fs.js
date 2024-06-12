const fs = {};

fs.existsSync = jest.fn(() => true);

module.exports = fs;