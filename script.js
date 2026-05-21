const panelData = {
  price: {
    kicker: "产品售价",
    title: "起售价 ¥9,999",
    html: `
      <dl>
        <dt>256GB</dt><dd>¥9,999 起</dd>
        <dt>512GB</dt><dd>¥11,999 起</dd>
        <dt>1TB</dt><dd>¥13,999 起</dd>
        <dt>购机建议</dt><dd>重度拍摄和长期使用优先 512GB。</dd>
      </dl>
    `,
  },
  specs: {
    kicker: "产品参数",
    title: "旗舰核心规格",
    html: `
      <dl>
        <dt>显示屏</dt><dd>6.9 英寸 ProMotion 全天候显示</dd>
        <dt>芯片</dt><dd>A19 Pro，面向游戏、影像和 AI 任务</dd>
        <dt>影像</dt><dd>Pro Fusion 摄像头系统，覆盖广角与长焦</dd>
        <dt>续航</dt><dd>全天候使用，适合高强度移动办公</dd>
      </dl>
    `,
  },
  "selling-points": {
    kicker: "Top 3 卖点",
    title: "三个购买理由",
    html: `
      <ul>
        <li>更强性能：A19 Pro 提供更稳定的高负载表现。</li>
        <li>更全影像：覆盖日常、人像、旅行和视频创作。</li>
        <li>更久续航：大屏机型适合长时间导航、拍摄和娱乐。</li>
      </ul>
    `,
  },
  compare: {
    kicker: "机型对比",
    title: "快速看差异",
    html: `
      <div class="compare-grid">
        <div class="compare-item">
          <strong>Pro Max</strong>
          <span>最大屏幕、更长续航、更适合重度影像和游戏。</span>
        </div>
        <div class="compare-item">
          <strong>Pro</strong>
          <span>同级性能，更轻巧，适合单手使用和通勤。</span>
        </div>
        <div class="compare-item">
          <strong>iPhone 17</strong>
          <span>核心体验均衡，价格门槛更低。</span>
        </div>
        <div class="compare-item">
          <strong>Air</strong>
          <span>主打轻薄手感，适合外观和便携优先。</span>
        </div>
      </div>
    `,
  },
};

const panel = document.querySelector(".detail-panel");
const backdrop = document.querySelector(".panel-backdrop");
const kicker = document.querySelector("#panel-kicker");
const title = document.querySelector("#panel-title");
const content = document.querySelector("#panel-content");
const cards = document.querySelectorAll("[data-panel]");
const closeTargets = document.querySelectorAll("[data-close-panel]");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const data = panelData[card.dataset.panel];

    kicker.textContent = data.kicker;
    title.textContent = data.title;
    content.innerHTML = data.html;

    panel.hidden = false;
    backdrop.hidden = false;
  });
});

closeTargets.forEach((target) => {
  target.addEventListener("click", closePanel);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePanel();
  }
});

function closePanel() {
  panel.hidden = true;
  backdrop.hidden = true;
}
