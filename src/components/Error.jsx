import useConstants from "/src/hooks/useConstants";

const ErrorComponent = () => {
  const { background } = useConstants();
  return (
    <div
      className={`flex flex-col items-center justify-center ${background} min-h-screen
    `}
    >
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg max-w-md">
        <div className="flex items-center">
          <div className="py-1">

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  className ="h-6 w-6 text-red-500 mr-4"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M6 18L18 6M6 6l12 12"
  />
</svg>

          </div>
          <div>
            <p className="font-semibold">Word not found</p>
            <p className="text-sm">
              Sorry, the word you're looking for could not be found in the
              dictionary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
