/* 팝업 내용: 흡연 여부 데이터 분석
 * 트리거: resume.html 의 data-pf-modal="smoking-modal" 링크
 */
window.PF_POPUPS = window.PF_POPUPS || {};
window.PF_POPUPS['smoking-modal'] = `
<dialog class="pf-modal" id="smoking-modal" aria-labelledby="smoking-modal-title">
    <header class="pf-head">
      <p class="pf-eyebrow">Portfolio · Data Analysis</p>
      <h2 id="smoking-modal-title">흡연 여부 데이터 분석을 통한 건강 인사이트 도출</h2>
      <div class="pf-meta">
        <span>2026.04</span>
        <span>팀 프로젝트 (3인)</span>
        <span>건강검진 데이터</span>
      </div>
      <button type="button" class="pf-close" data-pf-close aria-label="닫기">&times;</button>
    </header>

    <div class="pf-body">
      <section class="pf-sec">
        <p class="pf-oneline">건강검진 데이터에서 흡연자와 비흡연자의 건강 지표를 통계적으로 검증해, 흡연을 드러내는 <strong>5가지 핵심 생체 지표</strong>를 찾아낸 분석 프로젝트</p>

        <div class="pf-kpis">
          <div class="pf-kpi"><strong>5<small>개</small></strong><span>핵심 생체 지표 도출<br>(모두 p &lt; 0.001)</span></div>
          <div class="pf-kpi"><strong>+32.6<small>%</small></strong><span>흡연자 중성지방<br>평균 150.4 vs 113.5</span></div>
          <div class="pf-kpi"><strong>1.96<small>배</small></strong><span>혈청 크레아티닌 오즈비<br>(헤모글로빈 1.84배)</span></div>
          <div class="pf-kpi"><strong>5<small>종</small></strong><span>통계 검정 기법 적용<br>상관·χ²·t·ANOVA·로지스틱</span></div>
        </div>

        <div class="pf-stack">
          <div><b>Language</b><span>Python</span></div>
          <div><b>Data</b><span>Pandas (EDA · 결측치 처리 · 파생 변수)</span></div>
          <div><b>Visualization</b><span>Matplotlib · Seaborn (Histogram · Boxplot · Violin · Lineplot)</span></div>
          <div><b>Statistics</b><span>SciPy · Statsmodels (t-test · ANOVA · χ² · 로지스틱 회귀)</span></div>
        </div>
      </section>


      <section class="pf-sec">
        <h3>분석 목표</h3>
        <div class="pf-goals">
          <div class="pf-goal"><b>Q1</b><p>흡연은 어떤 건강 지표에 영향을 미치는가?</p></div>
          <div class="pf-goal"><b>Q2</b><p>흡연이 혈액 · 지질/대사 · 장기 기능에 어떤 변화를 유발하는가?</p></div>
          <div class="pf-goal"><b>Q3</b><p>흡연과 가장 관련 있는 핵심 변수는 무엇인가?</p></div>
        </div>
      </section>

      <section class="pf-sec">
        <h3>분석 프로세스</h3>
        <ol class="pf-flow">
          <li><strong>파생 변수</strong>BMI · 나이대 컬럼 추가로 세분화</li>
          <li><strong>결측치 처리</strong>변수 특성별 대체 전략 적용</li>
          <li><strong>시각화</strong>범주형은 비율, 수치형은 Box · Violin</li>
          <li><strong>단변량 분석</strong>기초 통계량 · 이상치 · 나이대 통제</li>
          <li><strong>이변량 검정</strong>상관 · χ² · t-test · ANOVA · 로지스틱</li>
        </ol>
      </section>

      <section class="pf-sec">
        <h3>결측치 처리 전략</h3>
        <div class="pf-table-wrap">
          <table class="pf-table">
            <thead><tr><th>변수</th><th>대체 방법</th><th>선택 근거</th></tr></thead>
            <tbody>
              <tr><td>혈압</td><td>중앙값</td><td>이상치 영향을 최소화하고 분포를 유지</td></tr>
              <tr><td>시력</td><td>최빈값</td><td>실제 시력 분포에 영향이 적어 데이터 보존</td></tr>
              <tr><td>중성지방</td><td>나이대별 그룹 평균</td><td>나이대와의 관계 및 통계적 패턴 유지</td></tr>
              <tr><td>공복혈당</td><td>평균</td><td>전반적인 평균 수치 유지</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="pf-sec">
        <h3>핵심 결과 · 흡연자 vs 비흡연자 평균</h3>
        <p class="pf-legend"><span><i class="smk"></i>흡연자</span><span><i class="non"></i>비흡연자</span></p>
        <div class="pf-bars">
          <div class="pf-bar-row">
            <div class="pf-bar-label">중성지방<small>지질 대사</small></div>
            <div class="pf-bar-track">
              <div class="pf-bar"><span class="smk" style="width:100%">150.40</span></div>
              <div class="pf-bar"><span class="non" style="width:75.4%">113.45</span></div>
            </div>
            <div class="pf-delta up">+32.6%</div>
          </div>
          <div class="pf-bar-row">
            <div class="pf-bar-label">혈청 크레아티닌<small>신장 기능</small></div>
            <div class="pf-bar-track">
              <div class="pf-bar"><span class="smk" style="width:100%">0.95</span></div>
              <div class="pf-bar"><span class="non" style="width:89.5%">0.85</span></div>
            </div>
            <div class="pf-delta up">+11.8%</div>
          </div>
          <div class="pf-bar-row">
            <div class="pf-bar-label">헤모글로빈<small>산소 운반</small></div>
            <div class="pf-bar-track">
              <div class="pf-bar"><span class="smk" style="width:100%">15.44</span></div>
              <div class="pf-bar"><span class="non" style="width:91.7%">14.16</span></div>
            </div>
            <div class="pf-delta up">+9.0%</div>
          </div>
          <div class="pf-bar-row">
            <div class="pf-bar-label">HDL<small>혈관 보호</small></div>
            <div class="pf-bar-track">
              <div class="pf-bar"><span class="smk" style="width:90.8%">53.91</span></div>
              <div class="pf-bar"><span class="non" style="width:100%">59.35</span></div>
            </div>
            <div class="pf-delta down">−9.2%</div>
          </div>
          <div class="pf-bar-row">
            <div class="pf-bar-label">공복혈당<small>당 대사</small></div>
            <div class="pf-bar-track">
              <div class="pf-bar"><span class="smk" style="width:100%">102.35</span></div>
              <div class="pf-bar"><span class="non" style="width:95.3%">97.54</span></div>
            </div>
            <div class="pf-delta up">+4.9%</div>
          </div>
        </div>
        <p class="pf-note">※ t-검정 결과 5개 지표 모두 p &lt; 0.001로 유의미한 차이. 흡연자 비중이 가장 높은 30~50대에서 격차가 두드러짐.</p>
      </section>

      <section class="pf-sec">
        <h3>통계 검증 요약</h3>
        <div class="pf-table-wrap">
          <table class="pf-table">
            <thead>
              <tr><th>지표</th><th>t-test p</th><th>ANOVA F (나이대)</th><th>ANOVA F (BMI)</th><th>로지스틱 OR</th></tr>
            </thead>
            <tbody>
              <tr><td>중성지방</td><td class="num">1.70e-85</td><td class="num">11.62</td><td class="num">47.27</td><td class="num">1.004</td></tr>
              <tr><td>혈청 크레아티닌</td><td class="num">8.13e-73</td><td class="num">6.19</td><td class="num">4.66</td><td class="num up">1.958</td></tr>
              <tr><td>고밀도지단백(HDL)</td><td class="num">1.19e-54</td><td class="num">4.16</td><td class="num">63.05</td><td class="num">0.996 <small>(p=0.055)</small></td></tr>
              <tr><td>공복혈당</td><td class="num">7.36e-17</td><td class="num">16.67</td><td class="num">10.22</td><td class="num">1.005</td></tr>
              <tr><td>헤모글로빈</td><td class="num">≈ 0</td><td class="num">15.73</td><td class="num">28.54</td><td class="num up">1.837</td></tr>
            </tbody>
          </table>
        </div>
        <p class="pf-note">※ 카이제곱 검정: 충치(p=2.2e-16), BMI 상태(p=1.4e-23), 나이대(p=1.3e-48) 모두 흡연 여부와 유의미한 관계. 모든 ANOVA 결과 p &lt; 0.001.</p>
      </section>

      <section class="pf-sec">
        <h3>인사이트</h3>
        <div class="pf-cards">
          <div class="pf-card accent">
            <h4>흡연의 강력한 생체 마커</h4>
            <p>헤모글로빈(OR 1.84)과 혈청 크레아티닌(OR 1.96)이 흡연 여부를 가장 강하게 설명. 헤모글로빈은 모든 나이대에서 일관되게 높아 산소 운반 능력의 보상적 증가 가능성을 시사.</p>
          </div>
          <div class="pf-card accent">
            <h4>이상지질혈증 · 심혈관 위험 가시화</h4>
            <p>흡연자는 중성지방 중앙값 131 vs 97(약 35%↑), HDL은 전 연령에서 낮아 지질 대사 악화와 혈관 보호 기능 저하 경향 확인.</p>
          </div>
          <div class="pf-card">
            <h4>구강 건강과의 상관성</h4>
            <p>충치 여부와 흡연 간 유의미한 관계. 구강 내 온도 상승, 침 분비 감소, 세균 번식 증가와 연관 가능성 (인과관계 해석은 제한).</p>
          </div>
          <div class="pf-card">
            <h4>나이대별 변화의 가속화</h4>
            <p>고령 흡연자는 인슐린 저항성 악화가 심화될 수 있어, 금연 치료와 혈당 관리의 병행 필요성 도출.</p>
          </div>
        </div>
      </section>

      <section class="pf-sec">
        <h3>한계점 &amp; 활용 방안</h3>
        <div class="pf-cards">
          <div class="pf-card">
            <h4>분석 한계</h4>
            <p>데이터에 성별 정보가 없어 성호르몬의 교란 가능성을 통제하지 못함. 헤모글로빈 · 크레아티닌은 남성이 높은 경향이 있어 후속 분석에서 성별 변수 확보가 필요.</p>
          </div>
          <div class="pf-card">
            <h4>활용 방안</h4>
            <p><b>AI 예측 모델</b> — 병원 정밀진단 보조, 보험 가입 시 흡연 여부 판단 · 허위고지 방지, 금연치료 기관 추적 검증.<br>
            <b>개인 맞춤형 앱</b> — 검진 데이터 기반 금연 관리, 운동 처방 · 식단 추천.</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="pf-foot">
      <span>발표 자료 38p 요약</span>
      <a class="pf-btn" href="./document/흡연여부_데이터분석.pdf" target="_blank" rel="noopener">발표자료 보기 ↗</a>
    </footer>
  </dialog>
`;
