/* 포트폴리오 팝업 공통 동작
 * - window.PF_POPUPS[id] 에 등록된 마크업을 <body>에 삽입
 * - [data-pf-modal="id"] 요소 클릭 시 해당 팝업 열기
 * - X 버튼 / ESC / 바깥 영역 클릭으로 닫기
 * 팝업 미지원 브라우저에서는 링크(href) 기본 동작(PDF 열기) 유지
 */
(() => {
  const popups = window.PF_POPUPS || {};

  Object.entries(popups).forEach(([id, markup]) => {
    if (!document.getElementById(id)) {
      document.body.insertAdjacentHTML('beforeend', markup);
    }
  });

  document.querySelectorAll('[data-pf-modal]').forEach((trigger) => {
    const modal = document.getElementById(trigger.dataset.pfModal);
    if (!modal || typeof modal.showModal !== 'function') return;

    // 카드 우측 하단 '자세히 보기' 아이콘 (카드 클릭 시 함께 팝업 열림)
    if (!trigger.querySelector('.pf-more')) {
      trigger.insertAdjacentHTML('beforeend',
        '<span class="pf-more" aria-hidden="true">자세히 보기' +
        '<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="10" cy="10" r="8"/><path d="M8.5 6.5 12 10l-3.5 3.5"/></svg></span>');
    }

    const open = () => {
      modal.showModal();
      document.body.classList.add('pf-lock');
      const body = modal.querySelector('.pf-body');
      if (body) body.scrollTop = 0;
    };

    // 카드 영역 어디를 클릭해도 팝업 열기 (카드 안 링크 클릭 포함 → 기본 이동 차단)
    trigger.addEventListener('click', (e) => {
      // data-pf-pass 가 붙은 링크(예: GitHub)는 팝업 대신 원래 링크로 이동
      if (e.target.closest('[data-pf-pass]')) return;
      e.preventDefault();
      open();
    });

    // 키보드 접근: Enter / Space
    trigger.addEventListener('keydown', (e) => {
      if (e.target !== trigger) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });

    modal.addEventListener('close', () => {
      document.body.classList.remove('pf-lock');
      trigger.focus();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('[data-pf-close]')) modal.close();
    });
  });
})();
