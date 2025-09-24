import { Plus, MoreHorizontal, Search, Filter, Settings } from "lucide-react";
import { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const CategoryNode = ({ data }) => {
  const getHeaderBg = (color) => `${color}45`;
  const getGradientBg = (color) =>
    `linear-gradient(180deg, #ffffff 0%, ${color}08 100%)`;
  const getBorder = (color) => `2px solid ${color}50`;
  const getInnerShadow = (color) => `inset 0 0 0 1px ${color}10`;
  
  return (
    <div
      className="min-w-[320px] rounded-xl overflow-hidden backdrop-blur-sm relative"
      style={{
        background: getGradientBg(data.color || "#e2e8f0"),
        border: getBorder(data.color || "#e2e8f0"),
        boxShadow: `${getInnerShadow(
          data.color || "#e2e8f0"
        )}, 0 4px 20px rgba(0,0,0,0.05)`,
      }}
    >
      {/* Header Section */}
      <div
        className="p-4 flex items-center justify-between relative"
        style={{
          backgroundColor: getHeaderBg(data.color || "#e2e8f0"),
        }}
      >
        <h3
          className="font-semibold text-xl tracking-tight"
          style={{ color: "#121212" }}
        >
          {data.title}
        </h3>
        <div className="flex items-center gap-2">
          <span
            className="px-3 py-1 rounded-full text-sm"
            style={{
              backgroundColor: `${data.color}10`,
              color: data.color || "#64748b",
            }}
          >
            {data.tasks?.length || 0} tasks
          </span>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="p-4 space-y-3">
        {data.tasks?.map((task, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-lg p-4 transition-all 
                     hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              boxShadow: `0 2px 8px ${data.color}10`,
              border: `1px solid ${data.color}10`,
            }}
          >
            {/* Task highlight on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
              style={{
                boxShadow: `inset 0 0 0 1.5px ${data.color}`,
              }}
            />

            {/* Task Content */}
            <div className="relative">
              <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
              <p className="text-gray-600 text-sm">{task.description}</p>
            </div>

            {/* Quick Actions */}
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div
                className="p-1.5 rounded-full hover:bg-gray-50 cursor-pointer"
                style={{ color: data.color }}
              >
                •••
              </div>
            </div>
          </div>
        ))}

        {/* Add Task Button */}
        <button
          className="w-full py-2.5 rounded-lg border-2 border-dashed transition-all 
                   hover:bg-white text-sm font-medium flex items-center justify-center gap-2"
          style={{
            borderColor: `${data.color}20`,
            color: data.color,
          }}
        >
          <Plus size={16} />
          Add New Task
        </button>
      </div>
    </div>
  );
};
const nodeTypes = {
  category: CategoryNode,
};
const Tooltip = ({ children, label }) => {
  return (
    <div className="group relative">
      {children}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {label}
      </div>
    </div>
  );
};
export default function ToDoTask() {
  const initialNodes = [
    {
      id: "1",
      type: "category",
      position: { x: 0, y: 0 },
      data: {
        title: "To Do",
        color: "#ef4444", // red
        tasks: [
          { title: "Task 1", description: "Description 1" },
          { title: "Task 2", description: "Description 2" },
        ],
      },
    },
    {
      id: "2",
      type: "category",
      position: { x: 320, y: 0 },
      data: {
        title: "In Progress",
        color: "#3b82f6", // blue
        tasks: [{ title: "Task 3", description: "Description 3" }],
      },
    },
    {
      id: "3",
      type: "category",
      position: { x: 640, y: 0 },
      data: {
        title: "Done",
        color: "#22c55e", // green
        tasks: [],
      },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useNodesState([]);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <>
      <div className="h-screen w-full">
        {/* Action Bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-6 py-3 flex items-center space-x-6">
            <Tooltip label="Add Column">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Plus size={20} className="text-gray-700" />
              </button>
            </Tooltip>

            <Tooltip label="Search Tasks">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search size={20} className="text-gray-700" />
              </button>
            </Tooltip>

            <Tooltip label="Filter">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Filter size={20} className="text-gray-700" />
              </button>
            </Tooltip>

            <div className="w-px h-6 bg-gray-200" />

            <Tooltip label="Settings">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Settings size={20} className="text-gray-700" />
              </button>
            </Tooltip>

            <Tooltip label="More Options">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreHorizontal size={20} className="text-gray-700" />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Flow Board */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50"
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
}
