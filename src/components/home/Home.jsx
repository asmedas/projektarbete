import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <h1 className="home-title">Wigells Car Dealer</h1>
      <p className="home-subtitle">
        Family owned since 1987 — your trusted dealership for quality used cars,
        trade-ins, and financing.
      </p>

      <div className="home-section">
        <h2>Browse Our Cars</h2>
        <p>
          Explore our full selection of inspected vehicles. Each car includes
          mileage, service history, fuel type, gearbox, and total ownership cost
          to help you compare options quickly.
        </p>
      </div>

      <div className="home-section">
        <h2>Finance & Ownership</h2>
        <p>
          Unsure what fits your budget? We offer transparent financing with
          monthly cost estimates. Compare options directly from each car’s
          detail page.
        </p>
      </div>

      <div className="home-section">
        <h2>Test Drives</h2>
        <p>
          Found something interesting? Book a test drive directly from the app.
          Our team will contact you to confirm your preferred time.
        </p>
      </div>

      <div className="home-section">
        <h2>Trade-In Options</h2>
        <p>
          Thinking about switching cars? Get a fast valuation based on current
          market prices and your car’s details. No pressure, no hidden fees.
        </p>
      </div>

      <div className="home-footer">
        <p>Wigells Car Dealer • Quality you can trust</p>
      </div>
    </div>
  );
}
