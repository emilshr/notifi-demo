import { SectionHeader } from "@/components/SectionHeader";
import { SidePaneWrapper } from "@/components/SidePaneWrapper";
import { ProjectOverview } from "@/components/project-overview/ProjectOverview";

export default function ProjectView() {
  return (
    <SidePaneWrapper>
      <SectionHeader
        title="Project overview"
        description="All stats and figures about your project"
      />
      <ProjectOverview />
    </SidePaneWrapper>
  );
}
