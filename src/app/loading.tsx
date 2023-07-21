const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <LoadingLogo />
    </div>
  );
};

const LoadingLogo = () => {
  return (
    <div
      className="h-56 w-full bg-center bg-repeat-x"
      style={{
        backgroundImage: "url(/tabs.png)",
        filter: "invert(1)",
        animation: "loadingSlide 5s linear infinite",
        overflow: "hidden",
      }}
    />
  );
};

export default Loading;
