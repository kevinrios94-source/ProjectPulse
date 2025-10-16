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



// Add/Edit/Delete functionality can go here in the future
// For example: dynamically add new project cards to the DOM
