type Props = {
  content?: string;
  title: string;
};

export const AnnouncementBanner = ({ title, content }: Props) => {
  return (
    <div className="flex w-full flex-col justify-center gap-y-1 rounded-md border-success-600 bg-success-500/25 px-4 py-2 dark:bg-success-900/25">
      <div className="text-sm font-bold text-success-800 dark:text-success-500">
        {title}
      </div>
      {content && <div className="text-small">{content}</div>}
    </div>
  );
};
