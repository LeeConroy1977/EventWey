import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IoClose } from "react-icons/io5";
const Modal = ({ onClose, title, children }) => {
    return (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4 ", children: _jsxs("div", { className: "w-full max-w-[500px] desktop:max-w-[760px] desktop:h-[80%] desktop:overflow-y-scroll bg-white rounded-lg shadow-lg p-2 ", children: [_jsxs("div", { className: "flex justify-between items-center border-b pb-2 mb-4 px-2 py-2 desktop:px-10 desktop:py-4", children: [title && (_jsx("h2", { className: "text-lg font-bold text-textPrimary", children: title })), _jsx(IoClose, { onClick: onClose, className: "text-[22px] desktop:text-[28px] text-secondary font-bold cursor-pointer" })] }), _jsx("div", { className: "overflow-y-auto max-h-[80vh] desktop:max-h-[90vh] pb-4 desktop:pb-8 desktop:p-2 desktop:ml-10 desktop:mt-6  ", children: children })] }) }));
};
export default Modal;
