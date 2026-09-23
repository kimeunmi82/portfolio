/* 팝업 내용: [해커톤] 유전자 변이 기반 암종 분류 AI 모델 개발
 * 트리거: resume.html 의 data-pf-modal="cancer-modal" 카드
 */
window.PF_POPUPS = window.PF_POPUPS || {};
window.PF_POPUPS['cancer-modal'] = `
<dialog class="pf-modal" id="cancer-modal" aria-labelledby="cancer-modal-title">
  <header class="pf-head">
    <p class="pf-eyebrow">Portfolio · Hackathon · ML Modeling</p>
    <h2 id="cancer-modal-title">암환자 유전체 변이 정보 기반 암종 분류 AI 모델 개발</h2>
    <div class="pf-meta">
      <span>2026.08</span>
      <span>해커톤 팀 프로젝트 (4인)</span>
      <span>26개 암종 다중 분류</span>
    </div>
    <button type="button" class="pf-close" data-pf-close aria-label="닫기">&times;</button>
  </header>

  <div class="pf-body">
    <section class="pf-sec">
      <p class="pf-oneline">희소한 유전자 변이 문자열을 <strong>텍스트(TF-IDF)·구조 피처·혼동쌍 전문가 모델</strong>로 함께 해석하고, 모델 간 불일치를 활용한 선택적 보정(VoteSelect)으로 <strong>26개 암종</strong>을 분류한 AI 모델</p>

      <div class="pf-kpis">
        <div class="pf-kpi"><strong>0.640</strong><span>최종 OOF Macro F1<br>베이스라인 0.620 대비 +0.020</span></div>
        <div class="pf-kpi"><strong>+0.112</strong><span>VoteSelect 단계 상승폭<br>전체 실험 중 최대 단일 개선</span></div>
        <div class="pf-kpi"><strong>26K<small>+</small></strong><span>유전자 피처 확장<br>원본 4,384개 → 26,000+</span></div>
        <div class="pf-kpi"><strong>5<small>개</small></strong><span>이종 모델 스태킹<br>텍스트 · 트리 · 쌍별 LR</span></div>
      </div>

      <div class="pf-stack">
        <div><b>Language</b><span>Python</span></div>
        <div><b>Feature</b><span>Pandas · Scikit-learn (Word/Char TF-IDF · Sparse hstack · Fold-safe 전처리)</span></div>
        <div><b>Model</b><span>LinearSVC · XGBoost · LightGBM · ExtraTrees · Pairwise Logistic Regression</span></div>
        <div><b>Ensemble · Eval</b><span>Stacking (LR · LightGBM 메타) · VoteSelect · Stratified 5-fold OOF · Macro F1</span></div>
        <div><b>Collaboration</b><span>GitHub · Notion</span></div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>데이터 & 세 가지 난점</h3>
      <div class="pf-goals">
        <div class="pf-goal"><b>SPARSITY · 0.805%</b><p>4,384개 유전자 셀 중 실제 변이 비율 → 다중 입력 표현 설계</p></div>
        <div class="pf-goal"><b>IMBALANCE · 20.7×</b><p>BRCA 786명 vs DLBC 38명 → Macro F1 · class-balanced 보정</p></div>
        <div class="pf-goal"><b>CONFLICT · 1,005명</b><p>동일 변이 프로필 안에서 라벨이 섞인 환자 → 모델 불일치로 재해석</p></div>
      </div>
      <p class="pf-note">※ Train 6,201건 · Test 2,546건 · 외부 데이터 및 test-fit 사용 금지. 변이 부담량 평균 35.3개 vs 중앙값 14개(최대 2,393개)의 긴 꼬리 분포.</p>
    </section>

    <section class="pf-sec">
      <h3>전처리 & 피처 엔지니어링</h3>
      <ol class="pf-flow">
        <li><strong>결측 보존</strong>결측 → WT 변환, missing flag · count 별도 생성</li>
        <li><strong>변이 유형 8종</strong>DELINS · FS · DEL · INS · DUP · STOP · SUB · OTHER</li>
        <li><strong>표기 정규화</strong>p.V600E → V600E 등 표기 차이 통합</li>
        <li><strong>다층 토큰화</strong>변이 1셀 → 유전자·유형·아미노산·위치 토큰</li>
        <li><strong>TF-IDF 결합</strong>Word(1–2gram) + Char(3–5gram × 0.5) + 구조 피처 12종</li>
      </ol>
      <p class="pf-note">※ Outer Fold마다 어휘 · 마스크 · 인코더를 학습 Fold로만 새로 fit 해 데이터 누수를 차단 (Fold-safe).</p>
    </section>

    <section class="pf-sec">
      <h3>모델링 · 서로 다른 정보를 보완</h3>
      <div class="pf-cards">
        <div class="pf-card accent">
          <h4>TF-IDF + LinearSVC</h4>
          <p>R132H · P403fs 같은 변이 문자열의 단어 · 부분 문자열 패턴을 학습. 고차원 희소 벡터에 강한 선형 분류기.</p>
        </div>
        <div class="pf-card accent">
          <h4>XGBoost · LightGBM · ExtraTrees</h4>
          <p>변이 개수 · 유형 · hotspot · 유전자 집중도 등 구조 피처의 비선형 조합을 학습. ExtraTrees로 앙상블 다양성 확보.</p>
        </div>
        <div class="pf-card">
          <h4>Pairwise Logistic Regression</h4>
          <p>KIRC–KIRP처럼 반복 혼동되는 암종 쌍만 이진 분류로 다시 학습해 제한적으로 보완.</p>
        </div>
        <div class="pf-card">
          <h4>Stacking → VoteSelect</h4>
          <p>5개 모델의 OOF 예측을 LR · LightGBM 메타 모델로 결합. OOF에서 3회 이상 반복된 예측 조합이고 결정 점수 차가 1.0 이상일 때만 최종 답을 변경.</p>
        </div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>검증 결과</h3>
      <div class="pf-bars">
        <div class="pf-bar-row">
          <div class="pf-bar-label">004_7<small>EM · Pair Expert</small></div>
          <div class="pf-bar-track"><div class="pf-bar"><span class="non" style="width:82.6%">0.5286</span></div></div>
          <div class="pf-delta">—</div>
        </div>
        <div class="pf-bar-row">
          <div class="pf-bar-label">Base OOF<small>Stacking LR</small></div>
          <div class="pf-bar-track"><div class="pf-bar"><span class="non" style="width:96.9%">0.6204</span></div></div>
          <div class="pf-delta">—</div>
        </div>
        <div class="pf-bar-row">
          <div class="pf-bar-label">Final OOF<small>VoteSelect v1</small></div>
          <div class="pf-bar-track"><div class="pf-bar"><span class="smk" style="width:100%">0.6402</span></div></div>
          <div class="pf-delta up">+0.020</div>
        </div>
      </div>
      <p class="pf-note">※ Stratified 5-fold OOF Macro F1 기준. 59개 반복 개선 조합을 조건부 전환 규칙으로 적용(475건). Public 리더보드 최고 0.466 (v2는 OOF 0.649였지만 Public 0.454로 하락해 v1 유지).</p>
    </section>

    <section class="pf-sec">
      <h3>인사이트 &amp; 한계</h3>
      <div class="pf-cards">
        <div class="pf-card accent">
          <h4>모델 불일치 = 위험 신호</h4>
          <p>모든 모델이 동의한 1,960건의 정확도 84.59% vs 불일치 4,241건은 44.94%. 약한 모델도 다양성으로 가치가 있으며, 불일치 구간만 선택적으로 보정하는 전략의 근거가 됨.</p>
        </div>
        <div class="pf-card">
          <h4>OOF–Public 격차와 다음 단계</h4>
          <p>OOF 0.640 vs Public 0.466(격차 17.4%p)으로 미관측 패턴 일반화에 한계. 단독 진단이 아닌 2차 보조 스크리닝 도구로 위치시키고, Soft Calibration으로 격차 축소를 목표.</p>
        </div>
      </div>
    </section>
  </div>

  <footer class="pf-foot">
    <span>발표 자료 24p 요약</span>
    <a class="pf-btn" href="./document/유전자 변이 기반 암종 분류.pdf" target="_blank" rel="noopener">발표자료 보기 ↗</a>
  </footer>
</dialog>
`;
