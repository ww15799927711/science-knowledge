import { getAllKnowledge, getAllTopics, getAllHistory } from '@/utils/data'

const dataMap = {
  knowledge: { dataFn: getAllKnowledge, idField: 'kpId', route: (id, item) => `/knowledge/${item?.category || 'all'}/${id}` },
  topics: { dataFn: getAllTopics, idField: 'topicId', route: (id, item) => `/topics/${item?.subcategory || 'all'}/${id}` },
  history: { dataFn: getAllHistory, idField: 'entryId', route: (id, item) => `/history/${item?.period || 'all'}/${id}` }
}

export async function getRelatedItems(ids, type) {
  if (!ids || ids.length === 0) return []
  const { dataFn, idField } = dataMap[type]
  const data = await dataFn()
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

export async function getRouteForItem(type, id) {
  const { dataFn, idField, route } = dataMap[type]
  const data = await dataFn()
  const item = data.find(d => d[idField] === id)
  return route(id, item)
}

export function getTypeLabel(type) {
  const labels = { knowledge: '智慧结晶', topics: '话题', history: '简史' }
  return labels[type] || type
}