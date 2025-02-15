import defaultSettings from '@/setting'

const title = defaultSettings.systemName || '学选网'

export default function setPageTitle(pageTitle) {
  return pageTitle ? `${pageTitle} - ${title}` : `${title}`
}
