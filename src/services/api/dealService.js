import dealsData from "@/services/mockData/deals.json";
import { dispensaryService } from "@/services/api/dispensaryService";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Newsletter and loyalty program integration
const newsletterSources = {
  1: "Nirvana Weekly Newsletter",
  2: "NAR Loyalty Rewards", 
  3: "Enlighten Daily Deals",
  4: "Highway 90 Flash Alerts",
  5: "Floro Loyalty Program",
  6: "Curaleaf VIP Program",
  7: "Rise Rewards Newsletter",
  8: "Rise Loyalty Updates",
  9: "Zenleaf Member Deals",
  10: "TerrAscend Insider",
  11: "Apothecarium Rewards",
  12: "Acreage Wellness Club",
  13: "Columbia Care Plus",
  14: "Harmony Premium Alerts",
  15: "Breakwater VIP Updates",
  16: "Garden State Green Weekly",
  17: "Ascend Member Perks",
  18: "Verano Loyalty Rewards",
  19: "RISE Express Deals",
  20: "Ayr Cannabis Club",
  21: "The Botanist VIP",
  22: "Zen Leaf Premium",
  23: "Curaleaf Express",
  24: "MPX Member Updates"
};

// Social media source tracking
const socialMediaSources = {
  1: "Instagram @nirvanadispensary",
  2: "Facebook - NAR Cannabis",
  3: "Twitter @enlightennj",
  4: "Instagram Stories @highway90nj",
  5: "Facebook - Floro Cannabis",
  6: "Instagram @curaleafnj",
  7: "LinkedIn - Rise Cannabis",
  8: "Instagram @risenj",
  9: "Facebook - Zenleaf NJ",
  10: "Twitter @terrascendnj",
  11: "Instagram @apothecariumnj",
  12: "Facebook - Acreage Wellness",
  13: "Instagram @columbiacarenj"
};

export const dealService = {
  async getAll() {
    await delay(300);
    const dispensaries = await dispensaryService.getAll();
    
return dealsData.map(deal => ({
      ...deal,
      dispensary: dispensaries.find(d => d.Id === deal.dispensaryId),
      loyaltySource: newsletterSources[deal.dispensaryId] || "Direct Update",
      socialMediaSource: deal.socialMediaSource || socialMediaSources[deal.dispensaryId],
      isNewsletterExclusive: deal.isNewsletterExclusive || false
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