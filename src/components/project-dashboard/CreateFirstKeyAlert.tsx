import Link from "next/link";

type Props = {
  projectId: string;
};

export const CreateFirstKeyAlert = ({ projectId }: Props) => {
  return (
    <Link href={`/projects/${projectId}/secrets`}>
      <div className="group rounded-md border-[1px] border-red-500 bg-red-500 p-4 ring-1 ring-red-300 hover:border-red-900 hover:bg-gradient-to-t hover:from-red-900 hover:to-transparent hover:ring-red-900">
        <div className="flex flex-col gap-y-4">
          <span className="text-sm">
            Generate a key and register to start using
          </span>
        </div>
      </div>
    </Link>
  );
};
