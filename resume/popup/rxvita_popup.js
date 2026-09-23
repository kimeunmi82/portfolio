/* 팝업 내용: RxVita — 진료 기록 기반 복약 안내 및 생활 습관 개선 가이드 자동 생성 시스템
 * 트리거: resume.html 의 data-pf-modal="rxvita-modal" 카드
 */
window.PF_POPUPS = window.PF_POPUPS || {};
window.PF_POPUPS['rxvita-modal'] = `
<dialog class="pf-modal" id="rxvita-modal" aria-labelledby="rxvita-modal-title">
  <header class="pf-head">
    <p class="pf-eyebrow">Portfolio · Full-stack · LLM Service</p>
    <h2 id="rxvita-modal-title">RxVita · 약봉투 한 장으로 시작하는 복약 · 영양제 통합 관리 서비스</h2>
    <div class="pf-meta">
      <span>2026.08.10 ~ 09.22 (6주)</span>
      <span>팀 프로젝트(5인)</span>
      <span>역할: 팀장 · PM · 백엔드 기획/개발 · 공통기능 · 배포</span>
    </div>
    <button type="button" class="pf-close" data-pf-close aria-label="닫기">&times;</button>
  </header>

  <div class="pf-body">
    <section class="pf-sec">
      <p class="pf-oneline">약봉투를 촬영하면 <strong>OCR로 약을 자동 등록</strong>하고, 복약 알림 · <strong>근거 기반 RAG 챗봇</strong> · AI 보고서 · 생활습관 챌린지까지 한 번에 관리하는 헬스케어 서비스 (AWS 실서비스 배포)</p>

      <div class="pf-kpis">
        <div class="pf-kpi"><strong>80<small>%</small></strong><span>OCR 약명 정답 추출률<br>전처리로 64.3% → 80.0%</span></div>
        <div class="pf-kpi"><strong>13,604</strong><span>RAG 지식 청크<br>의약품 PDF 1,212건 구축</span></div>
        <div class="pf-kpi"><strong>85<small>%</small></strong><span>검색 Hit@5 · MRR 0.70<br>P95 110ms (Hybrid 대비 5.6배↓)</span></div>
        <div class="pf-kpi"><strong>6<small>개</small></strong><span>LLM Chain 파이프라인<br>근거 검증 후 SSE 전달</span></div>
      </div>

      <div class="pf-stack">
        <div><b>Frontend</b><span>React · TypeScript · Vite</span></div>
        <div><b>Backend</b><span>FastAPI · Tortoise ORM · Aerich · JWT · Fernet 암호화 · SMTP · Web Push(VAPID)</span></div>
        <div><b>AI · RAG</b><span>OpenAI (gpt-4o / 4o-mini · text-embedding-3-large) · LangChain · Qdrant · LangSmith · CLOVA OCR · OpenCV</span></div>
        <div><b>Data · Queue</b><span>MySQL 8 · Redis · ARQ Worker</span></div>
        <div><b>Infra</b><span>AWS EC2 · Docker Compose · Nginx · Certbot · GitHub Actions</span></div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>핵심 기능</h3>
      <ol class="pf-flow">
        <li><strong>약봉투 OCR</strong>촬영 → 약 정보 자동 추출 → 사용자 확인 후 등록</li>
        <li><strong>복약 · 영양제 관리</strong>시간대별 Web Push 알림, 성분 합산 · 상한 경고</li>
        <li><strong>AI 보고서</strong>약 · 영양제 병용 주의사항을 근거와 함께 웹 · 이메일 제공</li>
        <li><strong>상담 챗봇</strong>진료기록 · 의약품 데이터 근거로 출처와 함께 답변</li>
        <li><strong>챌린지 · 배지</strong>Gamification으로 복약 · 건강 습관 형성</li>
      </ol>
      <p class="pf-note">※ 백오피스: 운영 대시보드, 회원(개인정보 마스킹) · 공통코드 · 챌린지 · 배지 관리, OCR · 알림 · 이메일 작업 모니터링.</p>
    </section>

    <section class="pf-sec">
      <h3>OCR 파이프라인 · 비정형 약봉투 대응</h3>
      <div class="pf-cards">
        <div class="pf-card accent">
          <h4>Template → General OCR 전환</h4>
          <p>약봉투마다 항목 위치와 표 구성이 달라 고정 양식이 불가능 → CLOVA General OCR의 문자 · 좌표로 행 · 열을 구성하고, Python 규칙 + OpenAI로 약별 정보를 검토.</p>
        </div>
        <div class="pf-card">
          <h4>전처리 · 신뢰도 기준</h4>
          <p>Pillow · OpenCV로 형식 · 원근 · 밝기 보정. 누락 18 → 9개로 절반 감소. 오인식 5건 중 4건이 신뢰도 0.71 미만임을 근거로 확인 필요 기준 설정.</p>
        </div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>RAG 챗봇 아키텍처</h3>
      <div class="pf-table-wrap">
        <table class="pf-table">
          <thead><tr><th>단계</th><th>구현 내용</th></tr></thead>
          <tbody>
            <tr><td>① 질문 해석</td><td>Query Plan → Semantic Router(score ≥ 0.78 · margin ≥ 0.10) → 모호할 때만 Directional Query</td></tr>
            <tr><td>② 근거 검색</td><td>EXACT_PAIR → ENTITY → SEMANTIC 단계 탐색, RunnableParallel 병렬 조회, Score Boost · Small-to-Big 맥락 확장</td></tr>
            <tr><td>③ 판단 · 답변</td><td>Evidence Reasoning → Answer Generation → Grounded Claim Validator로 근거 · 안전 검사</td></tr>
            <tr><td>④ 전달</td><td>검증 · 저장 후 SSE로 progress · complete · error 전달, LangSmith로 단계별 추적</td></tr>
          </tbody>
        </table>
      </div>
      <p class="pf-note">※ Prompt Chaining · CoT · Few-Shot · Directional Stimulus 적용, Chain별 gpt-4o / 4o-mini 조건부 선택으로 비용 · 품질 균형.</p>
    </section>

    <section class="pf-sec">
      <h3>검색 방식 비교 실험</h3>
      <div class="pf-table-wrap">
        <table class="pf-table">
          <thead><tr><th>검색 방식</th><th>Hit@5</th><th>MRR</th><th>P50</th><th>P95</th></tr></thead>
          <tbody>
            <tr><td>Dense ⭐ 채택</td><td class="num up">85%</td><td class="num up">0.700</td><td class="num up">70 ms</td><td class="num up">110 ms</td></tr>
            <tr><td>Hybrid</td><td class="num">80%</td><td class="num">0.635</td><td class="num">511 ms</td><td class="num">609 ms</td></tr>
          </tbody>
        </table>
      </div>
      <p class="pf-note">※ VectorDB는 ChromaDB · pgvector · Qdrant를 비교해 payload 필터와 컬렉션 버전 관리가 가능한 Qdrant 채택. 개선이 확인되지 않은 방식은 채택하지 않음.</p>
    </section>

    <section class="pf-sec">
      <h3>트러블슈팅</h3>
      <div class="pf-cards">
        <div class="pf-card">
          <h4>Web Push 403 Forbidden</h4>
          <p>프론트 · 백엔드 VAPID 공개키 불일치 → 공개키 단일화 · 공개키 API 제공 · 기존 구독 재등록으로 재발 방지.</p>
        </div>
        <div class="pf-card">
          <h4>MySQL 교착 상태</h4>
          <p>알림 5건 동시 처리 시 INSERT/UPDATE 잠금 순서 충돌 → BackgroundJob → PushSubscription → AlarmEvent 순으로 잠금 순서 통일.</p>
        </div>
        <div class="pf-card">
          <h4>계정 전환 시 알림 혼선</h4>
          <p>로그아웃 · 세션 만료 시 구독 정리 누락 → 기존 구독 비활성화 · 대기 작업 취소 후 현재 계정으로 재등록.</p>
        </div>
        <div class="pf-card">
          <h4>iOS Safari 화면 확대</h4>
          <p>작은 입력 글꼴 자동 확대 · 날짜 입력창 넘침 → 입력 글꼴 16px 이상, 입력창 너비 제한으로 수정.</p>
        </div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>PM으로서의 성과 &amp; 회고</h3>
      <div class="pf-cards">
        <div class="pf-card accent">
          <h4>자체 평가 9 / 10점</h4>
          <p>중간에 기획이 바뀌었지만 기간 내 계획한 기능을 모두 구현하고 일정을 조율. Git Flow · Issues · PR, 최신 ERD 유지, Daily Scrum으로 협업 충돌 최소화. AWS 배포까지 완료.</p>
        </div>
        <div class="pf-card">
          <h4>배운 점 · 개선 계획</h4>
          <p>Aerich 마이그레이션 번호 충돌 경험 → 마이그레이션 담당자 지정 필요성 체감. 향후 Gamification 고도화, 영양제 랭킹 기반 수익화, 커뮤니티 기능 추가 계획.</p>
        </div>
      </div>
    </section>
  </div>

  <footer class="pf-foot">
    <span>발표 자료 41p 요약</span>
    <span style="display:flex;gap:8px;flex-wrap:wrap">
      <a class="pf-btn" href="./document/RxVita_시연영상_다운로드.mp4" download="RxVita_시연영상.mp4">시연영상</a>
      <a class="pf-btn" href="./document/RxVita.pdf" target="_blank" rel="noopener">발표자료 ↗</a>
    </span>
  </footer>
</dialog>
`;
