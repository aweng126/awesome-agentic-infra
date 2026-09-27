/** Reader-facing roles describe what a component does, independently of delivery. */
export const roleLabels = {
  'agent-framework': 'Agent 开发框架',
  'workflow-engine': '持久工作流引擎',
  'collaboration-platform': '组织协作平台',
  'sandbox-service': '沙箱环境与服务',
  'browser-service': '浏览器执行环境',
  'isolation-runtime': '执行与隔离底座',
  'memory-service': '记忆服务',
  'context-framework': '上下文与数据框架',
  'tool-integration': '工具集成',
  'tool-server': '工具服务',
  'inference-engine': '推理引擎',
  'model-gateway': '模型网关',
  'hosted-runtime': '托管运行平台',
  'workload-orchestration': '工作负载管理',
  'service-deployment': '服务部署',
  'autoscaling': '弹性伸缩',
  'observability-platform': '观测与评估平台',
  'telemetry-instrumentation': '观测数据采集',
  'policy-engine': '策略引擎',
  'agent-guardrails': 'Agent 护栏',
  'workload-identity': '工作负载身份',
} as const;

export const deliveryLabels = {
  library: '开发库 / SDK',
  'self-hosted': '自部署',
  managed: '托管服务',
  hybrid: '自部署与托管',
} as const;

export type ResourceRole = keyof typeof roleLabels;
export type ResourceDelivery = keyof typeof deliveryLabels;

export const resourceTypeLabels = {
  project: '项目与平台', paper: '论文', spec: '协议规范', article: '文章与文档',
} as const;

export function resourceIntroLabel(type: keyof typeof resourceTypeLabels): string {
  return { project: '项目介绍', paper: '论文导读', spec: '规范导读', article: '资料导读' }[type];
}
