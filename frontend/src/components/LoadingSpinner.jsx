
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-24 h-24 border-8 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
