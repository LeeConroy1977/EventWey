import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useUser } from "../contexts/UserContext";
import { useEvent } from "../contexts/EventContext";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);

interface TicketPaymentProps {
  ticketType: string;

  onPaymentSuccess: () => void;
}

const TicketPayment: React.FC<TicketPaymentProps> = ({
  ticketType: initialTicketType,
  onPaymentSuccess,
}) => {
  return (
    <Elements stripe={stripePromise}>
      <TicketPaymentContent
        ticketType={initialTicketType}
        onPaymentSuccess={onPaymentSuccess}
      />
    </Elements>
  );
};

const TicketPaymentContent: React.FC<TicketPaymentProps> = ({
  ticketType: initialTicketType,
  onPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, joinFreeEvent } = useUser();
  const { event, loading, error } = useEvent();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [ticketType, setTicketType] = useState(initialTicketType);
  const [ticketTypes, setTicketTypes] = useState<string[]>([]);
  const [defaultPlaceholder, SetDefaultPlaceholder] = useState({
    cardNumber: "4242 4242 4242 4242",
    expiryDate: "12/34",
    cvc: "123",
    zip: "12345",
  });


  console.log("Event object:", event);
  console.log("Event ID:", event?.id, "Type:", typeof event?.id);
  console.log("Initial ticket type:", initialTicketType);

  useEffect(() => {
    if (event?.priceBands) {
      const types = event.priceBands.map((band: { type: string }) => band.type);
      console.log("Available ticket types:", types);
      setTicketTypes(types);
      setTicketType(
        types.includes(initialTicketType) ? initialTicketType : types[0] || ""
      );
    } else {
      setTicketTypes([]);
      setTicketType("");
    }
  }, [event, initialTicketType]);

  if (loading) {
    return <div>Loading event...</div>;
  }

  if (
    error ||
    !event ||
    !Number.isInteger(Number(event.id)) ||
    Number(event.id) <= 0
  ) {
    const errorMsg = error || `Event not found or invalid ID: ${event?.id}`;
    console.error("Event validation failed:", { event, id: event?.id, error });
    return <div>Error: {errorMsg}</div>;
  }

  if (!stripe || !event) {
    return (
      <div>
        Error: Stripe is not initialized. Please check your configuration.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    if (!user || !ticketType) {
      setErrorMessage(
        "Missing required fields: " +
          (!user ? "User " : "") +
          (!ticketType ? "Ticket Type " : "")
      );
      console.error("Missing fields:", { user, ticketType });
      return;
    }

    setIsLoading(true);
    const payload = { eventId: Number(event.id), ticketType };
    console.log("Sending payload:", payload);

    try {
      const response = await fetch(
        "https://eventwey-backend.onrender.com/events/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create payment intent: ${errorText}`);
      }

      const { clientSecret, paymentIntentId } = await response.json();

      if (!clientSecret || !paymentIntentId) {
        throw new Error("Failed to obtain client secret or payment intent ID");
      }

      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) {
        throw new Error("Card number element not found");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              address: {
                postal_code: (
                  document.getElementById("postal-code") as HTMLInputElement
                )?.value,
              },
            },
          },
        }
      );

      if (error) {
        throw new Error(error.message || "Payment failed");
      }

      if (paymentIntent.status === "succeeded") {
        const joinedEvent = await joinFreeEvent(event.id, ticketType, {
          paymentIntentId,
        });
        onPaymentSuccess();
      }
    } catch (err: any) {
      console.error("Payment error:", err.message);
      setErrorMessage(
        err.message || "An error occurred during payment processing"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[60%] h-[65%] mx-auto bg-white text-1000 flex flex-col items-center border-2 border-gray-200 px-6 py-8 mt-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Enter Payment Details</h2>
      <div className="w-full min-h-[1rem] flex items-center justify-center mt-2">
        {errorMessage && <div className="text-red-500 ">{errorMessage}</div>}
      </div>
      <form onSubmit={handleSubmit} className="w-full h-full space-y-4 mt-4">
        <div>
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <div className="mt-1 p-2 border rounded">
            <CardNumberElement
              id="card-number"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
                placeholder: defaultPlaceholder.cardNumber,
              }}
              onChange={() => setErrorMessage(null)}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="card-expiry"
              className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <div className="mt-1 p-2 border rounded">
              <CardExpiryElement
                id="card-expiry"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                  placeholder: defaultPlaceholder.expiryDate,
                }}
                onChange={() => setErrorMessage(null)}
              />
            </div>
          </div>
          <div className="flex-1">
            <label
              htmlFor="card-cvc"
              className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <div className="mt-1 p-2 border rounded">
              <CardCvcElement
                id="card-cvc"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                  placeholder: defaultPlaceholder.cvc,
                }}
                onChange={() => setErrorMessage(null)}
              />
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium text-gray-700">
            Postal Code
          </label>
          <input
            id="postal-code"
            type="text"
            defaultValue={defaultPlaceholder.zip}
            placeholder="12345"
            className="mt-1 block w-full p-2 border rounded"
            onChange={() => setErrorMessage(null)}
          />
        </div>

        <div className="w-full h-[5rem] mt-8 flex items-center justify-center">
          <button
            disabled={isLoading || !ticketType}
            className="w-[170px] h-[40px]  bg-primary text-white rounded-lg  ">
            {isLoading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketPayment;
