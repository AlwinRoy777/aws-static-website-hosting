/* ================================================================
   SCRIPT.JS — Portfolio Tab Logic
   No need to edit this file unless you add new tabs.
================================================================ */

// ----------------------------------------------------------------
// TAB SWITCHING
// ----------------------------------------------------------------
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-content');

/**
 * Activates a tab by its id string (e.g. 'projects').
 * Also exposed globally so index.html buttons can call it directly.
 */
function switchTab(targetId) {
  // Deactivate all
  tabBtns.forEach(btn => btn.classList.remove('active'));
  tabPanels.forEach(panel => {
    panel.classList.remove('active');
  });

  // Activate target
  const targetBtn   = document.querySelector(`[data-tab="${targetId}"]`);
  const targetPanel = document.getElementById(targetId);

  if (targetBtn)   targetBtn.classList.add('active');
  if (targetPanel) {
    // Re-trigger animation by cloning the element
    targetPanel.classList.add('active');
    targetPanel.style.animation = 'none';
    // Force reflow
    void targetPanel.offsetWidth;
    targetPanel.style.animation = '';
  }

  // Update URL hash (optional, allows linking to a tab)
  history.replaceState(null, '', `#${targetId}`);
}

// Attach click listeners to all nav buttons
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// ----------------------------------------------------------------
// DEEP LINKING — open the correct tab if URL has a hash
// e.g. yoursite.github.io/portfolio/#projects
// ----------------------------------------------------------------
function handleHashOnLoad() {
  const hash = window.location.hash.replace('#', '');
  const validTabs = ['summary', 'skills', 'projects', 'experience'];
  if (hash && validTabs.includes(hash)) {
    switchTab(hash);
  }
}

// ----------------------------------------------------------------
// KEYBOARD NAVIGATION (accessibility)
// Arrow keys move between tabs when a tab button is focused
// ----------------------------------------------------------------
tabBtns.forEach((btn, index) => {
  btn.addEventListener('keydown', (e) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') newIndex = (index + 1) % tabBtns.length;
    if (e.key === 'ArrowLeft')  newIndex = (index - 1 + tabBtns.length) % tabBtns.length;
    if (newIndex !== index) {
      tabBtns[newIndex].focus();
      switchTab(tabBtns[newIndex].dataset.tab);
    }
  });
});

// ----------------------------------------------------------------
// INIT
// ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  handleHashOnLoad();

  // Animate info cards in the Summary tab with staggered delay
  const infoCards = document.querySelectorAll('.info-card');
  infoCards.forEach((card, i) => {
    card.style.animationDelay = `${0.1 + i * 0.1}s`;
  });
});
