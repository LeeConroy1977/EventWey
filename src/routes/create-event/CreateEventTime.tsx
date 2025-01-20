import { useEffect, useState } from "react";
import createGroup2 from "../../assets/images/createGroup2.jpeg";
import Button from "../../reuseable-components/Button";
import { useCreateEventContext } from "../../contexts/CreateEventContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const CreateEventTime = () => {
  const { nextStep, setNewEvent } = useCreateEventContext();
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [durationHours, setDurationHours] = useState<string>("");
  const [durationMinutes, setDurationMinutes] = useState<string>("");
  const [isValid, setIsValid] = useState<string>("");
  const { isMobile } = useScreenWidth();

  useEffect(() => {
    if (date && startTime && durationHours) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [date, startTime, durationHours]);

  const handleSubmit = () => {
    if (!isValid) {
      return;
    }

    const timestamp = new Date(date).getTime();

    let duration = `${durationHours} hrs`;
    if (durationMinutes && durationMinutes !== "0") {
      duration += ` ${durationMinutes} mins`;
    }

    setNewEvent((prevEvent) => ({
      ...prevEvent,
      date: timestamp,
      startTime,
      duration,
    }));

    nextStep();
  };

  console.log(date, startTime, durationHours);

  return (
    <div className="flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[100%]  tablet:h-[100%] bg-bgPrimary mobile:mt-0 rounded-lg">
      <main className="w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0">
        {!isMobile && (
          <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
            <img
              src={createGroup2}
              alt="Sign Up"
              className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
            />
          </section>
        )}
        <section className="mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center ">
          <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0">
            Add the time and date
          </h1>
          <h2 className=" mobile:w-[100%] tablet:w-[70%] text-textPrimary mobile:text-[13px] tablet:text-[13px] desktop:text-[16px]  font-medium mobile:mt-6 desktop:mt-8">
            * Please select a date, start time and the duration of the event...
          </h2>

          <div className="mobile:w-[100%] tablet:w-[70%] mobile:h-[68%] tablet:h-[70%] desktop:h-[60%] flex flex-col items-center justify-center gap-2 mt-6 p-4 border rounded-lg">
            <label className="w-[90%] font-semibold text-[14px] tablet:mt-6 desktop:mt-5">
              Event Date:
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-[90%] border p-2 rounded text-[14px] focus:outline-none"
            />

            <label className="w-[90%] font-semibold text-[14px] mobile:mt-4 tablet:mt-6">
              Start Time:
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-[90%] border p-2 rounded text-[14px] focus:outline-none"
            />

            <div className="w-[90%] mt-6">
              <label className="font-semibold text-[14px]">Duration:</label>
              <div className="flex gap-4 mt-1">
                <input
                  type="number"
                  min="0"
                  placeholder="Hours"
                  value={durationHours}
                  onChange={(e) => setDurationHours(e.target.value)}
                  className="w-[48%] border p-2 rounded text-[14px] focus:outline-none"
                />
                <input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="Minutes"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                  className="w-[48%] border p-2 rounded text-[14px] focus:outline-none"
                />
              </div>
            </div>

            <div className="mobile:mt-8 tablet:mt-6 desktop:mt-8 mt-auto mobile:mb-[40px] tablet:mb-8 desktop:mb-12">
              <Button
                isDisabled={!isValid}
                bgColour={!isValid ? "bg-gray-300" : "bg-primary"}
                handleClick={handleSubmit}
                py="py-3"
                px="px-12"
                fontSize="text-14px"
              >
                Save event details
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateEventTime;
