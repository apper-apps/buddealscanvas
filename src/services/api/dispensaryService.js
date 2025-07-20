import dispensariesData from "@/services/mockData/dispensaries.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dispensaryService = {
  async getAll() {
    await delay(250);
    return [...dispensariesData];
  },

  async getById(id) {
    await delay(200);
    return dispensariesData.find(dispensary => dispensary.Id === parseInt(id));
  },

  async create(dispensaryData) {
    await delay(400);
    const maxId = Math.max(...dispensariesData.map(d => d.Id));
    const newDispensary = {
      ...dispensaryData,
      Id: maxId + 1,
      activeDeals: 0
    };
    dispensariesData.push(newDispensary);
    return newDispensary;
  },

  async update(id, dispensaryData) {
    await delay(350);
    const index = dispensariesData.findIndex(dispensary => dispensary.Id === parseInt(id));
    if (index === -1) throw new Error("Dispensary not found");
    
    dispensariesData[index] = {
      ...dispensariesData[index],
      ...dispensaryData,
      Id: parseInt(id)
    };
    return dispensariesData[index];
  },

  async delete(id) {
    await delay(300);
    const index = dispensariesData.findIndex(dispensary => dispensary.Id === parseInt(id));
    if (index === -1) throw new Error("Dispensary not found");
    
    const deletedDispensary = dispensariesData.splice(index, 1)[0];
    return deletedDispensary;
  }
};