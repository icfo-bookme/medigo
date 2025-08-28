// src/NotificationModal.js
import OneSignal from "react-onesignal";

const NotificationModal = ({ onClose }) => {


    
  const handleAllowNotifications = () => {
    
            OneSignal.requestPermission();
           
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-9999">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
        <h2 className="text-lg font-bold mb-4">Enable Notifications</h2>
        <p className="text-sm text-gray-600 mb-6">
          Stay updated with the latest news and updates by enabling
          notifications.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAllowNotifications}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Allow Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
