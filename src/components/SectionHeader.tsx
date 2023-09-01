type Props = {
  title: string;
  description: string;
};

export const SectionHeader = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col gap-y-1 pb-4">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-sm text-slate-500">{description}</div>
    </div>
  );
};
