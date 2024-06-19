interface ModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
  }
  
  export default function Modal({ isOpen, message, onClose }: ModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white rounded-lg p-4 max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4">Notification</h2>
          <p>{message}</p>
          <button
            className="mt-4 bg-ecoGreen text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  