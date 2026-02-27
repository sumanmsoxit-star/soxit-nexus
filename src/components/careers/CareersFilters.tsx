import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const domains = ["All", "AI & Data", "Cybersecurity", "Cloud & Platform", "Engineering & Product", "Risk & Transformation"];
const workModes = ["All", "Remote", "Hybrid", "On-site"];
const experienceLevels = ["All", "Intern", "FTE (0-2 yrs)", "FTE (3-7 yrs)", "FTE (8+ yrs)", "Leadership"];
const employmentTypes = ["All", "Full-time", "Internship", "Contract"];

interface CareersFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  department: string;
  onDepartmentChange: (val: string) => void;
  workMode: string;
  onWorkModeChange: (val: string) => void;
  experience: string;
  onExperienceChange: (val: string) => void;
  employmentType: string;
  onEmploymentTypeChange: (val: string) => void;
  location: string;
  onLocationChange: (val: string) => void;
  locations: string[];
  status: string;
  onStatusChange: (val: string) => void;
}

const CareersFilters = ({
  search, onSearchChange,
  department, onDepartmentChange,
  workMode, onWorkModeChange,
  experience, onExperienceChange,
  employmentType, onEmploymentTypeChange,
  location, onLocationChange,
  locations,
  status, onStatusChange,
}: CareersFiltersProps) => {
  return (
    <section className="section-enterprise section-sunken py-10 md:py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-5">
          <Filter size={18} className="text-consulting-accent" />
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Filter Opportunities</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>

          <Select value={department} onValueChange={onDepartmentChange}>
            <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Domain" /></SelectTrigger>
            <SelectContent>
              {domains.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={employmentType} onValueChange={onEmploymentTypeChange}>
            <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              {employmentTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={location} onValueChange={onLocationChange}>
            <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Location" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Locations</SelectItem>
              {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-3 mt-3">
          <Select value={experience} onValueChange={onExperienceChange}>
            <SelectTrigger className="h-9 text-sm w-[160px]"><SelectValue placeholder="Experience" /></SelectTrigger>
            <SelectContent>
              {experienceLevels.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={workMode} onValueChange={onWorkModeChange}>
            <SelectTrigger className="h-9 text-sm w-[140px]"><SelectValue placeholder="Work Mode" /></SelectTrigger>
            <SelectContent>
              {workModes.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="h-9 text-sm w-[130px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
};

export default CareersFilters;
