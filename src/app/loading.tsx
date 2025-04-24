export const LoadingPage = () => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-500"></div>
        <p className="mt-4 text-lg text-gray-600 font-medium">Loading</p>
      </div>
    </div>
  );
};

export default LoadingPage;
