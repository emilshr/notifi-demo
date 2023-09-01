import { Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/router";

export const Sidebar = () => {
  const {
    query: { projectId },
    pathname,
    push,
  } = useRouter();

  const paths = pathname.split("/");
  const currentTab = paths.length > 0 ? paths[paths.length - 1] : "";

  return (
    <Tabs
      selectedKey={currentTab}
      classNames={{
        tabList: "sm:flex-col flex w-full",
        tab: "w-full",
      }}
      variant="light"
      onSelectionChange={(key) => {
        if (key === "[projectId]") {
          push(`/projects/${projectId as string}`);
        } else {
          push(`/projects/${projectId as string}/${key}`);
        }
      }}
    >
      <Tab key="[projectId]" title="Overview" />
      <Tab key="activity" title="Activity" />
      <Tab key="secrets" title="API Keys" />
      <Tab key="settings" title="Settings" />
    </Tabs>
  );
};
