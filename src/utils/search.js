import Fuse from 'fuse.js'
import knowledgeData from '@/data/knowledge.json'
import topicsData from '@/data/topics.json'
import historyData from '@/data/history.json'

const baseOptions = {
  threshold: 0.3,
  includeMatches: true,
  minMatchCharLength: 1
}

const fuseKnowledge = new Fuse(knowledgeData, {
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

const fuseTopics = new Fuse(topicsData, {
  ...baseOptions,
  keys: [
    { name: 'title', weight: 3 },
    { name: 'summary', weight: 2 },
    { name: 'content', weight: 1 },
    { name: 'tags', weight: 2 }
  ]
})

const fuseHistory = new Fuse(historyData, {
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

export function searchAll(keyword) {
  if (!keyword || !keyword.trim()) return { knowledge: [], topics: [], history: [] }
  return {
    knowledge: fuseKnowledge.search(keyword.trim()),
    topics: fuseTopics.search(keyword.trim()),
    history: fuseHistory.search(keyword.trim())
  }
}
