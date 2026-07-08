import Fuse from 'fuse.js'

const baseOptions = {
  threshold: 0.3,
  includeMatches: true,
  minMatchCharLength: 1
}

let fuseKnowledge = null
let fuseTopics = null
let fuseHistory = null

async function ensureKnowledgeIndex() {
  if (!fuseKnowledge) {
    const { knowledgeData } = await import('@/data/knowledge.json')
    fuseKnowledge = new Fuse(knowledgeData.default || knowledgeData, {
      ...baseOptions,
      keys: [
        { name: 'title', weight: 3 },
        { name: 'summary', weight: 2 },
        { name: 'content', weight: 1 },
        { name: 'tags', weight: 2 },
        { name: 'category', weight: 1.5 },
        { name: 'subcategory', weight: 1.5 },
        { name: 'keyTerms', weight: 2 }
      ]
    })
  }
  return fuseKnowledge
}

async function ensureTopicsIndex() {
  if (!fuseTopics) {
    const { default: topicsData } = await import('@/data/topics.json')
    fuseTopics = new Fuse(topicsData, {
      ...baseOptions,
      keys: [
        { name: 'title', weight: 3 },
        { name: 'summary', weight: 2 },
        { name: 'content', weight: 1 },
        { name: 'tags', weight: 2 }
      ]
    })
  }
  return fuseTopics
}

async function ensureHistoryIndex() {
  if (!fuseHistory) {
    const { default: historyData } = await import('@/data/history.json')
    fuseHistory = new Fuse(historyData, {
      ...baseOptions,
      keys: [
        { name: 'title', weight: 3 },
        { name: 'summary', weight: 2 },
        { name: 'content', weight: 1 },
        { name: 'figures', weight: 2 },
        { name: 'tags', weight: 2 },
        { name: 'period', weight: 1 }
      ]
    })
  }
  return fuseHistory
}

export async function searchAll(keyword) {
  if (!keyword || !keyword.trim()) return { knowledge: [], topics: [], history: [] }
  
  const [kIdx, tIdx, hIdx] = await Promise.all([
    ensureKnowledgeIndex(),
    ensureTopicsIndex(),
    ensureHistoryIndex()
  ])
  
  return {
    knowledge: kIdx.search(keyword.trim()),
    topics: tIdx.search(keyword.trim()),
    history: hIdx.search(keyword.trim())
  }
}

export async function warmUpSearch() {
  await Promise.all([
    ensureKnowledgeIndex(),
    ensureTopicsIndex(),
    ensureHistoryIndex()
  ])
}