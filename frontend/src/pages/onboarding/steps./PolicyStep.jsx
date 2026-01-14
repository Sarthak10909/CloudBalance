import StepIndicator from "../components/StepIndicator";
// import img1 from "../assets/policy1.png";
// import img2 from "../assets/policy2.png";
// import img3 from "../assets/policy3.png";

const PolicyStep = () => {
  return (
    <div className="space-y-6">
      <StepIndicator num={1}>
        Open the created <b>CK-Tuner IAM Role</b>
      </StepIndicator>
      {/* <img src={img1} className="rounded border" /> */}

      <StepIndicator num={2}>
        Go to <b>Permissions → Add permissions → Attach policies</b>
      </StepIndicator>
      {/* <img src={img2} className="rounded border" /> */}

      <StepIndicator num={3}>
        Filter by <b>Customer Managed</b> and select required policies
      </StepIndicator>
      {/* <img src={img3} className="rounded border" /> */}

      <StepIndicator num={4}>
        Click on <b>Add permissions</b>
      </StepIndicator>
    </div>
  );
};

export default PolicyStep;
