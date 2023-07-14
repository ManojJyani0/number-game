import React from "react";
import { APP_NAME } from "../../../config";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { selectUPI } from "../auth/authSlice";
type Props = {
  amount: number;
};

const QR_CODE = ({ amount }: Props) => {
  const upi = useSelector(selectUPI);
  return (
    <div className="z-10 rounded-lg border bg-white py-8 shadow-lg">
      <p className="bg-slate-50 py-2 text-center text-2xl font-extrabold uppercase tracking-tight text-gray-600">
        {APP_NAME}
      </p>
      <QRCode
        size={256}
        style={{
          height: "auto",
          maxWidth: "auto",
          width: "80%",
          margin: "2rem",
        }}
        value={
          "upi://pay?pa=UPI_ID&am=AMOUNT&cu=INR"
            .replace("UPI_ID", upi)
            .replace("AMOUNT", amount.toString())
        }
        viewBox={`0 0 256 256`}
      />
      <p className="mt-4 text-center text-sm font-medium tracking-tight text-gray-500">
        {upi}
      </p>
      <div className="mt-8 flex justify-center gap-x-4"></div>
    </div>
  );
};

export default QR_CODE;
