import { useState } from "react";
import { getSession } from "../session";
import { charge } from "./api";
import { formatMoney, type Currency } from "../lib/money";

interface PayButtonProps {
  amount: number;
  currency: Currency;
}

export function PayButton({ amount, currency }: PayButtonProps) {
  const [paid, setPaid] = useState(false);
  const [expired, setExpired] = useState(false);

  async function handlePay() {
    const session = getSession();
    if (!session) {
      setExpired(true);
      return;
    }
    setExpired(false);
    await charge(session.token);
    setPaid(true);
    setTimeout(() => setPaid(false), 1500);
  }

  return (
    <>
      <button type="button" className="pay" onClick={handlePay}>
        {paid ? "Paid" : `Pay ${formatMoney(amount, currency)}`}
      </button>
      {expired && (
        <p className="status" role="alert">
          Your session has expired. Please sign in again to pay.
        </p>
      )}
    </>
  );
}
