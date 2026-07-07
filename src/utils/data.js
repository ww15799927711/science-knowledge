import knowledgeData from '@/data/knowledge.json'
import topicsData from '@/data/topics.json'
import historyData from '@/data/history.json'
import configData from '@/data/config.json'

// Knowledge
export function getAllKnowledge() { return knowledgeData }
export function getKnowledgeById(id) { return knowledgeData.find(k => k.kpId === Number(id)) }
export function getKnowledgeByCategory(category) {
  if (category === 'all') return knowledgeData
  return knowledgeData.filter(k => {
    const cat = configData.categories.find(c => c.id === category)
    return cat ? k.category === cat.name || k.category === category : false
  })
}
export function getKnowledgeCountByCategory(catId) {
  const cat = configData.categories.find(c => c.id === catId)
  if (!cat) return 0
  return knowledgeData.filter(k => k.category === cat.name || k.category === catId).length
}

// Topics
export function getAllTopics() { return topicsData }
export function getTopicById(id) { return topicsData.find(t => t.topicId === Number(id)) }
export function getTopicsBySubcategory(sub) {
  if (sub === 'all') return topicsData
  return topicsData.filter(t => {
    const subcat = configData.topicSubcategories.find(s => s.id === sub)
    return subcat ? t.subcategory === subcat.name || t.subcategory === sub : false
  })
}

// History
export function getAllHistory() { return historyData }
export function getHistoryById(id) { return historyData.find(h => h.entryId === Number(id)) }
export function getHistoryByPeriod(period) {
  if (period === 'all') return historyData
  return historyData.filter(h => {
    const p = configData.historyPeriods.find(p => p.id === period)
    return p ? h.period === p.name || h.period === period : false
  })
}

// Config
export function getConfig() { return configData }
export function getCategories() { return configData.categories }
export function getTopicSubcategories() { return configData.topicSubcategories }
export function getHistoryPeriods() { return configData.historyPeriods }
export function getCarousel() { return configData.carousel || [] }
