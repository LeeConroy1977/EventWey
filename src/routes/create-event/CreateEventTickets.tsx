import { useState, useEffect } from "react";
import Button from "../../reuseable-components/Button";
import { useCreateEventContext } from "../../contexts/CreateEventContext";
import createGroup2 from "../../assets/images/createGroup2.jpeg";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const CreateEventTickets = () => {
  const { nextStep, setNewEvent } = useCreateEventContext();

  const [isFree, setIsFree] = useState<boolean>(true);
  const [priceBands, setPriceBands] = useState([
    { type: "EarlyBird", price: "", ticketCount: 0 },
    { type: "Standard", price: "", ticketCount: 0 },
    { type: "VIP", price: "", ticketCount: 0 },
  ]);
  const { isMobile } = useScreenWidth();

  const [totalTickets, setTotalTickets] = useState<number>(0);
  const [selectedPlaces, setSelectedPlaces] = useState<number>(0);

  useEffect(() => {
    const total = priceBands.reduce(
      (sum, band) => sum + Number(band.ticketCount || 0),
      0
    );
    setTotalTickets(total);
  }, [priceBands]);

  const handleFreeToggle = () => {
    setIsFree(!isFree);
    if (!isFree) {
      setPriceBands([
        { type: "EarlyBird", price: "", ticketCount: 0 },
        { type: "Standard", price: "", ticketCount: 0 },
        { type: "VIP", price: "", ticketCount: 0 },
      ]);
      setSelectedPlaces(0);
    }
  };

  const handleBandChange = (index: number, field: string, value: string) => {
    const updatedBands = [...priceBands];
    updatedBands[index] = { ...updatedBands[index], [field]: value };
    setPriceBands(updatedBands);
  };

  const handleSubmit = () => {
    if (!isFree) {
      const isValid = priceBands.some(
        (band) => band.price && band.ticketCount > 0
      );
      if (!isValid) {
        console.log("Invalid priceBands data");
        return;
      }
    }

    const capacity = isFree ? selectedPlaces : totalTickets;
    const availability = isFree ? selectedPlaces : totalTickets;

    console.log("Setting new event:", {
      free: isFree,
      priceBands: isFree ? [] : priceBands,
      capacity,
      availability,
    });
    // @ts-ignore
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      free: isFree,
      priceBands: isFree ? [] : priceBands,
      capacity,
      availability,
    }));

    console.log("Calling next step");
    nextStep();
  };

  return (
    <div className="flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[100%]  tablet:h-[100%] bg-bgPrimary mobile:mt-0 rounded-lg">
      <main className="w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0">
        {!isMobile && (
          <section className="w-[50%] flex flex-col items-center">
            <img
              src={createGroup2}
              alt="Sign Up"
              className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
            />
          </section>
        )}
        <section className="mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center ">
          <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0">
            Set Pricing
          </h1>
          <div className="flex items-center gap-6 mt-16">
            <span
              className={
                isFree ? "text-textPrimary font-semibold" : "text-textSecondary"
              }
            >
              Free
            </span>
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!isFree}
                onChange={handleFreeToggle}
                className="sr-only peer focus:outline-none"
              />
              <div className="w-[200px] h-[50px] pl-2 flex items-center border-2 border-primary rounded-full bg-bgPrimary peer-checked:bg-bgSecondary transition-all"></div>
              <span
                className={`absolute top-1/2 left-[5px] w-[40px] h-[40px] bg-primary rounded-full transition-transform transform -translate-y-1/2 peer-checked:translate-x-[150px]`}
              ></span>
            </label>
            <span
              className={
                isFree ? "text-textPrimary font-semibold" : "text-textSecondary"
              }
            >
              Paid
            </span>
          </div>

          {!isFree && (
            <div className="mt-8 w-[80%] flex flex-col gap-6">
              {priceBands.map((band, index) => (
                <div
                  key={index}
                  className="mb-4 w-full flex flex-col items-center"
                >
                  <h2 className="font-semibold text-[16px]">{band.type}</h2>
                  <div className="flex gap-4 mt-2 w-full justify-center">
                    <input
                      type="text"
                      placeholder="Price (£)"
                      value={band.price}
                      onChange={(e) =>
                        handleBandChange(index, "price", e.target.value)
                      }
                      className="w-[40%] border p-2 rounded"
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="Tickets"
                      value={band.ticketCount}
                      onChange={(e) =>
                        handleBandChange(index, "ticketCount", e.target.value)
                      }
                      className="w-[40%] border p-2 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isFree && (
            <div className="mt-16 flex flex-col gap-6 w-[80%] items-center">
              <h2 className="font-semibold text-[16px]">
                Number of Available Places
              </h2>
              <input
                type="number"
                value={selectedPlaces}
                onChange={(e) => setSelectedPlaces(Number(e.target.value))}
                min="0"
                className="border p-2 rounded-lg w-[60%] pl-4"
              />
            </div>
          )}

          {!isFree && (
            <div className="mt-4 text-textPrimary">
              <strong>Total Tickets:</strong> {totalTickets}
            </div>
          )}

          <div className="mt-auto mb-12">
            <Button px="px-12" py="py-3" handleClick={handleSubmit}>
              Save Pricing
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateEventTickets;
