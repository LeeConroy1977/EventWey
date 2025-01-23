import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ConnectionPreviewCard = ({ connection, handleClick, handleModalClose, }) => {
    const { id, profileBackgroundImage, profileImage, username } = connection;
    return (_jsxs("div", { className: "mobile:w-[100px] h-[180px] tablet:w-[30%] desktop:h-[190px] xl-screen:h-[240px] bg-bgPrimary desktop:bg-bgSecondary rounded-lg flex flex-col items-center justify-start cursor-pointer mt-1 border-[1px] border-gray-200 ", onClick: () => {
            handleClick(id);
            handleModalClose();
        }, children: [_jsxs("div", { className: "relative w-[100%] h-[30%]  flex items-center justify-center\n      ", children: [_jsx("img", { className: "w-[100%] h-[100%] rounded-tl-lg rounded-tr-lg", src: profileBackgroundImage, alt: "" }), _jsx("img", { className: "absolute top-6 xl-screen:top-9 w-[60px] h-[60px] xl-screen:w-[70px] xl-screen:h-[70px] rounded-full border-2 border-textPrimary", src: profileImage, alt: "" })] }), _jsx("p", { className: "mt-9 tablet:mt-10 desktop:mt-9 xl-screen:mt-12 mobile:text-[12px] tablet:text-[10px] desktop:text-[12px] xl-screen:text-[14px] font-semibold text-textPrimary", children: username }), _jsx("button", { className: "w-[80%] py-1 flex justify-center items-center mt-auto mb-3 text-primary text-[9px] desktop:text-[10px] font-medium desktop:font-semibold border-[1px] desktop:border-2 border-primary rounded-lg bg-bgPrimary", children: "Message" })] }));
};
export default ConnectionPreviewCard;
