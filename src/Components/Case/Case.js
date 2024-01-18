import React, { useState, useEffect } from "react";

// import { Spinner } from "react-bootstrap";

import { Chart } from "react-google-charts";

import Canvas from "../Canvas/Canvas";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Canvas2 from "../Canvas/Canvas2";
import "./case.css";
import useDatabaseProjects from "../../Hooks/useDatabaseProject";
import del from "../DropDown/Delete.png";
import add from "../Summary/add.png";

import ImageCropper2 from "../ImageComponent/ImageCropper2";

const Case = React.forwardRef(
  ({ projectId, caseId, viewCae, CloseCase }, ref) => {
    const [histData, setHistData] = useState([]);
    const [histBinData, setHistBinData] = useState([]);
    const [pdfData, setPdfData] = useState([]);
    const [pdfData2, setPdfData2] = useState([]);
    const [genNumChart, setGenNumChart] = useState([]);
    const [histogramDataGoogle, setHistogramDataGoogle] = useState([]);
    const [pdfDataGoogle, setPdfDataGoogle] = useState([]);
    const [maxValue, setMaxValue] = useState();
    const [dualAxisChart, setDualAxisChart] = useState([]);
    const [addComponent, setAddComponent] = useState("Select Dimension");
    const [meanStatistic, setMeanStatistic] = useState("");
    const [gapCpk, setGapCpk] = useState("Gap Cpk");
    const [nrSamples, setNrSamples] = useState("Select Nr. of samples ");
    const [isSpinner, setIsSpinner] = useState(false);
    const [isStatistic, setIsStatistic] = useState(false);
    const [isDatabaseProjects, setIsdatabaseProjects] = useState(false);
    const { databaseProjects, addNewCaeDim, removeCaseDim } =
      useDatabaseProjects();
    const [databaseSummryUpdate, setDatabaseSummryUpdate] =
      useState(databaseProjects);
    const [dataCaseFiltered, setDataCaseFiltered] = useState([]);
    const [dataCaseDimFiltred, setDataCaseDimFilttred] = useState([]);
    const [isDataCaseDimFiltred, setIsDataCaseDimFilttred] = useState(false);
    const [viewsign, setViewSign] = useState(false);
    const [viewAddDimension, setViewAddDimension] = useState(false);

    console.log("Case-databaseProjects", databaseProjects);

    console.log("dataCaseDimFiltred", dataCaseDimFiltred);
    console.log("isDataCaseDimFiltred", isDataCaseDimFiltred);
    console.log("maxValue", maxValue);

    // const [isGraph, setIsGraph] = useState(false);

    const [statisticalForm, setStatisticalForm] = useState({
      meanS: "",
      UTS: "",
      LTS: "",
      Samples: "",
      Range: "",
      Pp: "",
      PpK: "",
      StDev: "",
      SigmaInt: "",
      PartsLess: "",
      PartsMore: "",
      Max: "",
    });

    const [formAddDim, setFormAddDim] = useState({
      ID: "",
      Name: "",
      Description: "",
      UniqueIdentifier: "",
      NominalValue: "",
      UpperTolerance: "",
      LowerTolerance: "",
      DistributionType: "",
      ToleranceType: "",
      Color: "",
      Sign: "",
    });

    console.log("formAddDim:", formAddDim);
    console.log("Case databaseSummryUpdate:", databaseSummryUpdate);

    console.log("statisticalForm", statisticalForm);
    console.log("projectId,caseid:", projectId, caseId);

    const databaseProjectIsupdate = () => {
      if (
        databaseProjects.length > 0 &&
        projectId !== null &&
        caseId !== null &&
        databaseProjects[projectId - 1] &&
        databaseProjects[projectId - 1].DataCase &&
        databaseProjects[projectId - 1].DataCase[caseId - 1] &&
        databaseProjects[projectId - 1].DataCase[caseId - 1].CaseData
      ) {
        setDatabaseSummryUpdate(databaseProjects);
        console.log("Dimensions from selected project:");

        if (databaseProjects[projectId - 1].DatabaseDim.length > 0) {
          setDataCaseFiltered(databaseProjects[projectId - 1].DatabaseDim);
        } else {
          setDataCaseFiltered([]);
        }

        console.log(
          "Check CaseData:",
          databaseProjects[projectId - 1].DataCase[caseId - 1].CaseData
        );

        if (
          databaseProjects[projectId - 1].DataCase[caseId - 1].CaseData.length >
          0
        ) {
          setDataCaseDimFilttred(
            databaseProjects[projectId - 1].DataCase[caseId - 1].CaseData
          );
          setIsDataCaseDimFilttred(true);
        } else {
          setDataCaseDimFilttred([]);
        }
      }
    };

    console.log("dataCaseFiltered:", dataCaseFiltered);

    useEffect(() => {
      databaseProjectIsupdate();
    }, [databaseProjects, projectId, caseId]);

    useEffect(() => {
      if (dataCaseFiltered.length > 0) {
        setIsdatabaseProjects(true);
      } else {
        console.log("dataCaseFiltered:", false);
      }
    }, [dataCaseFiltered]);

    // const DatabaseCalculation = DatabaseCases[0].Data[0].CaseData;
    const DatabaseCalculation = dataCaseDimFiltred;

    //Worst case nominal
    const WorstCaseNominal = DatabaseCalculation.map((n) =>
      Number(
        n.Sign + (n.NominalValue + (n.LowerTolerance + n.UpperTolerance) / 2)
      )
    ).reduce((accumulator, current) => accumulator + current, 0);

    //worst case  tolerance

    const WorstCaseTolerance = DatabaseCalculation.map(
      (n) => (n.UpperTolerance - n.LowerTolerance) / 2
    ).reduce((accumulator, current) => accumulator + current, 0);

    console.log("WorstCaseNominal", WorstCaseNominal);
    console.log("WorstCaseTolerance", WorstCaseTolerance);
    console.log("DatabaseCalculation", DatabaseCalculation);
    // console.log("DatabaseCases", DatabaseCases[0].Data[0].CaseData);

    console.log("histData", histData);
    console.log("histBinData", histBinData);
    console.log("pdfData", pdfData);

    // console.log("min", Math.min(...genNum), "max", Math.max(...genNum));
    const setSpinner = () => {
      toast("The chart is loading", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      setIsSpinner(true);
      console.log("setIsSpinner-True");
      setTimeout(() => setIsSpinner(false), 5000);
      // setIsGraph(true);
    };

    const handleChange = (e) => {
      // console.log("event", e.target.value);
      setFormAddDim({ ...formAddDim, [e.target.name]: e.target.value });
    };

    const generateStatistic = () => {
      if (gapCpk === "Gap Cpk" || nrSamples === "Select Nr. of samples ") {
        toast("Select Cpk gap and Nr. of samples!", {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        });
        return;
      }
      console.log("Click to genereate statistic");
      setSpinner();

      //Standard  deviation calculation
      const StandardDeviation = Math.sqrt(
        DatabaseCalculation.map((n) =>
          Math.pow(
            Math.round(
              ((n.UpperTolerance - n.LowerTolerance) /
                (6 * parseFloat(n.DistributionType.replace(/[^\d.]*/g, ""))) +
                Number.EPSILON) *
                100
            ) / 100,
            2
          )
        ).reduce((accumulator, current) => accumulator + current, 0)
      );

      console.log("StandardDeviation", StandardDeviation);

      //const inputs
      const samplenum = nrSamples;
      const mean = WorstCaseNominal;
      // const UT = WorstCaseTolerance;
      // const LT = -WorstCaseTolerance;
      let Cpk = gapCpk;
      const stddev = StandardDeviation;

      //generate random number using Box Muller Transform

      const boxMullerTransform = () => {
        const u1 = Math.random();
        const u2 = Math.random();

        const z0 =
          Math.round(
            (Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2) +
              Number.EPSILON) *
              100
          ) / 100;
        const z1 =
          Math.round(
            (Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2) +
              Number.EPSILON) *
              100
          ) / 100;
        //   console.log("z0", z0, "z1", z1);
        return { z0, z1 };
      };

      //Normal Distributed random number
      const getNormallyDistributedRandomNumber = (mean, stddev) => {
        const { z0 } = boxMullerTransform();

        return z0 * stddev + mean;
      };

      //arras/objects for chart
      const genNum = [];

      for (let i = 0; i < samplenum; i += 1) {
        genNum.push(
          Math.round(getNormallyDistributedRandomNumber(mean, stddev) * 100) /
            100
        );
      }

      const genNumHist = [];

      for (let i = 0; i < samplenum; i += 1) {
        genNumHist.push({
          x: genNum[i],
        });
      }
      //Statistical calculation

      const sum = genNum.reduce((acc, i) => (acc += i));
      const count = genNum.length;
      const calculatedMean = sum / count;
      console.log("calculatedMean", calculatedMean);
      setMeanStatistic(calculatedMean);
      let stddevupp = 0;

      let countN = {};
      genNum.forEach(function (i) {
        countN[i] = (countN[i] || 0) + 1;
      });
      console.log("countN", countN);
      let arr = Object.values(countN);
      let min = Math.min(...arr);
      let max = Math.max(...arr);

      console.log(`Min value: ${min}, max value: ${max}`);

      for (let i = 0; i < genNum.length; i += 1) {
        stddevupp = stddevupp + Math.pow(genNum[i] - calculatedMean, 2);
      }
      console.log("stddevupp", stddevupp);

      const calculatedstddev = Math.sqrt(stddevupp / (count - 1));
      console.log("calculatedstddev", calculatedstddev);

      // setStatisticalForm({ ...statisticalForm, StDev: calculatedstddev });

      const statisticalTol = 6 * calculatedstddev * Cpk;
      console.log("Statistical tolerance", statisticalTol);
      // setStatisticalForm({ ...statisticalForm, UTS: statisticalTol / 2 });
      // setStatisticalForm({ ...statisticalForm, LTS: -statisticalTol / 2 });

      //Statistical toerance

      //Pp Pp = (USL – LSL) / 6 * s :; See min and max generated numbers!
      const Pp = (2 * WorstCaseTolerance) / (6 * calculatedstddev);
      console.log("Pp", Pp);
      // setStatisticalForm({ ...statisticalForm, Pp: Pp });

      //Ppk
      const PpkU =
        (WorstCaseNominal + WorstCaseTolerance - calculatedMean) /
        (3 * calculatedstddev);
      const PpkL =
        (calculatedMean - (WorstCaseNominal - WorstCaseTolerance)) /
        (3 * calculatedstddev);

      const Ppk = Math.min(PpkU, PpkL);
      console.log("PpkL,PpkU", PpkL, PpkU);
      // setStatisticalForm({ ...statisticalForm, Ppk: Ppk });

      //Sigma interval Tolerance range/standard deviation
      const sigmaintv = (2 * WorstCaseTolerance) / calculatedstddev;
      // setStatisticalForm({ ...statisticalForm, SigmaInt: sigmaintv });
      setStatisticalForm({
        meanS: calculatedMean,
        UTS: statisticalTol / 2,
        LTS: -statisticalTol / 2,
        Samples: 100000,
        Range: statisticalTol,
        Pp: Pp,
        PpK: Ppk,
        StDev: calculatedstddev,
        SigmaInt: sigmaintv,
        PartsLess: "",
        PartsMore: "",
        Max: max,
      });

      //generate bin number array
      const histBinNum = genNum
        .filter(function (value, index, array) {
          return array.indexOf(value) === index;
        })
        .sort();

      //PDF (probability density functions ) data
      const PDFdata = [];

      for (let i = 0; i < genNum.length; i += 1) {
        PDFdata.push(
          Math.exp(-Math.pow(genNum[i] - mean, 2) / (2 * Math.pow(stddev, 2))) /
            (stddev * Math.sqrt(2 * Math.PI))
        );
      }

      //PDF data for graph

      const PDFdataGraph = [];
      for (let i = 0; i < genNum.length; i += 1) {
        PDFdataGraph.push({ x: genNum[i], y: PDFdata[i] });
      }

      //{ date: "1", value: 35.98 },
      console.log("check genNum", genNum);
      const genNumChart = [];
      const sortedGenNum = genNum.sort();

      for (let i = 0; i < genNum.length; i++) {
        genNumChart.push({ value: sortedGenNum[i] });
      }

      const PDFdataChart = [];

      for (let i = 0; i < genNum.length; i += 1) {
        PDFdataChart.push({
          value: sortedGenNum[i],
          pdf:
            Math.exp(
              -Math.pow(sortedGenNum[i] - mean, 2) / (2 * Math.pow(stddev, 2))
            ) /
            (stddev * Math.sqrt(2 * Math.PI)),
        });
      }

      console.log("genNumChart", genNumChart);
      console.log("PDFdataChart", PDFdataChart);

      //Google charts

      // Calculate histogram data
      const histogramBins = samplenum / 10; // Number of bins for the histogram
      const histogram = Array.from({ length: histogramBins }, () => 0);

      genNum.forEach((value) => {
        const binIndex = Math.floor(
          (value - mean) / stddev + histogramBins / 2
        );
        if (binIndex >= 0 && binIndex < histogramBins) {
          histogram[binIndex] += 1;
        }
      });

      const histogramChartData = [["Value", "Frequency"]];
      const binWidth = (2 * stddev) / histogramBins;
      for (let i = 0; i < histogramBins; i++) {
        const binStart = mean - stddev + i * binWidth;
        histogramChartData.push([
          `${binStart.toFixed(2)}-${(binStart + binWidth).toFixed(2)}`,
          histogram[i],
        ]);
      }

      //  setHistogramData(histogramChartData);

      // Calculate PDF data
      const pdfChartData = [["Value", "Probability"]];
      for (let i = 0; i < histogramBins; i++) {
        const binStart = mean - stddev + i * binWidth;
        const probability = histogram[i] / (samplenum * binWidth);
        pdfChartData.push([
          `${binStart.toFixed(2)}-${(binStart + binWidth).toFixed(2)}`,
          probability,
        ]);
      }

      console.log(
        "histogramChartData,pdfChartData",
        histogramChartData,
        pdfChartData
      );

      const frequencyObj = {};

      // Count the frequency of each value
      genNum.forEach((value) => {
        if (frequencyObj[value]) {
          frequencyObj[value]++;
        } else {
          frequencyObj[value] = 1;
        }
      });

      // Convert the frequency object into an array of arrays
      const frequencyArray = [];

      for (const value in frequencyObj) {
        frequencyArray.push([value.toString(), frequencyObj[value]]);
      }

      console.log("frequencyArray", frequencyArray);

      const histogramData = [
        ["Value", "Frequency"],
        ...frequencyArray.map(([value, frequency]) => [value, frequency]),
      ];

      const probabilityArray = [["Value", "Probability"]];

      for (const value in frequencyObj) {
        // Convert the value to a number
        const numericValue = parseFloat(value);

        // Calculate the probability using the formula you provided
        const probability =
          Math.exp(
            -Math.pow(numericValue - mean, 2) / (2 * Math.pow(stddev, 2))
          ) /
          (stddev * Math.sqrt(2 * Math.PI));

        // Push the value and calculated probability into the array
        probabilityArray.push([numericValue, probability]);
      }
      //  setPdfData(pdfChartData);

      const dualAxisChart = [["X", "Frequency", "Probability"]];

      for (const value in frequencyObj) {
        // Convert the value to a number
        const numericValue = parseFloat(value);

        // Calculate the probability using the formula you provided
        const probability =
          Math.exp(
            -Math.pow(numericValue - mean, 2) / (2 * Math.pow(stddev, 2))
          ) /
          (stddev * Math.sqrt(2 * Math.PI));

        // Push the value and calculated probability into the array
        dualAxisChart.push([value * 1, frequencyObj[value], probability]);
      }

      console.log("dualAxisChart", dualAxisChart);

      const maxDataValue = Math.max(
        ...frequencyArray.map(([value, frequency]) => frequency)
      );

      setTimeout(() => {
        setHistData(genNumHist);
        setHistBinData(histBinNum);
        setPdfData(PDFdataGraph);
        setPdfData2(PDFdataChart);
        setGenNumChart(genNumChart);
        setIsSpinner(false);
        setHistogramDataGoogle(histogramData);
        setPdfDataGoogle(probabilityArray);
        setMaxValue(maxDataValue);
        setDualAxisChart(dualAxisChart);
      }, 1000); // Simulate a 5-second delay
      setIsStatistic(true);
    };

    const handleCpkChange = (e) => {
      setGapCpk(e.target.value);
    };

    const handleSelectDimData = (e) => {
      console.log("handleSelectDimData", e.target.value);
      console.log("handleSelectDimData:", dataCaseFiltered[e.target.value - 1]);
      const selectedDim = dataCaseFiltered[e.target.value - 1];
      const selectedCaseDim =
        databaseProjects[projectId - 1].DataCase[caseId - 1].CaseData;
      console.log("handleSelectedDimData selectedCaseDim:", selectedCaseDim);
      const lastID = Math.max(...selectedCaseDim.map((o) => o.ID));
      console.log("handleSelectedDimData lasdId:", lastID);
      let newID = 0;
      if (lastID === -Infinity) {
        newID = 1;
      } else {
        newID = lastID + 1;
      }

      setFormAddDim({
        ID: newID,
        Name: selectedDim.Name,
        Description: selectedDim.Description,
        UniqueIdentifier: selectedDim.UniqueIdentifier,
        NominalValue: selectedDim.NominalValue,
        UpperTolerance: selectedDim.UpperTolerance,
        LowerTolerance: selectedDim.LowerTolerance,
        DistributionType: selectedDim.DistributionType,
        ToleranceType: selectedDim.ToleranceType,
        Color: selectedDim.Color,
        Sign: "",
      });
      setViewSign(true);
      setAddComponent(selectedDim.Description);
    };

    const AddDim = (e) => {
      e.preventDefault();
      console.log("form", formAddDim);

      if (
        formAddDim.Name !== "" &&
        formAddDim.Description !== "" &&
        formAddDim.NominalValue !== "" &&
        formAddDim.UpperTolerance !== "" &&
        formAddDim.LowerTolerance !== "" &&
        formAddDim.DistributionType !== "" &&
        formAddDim.ToleranceType !== "" &&
        formAddDim.Sign !== "" &&
        formAddDim.Sign !== "Select Sign" &&
        formAddDim.Color !== ""
      ) {
        console.log("AddDim formAddDim", formAddDim);

        addNewCaeDim(projectId, caseId, formAddDim);

        // addNewDim(id, nComponent);

        dataCaseDimFiltred.push(formAddDim);
        setAddComponent("Select Dimension");
      } else {
        toast("Add all informations!", {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        });
      }
    };

    const RemoveCaseDim = (e) => {
      let obj = dataCaseDimFiltred.find((o) => o.ID === e);

      let index = dataCaseDimFiltred.indexOf(obj);
      console.log("RemovecaseDIm-index:", index);
      let update = dataCaseDimFiltred;
      const caseDimID = e;

      if (index > -1) {
        update.splice(index, 1);
      }

      setDataCaseDimFilttred(update);
      removeCaseDim(projectId, caseId, caseDimID);
    };

    const handleNrSamples = (e) => {
      setNrSamples(e.target.value);
    };
    console.log("Gap Cpk:", gapCpk);

    const scrollToDatabase = () => {
      window.scrollTo({
        top: 400,
        behavior: "smooth", // Optional: Smooth scrolling animation
      });
    };

    console.log("check dualaxis", dualAxisChart);

    return (
      <div className="main-container-case" ref={ref}>
        <div className="database-header">
          <p className="fs-3 ">Case</p>

          {viewCae && <button onClick={CloseCase}>X</button>}
          {!viewCae && <button onClick={CloseCase}>ᐁ</button>}
        </div>
        {viewCae && (
          <>
            <div className="main-item-case">
              <div class="bottom-drop">
                <label for="toleranceType" className="label-drop">
                  Select tolerance type
                </label>
                <select
                  id="toleranceType"
                  class="select-drop"
                  name="Select Nr. of samples "
                  value={nrSamples}
                  onChange={(e) => {
                    handleNrSamples(e);
                  }}
                >
                  <option value="Select Nr. of samples ">
                    Select Nr. of samples{" "}
                  </option>

                  <option value="10000">10000</option>
                  <option value="25000">25000</option>
                  <option value="50000">50000</option>
                  <option value="100000">100000</option>
                </select>
              </div>
              <div class="bottom-drop">
                <label for="distributionType" className="label-drop">
                  Select distribution type
                </label>
                <select
                  id="gapcpk"
                  class="select-drop"
                  name="Gap Cpk"
                  value={gapCpk}
                  onChange={(e) => {
                    handleCpkChange(e);
                  }}
                >
                  <option value="Gap Cpk">Gap Cpk</option>
                  <option value="1">Normal Cpk 1</option>
                  <option value="1.33">Normal Cpk 1.33</option>
                  <option value="1.67">Normal Cpk 1.67</option>
                  <option value="2">Normal Cpk 2</option>
                </select>
              </div>
              <button
                className="button-add"
                onClick={() => {
                  generateStatistic();
                }}
              >
                Generate Statistic
              </button>
            </div>
            <div className="main-item-case">
              <table id="Database">
                <tbody>
                  <tr>
                    <th className="first-th">Worst Case</th>

                    <td
                      key={"Nominal:"}
                      style={{
                        borderTopRightRadius: "20px",
                      }}
                    >
                      {`${WorstCaseNominal.toFixed(3)}`}
                    </td>
                  </tr>
                  <tr>
                    <th>Upper Tolerance</th>

                    <td key={"UpperTolerance"}>
                      {` ${WorstCaseTolerance.toFixed(3)}`}
                    </td>
                  </tr>
                  <tr>
                    <th>Lower Tolerance</th>

                    <td key={"LowerTolerance"}>
                      {`${-WorstCaseTolerance.toFixed(3)}`}
                    </td>
                  </tr>
                  <tr>
                    <th>Upper Limit</th>

                    <td key={"UpperLimit"}>
                      {`${(WorstCaseNominal + WorstCaseTolerance).toFixed(3)}`}
                    </td>
                  </tr>
                  <tr>
                    <th>Lower Limit</th>

                    <td key={"LowerLimit"}>
                      {`${(WorstCaseNominal - WorstCaseTolerance).toFixed(3)}`}
                    </td>
                  </tr>
                  <tr>
                    <th>Range</th>

                    <td key={"Range"}>{`${(2 * WorstCaseTolerance).toFixed(
                      3
                    )}`}</td>
                  </tr>
                  <tr>
                    <th className="last-th">Symmetric</th>

                    <td
                      key={"Symmetric"}
                      style={{
                        borderBottomRightRadius: "20px",
                      }}
                    >
                      {`${WorstCaseNominal.toFixed(
                        3
                      )} ±${WorstCaseTolerance.toFixed(3)}`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {isStatistic && (
              <div className="main-item-case">
                <table id="Database">
                  <tbody>
                    <tr>
                      <th className="first-th">Mean</th>

                      <td
                        key={"Mean:"}
                        style={{
                          borderTopRightRadius: "20px",
                        }}
                      >
                        {`${meanStatistic.toFixed(4)}`}
                      </td>
                    </tr>
                    <tr>
                      <th>Upper Tolerance</th>

                      <td key={"UpperToleranceS"}>
                        {`${statisticalForm.UTS.toFixed(4)} `}
                      </td>
                    </tr>
                    <tr>
                      <th>Lower Tolerance</th>

                      <td key={"LowerToleranceS"}>
                        {`${statisticalForm.LTS.toFixed(4)} `}
                      </td>
                    </tr>
                    <tr>
                      <th>Samples</th>

                      <td key={"samples"}>100000</td>
                    </tr>
                    <tr>
                      <th>Range</th>

                      <td key={"Range"}>
                        {`${(statisticalForm.UTS - statisticalForm.LTS).toFixed(
                          4
                        )}`}
                      </td>
                    </tr>
                    <tr>
                      <th>Pp</th>

                      <td key={"Pp"}>{statisticalForm.Pp.toFixed(4)}</td>
                    </tr>
                    <tr>
                      <th>Ppk</th>

                      <td key={"Ppk"}>{statisticalForm.PpK.toFixed(4)}</td>
                    </tr>
                    <tr>
                      <th>St.Dev[σ]</th>

                      <td key={"St.Dev[σ]"}>
                        {statisticalForm.SigmaInt.toFixed(4)}
                      </td>
                    </tr>
                    <tr>
                      <th>Sigma intv.</th>

                      <td key={"Sigma intv."}>
                        {statisticalForm.StDev.toFixed(4)}
                      </td>
                    </tr>
                    <tr>
                      <th>Parts less LSL</th>

                      <td key={"Parts less LSL"}></td>
                    </tr>
                    <tr>
                      <th className="last-th">Parts more USL</th>

                      <td
                        key={"SParts more USL"}
                        style={{
                          borderBottomRightRadius: "20px",
                        }}
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {/* <Form.Group controlId="formGridState" className="col col-sm-6">
        <Form.Label>Select gap Cpk</Form.Label>
        <Form.Select
          // defaultValue="Gap Cpk"
          className="form-control p-2 bg-dark bg-gradient text-info rounded shadow-lg"
          style={{ "--bs-bg-opacity": "0.9" }}
          name="Gap Cpk"
          value={gapCpk}
          onChange={(e) => {
            handleCpkChange(e);
          }}
        >
          <option value="Gap Cpk">Gap Cpk</option>
          <option value="1">Normal Cpk 1</option>
          <option value="1.33">Normal Cpk 1.33</option>
          <option value="1.67">Normal Cpk 1.67</option>
          <option value="2">Normal Cpk 2</option>
        </Form.Select>
        <Form.Select
          // defaultValue="Select Nr. of samples "
          className="form-control p-2 bg-dark bg-gradient text-info rounded shadow-lg"
          name="Select Nr. of samples "
          value={nrSamples}
          onChange={(e) => {
            handleNrSamples(e);
          }}
        >
          <option value="Select Nr. of samples ">Select Nr. of samples </option>
          <option value="10000">10000</option>
          <option value="25000">25000</option>
          <option value="50000">50000</option>
          <option value="100000">100000</option>
        </Form.Select>
        <ToastContainer transition={Bounce} autoClose={2000} />
      </Form.Group> */}

            {/* {isSpinner && <Spinner animation="border" variant="secondary" />} */}
            <div className="main-item-case-chart">
              {/*Google Chart*/}

              {isStatistic && maxValue && (
                <div className="chart-container">
                  {/* <div className="container horizontal-scrollable"></div> */}
                  <div className="boxgraph">
                    <Chart
                      width={"100%"} // Set the initial width to 100%
                      height={"300px"} // Set the initial height
                      chartType="ColumnChart"
                      loader={<div>Loading Chart</div>}
                      data={histogramDataGoogle}
                      options={{
                        title: "Histogram ",
                        legend: { position: "none" },
                        series: { 0: { color: "#5A6376" } },
                        // backgroundColor: { fill: "#38403f" },
                        animation: {
                          startup: true,
                          easing: "linear",
                          duration: 1500,
                        },
                        hAxis: {
                          textStyle: {
                            color: "#171C26", // Set the text color for x-axis labels
                          },
                        },
                        vAxis: {
                          textStyle: { color: "#171C26" },
                          ticks: [
                            0,
                            (0.25 * maxValue).toFixed(0),
                            (0.5 * maxValue).toFixed(0),
                            (0.75 * maxValue).toFixed(0),
                            maxValue,
                          ], // Set custom tick values to enforce the maximum value
                        },
                      }}
                    />
                  </div>

                  <div className="boxgraph">
                    <Chart
                      width={"100%"}
                      height={"300px"}
                      chartType="LineChart"
                      loader={<div>Loading Chart</div>}
                      data={pdfDataGoogle}
                      options={{
                        legend: { position: "none" },
                        series: { 0: { color: "#171C26" } },
                        backgroundColor: { fill: "transparent" },
                        animation: {
                          startup: true,
                          easing: "linear",
                          duration: 1500,
                        },
                        hAxis: {
                          textPosition: "none", // Hide x-axis labels and ticks
                        },
                        vAxis: {
                          textPosition: "none", // Hide y-axis labels and ticks
                        },
                      }}
                    />
                  </div>

                  {/* <div className=""></div> */}
                </div>
              )}

              {/* <Col className="p-5">
          <Row>
            <Col>
              <div className="container-fluid tabelCase text-light ">
                <h3>Worst Case</h3>
                <ListGroup className="shadow p-3 mb-5 bg-body-tertiary rounded opacity-75 rounded-4">
                  <ListGroup.Item className="fs-5 tabelCase text-light">
                    {`Nominal:${WorstCaseNominal.toFixed(3)}`}
                  </ListGroup.Item>
                  <ListGroup.Item className="tabelCase text-light">{`Upper Tolerance: ${WorstCaseTolerance.toFixed(
                    3
                  )}`}</ListGroup.Item>
                  <ListGroup.Item className="tabelCase text-light">{`Lower Tolerance: ${-WorstCaseTolerance.toFixed(
                    3
                  )}`}</ListGroup.Item>
                  <ListGroup.Item className="tabelCase text-light">{`Upper Limit: ${(
                    WorstCaseNominal + WorstCaseTolerance
                  ).toFixed(3)}`}</ListGroup.Item>
                  <ListGroup.Item className="tabelCase text-light">{`Lower Limit: ${(
                    WorstCaseNominal - WorstCaseTolerance
                  ).toFixed(3)}`}</ListGroup.Item>
                  <ListGroup.Item className="tabelCase text-light">{`Range: ${(
                    2 * WorstCaseTolerance
                  ).toFixed(3)}`}</ListGroup.Item>
                  <ListGroup.Item className="tabelCase text-light">{`Symmetric:${WorstCaseNominal.toFixed(
                    3
                  )} ±${WorstCaseTolerance.toFixed(3)}`}</ListGroup.Item>
                </ListGroup>
              </div>
            </Col>
            {isStatistic && (
              <Col>
                <div className="container-fluid tabelCase text-light">
                  <h3>Statistic</h3>
                  <ListGroup className="shadow p-3 mb-5 bg-body-tertiary rounded opacity-75 ">
                    <ListGroup.Item className="fs-5 tabelCase text-light rounded-4">
                      {`Mean: ${meanStatistic.toFixed(4)}`}
                    </ListGroup.Item>
                    <ListGroup.Item className="tabelCase text-light">{`Upper Tolerance:${statisticalForm.UTS.toFixed(
                      4
                    )} `}</ListGroup.Item>
                    <ListGroup.Item className="tabelCase text-light">{`Lower Tolerance:${statisticalForm.LTS.toFixed(
                      4
                    )} `}</ListGroup.Item>
                    <ListGroup.Item className="tabelCase text-light">
                      Samples: 100000
                    </ListGroup.Item>
                    <ListGroup.Item className="tabelCase text-light">{`Range: ${(
                      statisticalForm.UTS - statisticalForm.LTS
                    ).toFixed(4)}`}</ListGroup.Item>
                    <ListGroup.Item className="tabelCase text-light">
                      Pp:{statisticalForm.Pp.toFixed(4)}
                    </ListGroup.Item>
                    <ListGroup.Item className="tabelCase text-light">
                      Ppk:{statisticalForm.PpK.toFixed(4)}
                    </ListGroup.Item>
                    <ListGroup.Item className="tabelCase text-light">
                      St.Dev[σ]:{statisticalForm.StDev.toFixed(4)}
                    </ListGroup.Item>
                    <ListGroup.Item className="tabelCase text-light">
                      Sigma intv.: {statisticalForm.SigmaInt.toFixed(4)}
                    </ListGroup.Item>
                    <ListGroup.Item className="tabelCase text-light">
                      Parts less LSL{" "}
                    </ListGroup.Item>
                    <ListGroup.Item className="tabelCase text-light rounded-4">
                      Parts more USL
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Col>
            )}
          </Row>
        </Col> */}
            </div>

            <div className="main-item-case2">
              {viewAddDimension && (
                <div className="main-item-case">
                  <h2>
                    Add dimension to Case {caseId} (Project {projectId})
                  </h2>
                  {isDatabaseProjects ? (
                    <div class="bottom-drop">
                      <label htmlFor="toleranceType" className="label-drop">
                        Select Dimension
                      </label>
                      <select
                        id="selectDimension"
                        className="select-drop" // Use className instead of class
                        name="Select Dimension"
                        value={nrSamples}
                        onChange={(e) => {
                          handleSelectDimData(e);
                        }}
                      >
                        <option value="Select Dimension">
                          Select Dimension
                        </option>
                        {dataCaseFiltered.map((n) => (
                          <option
                            key={n.ID} // Make sure to use a unique key for each option
                            value={n.ID}
                          >
                            {`${n.Description} - ${n.Name} : ${
                              n.NominalValue
                            }±${(n.UpperTolerance - n.LowerTolerance) / 2}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <>
                      <p>No dimensions on the database</p>
                      <button
                        variant="primary"
                        onClick={() => {
                          scrollToDatabase();
                          // ViewDatabase();
                        }}
                      >
                        Go to Database
                      </button>
                    </>
                  )}
                  {viewsign && (
                    <div class="bottom-drop">
                      <label htmlFor="toleranceType" className="label-drop">
                        Select Sign
                      </label>
                      <select
                        id="selectDimension"
                        className="select-drop" // Use className instead of class
                        name="Sign"
                        value={formAddDim.Sign}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value="Select Dimension">Select Sign</option>
                        <option value="+">+</option>
                        <option value="-">-</option>
                      </select>
                    </div>
                  )}

                  <button
                    className="button-add"
                    type="submit"
                    onClick={(e) => {
                      AddDim(e);
                    }}
                  >
                    Add Dimension
                  </button>
                </div>
              )}
              <div className="template-container">
                <div className="table-top">
                  <div
                    className="button-add"
                    onClick={() => {
                      setViewAddDimension(!viewAddDimension);
                    }}
                  >
                    <img src={add}></img>Add Dimension
                  </div>
                </div>
                <table id="Database">
                  <tbody>
                    <tr>
                      <th className="first-th">ID</th>
                      {dataCaseDimFiltred.map((n, index) => (
                        <td
                          key={n.ID + "Projects"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                            borderTopRightRadius:
                              index === dataCaseDimFiltred.length - 1
                                ? "20px"
                                : "0",
                          }}
                        >
                          {n.ID}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Name</th>
                      {dataCaseDimFiltred.map((n) => (
                        <td
                          key={n.ID + n.Name}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.Name}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Description</th>
                      {dataCaseDimFiltred.map((n) => (
                        <td
                          key={n.ID + n.Description}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.Description}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Unique Identifier</th>
                      {dataCaseDimFiltred.map((n) => (
                        <td
                          key={n.ID + n.UniqueIdentifier}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.UniqueIdentifier}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Nominal Value</th>
                      {dataCaseDimFiltred.map((n) => (
                        <td
                          key={n.ID + "NominalValue"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.NominalValue}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <th>Upper Tolerance</th>
                      {dataCaseDimFiltred.map((n) => (
                        <td
                          key={n.ID + "UpperTolerance"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.UpperTolerance}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <th>Lower Tolerance</th>
                      {dataCaseDimFiltred.map((n) => (
                        <td
                          key={n.ID + "LowerTolerance"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.LowerTolerance}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <th>Sign</th>
                      {dataCaseDimFiltred.map((n) => (
                        <td
                          key={n.ID + "Sign"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.Sign}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <th>Distribution Type</th>
                      {dataCaseDimFiltred.map((n) => (
                        <td
                          key={n.ID + "DistributionType"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.DistributionType}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <th>Tolerance Type</th>
                      {dataCaseDimFiltred.map((n) => (
                        <td
                          key={n.ID + "ToleranceType"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.ToleranceType}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <th>Influence %</th>
                      {dataCaseDimFiltred.map((n) => (
                        <td
                          key={n.ID + "Influence"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {Math.round(
                            (((n.UpperTolerance - n.LowerTolerance) / 2) *
                              100) /
                              WorstCaseTolerance +
                              Number.EPSILON
                          ) / 100}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <th>Formula</th>
                      {dataCaseDimFiltred.map((n) => (
                        <td
                          key={n.ID + "Formula"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.Formula}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <th className="last-th">Action</th>
                      {dataCaseDimFiltred.map((n, index) => (
                        <td
                          key={n.ID + "RemoveButton"}
                          style={{
                            borderBottomRightRadius:
                              index === dataCaseDimFiltred.length - 1
                                ? "20px"
                                : "0",
                          }}
                        >
                          {/* <button
                          type="button"
                          variant="outline-danger"
                          onClick={() => {
                            RemoveCaseDim(n.ID);
                          }}
                        >
                          X
                        </button> */}
                          <img
                            src={del}
                            onClick={() => {
                              const confirmRemove = window.confirm(
                                "Do you want to remove this dimension?"
                              );
                              if (confirmRemove) {
                                RemoveCaseDim(n.ID);
                              }
                            }}
                          ></img>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* <div className="add-dim-case">
        <h2>
          Add dimension to Case {caseId} (Project {projectId})
        </h2>
        {isDatabaseProjects ? (
          <div className="select-dim-container">
            <p>Select Dimension</p>
            <DropdownButton
              title={addComponent}
              onSelect={(e) => {
                // DatabasesFilter(e);

                handleSelectDimData(e);
              }}
              variant="secondary"
            >
              <div className="p-2 bg-dark bg-gradient text-white rounded shadow-lg">
                {dataCaseFiltered.map((n) => (
                  <Dropdown.Item
                    eventKey={n.ID}
                    key={n.ID + "Data"}
                    className="text-info dropdown-project"
                  >
                    {n.Description} - {n.Name} :{n.NominalValue}±
                    {(n.UpperTolerance - n.LowerTolerance) / 2}
                  </Dropdown.Item>
                ))}
              </div>
            </DropdownButton>
          </div>
        ) : (
          <Col>
            <p>No dimensions on the database</p>
            <Button
              variant="primary"
              onClick={() => {
                scrollToDatabase();
                ViewDatabase();
              }}
            >
              Go to Database
            </Button>
          </Col>
        )}
        {viewsign && (
          <Col>
            <Form.Group controlId="formGridState" className="col col-sm-6">
              <Form.Label style={{ marginBottom: "18px" }}>
                Select Sign
              </Form.Label>
              <Form.Select
                className="form-control text-info dropdown-project bg-dark bg-gradient"
                name="Sign"
                value={formAddDim.Sign}
                onChange={(e) => handleChange(e)}
              >
                <option value="Select Sign">Select Sign</option>
                <option value="+">+</option>
                <option value="-">-</option>
              </Form.Select>
            </Form.Group>
          </Col>
        )}
        <Row>
          <div className="container fluid   ">
            <Button
              variant="secondary"
              type="submit"
              className="m-2"
              onClick={(e) => {
                AddDim(e);
              }}
            >
              Add Dimension
            </Button>
          </div>
        </Row>
      </div> */}
            {isDataCaseDimFiltred && (
              <div className="main-item-canvas">
                <Canvas canvasDatabse={DatabaseCalculation} />
              </div>
            )}

            {/* <ImageCropper2 /> */}
          </>
        )}
      </div>
    );
  }
);

export default Case;
