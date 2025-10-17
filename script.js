// Tab Switching Logic
// -------- Tab Switching Logic --------
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const targetId = tab.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');
  });
});

// -------- Modal Open/Close Logic --------
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('projectModal');

if (openModalBtn && closeModalBtn && modal) {
  openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.classList.add('hidden');
    }
  });
} else {
  console.error("Modal elements not found in DOM. Check element IDs.");
}

// Sidebar Collapse Toggle
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.getElementById('toggleSidebar');

if (toggleBtn && sidebar) {
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
}
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.getElementById('toggleSidebar');

// Collapse on small screens on load
window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    sidebar.classList.add('collapsed');
  }

  // Attach toggle button listener
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove('collapsed');
  }
});



// Add/Edit/Delete functionality can go here in the future
// For example: dynamically add new project cards to the DOM
