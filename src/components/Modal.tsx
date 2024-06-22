interface ModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
  }
  
  export default function Modal({ isOpen, message, onClose }: ModalProps) {
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg z-10">
            <h2 className="text-lg font-bold mb-4">Notification</h2>
            <p>{message}</p>
            <button
              className="mt-4 bg-ecoGreen text-white p-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      );
    }
  