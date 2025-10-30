import { Ellipsis, List, PaintBucket, RotateCcw } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import BackToHome from "./BackToHome";


const savedNotes = [
  {
    id: "note_1",
    title: "Understanding REST vs GraphQL",
    content: `- REST APIs expose multiple endpoints, each serving a fixed data shape.
- GraphQL exposes a single endpoint with flexible queries.
- Overfetching is common in REST; GraphQL reduces that by letting clients ask only for what they need.
- REST is cache-friendly (HTTP layer), while GraphQL needs manual caching strategies.
📌 Good use case for GraphQL: client-heavy apps like dashboards.`,
    color: "#FFF9C4", // pale yellow
    dateCreated: "2025-10-22T09:42:00Z",
    lastModified: "2025-10-23T10:05:00Z",
    pinned: true,
  },
  {
    id: "note_2",
    title: "JS Event Loop Recap",
    content: `- JS is single-threaded → uses event loop to manage async tasks.
- Call Stack: executes synchronous code.
- Web APIs: handle async ops (fetch, setTimeout).
- Callback Queue → processed after stack clears.
Example:
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
➡ Output: A, C, B`,
    color: "#C8E6C9", // light green
    dateCreated: "2025-10-21T14:00:00Z",
    lastModified: "2025-10-21T16:15:00Z",
    pinned: false,
  },
  {
    id: "note_3",
    title: "Docker Basics",
    content: `- Containers are lightweight VMs sharing the host kernel.
- Dockerfile defines environment setup (base image, commands, etc).
- docker-compose.yml helps run multiple containers (services).
Commands:
  • docker build -t app .
  • docker run -p 3000:3000 app
  • docker-compose up
Useful tip: Always add .dockerignore to reduce build context.`,
    color: "#BBDEFB", // light blue
    dateCreated: "2025-10-23T09:18:00Z",
    lastModified: "2025-10-23T10:10:00Z",
    pinned: false,
  },
  {
    id: "note_4",
    title: "Frontend Optimization",
    content: `- Use code splitting (dynamic imports) to load components on demand.
- Lazy-load images using IntersectionObserver.
- Minify and compress JS/CSS files.
- Use CDN for static assets.
- Preload critical fonts.
- Lighthouse score improved from 64 → 91 after these.`,
    color: "#F8BBD0", // light pink
    dateCreated: "2025-10-20T11:10:00Z",
    lastModified: "2025-10-21T08:00:00Z",
    pinned: false,
  },
  {
    id: "note_5",
    title: "Reading: System Design Notes",
    content: `- Vertical scaling: add more power (CPU, RAM) to single node.
- Horizontal scaling: add more nodes; better for distributed load.
- Load balancer distributes requests evenly.
- Cache layers: Redis / CDN reduce DB load.
- Database sharding = split data across multiple DBs.
💭 Remember: Scaling ≠ always adding servers, it’s about bottleneck removal.`,
    color: "#FFE0B2", // light orange
    dateCreated: "2025-10-24T07:45:00Z",
    lastModified: "2025-10-24T08:15:00Z",
    pinned: true,
  },
];

export default function NotesWidget() {
  const [notesListVisible, setNotesListVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    title: "Note 23",
    content: "",
  });
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const getPreview = (text, maxLength = 100) => {
    return text.length > maxLength
      ? text.slice(0, maxLength).trim() + "..."
      : text;
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy 'at' h:mm a");
  };

  const handleNoteSelect = (note) => {
    setCurrentNote({
      title: note.title,
      content: note.content,
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center gap-6 bg-[url('/webpage.png')] bg-no-repeat bg-center bg-cover relative">
      <div className="absolute inset-0 w-full h-full bg-black/30 backdrop-blur-lg z-1"/>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-1/3 shadow-2xl border border-gray-700/20 rounded-xl px-6 py-4 flex flex-col gap-4 bg-zinc-50 z-50"
      >
          {isEditingTitle ? (
            <input
              type="text"
              value={currentNote.title}
              onChange={(e) =>
                setCurrentNote({ ...currentNote, title: e.target.value })
              }
              onBlur={() => setIsEditingTitle(false)}
              autoFocus
              className="text-xl w-fit font-medium outline-none border-b border-gray-300"
            />
          ) : (
            <h2
              className="text-xl w-fit font-medium cursor-pointer hover:text-gray-600 transition-colors"
              onDoubleClick={() => setIsEditingTitle(true)}
            >
              {currentNote.title ? currentNote.title : "Set Title"}
            </h2>
          )}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center justify-center rounded-md font-bold hover:bg-gray-100 p-2 cursor-pointer">
              B
            </span>
            <span className="flex items-center justify-center rounded-md italic hover:bg-gray-100 p-2 cursor-pointer">
              I
            </span>
            <span className="flex items-center justify-center rounded-md underline hover:bg-gray-100 p-2 cursor-pointer">
              U
            </span>
            <List size={18} className="hover:text-gray-600 cursor-pointer" />
            <RotateCcw
              size={18}
              className="hover:text-gray-600 cursor-pointer"
            />
            <PaintBucket
              size={18}
              className="hover:text-gray-600 cursor-pointer"
            />
          </div>
          <button
            className="border-2 px-4 py-1 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => setNotesListVisible(!notesListVisible)}
            style={{ backgroundColor: notesListVisible ? 'black' : 'white', color: notesListVisible? 'white':'black' }}
          >
            View Notes
          </button>
        </div>

        <div>
          <textarea
            value={currentNote.content}
            onChange={(e) =>
              setCurrentNote({ ...currentNote, content: e.target.value })
            }
            className="w-full h-32 p-2 border border-black/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Take your notes"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <button className="border rounded-lg px-4 py-1 bg-gray-300 border-black/30 opacity-80 hover:opacity-100 transition-opacity">
            Cancel
          </button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="border-2 rounded-lg px-4 py-1 hover:bg-zinc-800 hover:text-white cursor-pointer transition-all ease-in"
          >
            Save Note
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {notesListVisible && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="border border-gray-200 h-[30rem] rounded-xl flex flex-col w-2/7 bg-white shadow-xl z-50"
          >
            <h2 className="text-xl font-medium p-4 border-b">Your Notes</h2>
            <div className="flex flex-col max-h-[600px] overflow-y-auto">
              {savedNotes.map((note) => (
                <motion.div
                  key={note.id}
                  whileHover={{ backgroundColor: note.color }}
                  onClick={() => handleNoteSelect(note)}
                  className="p-4 border-b cursor-pointer relative group"
                >
                  <Ellipsis
                    size={20}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <h3 className="font-medium mb-2">{note.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {getPreview(note.content, 50)}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <p>Created: {formatDate(note.dateCreated)}</p>
                    <p>•</p>
                    <p>Updated: {formatDate(note.lastModified)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <BackToHome challengeDay="65" challengeTitle="Notes Widget"/>
    </div>
  );
}