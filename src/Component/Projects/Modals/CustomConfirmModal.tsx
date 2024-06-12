import { useActions } from "../../../Hooks/useAction";
const CustomConfirmModal = ({ message, setModal, setIsConfirm, setAlertModal, submitData }) => {

    const { checkOut } = useActions()

    const handleConfirm = () => {
        setModal(false)
        setIsConfirm(true)
        setAlertModal(true)
        checkOut(submitData)
    }

    return (
        <div className="fixed inset-0 flex items-start justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
                <div className="mb-4">
                    <p>{message}</p>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => setModal(false)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Close
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => handleConfirm()}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomConfirmModal;
