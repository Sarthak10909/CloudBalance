import StepIndicator from "../components/StepIndicator";
import CopyBlock from "../components/CopyBlock";
// import img1 from "../assets/cur1.png";
// import img2 from "../assets/cur2.png";
// import img3 from "../assets/cur3.png";

const resourceId = "ck-tuner-275595855473-hourly-cur";
const reportPath = "275595855473";

const CurStep = () => {
  return (
    <div className="space-y-6">

      <StepIndicator num={1}>
        Open <b>Cost & Usage Reports</b> in AWS Billing
      </StepIndicator>

      <StepIndicator num={2}>
        Create report with name:
      </StepIndicator>
      <CopyBlock text={resourceId} inline />

      <StepIndicator num={3}>
        Configure S3 bucket and accept default policy
      </StepIndicator>
      {/* <img src={img1} className="rounded border" /> */}

      <StepIndicator num={4}>
        Enter Report Path Prefix
      </StepIndicator>
      <CopyBlock text={reportPath} inline />

      <StepIndicator num={5}>
        Enable <b>Hourly</b> granularity and <b>Athena</b> integration
      </StepIndicator>
      {/* <img src={img2} className="rounded border" /> */}

      <StepIndicator num={6}>
        Review and click <b>Create Report</b>
      </StepIndicator>
      {/* <img src={img3} className="rounded border" /> */}
    </div>
  );
};

export default CurStep;
