interface PageHeaderProps {
  heading: string;
}

const PageHeader = ({ heading }: PageHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 flex flex-row-reverse justify-around items-center w-full h-16 bg-secondary-light border-t border-white/5 text-white z-50 px-2">
      <h1 className="text-white text-2xl font-bold">{heading}</h1>
    </header>
  );
};

export default PageHeader;
