"use client";

type PopUpProps = {
  closePopUp: () => void;
  deleteProject: ()=>void;
};

export default function ConfirmDeletion({
  closePopUp,
  deleteProject
}: PopUpProps) {
  // Initialize state with the correct type and empty values

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the click from bubbling up to the parent elements
  };

  return (
    <section>
      {/* Overlay - covers the entire screen */}
      <div className="fixed inset-0 z-10 bg-black opacity-50"></div>

      {/* Popup - centered over the overlay */}
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        {/* Add the onClick handler to stop propagation */}
        <section
          className="bg-color-primary-green text-white rounded-lg py-6 px-4 shadow-lg flex flex-col justify-center min-w-90"
          onClick={handlePopupClick}
        >
          <section className="flex justify-between">
            <h2 className="font-bold text-2xl">Are you sure you want to delete?</h2>
          </section>
          
            <div className="flex items-center justify-center mt-5 gap-2">
              <button
                type="submit"
                className="bg-red-500 rounded-lg p-2"
                onClick={deleteProject}
              >
                Delete
              </button>
              <button type="button" onClick={closePopUp} className="bg-color-secondary-green rounded-lg p-2">
                Cancel
              </button>
            </div>
        </section>
      </div>
    </section>
  );
}
