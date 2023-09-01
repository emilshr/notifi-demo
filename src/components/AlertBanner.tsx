type Props = {
  title: string;
  content?: string;
};

export const AlertBanner = ({ title, content }: Props) => {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-y-1 rounded-md border-warning-600 bg-warning-500/25 px-4 py-2 dark:bg-warning-900/25">
      <div className="text-sm font-bold text-warning-800 dark:text-warning-500">
        {title}
      </div>
      {content && <div className="text-small">{content}</div>}
    </div>
  );
};
