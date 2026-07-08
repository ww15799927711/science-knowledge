import configData from '@/data/config.json'

let knowledgeData = null
let topicsData = null
let historyData = null

async function loadKnowledge() {
  if (!knowledgeData) {
    const module = await import('@/data/knowledge.json')
    knowledgeData = module.default
  }
  return knowledgeData
}

async function loadTopics() {
  if (!topicsData) {
    const module = await import('@/data/topics.json')
    topicsData = module.default
  }
  return topicsData
}

async function loadHistory() {
  if (!historyData) {
    const module = await import('@/data/history.json')
    historyData = module.default
  }
  return historyData
}

export { configData }

export async function getAllKnowledge() { return await loadKnowledge() }
export async function getKnowledgeById(id) {
  const data = await loadKnowledge()
  return data.find(k => k.kpId === Number(id))
}
export async function getKnowledgeByCategory(category) {
  const data = await loadKnowledge()
  if (category === 'all') return data
  const cat = configData.categories.find(c => c.id === category)
  return data.filter(k => cat ? k.category === cat.name || k.category === category : false)
}
export async function getKnowledgeCountByCategory(catId) {
  const cat = configData.categories.find(c => c.id === catId)
  if (!cat) return 0
  const data = await loadKnowledge()
  return data.filter(k => k.category === cat.name || k.category === catId).length
}

export async function getAllTopics() { return await loadTopics() }
export async function getTopicById(id) {
  const data = await loadTopics()
  return data.find(t => t.topicId === Number(id))
}
export async function getTopicsBySubcategory(sub) {
  const data = await loadTopics()
  if (sub === 'all') return data
  const subcat = configData.topicSubcategories.find(s => s.id === sub)
  return data.filter(t => subcat ? t.subcategory === subcat.name || t.subcategory === sub : false)
}

export async function getAllHistory() { return await loadHistory() }
export async function getHistoryById(id) {
  const data = await loadHistory()
  return data.find(h => h.entryId === Number(id))
}
export async function getHistoryByPeriod(period) {
  const data = await loadHistory()
  if (period === 'all') return data
  const p = configData.historyPeriods.find(p => p.id === period)
  return data.filter(h => p ? h.period === p.name || h.period === period : false)
}

export function getConfig() { return configData }
export function getCategories() { return configData.categories }
export function getTopicSubcategories() { return configData.topicSubcategories }
export function getHistoryPeriods() { return configData.historyPeriods }
export function getCarousel() { return configData.carousel || [] }
export function getKnowledgeCount() { return configData.knowledgeCount || 0 }
export function getTopicCount() { return configData.topicCount || 0 }
export function getHistoryCount() { return configData.historyCount || 0 }