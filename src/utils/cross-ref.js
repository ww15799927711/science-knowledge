import knowledgeData from '@/data/knowledge.json'
import topicsData from '@/data/topics.json'
import historyData from '@/data/history.json'

const dataMap = {
  knowledge: { data: knowledgeData, idField: 'kpId', route: (id, item) => `/knowledge/${item?.category || 'all'}/${id}` },
  topics: { data: topicsData, idField: 'topicId', route: (id, item) => `/topics/${item?.subcategory || 'all'}/${id}` },
  history: { data: historyData, idField: 'entryId', route: (id, item) => `/history/${item?.period || 'all'}/${id}` }
}

export function getRelatedItems(ids, type) {
  if (!ids || ids.length === 0) return []
  const { data, idField } = dataMap[type]
  return ids
    .map(id => {
      const item = data.find(d => d[idField] === id)
      if (!item) return null
      return {
        id: item[idField],
        title: item.title,
        summary: item.summary,
        _item: item
      }
    })
    .filter(Boolean)
}

export function getRouteForItem(type, id) {
  const { data, idField, route } = dataMap[type]
  const item = data.find(d => d[idField] === id)
  return route(id, item)
}

export function getTypeLabel(type) {
  const labels = { knowledge: '知识点', topics: '话题', history: '简史' }
  return labels[type] || type
}
