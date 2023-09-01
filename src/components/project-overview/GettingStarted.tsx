import {
  Card,
  CardHeader,
  CardFooter,
  Link as NextUiLink,
} from "@nextui-org/react";

export const GettingStarted = () => {
  return (
    <Card
      classNames={{
        base: "p-2",
      }}
    >
      <CardHeader>
        <div className="flex flex-col gap-y-2">
          <span className="text-xl font-bold">Getting started</span>
          <span className="text-md text-slate-600 dark:text-slate-400">
            Check out the link below for documentation
          </span>
        </div>
      </CardHeader>
      <CardFooter>
        <NextUiLink
          color="primary"
          isExternal
          href="https://docs.notifi.site"
          showAnchorIcon
        >
          Read more
        </NextUiLink>
      </CardFooter>
    </Card>
  );
};
