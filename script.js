document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modal = document.getElementById("projectModal");
  const projectForm = document.getElementById("projectForm");
  const modalTitle = document.getElementById("modalTitle");
  const submitProjectBtn = document.getElementById("submitProject");
  const projectIdInput = document.getElementById("projectId");
  const sortSelect = document.getElementById("sortProjects");
  const projectLists = document.querySelectorAll(".project-list");
  const emptyStates = document.querySelectorAll(".empty-state");

  const categoryLabels = {
    a: "On Hold",
    b: "Next 1 Month",
    c: "Next 3 Months",
    d: "Next 6 Months",
    e: "Next 1 Year",
    f: "Next Few Years",
    g: "Done",
  };

  const categoryOrder = Object.keys(categoryLabels);
  const STORAGE_KEY = "projectPulse.projects";

  let projects = loadProjects();
  
  // -------- Sidebar toggle --------
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // -------- Collapse sidebar by default on mobile --------
  if (window.innerWidth <= 768) {
    sidebar.classList.add("collapsed");
  }

  // -------- Tab switching --------
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active from all tabs and content
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active to clicked tab and its content
      tab.classList.add("active");
      const selectedTab = tab.getAttribute("data-tab");
      document.getElementById(selectedTab).classList.add("active");
          renderProjects();
    });
  });

  // -------- Modal open/close --------
  openModalBtn.addEventListener("click", () => {
    openModal();
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // -------- Close modal on background click --------
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // -------- Handle form submission --------
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = getFormData();
    const existingId = projectIdInput.value;
    if (existingId) {
      projects = projects.map((project) =>
        project.id === existingId ? { ...project, ...formData } : project
      );
    } else {
      const newProject = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        ...formData,
      };
      projects = [...projects, newProject];
    }
saveProjects();
    renderProjects();
    closeModal();
  });

  // -------- Sorting --------
  sortSelect.addEventListener("change", () => {
    renderProjects();
  });

  renderProjects();

  function openModal(project = null) {
    modal.classList.remove("hidden");
    if (project) {
      projectForm.reset();
      modalTitle.textContent = "Edit Project";
      submitProjectBtn.textContent = "Save Changes";
      populateForm(project);
    } else {
      modalTitle.textContent = "Add New Project";
      submitProjectBtn.textContent = "Add Project";
      projectForm.reset();
      projectIdInput.value = "";
      const activeTab = document.querySelector(".tab.active");
      const typeField = document.getElementById("projectType");
      if (activeTab && typeField) {
        const selectedTab = activeTab.getAttribute("data-tab");
        if (selectedTab === "renovation" || selectedTab === "maintenance") {
          typeField.value = selectedTab;
        }
      }
    }
  }

  function closeModal() {
    modal.classList.add("hidden");
  projectForm.reset();
    projectIdInput.value = "";
  }
    function populateForm(project) {
    projectIdInput.value = project.id;
    document.getElementById("projectName").value = project.name || "";
    document.getElementById("projectType").value = project.type || "renovation";
    document.getElementById("projectCategory").value = project.category || "a";
    document.getElementById("projectStatus").value = project.status || "On Hold";
    document.getElementById("projectEstimated").value = project.estimatedCost ?? "";
    document.getElementById("projectExpensed").value = project.expensedCost ?? "";
    document.getElementById("projectNotes").value = project.notes || "";
    document.getElementById("projectDueDate").value = project.dueDate || "";
  }
  function getFormData() {
    return {
      name: document.getElementById("projectName").value.trim(),
      type: document.getElementById("projectType").value,
      category: document.getElementById("projectCategory").value,
      status: document.getElementById("projectStatus").value,
      estimatedCost: parseNumber(document.getElementById("projectEstimated").value),
      expensedCost: parseNumber(document.getElementById("projectExpensed").value),
      notes: document.getElementById("projectNotes").value.trim(),
      dueDate: document.getElementById("projectDueDate").value,
    };
  }


  function parseNumber(value) {
    const num = parseFloat(value);
    return Number.isFinite(num) ? num : null;
  }

  function saveProjects() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  function loadProjects() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (error) {
        console.error("Failed to parse stored projects", error);
      }
    }

    return [
      {
        id: generateId(),
        name: "Paint Primary Closet",
        type: "renovation",
        category: "b",
        status: "On Hold",
        estimatedCost: 60,
        expensedCost: null,
        notes: "",
        dueDate: "",
        createdAt: new Date().toISOString(),
      },
      {
        id: generateId(),
        name: "Mitigate Storage Room Mold",
        type: "maintenance",
        category: "a",
        status: "On Hold",
        estimatedCost: null,
        expensedCost: null,
        notes: "",
        dueDate: "",
        createdAt: new Date().toISOString(),
      },
    ];
  }

  function renderProjects() {
    const sortBy = sortSelect.value;
    projectLists.forEach((list) => {
      const type = list.dataset.type;
      const typeProjects = sortProjects(
        projects.filter((project) => project.type === type),
        sortBy
      );

      list.innerHTML = "";

      const emptyState = Array.from(emptyStates).find(
        (state) => state.dataset.type === type
      );

      if (!typeProjects.length) {
        if (emptyState) {
          emptyState.style.display = "block";
        }
        return;
      }

      if (emptyState) {
        emptyState.style.display = "none";
      }

      typeProjects.forEach((project) => {
        const card = buildProjectCard(project);
        list.appendChild(card);
      });
    });
  }

  function sortProjects(items, sortBy) {
    const sorted = [...items];
    switch (sortBy) {
      case "type":
        sorted.sort((a, b) => a.type.localeCompare(b.type));
        break;
      case "status":
        sorted.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "category":
      default:
        sorted.sort((a, b) => getCategoryIndex(a.category) - getCategoryIndex(b.category));
        break;
    }
    return sorted;
  }

  function buildProjectCard(project) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.dataset.projectId = project.id;

    const title = document.createElement("h4");
    title.textContent = project.name;
    card.appendChild(title);

    const meta = document.createElement("div");
    meta.className = "project-meta";
    meta.appendChild(createMetaItem("Type", capitalize(project.type)));
    meta.appendChild(
      createMetaItem("Timeline", categoryLabels[project.category] || "—")
    );
    meta.appendChild(createMetaItem("Status", project.status));
    if (project.dueDate) {
      meta.appendChild(createMetaItem("Due", formatDate(project.dueDate)));
    }
    card.appendChild(meta);

    card.appendChild(
      createParagraph("Estimated Cost", formatCurrency(project.estimatedCost))
    );
    card.appendChild(
      createParagraph("Expensed", formatCurrency(project.expensedCost))
    );

    if (project.notes) {
      const notes = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = "Notes:";
      notes.appendChild(strong);
      notes.append(" ");
      notes.append(project.notes);
      card.appendChild(notes);
    }

    const actions = document.createElement("div");
    actions.className = "project-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.type = "button";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      const projectToEdit = projects.find((item) => item.id === project.id);
      if (projectToEdit) {
        openModal(projectToEdit);
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Delete "${project.name}"?`)) {
        projects = projects.filter((item) => item.id !== project.id);
        saveProjects();
        renderProjects();
      }
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    card.appendChild(actions);

    return card;
  }

  function createMetaItem(label, value) {
    const span = document.createElement("span");
    const strong = document.createElement("strong");
    strong.textContent = `${label}:`;
    span.appendChild(strong);
    span.append(" ");
    span.append(document.createTextNode(value));
    return span;
  }

  function createParagraph(label, value) {
    const paragraph = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${label}:`;
    paragraph.appendChild(strong);
    paragraph.append(" ");
    paragraph.append(document.createTextNode(value));
    return paragraph;
  }

  function capitalize(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function formatCurrency(amount) {
    if (amount === null || amount === undefined || Number.isNaN(amount)) {
      return "—";
    }

    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleDateString();
  }

  function getCategoryIndex(category) {
    const index = categoryOrder.indexOf(category);
    return index === -1 ? categoryOrder.length : index;
  }

  function generateId() {
    if (window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }
    return `project-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
});
