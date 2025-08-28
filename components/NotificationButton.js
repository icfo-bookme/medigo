

import React, { useState } from "react";
import NotificationModal from "./NotificationModal";


const NotificationButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Subscribe to Notifications
      </button>
      {isModalOpen && (
        <NotificationModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default NotificationButton;
