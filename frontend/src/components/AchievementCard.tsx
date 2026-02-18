const AchievementCard = ({
  subjectDetail,
  issued_at,
}: {
  subjectDetail: { title: string; description: string };
  issued_at: string;
}) => {
  const formattedDate = new Date(issued_at).toLocaleDateString("fa-IR");

  return (
    <div className="space-y-3">
      <div className="bg-linear-to-br from-card to-custard/5 rounded-2xl p-4 border border-custard/30">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 bg-custard rounded-xl flex items-center justify-center shrink-0"
            data-fg-z8p70="1.41:5.3416:/src/app/screens/Progress.tsx:165:17:7005:193:e:div:e"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-award text-black"
            >
              <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
              <circle cx="12" cy="8" r="6"></circle>
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="mb-0.5">{subjectDetail.title}</h4>
            <div className="text-sm text-muted-foreground">
              به اتمام رسیده در {formattedDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
