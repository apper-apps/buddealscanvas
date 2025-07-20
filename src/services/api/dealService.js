import dealsData from "@/services/mockData/deals.json";
import { dispensaryService } from "@/services/api/dispensaryService";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dealService = {
  async getAll() {
    await delay(300);
    const dispensaries = await dispensaryService.getAll();
    
    return dealsData.map(deal => ({
      ...deal,
      dispensary: dispensaries.find(d => d.Id === deal.dispensaryId)
    }));
  },

  async getById(id) {
    await delay(200);
    const deals = await this.getAll();
    return deals.find(deal => deal.Id === parseInt(id));
  },

  async getByDispensary(dispensaryId) {
    await delay(250);
    const deals = await this.getAll();
    return deals.filter(deal => deal.dispensaryId === parseInt(dispensaryId));
  },

  async create(dealData) {
    await delay(400);
    const maxId = Math.max(...dealsData.map(d => d.Id));
    const newDeal = {
      ...dealData,
      Id: maxId + 1,
      lastUpdated: new Date().toISOString()
    };
    dealsData.push(newDeal);
    return newDeal;
  },

  async update(id, dealData) {
    await delay(350);
    const index = dealsData.findIndex(deal => deal.Id === parseInt(id));
    if (index === -1) throw new Error("Deal not found");
    
    dealsData[index] = {
      ...dealsData[index],
      ...dealData,
      Id: parseInt(id),
      lastUpdated: new Date().toISOString()
    };
    return dealsData[index];
  },

  async delete(id) {
    await delay(300);
    const index = dealsData.findIndex(deal => deal.Id === parseInt(id));
    if (index === -1) throw new Error("Deal not found");
    
    const deletedDeal = dealsData.splice(index, 1)[0];
    return deletedDeal;
  }
};