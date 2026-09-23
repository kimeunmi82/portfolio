/* 팝업 내용: [해커톤] 난임 환자 대상 임신 성공 여부 예측 AI 모델 개발
 * 트리거: resume.html 의 data-pf-modal="infertility-modal" 카드
 */
window.PF_POPUPS = window.PF_POPUPS || {};
window.PF_POPUPS['infertility-modal'] = `
<dialog class="pf-modal" id="infertility-modal" aria-labelledby="infertility-modal-title">
  <header class="pf-head">
    <p class="pf-eyebrow">Portfolio · Hackathon · ML Modeling</p>
    <h2 id="infertility-modal-title">난임 환자 대상 임신 성공 여부 예측 AI 모델 개발</h2>
    <div class="pf-meta">
      <span>2026.05</span>
      <span>해커톤 팀 프로젝트 (4인)</span>
      <span>담당: 성과 분석 · 인사이트 도출</span>
    </div>
    <button type="button" class="pf-close" data-pf-close aria-label="닫기">&times;</button>
  </header>

  <div class="pf-body">
    <section class="pf-sec">
      <p class="pf-oneline">25만 건의 난임 시술 데이터에서 <strong>그룹별 실제 성공률을 역분석</strong>해 141개 피처를 설계하고, 다양성 중심 앙상블로 임신 성공 확률을 예측해 <strong>ROC-AUC 0.7424</strong>를 달성한 모델</p>

      <div class="pf-kpis">
        <div class="pf-kpi"><strong>0.7424</strong><span>최종 ROC-AUC<br>(팀 내 최고 성능)</span></div>
        <div class="pf-kpi"><strong>256<small>K</small></strong><span>학습 데이터 256,351건<br>69개 컬럼</span></div>
        <div class="pf-kpi"><strong>141<small>개</small></strong><span>파생 피처 설계<br>Sweet Spot 130–145 검증</span></div>
        <div class="pf-kpi"><strong>5<small>배+</small></strong><span>신규 변수 ‘배양_기간’<br>SHAP 1위 (2위 대비)</span></div>
      </div>

      <div class="pf-stack">
        <div><b>Language</b><span>Python</span></div>
        <div><b>Data</b><span>Pandas · MICE 결측 대체 · 결측 flag 피처</span></div>
        <div><b>Model</b><span>XGBoost · CatBoost · MLP · 가중 Rank Average 앙상블</span></div>
        <div><b>Tuning · XAI</b><span>Optuna · OOF 교차검증 · SHAP</span></div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>접근법 · 성공률을 먼저 봤다</h3>
      <div class="pf-cards">
        <div class="pf-card">
          <h4>일반적 접근</h4>
          <p>EDA로 분포 확인 → 결측치 0·평균 대체 → 인코딩 → 모델 학습 → 피처 중요도 확인</p>
        </div>
        <div class="pf-card accent">
          <h4>우리 팀의 접근</h4>
          <p>그룹별 실제 성공률 집계 → 통념과 다른 패턴 발견 → 패턴을 학습하도록 피처 설계 → 도메인·논문(ESHRE/ASRM/KSRM)·전문의 자문으로 가설 검증 반복</p>
        </div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>핵심 발견 · 통념 4개를 뒤집다</h3>
      <div class="pf-table-wrap">
        <table class="pf-table">
          <thead><tr><th>통념</th><th>데이터로 확인한 사실</th><th>반영한 피처</th></tr></thead>
          <tbody>
            <tr><td>고령이면 실패</td><td>공여란 사용 시 성공률 <span class="up">31%</span> (본인 난자 12%)</td><td>donor_source_type</td></tr>
            <tr><td>많이 이식하면 유리</td><td>선별한 단일 배아의 성공률이 더 높음</td><td>elective_single</td></tr>
            <tr><td>난자 0 = 불가능</td><td>동결배아(FET)로 <span class="up">22.88%</span> 성공</td><td>하드코딩 금지</td></tr>
            <tr><td>배양일 무관</td><td>5일 배양(배반포) 성공률이 높음</td><td>배양_기간 (SHAP 1위)</td></tr>
          </tbody>
        </table>
      </div>
      <p class="pf-note">※ 배양_기간 = 배아이식경과일 − 난자혼합경과일. 원본 데이터에 없던 변수를 두 컬럼의 차이로 만들어 배반포 여부를 간접 구분 (SHAP 0.220).</p>
    </section>

    <section class="pf-sec">
      <h3>파생 변수 5대 카테고리</h3>
      <ol class="pf-flow">
        <li><strong>생식 효율 비율</strong>배양_기간 · 수정률 · 배아생성률</li>
        <li><strong>누적 이력 비율</strong>누적 임신율 · 출산 성공률</li>
        <li><strong>위험 · 상태 flag</strong>RIF · 난소 무반응 · 고령+저배아</li>
        <li><strong>상호작용</strong>공여 출처 · 나이×공여 · 단일 선택</li>
        <li><strong>결측 = 정보</strong>구조적 결측(MNAR) flag화</li>
      </ol>
    </section>

    <section class="pf-sec">
      <h3>파이프라인 · 피처 수의 Sweet Spot</h3>
      <div class="pf-table-wrap">
        <table class="pf-table">
          <thead><tr><th>버전</th><th>피처 수</th><th>OOF AUC</th><th>핵심 변화</th></tr></thead>
          <tbody>
            <tr><td>v1</td><td class="num">133</td><td class="num">0.73958</td><td>기준 베이스라인</td></tr>
            <tr><td>v5</td><td class="num">131</td><td class="num">0.73979</td><td>안정적 베이스라인</td></tr>
            <tr><td>v8</td><td class="num">182</td><td class="num down">하락</td><td>피처 과다 → 노이즈</td></tr>
            <tr><td>v9-lite ⭐</td><td class="num">141</td><td class="num up">0.73983</td><td>임상 피처 추가 + SHAP≈0 피처 제거 (최종 채택)</td></tr>
            <tr><td>v11</td><td class="num">20</td><td class="num down">0.73672</td><td>극단 축소 → 신호 부족</td></tr>
          </tbody>
        </table>
      </div>
      <p class="pf-note">※ 한 번에 하나만 바꾸고 OOF로 검증. 피처가 적으면 미세 신호 손실, 많으면 노이즈 증가.</p>
    </section>

    <section class="pf-sec">
      <h3>앙상블 · 다양성이 전부였다</h3>
      <div class="pf-cards">
        <div class="pf-card accent">
          <h4>채택: XGBoost · CatBoost · MLP · MICE</h4>
          <p>GBDT와 완전히 다른 패턴을 학습하는 MLP(Multi-seed)를 추가하고, CatBoost를 iter 1742 → 3000으로 강화. 가중치는 OOF 0.005 단위 그리드 탐색으로 최적화.</p>
        </div>
        <div class="pf-card">
          <h4>제거: LightGBM</h4>
          <p>XGB·CatBoost와 예측 패턴이 너무 비슷해 다양성 기여 0. 제거하자 오히려 OOF 상승 — “약해도 다른 패턴이면 이득”.</p>
        </div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>검증 · 하드코딩하지 않은 이유</h3>
      <div class="pf-table-wrap">
        <table class="pf-table">
          <thead><tr><th>조합</th><th>표본</th><th>성공률</th><th>판정</th></tr></thead>
          <tbody>
            <tr><td>이식 배아 0</td><td class="num">42,835</td><td class="num">1.96%</td><td>위험</td></tr>
            <tr><td>난소 무반응 (신선 난자 0)</td><td class="num">60,136</td><td class="num up">22.88%</td><td>매우 위험</td></tr>
            <tr><td>혼합 난자 0</td><td class="num">52,941</td><td class="num up">18.82%</td><td>매우 위험</td></tr>
            <tr><td>나이 최고 + 이식 0</td><td class="num">1,635</td><td class="num">0.18%</td><td>위험 (0 아님)</td></tr>
          </tbody>
        </table>
      </div>
      <p class="pf-note">※ “0%로 보이는” 조건도 실제로는 0이 아님 → 하드코딩 시 13,760명 강제 오답. 광범위 후처리는 ROC −0.00096 하락, 기증자 116명만 최소 개입 시 +0.0022 상승.</p>
    </section>

    <section class="pf-sec">
      <h3>실패에서 얻은 교훈</h3>
      <div class="pf-cards">
        <div class="pf-card">
          <h4>과적합 조기 차단</h4>
          <p>GradientBoosting + Optuna가 AUC 0.8055를 기록했지만 명백한 과적합으로 판단해 중단.</p>
        </div>
        <div class="pf-card">
          <h4>단순함의 승리</h4>
          <p>Stacking(0.73998)이 단순 가중평균(0.74004)을 넘지 못함. GBDT Multi-seed는 효과 없음(MLP만 유효).</p>
        </div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>인사이트 &amp; 활용 방안</h3>
      <div class="pf-cards">
        <div class="pf-card accent">
          <h4>설명 가능한 의사결정</h4>
          <p>공여란의 위력, 배반포 배양의 가치, FET의 재발견, 단일 배아 우위 — SHAP 근거와 함께 성공 확률을 제시해 개인화 상담 · 고위험군 조기 식별 · 배양 전략 결정을 지원.</p>
        </div>
        <div class="pf-card">
          <h4>서비스 확장</h4>
          <p>생애주기별 가임력 가이드 앱, 신선 vs 동결 시술 시뮬레이터, SHAP 기반 맞춤 홈케어, 난임 전문 보험·금융 상품 설계.</p>
        </div>
      </div>
    </section>
  </div>

  <footer class="pf-foot">
    <span>발표 자료 26p 요약</span>
    <a class="pf-btn" href="./document/난임예측.pdf" target="_blank" rel="noopener">발표자료 보기 ↗</a>
  </footer>
</dialog>
`;
