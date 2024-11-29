import { IoPerson } from "react-icons/io5";

const HomeGroupsCard = ({ group }) => {
  const {
    id,
    name,
    image,
    description,
    location,
    eventsCount,
    members,
    events,
    messages,
    category,
    openAccess,
  } = group;

  let filteredDesc = description[0];
  filteredDesc = filteredDesc.replaceAll("**", "");

  return (
    <div className="relative flex items-center w-[100%] h-[220px] bg-white p-4 border-gray-300 rounded-lg mt-4">
      <img src={image} alt="" className="w-[40%] h-[90%] ml-2 rounded-lg" />
      <div className="w-[60%] h-[100%] p-3 pl-8 pt-5">
        <h2 className="text-[21px] font-bold text-[#2C3E50] ">{name}</h2>
        <p className="text-[11px] font-semibold text-primary mt-2 pr-4">
          {filteredDesc}
        </p>
        <p className="text-[11px] font-semibold text-gray-500 mt-3">{`${
          openAccess ? "Public" : "Private"
        } Group`}</p>
        <div className="flex w-[100%] h-[25%] mt-2">
          <div className="flex items-center">
            <div className="flex items-center">
              <IoPerson className="text-primary text-[18px]" />
              <p className="ml-2 text-[12px] font-semibold text-[#2C3E50]">
                {members.length} Members
              </p>
            </div>
            {/* <div className="flex items-center ml-4">
              <IoMdPricetag className="text-[#5D9B9B] text-[18px]" />
              <p className="ml-2 text-[12px] font-semibold text-[#2C3E50]">
                {eventPrices}
              </p>
            </div> */}
            {/* {!isAttending && (
              <p className="ml-4 text-[12px] text-[#D66E6E] font-semibold">
                {availability} places left
              </p>
            )} */}
          </div>
          {/* <button
            className={`w-[100px] h-[34px] ml-auto flex items-center justify-center text-[11px] font-semibold rounded-lg ${
              isAttending
                ? "bg-bgPrimary border-2 border-primary text-primary"
                : free
                ? "bg-[#5D9B9B] text-white"
                : "bg-[#5D9B9B] text-white"
            }`}
          >
            {isAttending ? "Going" : free ? "Join Event" : "Get Tickets"}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default HomeGroupsCard;
