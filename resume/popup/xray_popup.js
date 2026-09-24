/* 팝업 내용: [해커톤] 흉부 X-ray 이미지 분류 AI 모델 개발
 * 트리거: resume.html 의 data-pf-modal="xray-modal" 카드
 */
window.PF_POPUPS = window.PF_POPUPS || {};
window.PF_POPUPS['xray-modal'] = `
<dialog class="pf-modal" id="xray-modal" aria-labelledby="xray-modal-title">
  <header class="pf-head">
    <p class="pf-eyebrow">Portfolio · Hackathon · Medical Imaging</p>
    <h2 id="xray-modal-title">흉부 X-ray 이미지 분류 AI 모델 개발</h2>
    <div class="pf-meta">
      <span>2026.06</span>
      <span>해커톤 · 폐렴 이진 분류</span>
      <span>Baseline 개선 · 앙상블 · Grad-CAM</span>
    </div>
    <button type="button" class="pf-close" data-pf-close aria-label="닫기">&times;</button>
  </header>

  <div class="pf-body">
    <section class="pf-sec">
      <p class="pf-oneline">SimpleCNN Baseline을 <strong>7단계 실험</strong>으로 개선해 DenseNet121 · EfficientNet · ConvNeXt · Swin Transformer 앙상블로 <strong>Accuracy 99.23%</strong>를 달성하고, Grad-CAM으로 판단 근거까지 검증한 폐렴 분류 AI 모델</p>

      <div class="pf-kpis">
        <div class="pf-kpi"><strong>99.23<small>%</small></strong><span>최종 Accuracy<br>Baseline 94.75% 대비 +4.5%p</span></div>
        <div class="pf-kpi"><strong>0.991</strong><span>최종 F1-score<br>Baseline 0.927 대비 +0.064</span></div>
        <div class="pf-kpi"><strong>88<small>%↓</small></strong><span>폐렴 놓침(FN) 비율 감소<br>Recall 0.903 → 0.988</span></div>
        <div class="pf-kpi"><strong>7<small>회</small></strong><span>Ticket 단위 비교 실험<br>Baseline + TICKET-001~006</span></div>
      </div>

      <div class="pf-stack">
        <div><b>Language</b><span>Python</span></div>
        <div><b>Deep Learning</b><span>PyTorch · CNN (Conv · BatchNorm2d · Dropout2d) · Transfer Learning</span></div>
        <div><b>Model</b><span>DenseNet121 · EfficientNet-B0 · ConvNeXt-Tiny · Swin Transformer · XGBoost</span></div>
        <div><b>Train · Eval</b><span>AdamW · Early Stopping · Train/Valid 8:2 · Accuracy · AUC · F1 · Recall</span></div>
        <div><b>XAI</b><span>Grad-CAM · Grad-CAM++</span></div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>문제 정의 · Baseline의 한계</h3>
      <div class="pf-goals">
        <div class="pf-goal"><b>NO VALIDATION</b><p>train 전체로 학습 후 바로 예측 → 과적합 · 폐렴 누락 여부 확인 불가</p></div>
        <div class="pf-goal"><b>SIMPLE MODEL</b><p>Conv 2층 SimpleCNN → 작고 흐릿한 폐 병변 · 전역 패턴 학습 한계</p></div>
        <div class="pf-goal"><b>PREPROCESSING</b><p>128×128 축소로 병변 정보 손실, 불균형 · False Negative 대응 전략 부재</p></div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>개선 전략</h3>
      <ol class="pf-flow">
        <li><strong>검증 데이터</strong>Train / Valid 8:2 분할로 성능 검증</li>
        <li><strong>입력 해상도</strong>128 → 224로 병변 디테일 보존</li>
        <li><strong>정규화 · 학습량</strong>픽셀 정규화 · Epoch 2 → 20~40</li>
        <li><strong>모델 구조</strong>Conv 3층 + BatchNorm2d · Dropout2d</li>
        <li><strong>전이학습 · 앙상블</strong>DenseNet121 중심 CNN · Transformer 결합</li>
      </ol>
    </section>

    <section class="pf-sec">
      <h3>실험별 성능 비교</h3>
      <div class="pf-table-wrap">
        <table class="pf-table">
          <thead><tr><th>실험</th><th>모델 구성</th><th>Accuracy</th><th>AUC</th><th>F1</th><th>Recall</th></tr></thead>
          <tbody>
            <tr><td>Baseline</td><td>SimpleCNN (Conv 2층)</td><td class="num">0.9475</td><td class="num">0.9937</td><td class="num">0.9268</td><td class="num">0.9025</td></tr>
            <tr><td>TICKET-001</td><td>Conv 3층 · BN · Dropout · 224px</td><td class="num">0.9459</td><td class="num">0.9862</td><td class="num">0.9311</td><td class="num">0.9434</td></tr>
            <tr><td>TICKET-002</td><td>DenseNet121</td><td class="num">0.9875</td><td class="num">0.9965</td><td class="num">0.9838</td><td class="num">0.9867</td></tr>
            <tr><td>TICKET-003</td><td>+ EfficientNet-B0</td><td class="num">0.9837</td><td class="num">0.9990</td><td class="num">0.9788</td><td class="num">0.9829</td></tr>
            <tr><td>TICKET-004</td><td>+ ConvNeXt-Tiny</td><td class="num">0.9875</td><td class="num">0.9995</td><td class="num">0.9837</td><td class="num">0.9855</td></tr>
            <tr><td>TICKET-005 ⭐</td><td>+ Swin Transformer (4모델)</td><td class="num up">0.9923</td><td class="num">0.9973</td><td class="num up">0.9912</td><td class="num">0.9882</td></tr>
            <tr><td>TICKET-006</td><td>+ XGBoost 스태킹</td><td class="num up">0.9923</td><td class="num up">0.9998</td><td class="num">0.9901</td><td class="num up">0.9897</td></tr>
          </tbody>
        </table>
      </div>
      <p class="pf-note">※ 가장 큰 도약은 TICKET-002(DenseNet121 전이학습)로 전 지표가 크게 개선. TICKET-006은 수치는 높지만 데이터 누수 문제로 신뢰할 수 없어 TICKET-005를 최종안으로 판단.</p>
    </section>

    <section class="pf-sec">
      <h3>실패 분석 · TICKET-006 XGBoost 스태킹</h3>
      <div class="pf-cards">
        <div class="pf-card accent">
          <h4>Data Leakage</h4>
          <p>딥러닝 모델을 학습시킨 Train 데이터를 그대로 통과시켜 뽑은 확률을 XGBoost 입력으로 사용 → 심각한 누수와 과적합.</p>
        </div>
        <div class="pf-card">
          <h4>피처 중복 · Calibration</h4>
          <p>Normal / Pneumonia 확률은 완전한 음의 상관으로 중복 정보. 모델마다 다른 스케일로 과신된 확률이 섞여 메타 모델의 판단을 방해.</p>
        </div>
      </div>
    </section>

    <section class="pf-sec">
      <h3>설명가능성 · Grad-CAM 검토</h3>
      <div class="pf-table-wrap">
        <table class="pf-table">
          <thead><tr><th>실험</th><th>Attention 분석 결과</th></tr></thead>
          <tbody>
            <tr><td>TICKET-002</td><td>폐 병변보다 주변 구조(횡격막 · 심장 음영 · 영상 가장자리)에 반응, 국소 집중도 부족</td></tr>
            <tr><td>TICKET-003</td><td>폐 외곽 · 영상 경계 · 심장/종격동/횡격막 주변에 과도하게 반응</td></tr>
            <tr><td>TICKET-004</td><td>이미지 가장자리 · 촬영 패턴 의존 → 정상을 폐렴으로 보는 False Positive 가능성</td></tr>
            <tr><td>TICKET-005</td><td>폐 중심부를 참고하지만 attention이 넓고 흐릿해 흉부 중앙 전체를 보는 경향</td></tr>
          </tbody>
        </table>
      </div>
      <p class="pf-note">※ 높은 정확도가 곧 올바른 근거는 아님을 확인 — 의료영상에서는 성능과 함께 판단 근거 검증이 필요.</p>
    </section>

    <section class="pf-sec">
      <h3>인사이트 &amp; 실무 적용</h3>
      <div class="pf-cards">
        <div class="pf-card accent">
          <h4>성능 개선의 핵심 요인</h4>
          <p>① 데이터에 적합한 모델 선택(의료영상에 강한 DenseNet121 전이학습) ② 서로의 약점을 보완하는 이종 모델 앙상블 구성.</p>
        </div>
        <div class="pf-card">
          <h4>AI 판독 보조 서비스</h4>
          <p>영상의학과 · 응급실 · 건강검진센터에서 X-ray 1차 선별 · 우선순위 분류에 활용. Grad-CAM으로 근거를 함께 제시해 의료진의 최종 판독을 보조.</p>
        </div>
      </div>
    </section>
  </div>

  <footer class="pf-foot">
    <span>보고서 9p 요약</span>
    <a class="pf-btn" href="./document/흉부X-ray_이미지분류_AI모델개발.pdf" target="_blank" rel="noopener">발표자료 보기 ↗</a>
  </footer>
</dialog>
`;
