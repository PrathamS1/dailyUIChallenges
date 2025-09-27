import {
  Clock,
  File,
  FolderKanban,
  LayoutDashboard,
  ListEnd,
  ListTodo,
  Search,
  Settings,
  Shapes,
  SquareActivity,
} from "lucide-react";
import { useMemo, useState } from "react";
import { BsFillMegaphoneFill } from "react-icons/bs";
import {
  FiSearch,
  FiSliders,
  FiPlusCircle,
  FiMoreHorizontal,
  FiClock,
  FiUser,
  FiFileText,
  FiGithub,
  FiImage,
} from "react-icons/fi";

const DUMMY_ACTIVITIES = [
  {
    id: 1,
    actor: "Alice Johnson",
    role: "Backend Engineer",
    type: "commit",
    category: "GitHub",
    title: "Committed changes to auth-service",
    context: "repo: auth-service",
    timeOffsetMin: 45,
  },
  {
    id: 2,
    actor: "Bob Lee",
    role: "Frontend",
    type: "pr_opened",
    category: "GitHub",
    title: "Opened PR: fix/header-responsiveness",
    context: "repo: web-frontend",
    timeOffsetMin: 180,
  },
  {
    id: 3,
    actor: "Sophie Park",
    role: "QA",
    type: "pr_merged",
    category: "GitHub",
    title: "Merged PR: ci/fix-tests",
    context: "repo: ci-pipeline",
    timeOffsetMin: 1020,
  },
  {
    id: 4,
    actor: "Rahul Kumar",
    role: "Technical Writer",
    type: "doc_update",
    category: "Documentation",
    title: "Updated API docs for /users endpoint",
    context: "docs: API > Users",
    timeOffsetMin: 360,
  },
  {
    id: 5,
    actor: "Maria Gomez",
    role: "Marketing",
    type: "campaign",
    category: "Marketing",
    title: "Published Marketing Plan Q3",
    context: "campaign: Q3-launch",
    timeOffsetMin: 1500,
  },
  {
    id: 6,
    actor: "Kenji Tanaka",
    role: "Designer",
    type: "design_upload",
    category: "Design",
    title: "Uploaded Landing Page mockups",
    context: "file: landing_v3.fig",
    timeOffsetMin: 1800,
  },
  {
    id: 7,
    actor: "Olga Petrova",
    role: "Frontend",
    type: "task_completed",
    category: "GitHub",
    title: "Completed task: responsive footer",
    context: "task: UI-233",
    timeOffsetMin: 90,
  },
  {
    id: 8,
    actor: "Daniel Park",
    role: "DevOps",
    type: "deploy",
    category: "GitHub",
    title: "Deployed staging build 2025.09.18",
    context: "env: staging",
    timeOffsetMin: 3000,
  },
  {
    id: 9,
    actor: "Priya Chopra",
    role: "Content",
    type: "doc_update",
    category: "Documentation",
    title: "Added onboarding flow docs",
    context: "docs: Onboarding",
    timeOffsetMin: 20,
  },
  {
    id: 10,
    actor: "Marcus Hale",
    role: "Marketing",
    type: "campaign",
    category: "Marketing",
    title: "Launched: social teaser for feature-x",
    context: "campaign: feature-x",
    timeOffsetMin: 400,
  },
  {
    id: 11,
    actor: "Nina Rossi",
    role: "Designer",
    type: "design_upload",
    category: "Design",
    title: "Updated icons set for dashboard",
    context: "asset: icons_v2.zip",
    timeOffsetMin: 240,
  },
  {
    id: 12,
    actor: "Arjun Mehta",
    role: "Product",
    type: "announcement",
    category: "Marketing",
    title: "Posted product roadmap update",
    context: "post: roadmap-sep",
    timeOffsetMin: 2880,
  },
];

function makeTimestampFromOffset(minOffset) {
  return new Date(Date.now() - minOffset * 60 * 1000).toISOString();
}

function timeAgo(iso) {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = Math.max(0, now - then);

  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return `${sec}s ago`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;

  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

const ICON_FOR_CATEGORY = {
  All: ListEnd,
  GitHub: FiGithub,
  Documentation: FiFileText,
  Marketing: BsFillMegaphoneFill,
  Design: FiImage,
};

const AVATAR_BG = ["#f3f4f6", "#eef2ff", "#fff7ed", "#ecfccb", "#e6fffa"];


export default function ActivityFeed() {
  const activities = useMemo(
    () =>
      DUMMY_ACTIVITIES.map((a, idx) => ({
        ...a,
        iso: makeTimestampFromOffset(a.timeOffsetMin),
        avatarColor: AVATAR_BG[idx % AVATAR_BG.length],
      })),
    []
  );

  const [selectedMainCategory, setSelectedMainCategory] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [timeframe, setTimeframe] = useState("48h");
  const [sortBy, setSortBy] = useState("newest");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const now = Date.now();
    let threshold = 0;
    if (timeframe === "24h") threshold = now - 24 * 60 * 60 * 1000;
    else if (timeframe === "48h") threshold = now - 48 * 60 * 60 * 1000;
    else if (timeframe === "7d") threshold = now - 7 * 24 * 60 * 60 * 1000;
    else threshold = 0;

    let list = activities.filter((a) => new Date(a.iso).getTime() >= threshold);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.actor.toLowerCase().includes(q) ||
          a.title.toLowerCase().includes(q) ||
          (a.context || "").toLowerCase().includes(q)
      );
    }

    if (selectedMainCategory === "Recent") {
      list = list.sort((x, y) => new Date(y.iso) - new Date(x.iso)).slice(0, 5);
    } else if (selectedMainCategory === "Highlights") {
      // highlights handled separately in render; keep list for summary
    } else if (
      selectedMainCategory !== "All" &&
      selectedMainCategory !== "All Categories"
    ) {
      list = list.filter((a) => a.category === selectedMainCategory);
    }

    if (categoryFilter !== "All") {
      list = list.filter((a) => a.category === categoryFilter);
    }

    list = list.sort((a, b) =>
      sortBy === "newest"
        ? new Date(b.iso) - new Date(a.iso)
        : new Date(a.iso) - new Date(b.iso)
    );

    return list;
  }, [
    activities,
    timeframe,
    query,
    selectedMainCategory,
    categoryFilter,
    sortBy,
  ]);

  const highlights = useMemo(() => {
    const now = Date.now();
    const threshold = now - 48 * 60 * 60 * 1000;
    const recent = activities.filter(
      (a) => new Date(a.iso).getTime() >= threshold
    );
    const counts = recent.reduce(
      (acc, cur) => {
        acc.total += 1;
        acc[cur.category] = (acc[cur.category] || 0) + 1;
        if (cur.type === "task_completed") acc.tasksCompleted += 1;
        return acc;
      },
      {
        total: 0,
        GitHub: 0,
        Documentation: 0,
        Marketing: 0,
        Design: 0,
        tasksCompleted: 0,
      }
    );
    return counts;
  }, [activities]);

  function pickInitials(name) {
    return name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg)] text-[var(--text)]">
      {/* sidebar */}
      <aside className="w-56 border-r border-[var(--border)] bg-[var(--surface)] p-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-md flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <img
              src="/logo.png"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div>
            <div className="text-sm font-semibold">Project</div>
            <div className="text-xs text-[var(--muted)]">Team workspace</div>
          </div>
        </div>

        <nav className="mt-4 flex-1">
          <ul className="space-y-1 text-sm">
            <li className="py-2 px-3 rounded-md hover:bg-[var(--bg)] cursor-pointer flex gap-2 items-center">
              <LayoutDashboard size={16} /> Dashboard
            </li>
            <li className="py-2 px-3 rounded-md hover:bg-[var(--accent-600)] bg-[var(--accent)] text-white cursor-pointer font-medium flex gap-2 items-center">
              <SquareActivity size={16} /> Activity Feed
            </li>
            <li className="py-2 px-3 rounded-md hover:bg-[var(--bg)] cursor-pointer flex gap-2 items-center">
              <FolderKanban size={16} />
              Projects
            </li>
            <li className="py-2 px-3 rounded-md hover:bg-[var(--bg)] cursor-pointer flex gap-2 items-center">
              <ListTodo size={16} />
              Tasks
            </li>
            <li className="py-2 px-3 rounded-md hover:bg-[var(--bg)] cursor-pointer flex gap-2 items-center">
              <File size={16} />
              Files
            </li>
            <li className="py-2 px-3 rounded-md hover:bg-[var(--bg)] cursor-pointer flex gap-2 items-center">
              <Settings size={16} />
              Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top header */}
        <header className="h-16 border-b border-[var(--border)] px-6 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">Activity Feed</div>
            <div className="text-xs text-[var(--muted)]">
              Team: Core Product • Project: Flowind
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search activities..."
                className="pl-8 pr-3 py-2 rounded-md border border-[var(--border)] bg-[var(--bg)] text-sm"
                aria-label="Search activities"
              />
              <FiSearch className="absolute left-2 top-2.5 text-[var(--muted)]" />
            </div>
            <button
              className="px-3 py-2 rounded-md flex items-center gap-2 border border-[var(--border)] text-sm"
              title="Filters"
            >
              <FiSliders />
              <span className="hidden md:inline text-[var(--muted)]">
                Filters
              </span>
            </button>

            <button
              className="px-3 py-2 rounded-md flex items-center gap-2 text-white bg-[var(--accent)] hover:bg-[var(--accent-600)]"
              title="New"
            >
              <FiPlusCircle />
              <span className="hidden md:inline">New</span>
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Left subnav */}
          <aside className="w-64 border-r border-[var(--border)] px-4 py-6 overflow-auto">
            <div className="space-y-4">
              <div className="text-sm font-medium">Activity Views</div>

              <ul className="space-y-1 text-sm">
                {["Highlights", "Recent", "All"].map((v) => (
                  <li
                    key={v}
                    onClick={() => {
                      setSelectedMainCategory(v);
                      setCategoryFilter("All");
                    }}
                    className={`py-2 px-3 rounded-md cursor-pointer flex items-center gap-1 ${
                      selectedMainCategory === v
                        ? "bg-[var(--accent)]/20 font-semibold"
                        : "hover:bg-[var(--surface)]"
                    }`}
                  >
                    {(v === "Highlights" && (
                      <Shapes
                        size={14}
                        className="inline mr-1 text-[var(--muted)]"
                      />
                    )) ||
                      (v === "Recent" && (
                        <Clock
                          size={14}
                          className="inline mr-1 text-[var(--muted)]"
                        />
                      )) ||
                      (v === "All" && (
                        <ListEnd
                          size={14}
                          className="inline mr-1 text-[var(--muted)]"
                        />
                      ))}
                    {v}
                    {v === "Highlights" && (
                      <span className="ml-2 text-xs text-[var(--muted)]">
                        • {highlights.total}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-4 text-sm font-medium">Categories</div>
              <ul className="mt-2 text-sm space-y-1">
                {["All", "GitHub", "Documentation", "Marketing", "Design"].map(
                  (cat) => {
                    const Icon = ICON_FOR_CATEGORY[cat];
                    return (
                      <li
                        key={cat}
                        onClick={() => {
                          setSelectedMainCategory(cat);
                          setCategoryFilter("All");
                        }}
                        className={`py-2 px-3 rounded-md cursor-pointer flex items-center gap-2 ${
                          selectedMainCategory === cat
                            ? "bg-[var(--accent)]/20 font-semibold"
                            : "hover:bg-[var(--surface)]"
                        }`}
                      >
                        <span className="w-6 h-6 flex items-center justify-center rounded-full text-[var(--muted)] bg-white border border-[var(--border)]">
                          {Icon ? <Icon size={14} /> : <FiUser size={14} />}
                        </span>
                        <span className="flex-1">{cat}</span>
                        <span className="text-xs text-[var(--muted)]">
                          {
                            activities.filter((a) =>
                              cat === "All" ? true : a.category === cat
                            ).length
                          }
                        </span>
                      </li>
                    );
                  }
                )}
              </ul>

              {/* Quick Actions*/}
              <div className="mt-6">
                <div className="text-sm font-medium mb-2">Quick Actions</div>
                <div className="grid grid-cols-1 gap-2">
                  <button className="py-2 px-3 rounded-md border border-[var(--accent)]/50 text-sm flex items-center gap-2">
                    <FiUser />
                    Assign Task
                  </button>
                  <button className="py-2 px-3 rounded-md border border-[var(--accent)]/50 text-sm flex items-center gap-2">
                    <FiFileText />
                    Create PR
                  </button>
                  <button className="py-2 px-3 rounded-md border border-[var(--accent)]/50 text-sm flex items-center gap-2">
                    <BsFillMegaphoneFill />
                    Post Update
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Right main */}
          <main className="flex-1 p-6 overflow-auto">
            {/* Filters */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-12">
                <div className="relative w-full max-w-xs">
                  <input
                    type="text"
                    placeholder="Search in activities..."
                    className="w-full rounded-md border border-neutral-300 bg-white px-10 py-2 pl-9 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[var(--accent-color)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  />
                  <span className="absolute inset-y-0 left-2 flex items-center text-neutral-400">
                    <Search size={16} />
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <label className="text-[var(--muted)]">Timeframe</label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="py-2 px-4 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="24h">Today</option>
                    <option value="48h">Last 48 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="all">All time</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <label className="text-[var(--muted)]">Sort</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="py-2 px-4 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                </div>
              </div>

              <div className="text-sm text-[var(--muted)]">
                Showing {filtered.length} activities
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              {/* Highlights*/}
              {selectedMainCategory === "Highlights" ? (
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 rounded-md bg-[var(--surface)] border border-[var(--border)]">
                    <div className="text-xs text-[var(--muted)]">
                      Total (48h)
                    </div>
                    <div className="text-2xl font-semibold">
                      {highlights.total}
                    </div>
                  </div>
                  <div className="p-4 rounded-md bg-[var(--surface)] border border-[var(--border)]">
                    <div className="text-xs text-[var(--muted)]">GitHub</div>
                    <div className="text-xl font-semibold">
                      {highlights.GitHub}
                    </div>
                  </div>
                  <div className="p-4 rounded-md bg-[var(--surface)] border border-[var(--border)]">
                    <div className="text-xs text-[var(--muted)]">Docs</div>
                    <div className="text-xl font-semibold">
                      {highlights.Documentation}
                    </div>
                  </div>
                  <div className="p-4 rounded-md bg-[var(--surface)] border border-[var(--border)]">
                    <div className="text-xs text-[var(--muted)]">Design</div>
                    <div className="text-xl font-semibold">
                      {highlights.Design}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Activity view */}
                  <div className="bg-[var(--surface)] border border-[var(--accent)]/30 h-[35rem] scrollbar-hide overflow-auto rounded-md">
                    <ul className="divide-y divide-[var(--border)]">
                      {filtered.map((a) => {
                        const Icon = ICON_FOR_CATEGORY[a.category] || FiUser;
                        return (
                          <li key={a.id} className="flex items-start gap-4 p-4">
                            <div
                              className="w-11 h-11 flex items-center justify-center rounded-full text-sm font-semibold"
                              style={{
                                backgroundColor: a.avatarColor,
                                color: "var(--text)",
                                border: "1px solid var(--border)",
                              }}
                              aria-hidden
                            >
                              {pickInitials(a.actor)}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <div className="text-sm">
                                    <span className="font-semibold">
                                      {a.actor}
                                    </span>{" "}
                                    <span className="text-[var(--muted)]">
                                      • {a.role}
                                    </span>{" "}
                                    <span className="text-[var(--muted)]">
                                      {" "}
                                      {a.title}
                                    </span>
                                  </div>
                                  <div className="text-xs text-[var(--muted)] mt-1">
                                    {a.context}
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                                  <div className="flex items-center gap-1">
                                    <FiClock />
                                    <span>{timeAgo(a.iso)}</span>
                                  </div>
                                  <div className="flex items-center gap-1 px-2 py-1 rounded-md border border-[var(--border)] text-xs">
                                    <Icon size={14} />
                                    <span>{a.category}</span>
                                  </div>
                                  <button
                                    className="p-1 rounded-md hover:bg-[var(--bg)]"
                                    aria-label="more"
                                  >
                                    <FiMoreHorizontal />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="p-4 flex items-center justify-center">
                      <button
                        onClick={() => setTimeframe("all")}
                        className="px-4 py-2 rounded-md bg-[var(--bg)] border border-[var(--border)]"
                      >
                        See older activities
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}