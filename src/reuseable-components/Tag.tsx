const Tag = ({ tag }) => {
  return (
    <div className=" flex items-center justify-center text-textPrimary text-[7px] font-semibold px-3 py-2 bg-bgSecondary rounded-full border-[1px] border-gray-200">
      {tag}
    </div>
  );
};

export default Tag;
