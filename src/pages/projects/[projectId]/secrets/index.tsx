import { SkeletonIndicator } from "@/components/CustomSkeleton";
import { ProjectSectionWrapper } from "@/components/ProjectSectionWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { SidePaneWrapper } from "@/components/SidePaneWrapper";
import { ApiKeyList } from "@/components/project-dashboard/ApiKeyList";
import { CreateNewApiKey } from "@/components/project-dashboard/CreateNewApiKey";
import { SecretConfiguration } from "@/components/project-dashboard/SecretConfiguration";
import { api } from "@/utils/api";
import { Skeleton, Snippet } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Secrets() {
  const {
    query: { projectId },
    push,
  } = useRouter();
  const { data, isFetched } = api.projects.getSecretAndApiKeys.useQuery({
    projectId: projectId as string,
  });

  useEffect(() => {
    if (isFetched && !data) {
      push("/404");
    }
  }, [isFetched, data, push]);

  return (
    <SidePaneWrapper>
      <SectionHeader
        title="Project API keys"
        description="View and manage your private API keys here"
      />
      <ProjectSectionWrapper
        sectionTitle="Project ID"
        sectionDescription="This is the ID to pass into the module to enable crash reports"
      >
        <SkeletonIndicator isLoaded={isFetched}>
          <Snippet hideSymbol>{projectId}</Snippet>
        </SkeletonIndicator>
      </ProjectSectionWrapper>
      <SkeletonIndicator isLoaded={isFetched}>
        {data && <SecretConfiguration {...data.projectSecret} />}
      </SkeletonIndicator>
      <ProjectSectionWrapper
        sectionTitle="Standard keys"
        sectionDescription="These keys will allow you to authenticate API requests"
        actionComponent={<CreateNewApiKey />}
      >
        <SkeletonIndicator isLoaded={isFetched}>
          <ApiKeyList
            apiKeys={data?.apiKeys || []}
            projectId={projectId as string}
          />
        </SkeletonIndicator>
      </ProjectSectionWrapper>
    </SidePaneWrapper>
  );
}
