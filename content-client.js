const labService = 'https://cnu-crop-genomics-lab.youngjun-moo-0109.chatgpt.site/';
window.LAB_CONTENT_URL = location.origin === 'https://eyessunny0910.github.io' ? labService + 'api/content' : 'api/content';
window.LAB_MEDIA_BASE = location.origin === 'https://eyessunny0910.github.io' ? labService : '';
window.LAB_READY = (async () => {
  window.LAB_REVISION = -1;
  if (location.protocol === 'file:') return;
  try {
    const response = await fetch(window.LAB_CONTENT_URL, { cache: 'no-store', signal: AbortSignal.timeout(6000), credentials: 'omit' });
    if (!response.ok) throw Error('공유 저장본 연결 실패');
    const value = await response.json();
    window.LAB_DATA = value.data;
    window.LAB_REVISION = value.revision;
    window.LAB_UPDATED_AT = value.updatedAt;
    window.LAB_SERVER_CONNECTED = true;
  } catch (_) { window.LAB_SERVER_CONNECTED = false; }
})();
