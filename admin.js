const form = document.querySelector('#adminLogin');
const tokenInput = document.querySelector('#adminToken');
const notice = document.querySelector('#adminNotice');
const panel = document.querySelector('#adminPanel');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true;
  notice.textContent = '正在確認管理者權限…';
  panel.hidden = true;
  try {
    const response = await fetch('/api/admin-status', {
      headers: { Authorization: `Bearer ${tokenInput.value}` },
      cache: 'no-store',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || '無法登入');
    const statuses = document.querySelector('#adminStatuses');
    statuses.replaceChildren();
    for (const [key, label] of Object.entries({ payments: '會員付款', bank: '銀行綁定', orders: '訂單', settlement: '撥款' })) {
      const term = document.createElement('dt');
      const value = document.createElement('dd');
      term.textContent = label;
      value.textContent = data[key];
      statuses.append(term, value);
    }
    form.hidden = true;
    panel.hidden = false;
    notice.textContent = '已登入；收款尚未啟用。';
  } catch (error) {
    notice.textContent = error.message;
  } finally {
    tokenInput.value = '';
    button.disabled = false;
  }
});
document.querySelector('#adminLogout').addEventListener('click', async () => {
  try {
    const response = await fetch('/api/admin-status', { method: 'DELETE' });
    if (!response.ok) throw new Error();
  } catch {
    notice.textContent = '登出失敗，請重試';
    return;
  }
  panel.hidden = true;
  document.querySelector('#adminStatuses').replaceChildren();
  form.hidden = false;
  notice.textContent = '已登出';
  tokenInput.focus();
});
