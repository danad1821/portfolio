export default function PageLoader() {
  return (
    <>
      <div className="loader-container">
        <svg className="letter-loader" viewBox="0 0 10 10">
          <path
            id="letter"
            d="M3,2 L5,4 L7,2"
            strokeLinecap="round"
            strokeWidth={4}
          ></path>
        </svg>
      </div>
    </>
  );
}
