/* 팝업 내용: 폐렴 환자 관리 백오피스 구축
 * 트리거: resume.html 의 data-pf-modal="pneumonia-modal" 카드
 * 출처: document/폐렴환자관리_백오피스.pdf + GitHub README
 */
window.PF_POPUPS = window.PF_POPUPS || {};
window.PF_POPUPS['pneumonia-modal'] = `
<dialog class="pf-modal" id="pneumonia-modal" aria-labelledby="pneumonia-modal-title">
  <header class="pf-head">
    <p class="pf-eyebrow">Portfolio · Backend · AI Service</p>
    <h2 id="pneumonia-modal-title">AI 폐렴 진단 지원 · 폐렴 환자 관리 백오피스 구축</h2>
    <div class="pf-meta">
      <span>2026.07</span>
      <span>웹 개발 트랙 팀 프로젝트 (4인)</span>
      <span>역할: 팀장</span>
    </div>
    <button type="button" class="pf-close" data-pf-close aria-label="닫기">&times;</button>
  </header>

  <div class="pf-body">
    <section class="pf-sec">
      <p class="pf-oneline">흉부 X-Ray를 업로드하면 <strong>AI가 폐렴 여부와 Heatmap 근거</strong>를 제시하고, 역할·부서별 권한으로 환자와 진료기록을 관리하는 <strong>FastAPI 기반 의료 백오피스</strong></p>

      <div class="pf-kpis">
        <div class="pf-kpi"><strong>0.9995</strong><span>AI 판독 AUROC<br>Recall 0.9956 (5-fold OOF)</span></div>
        <div class="pf-kpi"><strong>420<small>ms</small></strong><span>p95 응답 시간<br>동시 사용자 100명 (목표 3,000ms)</span></div>
        <div class="pf-kpi"><strong>100<small>%</small></strong><span>부하 테스트 성공률<br>HTTP 5xx 0%</span></div>
        <div class="pf-kpi"><strong>14<small>개</small></strong><span>주요 API 엔드포인트<br>5단계 역할 기반 접근 제어</span></div>
      </div>

      <div class="pf-stack">
        <div><b>Backend</b><span>FastAPI · Pydantic · SQLAlchemy 2.0 (AsyncIO) · Alembic</span></div>
        <div><b>Auth</b><span>JWT (HttpOnly Cookie) · Argon2 · RBAC</span></div>
        <div><b>Data · Queue</b><span>MySQL 8.0 · Redis Streams (Consumer Group) · Celery</span></div>
        <div><b>AI</b><span>PyTorch · DenseNet121 + ConvNeXt-Tiny + EfficientNet-B3 앙상블 · Grad-CAM</span></div>
        <div><b>Infra · Test</b><span>Docker Compose · Locust 부하 테스트</span></div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>서비스 흐름</h3>
      <ol class="pf-flow">
        <li><strong>사용자 인증</strong>회원가입 · JWT 로그인 · 역할별 화면 이동</li>
        <li><strong>환자 관리</strong>이름·성별·나이 검색 · 등록 · 수정 · 삭제</li>
        <li><strong>진료기록</strong>증상 · 촬영일시 · X-ray 업로드 (미리보기)</li>
        <li><strong>AI 예측</strong>폐렴 여부 · Confidence · Heatmap 저장</li>
        <li><strong>결과 조회</strong>원본 X-ray와 Heatmap으로 판단 근거 검토</li>
      </ol>
    </section>

    <section class="pf-sec">
      <h3>아키텍처 포인트</h3>
      <div class="pf-cards">
        <div class="pf-card accent">
          <h4>비동기 AI 추론 파이프라인</h4>
          <p>AI 예측 요청을 Redis Streams + Consumer Group으로 Worker에 분배해 API 응답 지연을 차단. 동일 이미지·모델 조합은 분산 락으로 중복 추론을 방지.</p>
        </div>
        <div class="pf-card accent">
          <h4>설명 가능한 판독 결과</h4>
          <p>3종 CNN 앙상블의 폐렴 확률과 Grad-CAM Heatmap을 함께 저장·표시. X-Ray와 Heatmap은 Docker Named Volume으로 API와 Worker가 공유.</p>
        </div>
        <div class="pf-card">
          <h4>보안 중심 인증</h4>
          <p>JWT를 HttpOnly 쿠키로 관리하고 비밀번호는 Argon2로 해싱. 가입 시 PENDING 권한 부여, 중복 이메일·전화번호 검증.</p>
        </div>
        <div class="pf-card">
          <h4>백그라운드 작업 분리</h4>
          <p>결과 메일 발송은 Celery로 분리 처리하고, DB 스키마는 Alembic 마이그레이션으로 버전 관리.</p>
        </div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>역할 · 부서 기반 접근 제어</h3>
      <div class="pf-table-wrap">
        <table class="pf-table">
          <thead><tr><th>역할 · 부서</th><th>접근 가능한 주요 기능</th></tr></thead>
          <tbody>
            <tr><td>PENDING</td><td>홈, 마이페이지, 로그아웃</td></tr>
            <tr><td>STAFF + MEDICAL</td><td>환자 등록, 진료기록 등록, AI 결과 조회</td></tr>
            <tr><td>STAFF + DEV</td><td>환자 · 진료기록 · AI 결과 조회</td></tr>
            <tr><td>STAFF + RESEARCH</td><td>환자 · 진료기록 · AI 결과 조회</td></tr>
            <tr><td>ADMIN</td><td>회원 관리(검색 · 권한 변경)와 전체 주요 기능</td></tr>
          </tbody>
        </table>
      </div>
      <p class="pf-note">※ 제한된 주소로 직접 접근해도 안내 메시지 후 허용된 화면으로 이동.</p>
    </section>

    <section class="pf-sec">
      <h3>주요 API</h3>
      <div class="pf-table-wrap">
        <table class="pf-table">
          <thead><tr><th>영역</th><th>Method</th><th>Endpoint</th></tr></thead>
          <tbody>
            <tr><td>인증</td><td class="num">POST</td><td>/auth_api/v1/auth/login/</td></tr>
            <tr><td>회원</td><td class="num">POST</td><td>/user_api/v1/users</td></tr>
            <tr><td>마이페이지</td><td class="num">GET · PATCH</td><td>/mypage_api/v1/users/me</td></tr>
            <tr><td>환자</td><td class="num">GET · POST</td><td>/patient_api/v1/patients/</td></tr>
            <tr><td>진료기록</td><td class="num">POST</td><td>/record_api/v1/record/{patient_id}</td></tr>
            <tr><td>AI 예측</td><td class="num">POST</td><td>/prediction_api/v1/medical-records/{record_id}/predict</td></tr>
            <tr><td>결과 조회</td><td class="num">GET</td><td>/prediction_api/v1/medical-records/{record_id}/analyses</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="pf-sec">
      <h3>검증 결과 &amp; 다음 단계</h3>
      <div class="pf-cards">
        <div class="pf-card accent">
          <h4>부하 테스트 (Locust)</h4>
          <p>동시 사용자 100명 · 초당 10명 유입 · 10분 조건에서 p95 420ms(목표 ≤3,000ms), 성공률 100%(목표 ≥99%), 5xx 0%로 전 항목 목표 달성.</p>
        </div>
        <div class="pf-card">
          <h4>다음 단계</h4>
          <p>예측 오류 처리 고도화, 감사 로그와 운영 모니터링, AI 모델 성능 · 버전 관리.</p>
        </div>
      </div>
      <p class="pf-note">※ 모델 지표는 5,216건 5-fold OOF 내부 검증, 부하 테스트는 로컬 개발 환경 측정값 (2026-07-17).</p>
    </section>
  </div>

  <footer class="pf-foot">
    <span>발표 자료 11p · GitHub README 요약</span>
    <span style="display:flex;gap:8px;flex-wrap:wrap">
      <a class="pf-btn" href="https://github.com/kimeunmi82/Oz_codingSchool" target="_blank" rel="noopener">GitHub ↗</a>
      <a class="pf-btn" href="./document/폐렴환자관리_백오피스.pdf" target="_blank" rel="noopener">발표자료 보기 ↗</a>
    </span>
  </footer>
</dialog>
`;
