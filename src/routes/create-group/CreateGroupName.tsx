import { useCreateGroupContext } from "../../contexts/CreateGroupContext";

const CreateGroupName = () => {
  const { state, dispatch } = useCreateGroupContext();

  console.log(state.name);
  return (
    <div className="flex flex-col items-center w-[100%] h-[100%]  rounded-lg">
      <h1 className="text-textPrimary text-[32px] font-bold mt-6">
        What is the name of your new group?
      </h1>
      <input
        type="text"
        value={state.name}
        onChange={(e) =>
          dispatch({
            type: "SET_FIELD",
            payload: { field: "name", value: e.target.value },
          })
        }
      />
    </div>
  );
};

export default CreateGroupName;
