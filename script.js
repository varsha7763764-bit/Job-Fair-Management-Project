/* =========================================================
   JOB FAIR MANAGEMENT SYSTEM
   FINAL COMPLETE JAVASCRIPT
   HTML + CSS + JAVASCRIPT
   LocalStorage Database
========================================================= */

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const DB_KEY = "jobFairDatabase";
const SESSION_KEY = "jobFairSession";
const THEME_KEY = "jobFairDarkMode";

// =========================================================
// 1. DEFAULT JOBS
// =========================================================

const defaultJobs = [
    {
        id: 101,
        title: "Frontend Developer",
        company: "Google",
        location: "Bangalore",
        type: "Full-time",
        salary: "₹8–12 LPA",
        description: "Develop modern and responsive web applications.",
        skills: "HTML, CSS, JavaScript, React",
        minCgpa: 9,
        qualification: "B.Tech CSE",
        requiredSkills: "HTML, CSS, React",
        requiredCertificates: "React Certificate",
        ownerId: 2
    },
    {
        id: 102,
        title: "Software Engineer Intern",
        company: "Microsoft",
        location: "Hyderabad",
        type: "Internship",
        salary: "₹30,000/month",
        description: "Work with experienced software engineers.",
        skills: "Java, Python, DSA",
        minCgpa: 7,
        qualification: "Any",
        requiredSkills: "Java, Python",
        requiredCertificates: "",
        ownerId: 2
    },
    {
        id: 103,
        title: "Python Developer",
        company: "Infosys",
        location: "Pune",
        type: "Full-time",
        salary: "₹5–7 LPA",
        description: "Build and maintain Python applications.",
        skills: "Python, SQL, Django",
        minCgpa: 7,
        qualification: "B.Tech CSE",
        requiredSkills: "Python, SQL",
        requiredCertificates: "Python Certificate",
        ownerId: 2
    },
    {
        id: 104,
        title: "Data Analyst",
        company: "Amazon",
        location: "Delhi",
        type: "Full-time",
        salary: "₹6–9 LPA",
        description: "Analyze data and generate business insights.",
        skills: "Python, SQL, Excel",
        minCgpa: 8,
        qualification: "Any",
        requiredSkills: "Python, SQL, Excel",
        requiredCertificates: "Excel Certificate",
        ownerId: 2
    },
    {
        id: 105,
        title: "UI/UX Designer",
        company: "Adobe",
        location: "Noida",
        type: "Internship",
        salary: "₹25,000/month",
        description: "Design user-friendly digital experiences.",
        skills: "Figma, UI Design, UX",
        minCgpa: 7,
        qualification: "Any",
        requiredSkills: "Figma, UI Design",
        requiredCertificates: "",
        ownerId: 2
    },
    {
        id: 106,
        title: "Web Developer",
        company: "TCS",
        location: "Chandigarh",
        type: "Full-time",
        salary: "₹4–6 LPA",
        description: "Create and maintain responsive websites.",
        skills: "HTML, CSS, JavaScript",
        minCgpa: 6,
        qualification: "Any",
        requiredSkills: "HTML, CSS",
        requiredCertificates: "",
        ownerId: 2
    },
    {
        id: 107,
        title: "Java Developer",
        company: "Wipro",
        location: "Bangalore",
        type: "Full-time",
        salary: "₹5–8 LPA",
        description: "Develop scalable Java applications.",
        skills: "Java, Spring Boot, SQL",
        minCgpa: 7,
        qualification: "B.Tech CSE",
        requiredSkills: "Java, SQL",
        requiredCertificates: "Java Certificate",
        ownerId: 2
    },
    {
        id: 108,
        title: "Cloud Computing Intern",
        company: "IBM",
        location: "Hyderabad",
        type: "Internship",
        salary: "₹20,000/month",
        description: "Learn cloud infrastructure and deployment.",
        skills: "AWS, Azure, Linux",
        minCgpa: 7,
        qualification: "Any",
        requiredSkills: "AWS, Linux",
        requiredCertificates: "AWS Certificate",
        ownerId: 2
    },
    {
        id: 109,
        title: "Digital Marketing Executive",
        company: "Accenture",
        location: "Mumbai",
        type: "Full-time",
        salary: "₹4–6 LPA",
        description: "Manage digital marketing campaigns.",
        skills: "SEO, Marketing, Analytics",
        minCgpa: 6,
        qualification: "Any",
        requiredSkills: "SEO, Marketing",
        requiredCertificates: "",
        ownerId: 2
    },
    {
        id: 110,
        title: "Business Analyst",
        company: "Flipkart",
        location: "Gurgaon",
        type: "Full-time",
        salary: "₹7–10 LPA",
        description: "Analyze business operations and requirements.",
        skills: "Excel, SQL, Communication",
        minCgpa: 7,
        qualification: "Any",
        requiredSkills: "Excel, SQL",
        requiredCertificates: "",
        ownerId: 2
    },
    {
        id: 111,
        title: "Mobile App Developer",
        company: "Paytm",
        location: "Remote",
        type: "Part-time",
        salary: "₹15,000/month",
        description: "Build and improve mobile applications.",
        skills: "Flutter, Dart, Firebase",
        minCgpa: 6,
        qualification: "Any",
        requiredSkills: "Flutter, Dart",
        requiredCertificates: "",
        ownerId: 2
    },
    {
        id: 112,
        title: "Cyber Security Intern",
        company: "Deloitte",
        location: "Pune",
        type: "Internship",
        salary: "₹25,000/month",
        description: "Assist with security testing and analysis.",
        skills: "Networking, Linux, Security",
        minCgpa: 7,
        qualification: "Any",
        requiredSkills: "Networking, Linux",
        requiredCertificates: "",
        ownerId: 2
    }
];

// =========================================================
// 2. DATABASE
// =========================================================

function createInitialDatabase() {
    return {
        users: [
            {
                id: 1,
                name: "Aarav Sharma",
                email: "student@jobfair.demo",
                password: "Demo@123",
                role: "candidate"
            },
            {
                id: 2,
                name: "Demo Recruiter",
                email: "recruiter@jobfair.demo",
                password: "Demo@123",
                role: "company"
            },
            {
                id: 3,
                name: "Demo Teacher",
                email: "teacher@jobfair.demo",
                password: "Demo@123",
                role: "teacher"
            }
        ],
        jobs: defaultJobs,
        applications: [],
        interviews: [],
        notifications: [],
        tickets: [],
        profiles: {},
        demoApplicantsSeeded: false
    };
}

function getDB() {
    let db;

    try {
        db = JSON.parse(localStorage.getItem(DB_KEY));
    } catch {
        db = null;
    }

    if (!db || !Array.isArray(db.users)) {
        db = createInitialDatabase();
    }

    db.jobs ||= [];
    db.applications ||= [];
    db.interviews ||= [];
    db.notifications ||= [];
    db.tickets ||= [];
    db.profiles ||= {};

    // Add missing fields to older jobs without changing their criteria.
    db.jobs.forEach(job => {
        if (job.minCgpa === undefined) job.minCgpa = 0;
        if (!job.qualification) job.qualification = "Any";
        if (job.requiredSkills === undefined) job.requiredSkills = "";
        if (!job.requiredCertificates) job.requiredCertificates = "";
    });

    if (!db.demoApplicantsSeeded) {
        const demoCandidates = [
            {
                id: 4,
                name: "Priya Verma",
                email: "priya@example.com",
                password: "Demo@123",
                role: "candidate"
            },
            {
                id: 5,
                name: "Rahul Mehta",
                email: "rahul@example.com",
                password: "Demo@123",
                role: "candidate"
            },
            {
                id: 6,
                name: "Ananya Singh",
                email: "ananya@example.com",
                password: "Demo@123",
                role: "candidate"
            },
            {
                id: 7,
                name: "Rohan Gupta",
                email: "rohan@example.com",
                password: "Demo@123",
                role: "candidate"
            }
        ];

        demoCandidates.forEach(candidate => {
            if (!db.users.some(user => user.email === candidate.email)) {
                db.users.push(candidate);
            }
        });

        db.demoApplicantsSeeded = true;
    }

    saveDB(db);
    return db;
}

function saveDB(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function getCurrentUser() {
    try {
        const session = JSON.parse(localStorage.getItem(SESSION_KEY));

        if (!session) return null;

        return getDB().users.find(user => user.id === session.userId) || null;
    } catch {
        return null;
    }
}

function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

function formatDate(date) {
    if (!date) return "Not scheduled";

    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

// =========================================================
// 3. TOAST
// =========================================================

function showToast(message, type = "success") {
    const toast = $("#toast");

    if (!toast) {
        console.log(message);
        return;
    }

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.className = "toast";
    }, 3200);
}

// =========================================================
// 4. COMPLETE ELIGIBILITY SYSTEM
// =========================================================

function getEligibility(candidateId, job) {
    const db = getDB();
    const profile = db.profiles[candidateId] || {};

    const reasons = [];

    // CGPA
    const cgpa = Number(profile.cgpa ?? 0);
    const minCgpa = Number(job.minCgpa ?? 0);

    if (minCgpa > 0 && profile.cgpa === undefined) {
        reasons.push("Please add your CGPA to your profile.");
    } else if (cgpa < minCgpa) {
        reasons.push(`Minimum CGPA required: ${minCgpa}. Your CGPA: ${cgpa}.`);
    }

    // QUALIFICATION
    const qualification = String(profile.qualification || "")
        .trim().toLowerCase();

    const requiredQualification = String(job.qualification || "Any")
        .trim().toLowerCase();

    if (
        requiredQualification !== "any" &&
        qualification !== requiredQualification
    ) {
        reasons.push(`Required qualification: ${job.qualification}.`);
    }

    // SKILLS
    const studentSkills = String(profile.skills || "")
        .split(",")
        .map(item => item.trim().toLowerCase())
        .filter(Boolean);

    const requiredSkills = String(job.requiredSkills || "")
        .split(",")
        .map(item => item.trim().toLowerCase())
        .filter(Boolean);

    const missingSkills = requiredSkills.filter(
        skill => !studentSkills.includes(skill)
    );

    if (missingSkills.length) {
        reasons.push(`Missing skills: ${missingSkills.join(", ")}.`);
    }

    // CERTIFICATES
    const studentCertificates = String(profile.certificates || "")
        .split(",")
        .map(item => item.trim().toLowerCase())
        .filter(Boolean);

    const requiredCertificates = String(job.requiredCertificates || "")
        .split(",")
        .map(item => item.trim().toLowerCase())
        .filter(Boolean);

    const missingCertificates = requiredCertificates.filter(
        certificate => !studentCertificates.includes(certificate)
    );

    if (missingCertificates.length) {
        reasons.push(`Missing certificates: ${missingCertificates.join(", ")}.`);
    }

    return {
        eligible: reasons.length === 0,
        reasons
    };
}

// =========================================================
// 5. CUSTOM MODAL
// =========================================================

function setupModalStyles() {
    if ($("#customModalStyles")) return;

    const style = document.createElement("style");
    style.id = "customModalStyles";

    style.textContent = `
        #modalRoot:empty { display:none; }

        .custom-modal-backdrop {
            position:fixed;
            inset:0;
            z-index:99999;
            display:flex;
            align-items:center;
            justify-content:center;
            padding:20px;
            background:rgba(15,23,42,.62);
            backdrop-filter:blur(7px);
        }

        .custom-modal {
            width:100%;
            max-width:470px;
            background:#fff;
            color:#1e293b;
            border-radius:22px;
            padding:28px;
            box-shadow:0 25px 80px rgba(0,0,0,.25);
            position:relative;
            max-height:90vh;
            overflow-y:auto;
        }

        .custom-modal-close {
            position:absolute;
            top:17px;
            right:18px;
            border:0;
            background:#f1f5f9;
            color:#64748b;
            width:34px;
            height:34px;
            border-radius:50%;
            font-size:20px;
            cursor:pointer;
        }

        .custom-modal-icon {
            width:55px;
            height:55px;
            border-radius:17px;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#eef2ff;
            color:#4f46e5;
            font-size:25px;
            margin-bottom:18px;
        }

        .custom-modal h2 {
            font-size:23px;
            margin:0 0 8px;
        }

        .custom-modal-description {
            color:#64748b;
            font-size:14px;
            line-height:1.6;
            margin-bottom:23px;
        }

        .custom-modal .modal-field {
            margin-bottom:17px;
        }

        .custom-modal .modal-field label {
            display:block;
            font-size:13px;
            font-weight:650;
            margin-bottom:8px;
        }

        .custom-modal .modal-field input,
        .custom-modal .modal-field select,
        .custom-modal .modal-field textarea {
            width:100%;
            box-sizing:border-box;
            padding:13px 14px;
            border:1px solid #e2e8f0;
            border-radius:11px;
            outline:none;
            font-size:14px;
        }

        .custom-modal-actions {
            display:flex;
            justify-content:flex-end;
            gap:11px;
            margin-top:25px;
        }

        .custom-modal-btn {
            border:0;
            border-radius:11px;
            padding:12px 20px;
            font-weight:650;
            cursor:pointer;
        }

        .custom-modal-cancel {
            background:#f1f5f9;
            color:#475569;
        }

        .custom-modal-primary {
            background:#4f46e5;
            color:#fff;
        }

        .custom-modal-danger {
            background:#dc2626;
            color:#fff;
        }

        .custom-modal-note {
            background:#f8fafc;
            border:1px solid #e2e8f0;
            border-radius:12px;
            padding:13px;
            font-size:13px;
            color:#64748b;
            line-height:1.5;
        }

        body.dark-mode .custom-modal {
            background:#1e293b;
            color:#f8fafc;
        }
    `;

    document.head.appendChild(style);
}

function openModal({
    title,
    description = "",
    icon = "✦",
    content = "",
    submitText = "Continue",
    danger = false,
    onSubmit = null
}) {
    setupModalStyles();

    const root = $("#modalRoot");
    if (!root) return;

    root.innerHTML = `
        <div class="custom-modal-backdrop">
            <div class="custom-modal" role="dialog" aria-modal="true">

                <button class="custom-modal-close" type="button" data-modal-close>
                    &times;
                </button>

                <div class="custom-modal-icon">${icon}</div>

                <h2>${escapeHTML(title)}</h2>

                <p class="custom-modal-description">
                    ${escapeHTML(description)}
                </p>

                <form id="customModalForm">
                    ${content}

                    <div class="custom-modal-actions">

                        <button type="button"
                            class="custom-modal-btn custom-modal-cancel"
                            data-modal-close>
                            Cancel
                        </button>

                        <button type="submit"
                            class="custom-modal-btn ${danger ? "custom-modal-danger" : "custom-modal-primary"}">
                            ${escapeHTML(submitText)}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    `;

    root.querySelectorAll("[data-modal-close]").forEach(button => {
        button.addEventListener("click", closeModal);
    });

    root.querySelector(".custom-modal-backdrop").addEventListener("click", event => {
        if (event.target.classList.contains("custom-modal-backdrop")) {
            closeModal();
        }
    });

    root.querySelector("#customModalForm").addEventListener("submit", event => {
        event.preventDefault();

        if (onSubmit) {
            const result = onSubmit(new FormData(event.target));

            if (result !== false) closeModal();
        } else {
            closeModal();
        }
    });
}

function closeModal() {
    const root = $("#modalRoot");
    if (root) root.innerHTML = "";
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
});

// =========================================================
// 6. LOGIN AND SIGNUP
// =========================================================

function switchAuthTab(tab) {
    const signinTab = $("#signinTab");
    const signupTab = $("#signupTab");

    if (!signinTab || !signupTab) return;

    const isSignin = tab === "signin";

    signinTab.classList.toggle("active", isSignin);
    signupTab.classList.toggle("active", !isSignin);

    $("#signinForm")?.classList.toggle("hidden", !isSignin);
    $("#signupForm")?.classList.toggle("hidden", isSignin);
}

function showLoginMessage(message) {
    const box = $("#messageBox");

    if (!box) {
        showToast(message, "error");
        return;
    }

    box.textContent = message;
    box.classList.remove("hidden");
    box.style.display = "block";
}

function hideLoginMessage() {
    const box = $("#messageBox");

    if (box) {
        box.classList.add("hidden");
        box.style.display = "none";
    }
}

function login(email, password) {
    const db = getDB();

    const user = db.users.find(item =>
        item.email.toLowerCase() === String(email).toLowerCase() &&
        item.password === password
    );

    if (!user) {
        showLoginMessage("Invalid email or password. Please try again.");
        return;
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify({
        userId: user.id,
        loginTime: new Date().toISOString()
    }));

    hideLoginMessage();
    openDashboard();

    showToast(`Welcome back, ${user.name}!`);
}

function signup(formData) {
    const name = formData.get("fullName")?.trim();
    const email = formData.get("signupEmail")?.trim();
    const password = formData.get("signupPassword");
    const confirmPassword = formData.get("confirmPassword");
    const role = formData.get("registerRole");

    if (!name || !email || !password || !confirmPassword || !role) {
        showLoginMessage("Please fill in all required fields.");
        return;
    }

    if (password.length < 6) {
        showLoginMessage("Password must contain at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        showLoginMessage("Passwords do not match.");
        return;
    }

    const db = getDB();

    if (db.users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
        showLoginMessage("This email is already registered.");
        return;
    }

    const newUser = {
        id: generateId(),
        name,
        email,
        password,
        role
    };

    db.users.push(newUser);
    saveDB(db);

    localStorage.setItem(SESSION_KEY, JSON.stringify({
        userId: newUser.id,
        loginTime: new Date().toISOString()
    }));

    hideLoginMessage();
    openDashboard();

    showToast("Your account has been created successfully!");
}

function demoLogin(role) {
    const accounts = {
        candidate: "student@jobfair.demo",
        company: "recruiter@jobfair.demo",
        teacher: "teacher@jobfair.demo"
    };

    login(accounts[role], "Demo@123");
}

function togglePassword(inputId, button) {
    const input = $("#" + inputId);
    if (!input) return;

    input.type = input.type === "password" ? "text" : "password";

    if (button) {
        button.textContent = input.type === "password" ? "Show" : "Hide";
    }
}

function forgotPassword() {
    openModal({
        title: "Reset your password",
        description: "Enter your registered email address.",
        icon: "🔐",
        submitText: "Continue",

        content: `
            <div class="modal-field">
                <label>Email address</label>
                <input type="email" name="email"
                    placeholder="Enter registered email" required>
            </div>

            <div class="custom-modal-note">
                This frontend demo does not send real password reset emails.
            </div>
        `,

        onSubmit: data => {
            const email = data.get("email").trim();

            const user = getDB().users.find(item =>
                item.email.toLowerCase() === email.toLowerCase()
            );

            if (!user) {
                showToast("No account found with this email.", "error");
                return false;
            }

            showToast("Account found. Contact the administrator for password reset.");
        }
    });
}

// =========================================================
// 7. DASHBOARD NAVIGATION
// =========================================================

let currentPage = "dashboard";

function openDashboard() {
    $("#loginPage")?.classList.add("hidden");
    $("#app")?.classList.remove("hidden");

    renderDashboard();
}

function showLoginPage() {
    $("#loginPage")?.classList.remove("hidden");
    $("#app")?.classList.add("hidden");

    closeModal();
}

function renderDashboard() {
    const user = getCurrentUser();

    if (!user) {
        showLoginPage();
        return;
    }

    const app = $("#app");

    app.innerHTML = `
        <div class="app-shell">

            <aside class="sidebar">

                <div class="brand">
                    <div class="brand-icon">JF</div>
                    <div>
                        <h2>JobFair</h2>
                        <small>Management System</small>
                    </div>
                </div>

                <div class="user-profile">
                    <div class="avatar">
                        ${escapeHTML(user.name.charAt(0).toUpperCase())}
                    </div>

                    <div>
                        <strong>${escapeHTML(user.name)}</strong>
                        <small>${escapeHTML(user.role.toUpperCase())}</small>
                    </div>
                </div>

                <nav id="sidebarNav" class="sidebar-nav">
                    ${getNavigation(user.role)}
                </nav>

                <div class="side-bottom">
                    <button class="logout-btn" data-action="logout">
                        ↪ &nbsp; Logout
                    </button>
                </div>

            </aside>

            <main class="main-area">

                <header class="topbar">

                    <div>
                        <h3>Welcome, ${escapeHTML(user.name.split(" ")[0])} 👋</h3>
                        <small>Here's what's happening today.</small>
                    </div>

                    <div class="topbar-right">
                        <button class="btn secondary-btn" data-page="notifications">
                            🔔 Notifications
                            <span class="notification-count">
                                ${getUnreadNotifications(user.id)}
                            </span>
                        </button>
                    </div>

                </header>

                <section class="content" id="dashboardContent"></section>

            </main>

        </div>
    `;

    renderPage("dashboard");
}

function getNavigation(role) {
    const common = [
        ["dashboard", "▦", "Dashboard"],
        ["profile", "◉", "My Profile"],
        ["notifications", "♢", "Notifications"],
        ["settings", "⚙", "Settings"]
    ];

    let pages = [];

    if (role === "candidate") {
        pages = [
            ...common.slice(0, 1),
            ["jobs", "⌕", "Find Jobs"],
            ["applications", "▤", "My Applications"],
            ["interviews", "▣", "Interviews"],
            ...common.slice(1)
        ];
    }

    if (role === "company") {
        pages = [
            ...common.slice(0, 1),
            ["postjob", "+", "Post a Job"],
            ["managejobs", "▤", "Manage Jobs"],
            ["applicants", "♙", "Applicants"],
            ["interviews", "▣", "Interviews"],
            ...common.slice(1)
        ];
    }

    if (role === "teacher") {
        pages = [
            ...common.slice(0, 1),
            ["students", "♙", "Students"],
            ["jobs", "⌕", "Available Jobs"],
            ["reports", "▥", "Reports"],
            ["interviews", "▣", "Interviews"],
            ...common.slice(1)
        ];
    }

    return pages.map(([page, icon, label]) => `
        <button class="nav-item ${page === "dashboard" ? "active" : ""}"
            data-page="${page}">
            <span>${icon}</span>
            ${label}
        </button>
    `).join("");
}

function renderPage(page) {
    const user = getCurrentUser();
    if (!user) return;

    currentPage = page;

    $$(".nav-item").forEach(item => {
        item.classList.toggle("active", item.dataset.page === page);
    });

    const content = $("#dashboardContent");
    if (!content) return;

    const pages = {
        dashboard: renderHome,
        jobs: renderJobs,
        postjob: renderPostJob,
        managejobs: renderManageJobs,
        applications: renderApplications,
        applicants: renderApplicants,
        interviews: renderInterviews,
        profile: renderProfile,
        notifications: renderNotifications,
        settings: renderSettings,
        students: renderStudents,
        reports: renderReports
    };

    content.innerHTML = pages[page]
        ? pages[page]()
        : `<div class="empty-state">Page not found.</div>`;
}

// =========================================================
// 8. DASHBOARD HOME
// =========================================================

function renderHome() {
    const user = getCurrentUser();
    const db = getDB();

    let stats = [];

    if (user.role === "candidate") {
        const applications = db.applications.filter(
            app => app.candidateId === user.id
        );

        stats = [
            ["Total Applications", applications.length, "▤"],
            ["Shortlisted", applications.filter(a => a.status === "Shortlisted").length, "✓"],
            ["Interviews", db.interviews.filter(i => i.candidateId === user.id).length, "▣"],
            ["Available Jobs", db.jobs.length, "⌕"]
        ];
    }

    if (user.role === "company") {
        const jobs = db.jobs.filter(job => job.ownerId === user.id);
        const jobIds = jobs.map(job => job.id);

        const applications = db.applications.filter(
            app => jobIds.includes(app.jobId)
        );

        stats = [
            ["Posted Jobs", jobs.length, "▤"],
            ["Total Applicants", applications.length, "♙"],
            ["Shortlisted", applications.filter(a => a.status === "Shortlisted").length, "✓"],
            ["Interviews", db.interviews.filter(i => jobIds.includes(i.jobId)).length, "▣"]
        ];
    }

    if (user.role === "teacher") {
        stats = [
            ["Registered Students", db.users.filter(u => u.role === "candidate").length, "♙"],
            ["Available Jobs", db.jobs.length, "⌕"],
            ["Total Applications", db.applications.length, "▤"],
            ["Scheduled Interviews", db.interviews.length, "▣"]
        ];
    }

    return `
        <div class="page-title">
            <div>
                <h1>Dashboard</h1>
                <p>Overview of your job fair activities.</p>
            </div>
        </div>

        <div class="stats-grid">
            ${stats.map(([label, value, icon]) => `
                <div class="stat-card">
                    <div class="stat-icon">${icon}</div>
                    <h2>${value}</h2>
                    <p>${label}</p>
                </div>
            `).join("")}
        </div>

        <div class="card">
            <div class="flex-between">
                <div>
                    <h3>Quick Overview</h3>
                    <p class="small">Your latest activity and opportunities.</p>
                </div>

                <button class="btn secondary-btn" data-page="jobs">
                    Explore Jobs
                </button>
            </div>

            ${renderRecentActivity(user, db)}
        </div>

        <div class="card">
            <h3>Job Fair at a Glance</h3>
            <p class="small">Available opportunities by job type.</p>
            ${renderJobTypeChart(db.jobs)}
        </div>
    `;
}

function renderRecentActivity(user, db) {
    if (user.role === "candidate") {
        const apps = db.applications
            .filter(app => app.candidateId === user.id)
            .slice(-5)
            .reverse();

        if (!apps.length) {
            return `<div class="empty-state">
                You haven't applied to any jobs yet. Explore available opportunities!
            </div>`;
        }

        return apps.map(app => {
            const job = db.jobs.find(j => j.id === app.jobId);

            return `
                <div class="list-item">
                    <div>
                        <strong>${escapeHTML(job?.title || "Job removed")}</strong>
                        <p class="small">${escapeHTML(job?.company || "")}</p>
                    </div>
                    <span class="status">${escapeHTML(app.status)}</span>
                </div>
            `;
        }).join("");
    }

    if (user.role === "company") {
        const jobs = db.jobs.filter(job => job.ownerId === user.id).slice(-5);

        if (!jobs.length) {
            return `<div class="empty-state">You haven't posted any jobs yet.</div>`;
        }

        return jobs.map(job => `
            <div class="list-item">
                <div>
                    <strong>${escapeHTML(job.title)}</strong>
                    <p class="small">${escapeHTML(job.location)} · ${escapeHTML(job.type)}</p>
                </div>
                <span class="status">Active</span>
            </div>
        `).join("");
    }

    return `
        <div class="list-item">
            <strong>Registered candidates</strong>
            <span>${db.users.filter(u => u.role === "candidate").length}</span>
        </div>
        <div class="list-item">
            <strong>Companies and job opportunities</strong>
            <span>${db.jobs.length} jobs</span>
        </div>
    `;
}

// =========================================================
// 9. JOB TYPE CHART
// =========================================================

function renderJobTypeChart(jobs) {
    const types = ["Full-time", "Part-time", "Internship"];

    const counts = types.map(type => ({
        type,
        count: jobs.filter(job => job.type === type).length
    }));

    const max = Math.max(1, ...counts.map(item => item.count));

    return `
        <div class="chart-container">
            ${counts.map(item => `
                <div class="chart-bar-item">
                    <div class="flex-between">
                        <span>${item.type}</span>
                        <strong>${item.count}</strong>
                    </div>

                    <div style="height:10px;background:#eef2ff;border-radius:20px;overflow:hidden;margin-top:8px;">
                        <div style="height:100%;width:${item.count / max * 100}%;background:#6366f1;border-radius:20px;"></div>
                    </div>
                </div>
            `).join("")}
        </div>
    `;
}

// =========================================================
// 10. FIND JOBS
// =========================================================

function renderJobs() {
    const db = getDB();

    return `
        <div class="page-title">
            <div>
                <h1>Find Jobs</h1>
                <p>Discover opportunities that match your skills.</p>
            </div>

            <button class="btn primary-btn" data-action="nearby">
                📍 Nearby Jobs
            </button>
        </div>

        <div class="card">
            <div class="toolbar">

                <input
                    type="search"
                    id="jobSearch"
                    placeholder="Search title, company, skills or location..."
                    autocomplete="off">

                <select id="jobTypeFilter">
                    <option value="">All Job Types</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                </select>

                <select id="jobLocationFilter">
                    <option value="">All Locations</option>

                    ${[...new Set(db.jobs.map(job => job.location))].map(location => `
                        <option value="${escapeHTML(location)}">
                            ${escapeHTML(location)}
                        </option>
                    `).join("")}
                </select>

                <button class="btn secondary-btn" data-action="search-jobs">
                    Search
                </button>

                <button class="btn secondary-btn" data-action="clear-search">
                    Clear
                </button>

            </div>
        </div>

        <div class="flex-between" style="margin:15px 0;">
            <p id="jobCount" class="small">
                ${db.jobs.length} opportunities available
            </p>
        </div>

        <div id="jobResults" class="job-grid">
            ${renderJobCards(db.jobs)}
        </div>
    `;
}

// =========================================================
// 11. JOB CARDS WITH INDIVIDUAL ELIGIBILITY
// =========================================================

function renderJobCards(jobs) {
    const user = getCurrentUser();

    if (!jobs.length) {
        return `
            <div class="empty-state">
                <h3>No jobs found</h3>
                <p>Try another keyword or change your filters.</p>
            </div>
        `;
    }

    const db = getDB();

    return jobs.map(job => {
        const alreadyApplied = db.applications.some(app =>
            app.jobId === job.id && app.candidateId === user.id
        );

        const eligibility = user.role === "candidate"
            ? getEligibility(user.id, job)
            : null;

        return `
            <div class="job-card">

                <div class="job-card-header">
                    <div class="company-logo">
                        ${escapeHTML(job.company.charAt(0))}
                    </div>

                    <span class="status">
                        ${escapeHTML(job.type)}
                    </span>
                </div>

                <h3>${escapeHTML(job.title)}</h3>

                <p>${escapeHTML(job.company)}</p>

                <div class="job-meta">
                    <span>📍 ${escapeHTML(job.location)}</span>
                    <span>💼 ${escapeHTML(job.type)}</span>
                </div>

                <div class="job-salary">
                    ${escapeHTML(job.salary)}
                </div>

                <p class="small">
                    ${escapeHTML(job.description)}
                </p>

                <p class="small">
                    <strong>Skills:</strong>
                    ${escapeHTML(job.skills)}
                </p>

                <div class="custom-modal-note" style="margin:12px 0;">
                    <strong>Eligibility Criteria</strong><br>

                    Minimum CGPA:
                    ${Number(job.minCgpa || 0).toFixed(2)}<br>

                    Qualification:
                    ${escapeHTML(job.qualification || "Any")}<br>

                    Required Skills:
                    ${escapeHTML(job.requiredSkills || "Not mandatory")}<br>

                    Required Certificates:
                    ${escapeHTML(job.requiredCertificates || "Not mandatory")}
                </div>

                ${user.role === "candidate" ? `

                    <div style="
                        padding:12px;
                        border-radius:10px;
                        margin-bottom:12px;
                        background:${eligibility.eligible ? "#dcfce7" : "#fee2e2"};
                        color:${eligibility.eligible ? "#166534" : "#991b1b"};
                    ">

                        <strong>
                            ${eligibility.eligible ? "✓ Eligible" : "✕ Not Eligible"}
                        </strong>

                        ${eligibility.reasons.length ? `
                            <ul style="margin:8px 0 0;padding-left:18px;">
                                ${eligibility.reasons.map(reason => `
                                    <li>${escapeHTML(reason)}</li>
                                `).join("")}
                            </ul>
                        ` : `
                            <p style="margin:5px 0 0;font-size:12px;">
                                Your profile matches this job's criteria.
                            </p>
                        `}

                    </div>

                    <button
                        class="btn primary-btn"
                        data-action="apply"
                        data-id="${job.id}"
                        ${alreadyApplied || !eligibility.eligible ? "disabled" : ""}>

                        ${alreadyApplied
                            ? "Already Applied ✓"
                            : !eligibility.eligible
                                ? "Not Eligible"
                                : "Apply Now"
                        }

                    </button>

                ` : ""}

            </div>
        `;
    }).join("");
}

// =========================================================
// 12. JOB SEARCH AND FILTERS
// =========================================================

function searchJobs() {
    const db = getDB();

    const keyword = ($("#jobSearch")?.value || "").trim().toLowerCase();
    const type = $("#jobTypeFilter")?.value || "";
    const location = ($("#jobLocationFilter")?.value || "").toLowerCase();

    const filtered = db.jobs.filter(job => {
        const searchableText = [
            job.title,
            job.company,
            job.skills,
            job.description,
            job.location,
            job.type,
            job.qualification,
            job.requiredSkills
        ].join(" ").toLowerCase();

        const matchesKeyword = !keyword || searchableText.includes(keyword);
        const matchesType = !type || job.type === type;

        const matchesLocation = !location ||
            job.location.toLowerCase() === location;

        return matchesKeyword && matchesType && matchesLocation;
    });

    const results = $("#jobResults");

    if (results) {
        results.innerHTML = renderJobCards(filtered);
    }

    const count = $("#jobCount");

    if (count) {
        count.textContent = `${filtered.length} matching opportunities found`;
    }
}

function clearJobSearch() {
    if ($("#jobSearch")) $("#jobSearch").value = "";
    if ($("#jobTypeFilter")) $("#jobTypeFilter").value = "";
    if ($("#jobLocationFilter")) $("#jobLocationFilter").value = "";

    searchJobs();
}

// =========================================================
// PART 1 END
// Continue PART 2 directly below this code.
// ========================================================
// =========================================================
// 13. APPLY FOR JOB
// =========================================================

function applyForJob(jobId) {
    const user = getCurrentUser();

    if (!user || user.role !== "candidate") return;

    const db = getDB();

    const job = db.jobs.find(item => item.id === Number(jobId));

    if (!job) {
        showToast("Job not found.", "error");
        return;
    }

    const eligibility = getEligibility(user.id, job);

    if (!eligibility.eligible) {
        showToast("You are not eligible for this job.", "error");
        return;
    }

    const alreadyApplied = db.applications.some(app =>
        app.jobId === job.id && app.candidateId === user.id
    );

    if (alreadyApplied) {
        showToast("You have already applied for this job.", "error");
        return;
    }

    openModal({
        title: "Confirm Job Application",
        description: `You are applying for ${job.title} at ${job.company}.`,
        icon: "📄",
        submitText: "Submit Application",

        content: `
            <div class="custom-modal-note">
                <strong>${escapeHTML(job.title)}</strong><br>
                ${escapeHTML(job.company)}<br>
                ${escapeHTML(job.location)} · ${escapeHTML(job.salary)}
            </div>

            <div class="modal-field" style="margin-top:18px;">
                <label>Why should the company select you?</label>
                <textarea name="coverLetter" rows="4"
                    placeholder="Write a short introduction about yourself..."
                    required></textarea>
            </div>
        `,

        onSubmit: data => {
            const coverLetter = data.get("coverLetter").trim();

            if (!coverLetter) {
                showToast("Please write a short introduction.", "error");
                return false;
            }

            const latestDB = getDB();

            if (latestDB.applications.some(app =>
                app.jobId === job.id && app.candidateId === user.id
            )) {
                showToast("You have already applied.", "error");
                return;
            }

            latestDB.applications.push({
                id: generateId(),
                jobId: job.id,
                candidateId: user.id,
                companyId: job.ownerId,
                coverLetter,
                status: "Applied",
                appliedAt: new Date().toISOString()
            });

            latestDB.notifications.push({
                id: generateId(),
                userId: job.ownerId,
                title: "New Job Application",
                message: `${user.name} applied for ${job.title}.`,
                read: false,
                createdAt: new Date().toISOString()
            });

            saveDB(latestDB);

            showToast("Your application has been submitted!");

            renderPage(currentPage);
        }
    });
}

// =========================================================
// 14. COMPANY POST JOB
// =========================================================

function renderPostJob() {
    return `
        <div class="page-title">
            <div>
                <h1>Post a New Job</h1>
                <p>Create an opportunity and define its eligibility criteria.</p>
            </div>
        </div>

        <div class="card">

            <form id="postJobForm">

                <h3>Job Information</h3>

                <div class="form-grid">

                    <div class="form-group">
                        <label>Job Title *</label>
                        <input name="title" type="text"
                            placeholder="e.g. Frontend Developer" required>
                    </div>

                    <div class="form-group">
                        <label>Company Name *</label>
                        <input name="company" type="text"
                            placeholder="Enter company name" required>
                    </div>

                    <div class="form-group">
                        <label>Job Location *</label>
                        <input name="location" type="text"
                            placeholder="e.g. Bangalore" required>
                    </div>

                    <div class="form-group">
                        <label>Job Type *</label>
                        <select name="type" required>
                            <option value="">Select Job Type</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Internship</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Salary / Stipend *</label>
                        <input name="salary" type="text"
                            placeholder="e.g. ₹6 LPA or ₹20,000/month" required>
                    </div>

                    <div class="form-group">
                        <label>Required Skills</label>
                        <input name="skills" type="text"
                            placeholder="e.g. HTML, CSS, JavaScript">
                    </div>

                    <div class="form-group full-width">
                        <label>Job Description *</label>
                        <textarea name="description" rows="4"
                            placeholder="Describe the role and responsibilities..."
                            required></textarea>
                    </div>

                </div>

                <hr style="margin:25px 0;">

                <h3>Student Eligibility Criteria</h3>

                <p class="small">
                    Set individual requirements for this particular job.
                    Students will be checked automatically.
                </p>

                <div class="form-grid">

                    <div class="form-group">
                        <label>Minimum CGPA *</label>
                        <input name="minCgpa" type="number"
                            min="0" max="10" step="0.01"
                            placeholder="e.g. 8.5" required>
                    </div>

                    <div class="form-group">
                        <label>Required Qualification *</label>
                        <select name="qualification" required>
                            <option value="Any">Any Qualification</option>
                            <option value="B.Tech CSE">B.Tech CSE</option>
                            <option value="B.Tech IT">B.Tech IT</option>
                            <option value="B.Tech ECE">B.Tech ECE</option>
                            <option value="BCA">BCA</option>
                            <option value="MCA">MCA</option>
                            <option value="MBA">MBA</option>
                            <option value="BBA">BBA</option>
                            <option value="B.Com">B.Com</option>
                            <option value="B.Sc">B.Sc</option>
                        </select>
                    </div>

                    <div class="form-group full-width">
                        <label>Mandatory Skills</label>
                        <input name="requiredSkills" type="text"
                            placeholder="e.g. Java, Python, SQL">

                        <small class="small">
                            Separate multiple skills using commas.
                        </small>
                    </div>

                    <div class="form-group full-width">
                        <label>Required Certificates</label>
                        <input name="requiredCertificates" type="text"
                            placeholder="e.g. Python Certificate, AWS Certificate">

                        <small class="small">
                            Leave blank if certificates are not mandatory.
                        </small>
                    </div>

                </div>

                <div class="custom-modal-note" style="margin:20px 0;">
                    <strong>How eligibility works:</strong><br>
                    A student must meet the CGPA and qualification criteria
                    and possess all the mandatory skills and certificates.
                </div>

                <button class="btn primary-btn" type="submit">
                    + Publish Job
                </button>

            </form>

        </div>
    `;
}

// =========================================================
// 15. HANDLE JOB POSTING
// =========================================================

function handlePostJob(form) {
    const user = getCurrentUser();

    if (!user || user.role !== "company") return;

    const data = new FormData(form);

    const title = data.get("title").trim();
    const company = data.get("company").trim();
    const location = data.get("location").trim();
    const type = data.get("type");
    const salary = data.get("salary").trim();
    const description = data.get("description").trim();

    const minCgpa = Number(data.get("minCgpa"));

    if (
        !title ||
        !company ||
        !location ||
        !type ||
        !salary ||
        !description
    ) {
        showToast("Please complete all required fields.", "error");
        return;
    }

    if (Number.isNaN(minCgpa) || minCgpa < 0 || minCgpa > 10) {
        showToast("Enter a valid CGPA between 0 and 10.", "error");
        return;
    }

    const db = getDB();

    const job = {
        id: generateId(),
        title,
        company,
        location,
        type,
        salary,
        description,
        skills: data.get("skills").trim(),
        minCgpa,
        qualification: data.get("qualification"),
        requiredSkills: data.get("requiredSkills").trim(),
        requiredCertificates: data.get("requiredCertificates").trim(),
        ownerId: user.id,
        postedAt: new Date().toISOString()
    };

    db.jobs.unshift(job);
    saveDB(db);

    showToast("Your job has been published successfully!");

    renderPage("managejobs");
}

// =========================================================
// 16. MANAGE COMPANY JOBS
// =========================================================

function renderManageJobs() {
    const user = getCurrentUser();

    const jobs = getDB().jobs.filter(job => job.ownerId === user.id);

    return `
        <div class="page-title">
            <div>
                <h1>Manage Jobs</h1>
                <p>View and manage your published opportunities.</p>
            </div>

            <button class="btn primary-btn" data-page="postjob">
                + Post New Job
            </button>
        </div>

        ${jobs.length ? `
            <div class="job-grid">
                ${jobs.map(job => `
                    <div class="job-card">

                        <div class="job-card-header">
                            <div class="company-logo">
                                ${escapeHTML(job.company.charAt(0))}
                            </div>

                            <span class="status">Active</span>
                        </div>

                        <h3>${escapeHTML(job.title)}</h3>

                        <p>${escapeHTML(job.company)}</p>

                        <div class="job-meta">
                            <span>📍 ${escapeHTML(job.location)}</span>
                            <span>💼 ${escapeHTML(job.type)}</span>
                        </div>

                        <div class="job-salary">
                            ${escapeHTML(job.salary)}
                        </div>

                        <div class="custom-modal-note">
                            <strong>Eligibility Criteria</strong><br>
                            Minimum CGPA: ${job.minCgpa}<br>
                            Qualification: ${escapeHTML(job.qualification)}<br>
                            Skills: ${escapeHTML(job.requiredSkills || "Not mandatory")}<br>
                            Certificates: ${escapeHTML(job.requiredCertificates || "Not mandatory")}
                        </div>

                        <div class="flex-between" style="margin-top:15px;gap:10px;">

                            <button class="btn secondary-btn"
                                data-action="view-job-applicants"
                                data-id="${job.id}">
                                Applicants
                            </button>

                            <button class="btn danger-btn"
                                data-action="delete-job"
                                data-id="${job.id}">
                                Delete
                            </button>

                        </div>

                    </div>
                `).join("")}
            </div>
        ` : `
            <div class="empty-state">
                <h3>No jobs posted yet</h3>
                <p>Create your first job opportunity.</p>
                <button class="btn primary-btn" data-page="postjob">
                    Post a Job
                </button>
            </div>
        `}
    `;
}

// =========================================================
// 17. DELETE JOB
// =========================================================

function deleteJob(jobId) {
    const user = getCurrentUser();
    const db = getDB();

    const job = db.jobs.find(item =>
        item.id === Number(jobId) && item.ownerId === user.id
    );

    if (!job) {
        showToast("Job not found or access denied.", "error");
        return;
    }

    openModal({
        title: "Delete Job Posting?",
        description: `Are you sure you want to delete "${job.title}"? This will also remove its related applications and interviews.`,
        icon: "🗑️",
        submitText: "Delete Job",
        danger: true,

        onSubmit: () => {
            const latestDB = getDB();

            latestDB.jobs = latestDB.jobs.filter(
                item => item.id !== job.id
            );

            latestDB.applications = latestDB.applications.filter(
                app => app.jobId !== job.id
            );

            latestDB.interviews = latestDB.interviews.filter(
                interview => interview.jobId !== job.id
            );

            saveDB(latestDB);

            showToast("Job deleted successfully.");
            renderPage("managejobs");
        }
    });
}

// =========================================================
// 18. CANDIDATE APPLICATIONS
// =========================================================

function renderApplications() {
    const user = getCurrentUser();
    const db = getDB();

    const applications = db.applications
        .filter(app => app.candidateId === user.id)
        .reverse();

    return `
        <div class="page-title">
            <div>
                <h1>My Applications</h1>
                <p>Track the progress of your job applications.</p>
            </div>
        </div>

        <div class="card">

            ${applications.length ? `
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Location</th>
                                <th>Applied On</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${applications.map(app => {
                                const job = db.jobs.find(j => j.id === app.jobId);

                                return `
                                    <tr>
                                        <td>${escapeHTML(job?.title || "Deleted Job")}</td>
                                        <td>${escapeHTML(job?.company || "—")}</td>
                                        <td>${escapeHTML(job?.location || "—")}</td>
                                        <td>${new Date(app.appliedAt).toLocaleDateString("en-IN")}</td>
                                        <td>
                                            <span class="status">
                                                ${escapeHTML(app.status)}
                                            </span>
                                        </td>
                                    </tr>
                                `;
                            }).join("")}
                        </tbody>
                    </table>
                </div>
            ` : `
                <div class="empty-state">
                    <h3>No applications yet</h3>
                    <p>Start exploring jobs and apply to suitable opportunities.</p>

                    <button class="btn primary-btn" data-page="jobs">
                        Find Jobs
                    </button>
                </div>
            `}

        </div>
    `;
}

// =========================================================
// 19. COMPANY APPLICANTS
// =========================================================

function renderApplicants(selectedJobId = null) {
    const user = getCurrentUser();
    const db = getDB();

    const companyJobs = db.jobs.filter(job => job.ownerId === user.id);
    const companyJobIds = companyJobs.map(job => job.id);

    let applications = db.applications.filter(app =>
        companyJobIds.includes(app.jobId)
    );

    if (selectedJobId) {
        applications = applications.filter(
            app => app.jobId === Number(selectedJobId)
        );
    }

    return `
        <div class="page-title">
            <div>
                <h1>Applicants</h1>
                <p>Review student applications and eligibility.</p>
            </div>
        </div>

        <div class="card">

            <div class="toolbar">
                <select id="applicantJobFilter">
                    <option value="">All My Jobs</option>

                    ${companyJobs.map(job => `
                        <option value="${job.id}"
                            ${selectedJobId === job.id ? "selected" : ""}>
                            ${escapeHTML(job.title)}
                        </option>
                    `).join("")}
                </select>

                <select id="applicantStatusFilter">
                    <option value="">All Statuses</option>
                    <option>Applied</option>
                    <option>Shortlisted</option>
                    <option>Rejected</option>
                    <option>Selected</option>
                </select>

                <button class="btn secondary-btn" data-action="filter-applicants">
                    Filter
                </button>
            </div>

            ${applications.length ? `
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Job</th>
                                <th>CGPA</th>
                                <th>Eligibility</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${applications.map(app => {
                                const candidate = db.users.find(
                                    u => u.id === app.candidateId
                                );

                                const profile = db.profiles[app.candidateId] || {};

                                const job = db.jobs.find(
                                    j => j.id === app.jobId
                                );

                                const eligibility = job
                                    ? getEligibility(app.candidateId, job)
                                    : { eligible: false, reasons: ["Job unavailable"] };

                                return `
                                    <tr>
                                        <td>
                                            <strong>${escapeHTML(candidate?.name || "Unknown")}</strong>
                                            <br>
                                            <small>${escapeHTML(candidate?.email || "")}</small>
                                        </td>

                                        <td>${escapeHTML(job?.title || "Deleted Job")}</td>

                                        <td>${profile.cgpa ?? "Not added"}</td>

                                        <td>
                                            <span class="status">
                                                ${eligibility.eligible ? "Eligible" : "Not Eligible"}
                                            </span>
                                        </td>

                                        <td>
                                            <select class="status-select"
                                                data-action="change-application-status"
                                                data-id="${app.id}">
                                                ${["Applied", "Shortlisted", "Rejected", "Selected"].map(status => `
                                                    <option value="${status}"
                                                        ${app.status === status ? "selected" : ""}>
                                                        ${status}
                                                    </option>
                                                `).join("")}
                                            </select>
                                        </td>

                                        <td>
                                            <button class="btn secondary-btn"
                                                data-action="view-applicant"
                                                data-id="${app.id}">
                                                View
                                            </button>

                                            <button class="btn primary-btn"
                                                data-action="schedule-interview"
                                                data-id="${app.id}">
                                                Interview
                                            </button>
                                        </td>
                                    </tr>
                                `;
                            }).join("")}
                        </tbody>
                    </table>
                </div>
            ` : `
                <div class="empty-state">
                    <h3>No applicants yet</h3>
                    <p>Applications received for your jobs will appear here.</p>
                </div>
            `}

        </div>
    `;
}

// =========================================================
// 20. FILTER APPLICANTS
// =========================================================

function filterApplicants() {
    const jobId = $("#applicantJobFilter")?.value || "";
    const status = $("#applicantStatusFilter")?.value || "";

    const user = getCurrentUser();
    const db = getDB();

    const companyJobIds = db.jobs
        .filter(job => job.ownerId === user.id)
        .map(job => job.id);

    let applications = db.applications.filter(app =>
        companyJobIds.includes(app.jobId)
    );

    if (jobId) {
        applications = applications.filter(
            app => app.jobId === Number(jobId)
        );
    }

    if (status) {
        applications = applications.filter(
            app => app.status === status
        );
    }

    renderApplicantTable(applications);
}

function renderApplicantTable(applications) {
    const tbody = $("#dashboardContent tbody");

    if (!tbody) return;

    const db = getDB();

    if (!applications.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">No matching applicants found.</td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = applications.map(app => {
        const candidate = db.users.find(u => u.id === app.candidateId);
        const profile = db.profiles[app.candidateId] || {};
        const job = db.jobs.find(j => j.id === app.jobId);

        const eligibility = job
            ? getEligibility(app.candidateId, job)
            : { eligible: false };

        return `
            <tr>
                <td>
                    <strong>${escapeHTML(candidate?.name || "Unknown")}</strong>
                    <br>
                    <small>${escapeHTML(candidate?.email || "")}</small>
                </td>

                <td>${escapeHTML(job?.title || "Deleted Job")}</td>
                <td>${profile.cgpa ?? "Not added"}</td>

                <td>${eligibility.eligible ? "Eligible" : "Not Eligible"}</td>

                <td>
                    <select class="status-select"
                        data-action="change-application-status"
                        data-id="${app.id}">
                        ${["Applied", "Shortlisted", "Rejected", "Selected"].map(status => `
                            <option ${app.status === status ? "selected" : ""}>
                                ${status}
                            </option>
                        `).join("")}
                    </select>
                </td>

                <td>
                    <button class="btn secondary-btn"
                        data-action="view-applicant"
                        data-id="${app.id}">
                        View
                    </button>

                    <button class="btn primary-btn"
                        data-action="schedule-interview"
                        data-id="${app.id}">
                        Interview
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}

// =========================================================
// 21. CHANGE APPLICATION STATUS
// =========================================================

function updateApplicationStatus(applicationId, newStatus) {
    const user = getCurrentUser();
    const db = getDB();

    const application = db.applications.find(
        app => app.id === Number(applicationId)
    );

    if (!application) return;

    const job = db.jobs.find(j => j.id === application.jobId);

    if (!job || job.ownerId !== user.id) {
        showToast("You cannot update this application.", "error");
        return;
    }

    const allowedStatuses = [
        "Applied",
        "Shortlisted",
        "Rejected",
        "Selected"
    ];

    if (!allowedStatuses.includes(newStatus)) return;

    application.status = newStatus;

    db.notifications.push({
        id: generateId(),
        userId: application.candidateId,
        title: "Application Status Updated",
        message: `Your application for ${job.title} is now ${newStatus}.`,
        read: false,
        createdAt: new Date().toISOString()
    });

    saveDB(db);

    showToast("Application status updated.");
    renderPage("applicants");
}

// =========================================================
// 22. VIEW APPLICANT DETAILS
// =========================================================

function viewApplicant(applicationId) {
    const db = getDB();

    const app = db.applications.find(
        item => item.id === Number(applicationId)
    );

    if (!app) return;

    const candidate = db.users.find(
        user => user.id === app.candidateId
    );

    const profile = db.profiles[app.candidateId] || {};
    const job = db.jobs.find(item => item.id === app.jobId);

    const eligibility = job
        ? getEligibility(app.candidateId, job)
        : { eligible: false, reasons: ["Job unavailable"] };

    openModal({
        title: "Applicant Profile",
        description: "Review the candidate's information and qualifications.",
        icon: "♙",
        submitText: "Close",

        content: `
            <div class="modal-field">
                <label>Full Name</label>
                <div class="custom-modal-note">
                    ${escapeHTML(candidate?.name || "Unknown")}
                </div>
            </div>

            <div class="modal-field">
                <label>Email</label>
                <div class="custom-modal-note">
                    ${escapeHTML(candidate?.email || "Not available")}
                </div>
            </div>

            <div class="modal-field">
                <label>CGPA</label>
                <div class="custom-modal-note">
                    ${profile.cgpa ?? "Not added"}
                </div>
            </div>

            <div class="modal-field">
                <label>Qualification</label>
                <div class="custom-modal-note">
                    ${escapeHTML(profile.qualification || "Not added")}
                </div>
            </div>

            <div class="modal-field">
                <label>Skills</label>
                <div class="custom-modal-note">
                    ${escapeHTML(profile.skills || "Not added")}
                </div>
            </div>

            <div class="modal-field">
                <label>Certificates</label>
                <div class="custom-modal-note">
                    ${escapeHTML(profile.certificates || "Not added")}
                </div>
            </div>

            <div class="modal-field">
                <label>Resume Link</label>
                <div class="custom-modal-note">
                    ${profile.resume
                        ? `<a href="${escapeHTML(profile.resume)}" target="_blank" rel="noopener noreferrer">View Resume</a>`
                        : "Not added"}
                </div>
            </div>

            <div class="modal-field">
                <label>Eligibility for ${escapeHTML(job?.title || "Job")}</label>
                <div class="custom-modal-note">
                    ${eligibility.eligible
                        ? "✓ Candidate meets all requirements."
                        : eligibility.reasons.map(reason => escapeHTML(reason)).join("<br>")}
                </div>
            </div>

            <div class="modal-field">
                <label>Cover Letter</label>
                <div class="custom-modal-note">
                    ${escapeHTML(app.coverLetter || "Not provided")}
                </div>
            </div>
        `
    });
}

// =========================================================
// 23. INTERVIEW SCHEDULING
// =========================================================

function scheduleInterview(applicationId) {
    const user = getCurrentUser();
    const db = getDB();

    const app = db.applications.find(
        item => item.id === Number(applicationId)
    );

    if (!app) {
        showToast("Application not found.", "error");
        return;
    }

    const job = db.jobs.find(item => item.id === app.jobId);

    if (!job || job.ownerId !== user.id) {
        showToast("You cannot schedule this interview.", "error");
        return;
    }

    const eligibility = getEligibility(app.candidateId, job);

    if (!eligibility.eligible) {
        showToast("This candidate does not meet the job requirements.", "error");
        return;
    }

    openModal({
        title: "Schedule Interview",
        description: "Choose the interview date, time and mode.",
        icon: "📅",
        submitText: "Schedule Interview",

        content: `
            <div class="modal-field">
                <label>Job Position</label>
                <div class="custom-modal-note">
                    ${escapeHTML(job.title)}
                </div>
            </div>

            <div class="modal-field">
                <label>Interview Date *</label>
                <input type="date" name="date"
                    min="${new Date().toISOString().split("T")[0]}"
                    required>
            </div>

            <div class="modal-field">
                <label>Interview Time *</label>
                <input type="time" name="time" required>
            </div>

            <div class="modal-field">
                <label>Interview Mode *</label>
                <select name="mode" required>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                </select>
            </div>

            <div class="modal-field">
                <label>Meeting Link / Venue</label>
                <input type="text" name="venue"
                    placeholder="Enter meeting link or venue">
            </div>
        `,

        onSubmit: data => {
            const date = data.get("date");
            const time = data.get("time");
            const mode = data.get("mode");
            const venue = data.get("venue").trim();

            if (!date || !time) {
                showToast("Please select date and time.", "error");
                return false;
            }

            const selectedDate = new Date(`${date}T${time}`);

            if (selectedDate <= new Date()) {
                showToast("Please select a future interview time.", "error");
                return false;
            }

            const latestDB = getDB();

            const latestApp = latestDB.applications.find(
                item => item.id === app.id
            );

            if (!latestApp) {
                showToast("Application no longer exists.", "error");
                return false;
            }

            latestDB.interviews.push({
                id: generateId(),
                applicationId: app.id,
                jobId: job.id,
                candidateId: app.candidateId,
                companyId: user.id,
                date,
                time,
                mode,
                venue,
                status: "Scheduled",
                createdAt: new Date().toISOString()
            });

            latestApp.status = "Shortlisted";

            latestDB.notifications.push({
                id: generateId(),
                userId: app.candidateId,
                title: "Interview Scheduled",
                message: `Interview for ${job.title} scheduled on ${formatDate(date)} at ${time}.`,
                read: false,
                createdAt: new Date().toISOString()
            });

            saveDB(latestDB);

            showToast("Interview scheduled successfully!");
            renderPage("interviews");
        }
    });
}

// =========================================================
// 24. INTERVIEW LIST
// =========================================================

function renderInterviews() {
    const user = getCurrentUser();
    const db = getDB();

    let interviews = [];

    if (user.role === "candidate") {
        interviews = db.interviews.filter(
            interview => interview.candidateId === user.id
        );
    } else if (user.role === "company") {
        interviews = db.interviews.filter(
            interview => interview.companyId === user.id
        );
    } else {
        interviews = db.interviews;
    }

    interviews.sort((a, b) =>
        new Date(a.date + "T" + a.time) -
        new Date(b.date + "T" + b.time)
    );

    return `
        <div class="page-title">
            <div>
                <h1>Interview Schedule</h1>
                <p>Manage upcoming interviews and recruitment meetings.</p>
            </div>
        </div>

        <div class="card">

            ${interviews.length ? `
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                ${user.role !== "candidate" ? "<th>Candidate</th>" : ""}
                                <th>Job Position</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Mode</th>
                                <th>Venue / Link</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${interviews.map(interview => {
                                const job = db.jobs.find(
                                    j => j.id === interview.jobId
                                );

                                const candidate = db.users.find(
                                    u => u.id === interview.candidateId
                                );

                                return `
                                    <tr>
                                        ${user.role !== "candidate" ? `
                                            <td>${escapeHTML(candidate?.name || "Unknown")}</td>
                                        ` : ""}

                                        <td>${escapeHTML(job?.title || "Deleted Job")}</td>
                                        <td>${formatDate(interview.date)}</td>
                                        <td>${escapeHTML(interview.time)}</td>
                                        <td>${escapeHTML(interview.mode)}</td>

                                        <td>
                                            ${interview.venue
                                                ? `<a href="${/^https?:\/\//i.test(interview.venue) ? escapeHTML(interview.venue) : "#"}" target="_blank" rel="noopener noreferrer">${escapeHTML(interview.venue)}</a>`
                                                : "—"}
                                        </td>

                                        <td>
                                            <span class="status">
                                                ${escapeHTML(interview.status)}
                                            </span>
                                        </td>
                                    </tr>
                                `;
                            }).join("")}
                        </tbody>
                    </table>
                </div>
            ` : `
                <div class="empty-state">
                    <h3>No interviews scheduled</h3>
                    <p>Your interview schedule will appear here.</p>
                </div>
            `}

        </div>
    `;
}

// =========================================================
// 25. UPDATE INTERVIEW STATUS
// =========================================================

function updateInterviewStatus(interviewId, status) {
    const user = getCurrentUser();
    const db = getDB();

    const interview = db.interviews.find(
        item => item.id === Number(interviewId)
    );

    if (!interview) return;

    if (user.role !== "company" || interview.companyId !== user.id) {
        showToast("You cannot update this interview.", "error");
        return;
    }

    interview.status = status;
    saveDB(db);

    showToast("Interview status updated.");
    renderPage("interviews");
}

// =========================================================
// 26. CANDIDATE PROFILE
// =========================================================

function renderProfile() {
    const user = getCurrentUser();
    const db = getDB();

    const profile = db.profiles[user.id] || {};

    const isCandidate = user.role === "candidate";

    return `
        <div class="page-title">
            <div>
                <h1>My Profile</h1>
                <p>Manage your personal and professional information.</p>
            </div>
        </div>

        <div class="card">

            <div class="profile-header">

                <div class="large-avatar">
                    ${escapeHTML(user.name.charAt(0).toUpperCase())}
                </div>

                <div>
                    <h2>${escapeHTML(user.name)}</h2>
                    <p>${escapeHTML(user.email)}</p>
                    <span class="status">${escapeHTML(user.role)}</span>
                </div>

            </div>

            <form id="profileForm">

                <div class="form-grid">

                    <div class="form-group">
                        <label>Full Name *</label>
                        <input name="name" type="text"
                            value="${escapeHTML(user.name)}" required>
                    </div>

                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email"
                            value="${escapeHTML(user.email)}" disabled>
                    </div>

                    ${isCandidate ? `

                        <div class="form-group">
                            <label>CGPA *</label>
                            <input name="cgpa" type="number"
                                min="0" max="10" step="0.01"
                                value="${profile.cgpa ?? ""}"
                                placeholder="e.g. 8.5" required>
                        </div>

                        <div class="form-group">
                            <label>Qualification *</label>
                            <select name="qualification" required>
                                ${[
                                    "B.Tech CSE",
                                    "B.Tech IT",
                                    "B.Tech ECE",
                                    "BCA",
                                    "MCA",
                                    "MBA",
                                    "BBA",
                                    "B.Com",
                                    "B.Sc"
                                ].map(value => `
                                    <option value="${value}"
                                        ${profile.qualification === value ? "selected" : ""}>
                                        ${value}
                                    </option>
                                `).join("")}
                            </select>
                        </div>

                        <div class="form-group full-width">
                            <label>Skills</label>
                            <input name="skills" type="text"
                                value="${escapeHTML(profile.skills || "")}"
                                placeholder="e.g. HTML, CSS, JavaScript, Python">

                            <small class="small">
                                Enter skills separated by commas.
                            </small>
                        </div>

                        <div class="form-group full-width">
                            <label>Certificates</label>
                            <input name="certificates" type="text"
                                value="${escapeHTML(profile.certificates || "")}"
                                placeholder="e.g. Python Certificate, AWS Certificate">

                            <small class="small">
                                Enter certificate names separated by commas.
                            </small>
                        </div>

                        <div class="form-group full-width">
                            <label>Resume Link</label>
                            <input name="resume" type="url"
                                value="${escapeHTML(profile.resume || "")}"
                                placeholder="https://drive.google.com/...">

                        </div>

                    ` : `

                        <div class="form-group full-width">
                            <label>About</label>
                            <textarea name="about" rows="4"
                                placeholder="Write a short introduction...">${escapeHTML(profile.about || "")}</textarea>
                        </div>

                    `}

                </div>

                <button type="submit" class="btn primary-btn">
                    Save Profile
                </button>

            </form>

        </div>
    `;
}

// =========================================================
// 27. SAVE PROFILE
// =========================================================

function saveProfile(form) {
    const user = getCurrentUser();
    const data = new FormData(form);
    const db = getDB();

    const name = data.get("name").trim();

    if (!name) {
        showToast("Name cannot be empty.", "error");
        return;
    }

    user.name = name;

    const profile = db.profiles[user.id] || {};

    if (user.role === "candidate") {
        const cgpaValue = data.get("cgpa");

        if (
            cgpaValue === "" ||
            Number(cgpaValue) < 0 ||
            Number(cgpaValue) > 10
        ) {
            showToast("Please enter a valid CGPA between 0 and 10.", "error");
            return;
        }

        const resume = data.get("resume").trim();

        if (resume && !/^https?:\/\//i.test(resume)) {
            showToast("Resume must be a valid HTTP or HTTPS link.", "error");
            return;
        }

        db.profiles[user.id] = {
            ...profile,
            cgpa: Number(cgpaValue),
            qualification: data.get("qualification"),
            skills: data.get("skills").trim(),
            certificates: data.get("certificates").trim(),
            resume
        };
    } else {
        db.profiles[user.id] = {
            ...profile,
            about: data.get("about")?.trim() || ""
        };
    }

    saveDB(db);

    showToast("Profile updated successfully!");

    renderDashboard();
}

// =========================================================
// PART 2 END
// Continue PART 3 directly below this code.
// =========================================================

// =========================================================
// 28. NOTIFICATIONS
// =========================================================

function getUnreadNotifications(userId) {
    return getDB().notifications.filter(
        notification => notification.userId === userId && !notification.read
    ).length;
}

function renderNotifications() {
    const user = getCurrentUser();
    const db = getDB();

    const notifications = db.notifications
        .filter(notification => notification.userId === user.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return `
        <div class="page-title">
            <div>
                <h1>Notifications</h1>
                <p>Stay updated with your latest activities.</p>
            </div>

            <button class="btn secondary-btn" data-action="mark-all-read">
                ✓ Mark All as Read
            </button>
        </div>

        <div class="card">

            ${notifications.length ? `
                ${notifications.map(notification => `
                    <div class="notification-item ${notification.read ? "" : "unread"}">

                        <div class="notification-icon">
                            🔔
                        </div>

                        <div class="notification-content">
                            <strong>${escapeHTML(notification.title)}</strong>

                            <p>${escapeHTML(notification.message)}</p>

                            <small>
                                ${new Date(notification.createdAt).toLocaleString("en-IN")}
                            </small>
                        </div>

                        ${!notification.read ? `
                            <button class="btn secondary-btn"
                                data-action="mark-read"
                                data-id="${notification.id}">
                                Mark Read
                            </button>
                        ` : `
                            <span class="status">Read</span>
                        `}

                    </div>
                `).join("")}
            ` : `
                <div class="empty-state">
                    <h3>No notifications</h3>
                    <p>You're all caught up!</p>
                </div>
            `}

        </div>
    `;
}

// =========================================================
// 29. MARK NOTIFICATIONS AS READ
// =========================================================

function markNotificationRead(notificationId) {
    const user = getCurrentUser();
    const db = getDB();

    const notification = db.notifications.find(item =>
        item.id === Number(notificationId) &&
        item.userId === user.id
    );

    if (!notification) return;

    notification.read = true;

    saveDB(db);

    renderDashboard();
    renderPage("notifications");
}

function markAllNotificationsRead() {
    const user = getCurrentUser();
    const db = getDB();

    db.notifications.forEach(notification => {
        if (notification.userId === user.id) {
            notification.read = true;
        }
    });

    saveDB(db);

    showToast("All notifications marked as read.");

    renderDashboard();
    renderPage("notifications");
}

// =========================================================
// 30. NEARBY JOBS
// =========================================================

function showNearbyJobs() {
    const user = getCurrentUser();

    const locations = [
        "Ludhiana",
        "Chandigarh",
        "Jalandhar",
        "Delhi",
        "Noida",
        "Gurgaon",
        "Remote"
    ];

    openModal({
        title: "Find Nearby Jobs",
        description: "Choose a location to explore available opportunities.",
        icon: "📍",
        submitText: "Find Jobs",

        content: `
            <div class="modal-field">
                <label>Select Location</label>

                <select name="location" required>
                    ${locations.map(location => `
                        <option value="${location}">
                            ${location}
                        </option>
                    `).join("")}
                </select>
            </div>

            <div class="custom-modal-note">
                This demo uses sample job locations. It does not access your GPS.
            </div>
        `,

        onSubmit: data => {
            const location = data.get("location");

            closeModal();

            renderPage("jobs");

            const search = $("#jobSearch");
            if (search) search.value = location;

            searchJobs();

            showToast(`Showing jobs for ${location}.`);
        }
    });
}

// =========================================================
// 31. TEACHER STUDENT DASHBOARD
// =========================================================

function renderStudents() {
    const db = getDB();

    const students = db.users.filter(
        user => user.role === "candidate"
    );

    return `
        <div class="page-title">
            <div>
                <h1>Registered Students</h1>
                <p>View student profiles and placement readiness.</p>
            </div>
        </div>

        <div class="card">

            <div class="toolbar">
                <input type="search" id="studentSearch"
                    placeholder="Search student by name or email...">

                <button class="btn secondary-btn" data-action="search-students">
                    Search
                </button>
            </div>

            <div class="table-wrapper">
                <table>

                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>CGPA</th>
                            <th>Qualification</th>
                            <th>Applications</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody id="studentsTableBody">
                        ${renderStudentRows(students)}
                    </tbody>

                </table>
            </div>

        </div>
    `;
}

function renderStudentRows(students) {
    const db = getDB();

    if (!students.length) {
        return `
            <tr>
                <td colspan="6">No students found.</td>
            </tr>
        `;
    }

    return students.map(student => {
        const profile = db.profiles[student.id] || {};

        const applicationCount = db.applications.filter(
            app => app.candidateId === student.id
        ).length;

        return `
            <tr>
                <td>
                    <strong>${escapeHTML(student.name)}</strong>
                </td>

                <td>${escapeHTML(student.email)}</td>

                <td>${profile.cgpa ?? "Not added"}</td>

                <td>${escapeHTML(profile.qualification || "Not added")}</td>

                <td>${applicationCount}</td>

                <td>
                    <button class="btn secondary-btn"
                        data-action="teacher-view-student"
                        data-id="${student.id}">
                        View Profile
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}

// =========================================================
// 32. SEARCH STUDENTS
// =========================================================

function searchStudents() {
    const keyword = ($("#studentSearch")?.value || "")
        .trim()
        .toLowerCase();

    const students = getDB().users.filter(user =>
        user.role === "candidate" &&
        (
            user.name.toLowerCase().includes(keyword) ||
            user.email.toLowerCase().includes(keyword)
        )
    );

    const tbody = $("#studentsTableBody");

    if (tbody) {
        tbody.innerHTML = renderStudentRows(students);
    }
}

// =========================================================
// 33. TEACHER VIEW STUDENT PROFILE
// =========================================================

function viewStudentProfile(studentId) {
    const db = getDB();

    const student = db.users.find(user =>
        user.id === Number(studentId) &&
        user.role === "candidate"
    );

    if (!student) {
        showToast("Student not found.", "error");
        return;
    }

    const profile = db.profiles[student.id] || {};

    const applications = db.applications.filter(
        app => app.candidateId === student.id
    );

    openModal({
        title: "Student Details",
        description: "Student academic and placement information.",
        icon: "🎓",
        submitText: "Close",

        content: `
            <div class="modal-field">
                <label>Name</label>
                <div class="custom-modal-note">
                    ${escapeHTML(student.name)}
                </div>
            </div>

            <div class="modal-field">
                <label>Email</label>
                <div class="custom-modal-note">
                    ${escapeHTML(student.email)}
                </div>
            </div>

            <div class="modal-field">
                <label>CGPA</label>
                <div class="custom-modal-note">
                    ${profile.cgpa ?? "Not added"}
                </div>
            </div>

            <div class="modal-field">
                <label>Qualification</label>
                <div class="custom-modal-note">
                    ${escapeHTML(profile.qualification || "Not added")}
                </div>
            </div>

            <div class="modal-field">
                <label>Skills</label>
                <div class="custom-modal-note">
                    ${escapeHTML(profile.skills || "Not added")}
                </div>
            </div>

            <div class="modal-field">
                <label>Certificates</label>
                <div class="custom-modal-note">
                    ${escapeHTML(profile.certificates || "Not added")}
                </div>
            </div>

            <div class="modal-field">
                <label>Total Applications</label>
                <div class="custom-modal-note">
                    ${applications.length}
                </div>
            </div>

            <div class="modal-field">
                <label>Resume</label>
                <div class="custom-modal-note">
                    ${profile.resume
                        ? `<a href="${escapeHTML(profile.resume)}" target="_blank" rel="noopener noreferrer">Open Resume</a>`
                        : "Not added"}
                </div>
            </div>
        `
    });
}

// =========================================================
// 34. TEACHER REPORTS
// =========================================================

function renderReports() {
    const db = getDB();

    const students = db.users.filter(user => user.role === "candidate");

    const totalApplications = db.applications.length;

    const selected = db.applications.filter(
        app => app.status === "Selected"
    ).length;

    const shortlisted = db.applications.filter(
        app => app.status === "Shortlisted"
    ).length;

    const rejected = db.applications.filter(
        app => app.status === "Rejected"
    ).length;

    const interviews = db.interviews.length;

    return `
        <div class="page-title">
            <div>
                <h1>Placement Reports</h1>
                <p>Analyze job fair and placement activities.</p>
            </div>

            <button class="btn primary-btn" data-action="export-report">
                ↓ Download CSV Report
            </button>
        </div>

        <div class="stats-grid">

            <div class="stat-card">
                <div class="stat-icon">♙</div>
                <h2>${students.length}</h2>
                <p>Total Students</p>
            </div>

            <div class="stat-card">
                <div class="stat-icon">▤</div>
                <h2>${totalApplications}</h2>
                <p>Total Applications</p>
            </div>

            <div class="stat-card">
                <div class="stat-icon">✓</div>
                <h2>${selected}</h2>
                <p>Selected Students</p>
            </div>

            <div class="stat-card">
                <div class="stat-icon">▣</div>
                <h2>${interviews}</h2>
                <p>Scheduled Interviews</p>
            </div>

        </div>

        <div class="card">
            <h3>Application Status Summary</h3>

            <div class="list-item">
                <span>Applied</span>
                <strong>${db.applications.filter(a => a.status === "Applied").length}</strong>
            </div>

            <div class="list-item">
                <span>Shortlisted</span>
                <strong>${shortlisted}</strong>
            </div>

            <div class="list-item">
                <span>Selected</span>
                <strong>${selected}</strong>
            </div>

            <div class="list-item">
                <span>Rejected</span>
                <strong>${rejected}</strong>
            </div>
        </div>

        <div class="card">
            <h3>Job Opportunities</h3>

            <div class="list-item">
                <span>Total Jobs</span>
                <strong>${db.jobs.length}</strong>
            </div>

            <div class="list-item">
                <span>Full-time Jobs</span>
                <strong>${db.jobs.filter(j => j.type === "Full-time").length}</strong>
            </div>

            <div class="list-item">
                <span>Internships</span>
                <strong>${db.jobs.filter(j => j.type === "Internship").length}</strong>
            </div>

            <div class="list-item">
                <span>Part-time Jobs</span>
                <strong>${db.jobs.filter(j => j.type === "Part-time").length}</strong>
            </div>
        </div>
    `;
}

// =========================================================
// 35. EXPORT CSV REPORT
// =========================================================

function exportReport() {
    const db = getDB();

    const rows = [
        [
            "Student Name",
            "Email",
            "CGPA",
            "Qualification",
            "Job Title",
            "Company",
            "Application Status",
            "Applied Date"
        ]
    ];

    db.applications.forEach(app => {
        const student = db.users.find(
            user => user.id === app.candidateId
        );

        const profile = db.profiles[app.candidateId] || {};

        const job = db.jobs.find(
            item => item.id === app.jobId
        );

        rows.push([
            student?.name || "",
            student?.email || "",
            profile.cgpa ?? "",
            profile.qualification || "",
            job?.title || "",
            job?.company || "",
            app.status || "",
            app.appliedAt || ""
        ]);
    });

    const csv = rows.map(row =>
        row.map(value =>
            `"${String(value).replace(/"/g, '""')}"`
        ).join(",")
    ).join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "JobFair_Placement_Report.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    showToast("CSV report downloaded successfully!");
}

// =========================================================
// 36. SETTINGS
// =========================================================

function renderSettings() {
    const user = getCurrentUser();

    const darkMode = localStorage.getItem(THEME_KEY) === "true";

    return `
        <div class="page-title">
            <div>
                <h1>Settings</h1>
                <p>Customize your Job Fair experience.</p>
            </div>
        </div>

        <div class="card">

            <h3>Appearance</h3>

            <div class="list-item">
                <div>
                    <strong>Dark Mode</strong>
                    <p class="small">Switch between light and dark appearance.</p>
                </div>

                <label class="switch">
                    <input type="checkbox" id="darkModeToggle"
                        ${darkMode ? "checked" : ""}>
                    <span class="slider"></span>
                </label>
            </div>

        </div>

        <div class="card">

            <h3>Account Information</h3>

            <div class="list-item">
                <span>Full Name</span>
                <strong>${escapeHTML(user.name)}</strong>
            </div>

            <div class="list-item">
                <span>Email</span>
                <strong>${escapeHTML(user.email)}</strong>
            </div>

            <div class="list-item">
                <span>Account Type</span>
                <strong>${escapeHTML(user.role)}</strong>
            </div>

        </div>

        <div class="card">

            <h3>Account Actions</h3>

            <p class="small">
                You can safely sign out of your account from here.
            </p>

            <button class="btn danger-btn" data-action="logout">
                ↪ Logout
            </button>

        </div>
    `;
}

// =========================================================
// 37. DARK MODE
// =========================================================

function applyTheme() {
    const enabled = localStorage.getItem(THEME_KEY) === "true";

    document.body.classList.toggle("dark-mode", enabled);
}

function toggleDarkMode(enabled) {
    localStorage.setItem(THEME_KEY, String(enabled));

    applyTheme();

    showToast(enabled ? "Dark mode enabled." : "Light mode enabled.");
}

// =========================================================
// 38. LOGOUT
// =========================================================

function logout() {
    openModal({
        title: "Are you sure you want to logout?",
        description: "You will be signed out of your Job Fair account. Your saved profile and application data will remain available.",
        icon: "↪",
        submitText: "Yes, Logout",
        danger: true,

        onSubmit: () => {
            localStorage.removeItem(SESSION_KEY);

            closeModal();

            $("#app")?.classList.add("hidden");
            $("#loginPage")?.classList.remove("hidden");

            if ($("#signinForm")) $("#signinForm").reset();

            showToast("You have been logged out successfully.");
        }
    });
}

// =========================================================
// 39. EVENT LISTENERS
// =========================================================

document.addEventListener("click", event => {

    // Navigation
    const pageButton = event.target.closest("[data-page]");

    if (pageButton) {
        renderPage(pageButton.dataset.page);
        return;
    }

    // Demo login
    const demoButton = event.target.closest("[data-role]");

    if (demoButton && demoButton.dataset.role) {
        demoLogin(demoButton.dataset.role);
        return;
    }

    // General actions
    const actionButton = event.target.closest("[data-action]");

    if (!actionButton) return;

    const action = actionButton.dataset.action;
    const id = actionButton.dataset.id;

    switch (action) {

        case "logout":
            logout();
            break;

        case "apply":
            applyForJob(id);
            break;

        case "delete-job":
            deleteJob(id);
            break;

        case "view-applicant":
            viewApplicant(id);
            break;

        case "schedule-interview":
            scheduleInterview(id);
            break;

        case "view-job-applicants":
            renderPage("applicants");

            setTimeout(() => {
                const filter = $("#applicantJobFilter");

                if (filter) {
                    filter.value = id;
                    filterApplicants();
                }
            }, 0);

            break;

        case "filter-applicants":
            filterApplicants();
            break;

        case "mark-read":
            markNotificationRead(id);
            break;

        case "mark-all-read":
            markAllNotificationsRead();
            break;

        case "nearby":
            showNearbyJobs();
            break;

        case "search-jobs":
            searchJobs();
            break;

        case "clear-search":
            clearJobSearch();
            break;

        case "search-students":
            searchStudents();
            break;

        case "teacher-view-student":
            viewStudentProfile(id);
            break;

        case "export-report":
            exportReport();
            break;
    }
});

// =========================================================
// 40. FORM SUBMISSION EVENTS
// =========================================================

document.addEventListener("submit", event => {

    if (event.target.id === "signinForm") {
        event.preventDefault();

        const email = $("#loginEmail")?.value.trim();
        const password = $("#loginPassword")?.value;

        login(email, password);
    }

    if (event.target.id === "signupForm") {
        event.preventDefault();

        signup(new FormData(event.target));
    }

    if (event.target.id === "postJobForm") {
        event.preventDefault();

        handlePostJob(event.target);
    }

    if (event.target.id === "profileForm") {
        event.preventDefault();

        saveProfile(event.target);
    }

});

// =========================================================
// 41. CHANGE EVENTS
// =========================================================

document.addEventListener("change", event => {

    // Application status
    if (event.target.matches('[data-action="change-application-status"]')) {
        updateApplicationStatus(
            event.target.dataset.id,
            event.target.value
        );
    }

    // Dark mode
    if (event.target.id === "darkModeToggle") {
        toggleDarkMode(event.target.checked);
    }

    // Search filters
    if (
        event.target.id === "jobTypeFilter" ||
        event.target.id === "jobLocationFilter"
    ) {
        searchJobs();
    }

});

// =========================================================
// 42. INPUT EVENTS
// =========================================================

document.addEventListener("input", event => {

    if (event.target.id === "jobSearch") {
        searchJobs();
    }

    if (event.target.id === "studentSearch") {
        searchStudents();
    }

});

// =========================================================
// 43. LOGIN PAGE BUTTON EVENTS
// =========================================================

document.addEventListener("click", event => {

    if (event.target.closest("#signinTab")) {
        switchAuthTab("signin");
    }

    if (event.target.closest("#signupTab")) {
        switchAuthTab("signup");
    }

    if (event.target.closest("#forgotPassword")) {
        event.preventDefault();
        forgotPassword();
    }

    if (event.target.closest("#toggleLoginPassword")) {
        togglePassword(
            "loginPassword",
            $("#toggleLoginPassword")
        );
    }

    if (event.target.closest("#googleLogin")) {
        showToast(
            "Google login is not connected in this frontend demo.",
            "error"
        );
    }

});

// =========================================================
// 44. INITIALIZATION
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    getDB();

    applyTheme();

    setupModalStyles();

    const user = getCurrentUser();

    if (user) {
        openDashboard();
    } else {
        showLoginPage();
    }

});

// =========================================================
// JOB FAIR MANAGEMENT SYSTEM
// FINAL JAVASCRIPT COMPLETED
// =========================================================