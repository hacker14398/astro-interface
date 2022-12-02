import { useRef, useState } from "react";
import SegmentedControl from "./SegmentedControl";

const SegmentControl = () => {
  const [selectedValue, setSelectedValue] = useState("complete");

  return (
    <div className="container">
      <SegmentedControl
        name="group-1"
        callback={(val) => setSelectedValue(val)}
        segments={[
          {
            label: "Complete",
            value: "complete",
            ref: useRef()
          },
          {
            label: "Incomplete",
            value: "incomplete",
            ref: useRef()
          },
          {
            label: "Pending",
            value: "pending",
            ref: useRef()
          }
        ]}
      />
      <p className="selected-item">Selected: {selectedValue}</p>
    </div>
  );
};

export default SegmentControl;
