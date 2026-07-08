import { getAllKnowledge, getAllTopics, getAllHistory } from '@/utils/data'

export async function getDailyPick() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0].replace(/-/g, '')
  const dayNum = parseInt(dateStr)

  const typeIndex = dayNum % 3
  const types = ['knowledge', 'topics', 'history']
  const type = types[typeIndex]

  const dataMap = {
    knowledge: { dataFn: getAllKnowledge, idField: 'kpId' },
    topics: { dataFn: getAllTopics, idField: 'topicId' },
    history: { dataFn: getAllHistory, idField: 'entryId' }
  }

  const { dataFn, idField } = dataMap[type]
  const data = await dataFn()
  const item = data[dayNum % data.length]

  const reasons = {
    knowledge: ['今日智慧结晶', '每天学一点', '知识积累', '探索未知'],
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