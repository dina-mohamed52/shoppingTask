function LoadingSpinner() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-pink-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-white font-semibold">Loading, please wait...</p>
        </div>
      </div>
    );
  }
  
  export default LoadingSpinner;