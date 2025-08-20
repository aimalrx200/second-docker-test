import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "../../redux/slices/popups/simplePopupSlice";
import { EditPopup } from "../popups/EditPost";
import { DeletePost } from "../popups/DeletePost";

export function SimplePopup() {
  const dispatch = useDispatch();

  const { open, popupType, data } = useSelector((state) => state.simplePopup);

  const handleOverlayClick = () => {
    dispatch(setPopup({ open: false, popupType: null, data: null }));
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!open) {
    return null;
  }

  const renderPopupContent = () => {
    if (popupType === "edit") {
      return <EditPopup />;
    } else if (popupType === "delete") {
      return <DeletePost postId={data.id} title={data?.title} />;
    }

    return null;
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/25 z-50 p-5"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-md" onClick={handleContentClick}>
        {renderPopupContent()}
      </div>
    </div>
  );
}
