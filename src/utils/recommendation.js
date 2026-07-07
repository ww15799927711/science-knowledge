import knowledgeData from '@/data/knowledge.json'
import topicsData from '@/data/topics.json'
import historyData from '@/data/history.json'

export function getDailyPick() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0].replace(/-/g, '')
  const dayNum = parseInt(dateStr)

  const typeIndex = dayNum % 3
  const types = ['knowledge', 'topics', 'history']
  const type = types[typeIndex]

  const dataMap = {
    knowledge: { data: knowledgeData, idField: 'kpId' },
    topics: { data: topicsData, idField: 'topicId' },
    history: { data: historyData, idField: 'entryId' }
  }

  const { data, idField } = dataMap[type]
  const item = data[dayNum % data.length]

  const reasons = {
    knowledge: ['今日知识点', '每天学一点', '知识积累', '探索未知'],
    topics: ['有趣的话题', '生活大揭秘', '好奇心时间', '你知道吗'],
    history: ['科学里程碑', '探索历程', '回顾与前行', '历史今天']
  }
  const day = today.getDate()
  const reasonList = reasons[type]
  const reason = reasonList[day % reasonList.length]

  return {
    type,
    id: item[idField],
    title: item.title,
    summary: item.summary,
    reason
  }
}
