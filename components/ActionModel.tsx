import React from "react";
import useUiStore from "@/stores/uiStore";

const ActionModal: React.FC = () => {
  const { isModalOpen, modalData, closeModal } = useUiStore();

  if (!isModalOpen || !modalData) return null;

  const handleConfirm = () => {
    if (modalData.onConfirm) {
      modalData.onConfirm(modalData.actionType); // run callback
    }
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-sm shadow-sm m-3 p-5 min-w-[300px]"
        onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside
      >
        <p>{modalData.desc}</p>
        <div className="flex justify-center gap-5 mt-5">
          <button className="rounded-md py-2 px-4 bg-background" onClick={closeModal}>
            Cancel
          </button>
          <button
            className={`text-white rounded-md py-2 px-4  ${modalData.color || ""}`}
            onClick={handleConfirm}
          >
            {modalData.buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
