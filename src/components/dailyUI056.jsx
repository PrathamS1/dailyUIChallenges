import { ChevronRight, Circle, Dot } from "lucide-react";
import BackToHome from "./BackToHome";

// Breadcrumb data array
const breadcrumbs = [
  {
    path: ["Dashboard", "Project", "Create Project"],
    active: 2,
  },
  {
    path: ["Settings", "Security", "Two Factor", "Setup"],
    active: 3,
  },
  {
    path: ["Profile", "Edit Profile", "Personal Info"],
    active: 2,
  },
  {
    path: ["Documents", "Uploads", "Images", "Edit", "Crop"],
    active: 4,
  },
  {
    path: ["Analytics", "Reports", "Monthly"],
    active: 2,
  },
];

export default function BreadCrumbs() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-200">
        <h2 className="text-5xl font-semibold font-[DM_Sans] tracking-wide mb-10">Breadcrumbs</h2>
        <div className="w-full mx-auto flex flex-wrap items-center justify-center gap-6">
          {breadcrumbs.map((crumb, idx) => (
            <div
              key={idx}
              className="w-fit bg-white/50 flex text-2xl items-center justify-center px-6 py-3 rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.19)] hover:shadow-[inset_0_3px_6px_rgba(0,0,0,0.25)] transition-shadow"
            >
              {crumb.path.map((item, index) => (
                <>
                  <p
                    key={item}
                    className={`font-[Poppins] ${
                      index === crumb.active
                        ? "font-medium text-black"
                        : "font-regular text-black/60"
                    }`}
                  >
                    {item}
                  </p>
                  {index < crumb.path.length - 1 && (
                    <span className="flex items-center justify-center -space-x-6 opacity-50">
                      <Dot size={32} />
                      <ChevronRight size={32} />
                    </span>
                  )}
                </>
              ))}
            </div>
          ))}
        </div>
      </div>
      <BackToHome challengeDay="56" challengeTitle="Breadcrumbs" />
    </>
  );
}