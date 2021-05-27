import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import SockJsClient from "react-stomp";
import { Form, TextArea, Button, Grid, Select } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { URL } from "./constants";
import CustomTable from "./CustomTable";
import { getCitySet, stringToDate, sortData } from "./helpers";

const App = () => {
  const [graphData, setGraphData] = useState([]);
  const [dropdownData, setDropdown] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [tableData, setTableData] = useState([]);
  const [sentence, setSentence] = useState("");

  useEffect(() => {
    async function fetchInitData() {
      axios({
        method: "get",
        url: URL + "getAll",
      })
        .then(function (response) {
          setTableData(sortData(response.data));
          setDropdown(getCitySet(response.data));
          stringToDate();
        })
        .catch(function (response) {
          console.log(response);
        });
    } 
    fetchInitData();
  }, []);

  const onSentanceChange = (e) => {
    setSentence(e.target.value);
  };

  const onSentenceSubmit = () => {
    axios({
      method: "post",
      url: URL + "newRecord",
      data: sentence,
      headers: { "Content-Type": "text/plain" }
    })
      .then(function (response) {
        console.log(response);
        window.alert("Mesajınız iletildi.");
      })
      .catch(function (response) {
        console.log(response);
        window.alert("Yanlış Mesaj Girdiniz.");
      });
  };

  const dropdownDataChange = (option) => {
    console.log(option);
    setSelectedCity(option.value);
    console.log(selectedCity);
  };

  useEffect(() => {
    const graphData = {
      taburcu: [],
      vaka: [],
      vefat: [],
      labels: [],
    };

    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i].sehir === selectedCity) {
        graphData.taburcu.push(tableData[i].taburcu);
        graphData.vaka.push(tableData[i].vaka);
        graphData.vefat.push(tableData[i].vefat);

        if (graphData.labels.indexOf(tableData[i].tarih) === -1) {
          graphData.labels.push(tableData[i].tarih);
        }
      }
    }
    setGraphData(graphData);
  }, [selectedCity, tableData]);

  const dataGraph = {
    labels: graphData.labels,
    datasets: [
      {
        label: "Taburcu",
        data: graphData.taburcu,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y-axis-1",
      },
      {
        label: "Vaka",
        data: graphData.vaka,
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        yAxisID: "y-axis-2",
      },
      {
        label: "Vefat",
        data: graphData.vefat,
        fill: false,
        backgroundColor: "rgb(255,255,0)",
        borderColor: "rgba(255,255,0,0.3)",
        yAxisID: "y-axis-2",
      },
    ],
  };

  const onMessageReceived = (message) => {
    setTableData(sortData(message));
    setDropdown(getCitySet(message));
  };

  return (
    <div style={{ padding: 20 }}>
      <SockJsClient
        url={URL + "/chat"}
        topics={["/topic/message"]}
        onConnect={() => console.log("Socket connected!")}
        onDisconnect={() => console.log("Socket Disconnected!")}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
      />
      <Form>
        <Grid columns={2}>
          <Grid.Column>
            <TextArea
              placeholder="Lütfen bir cümle giriniz"
              onChange={(e) => onSentanceChange(e)}
              value={sentence}
            />
            <br />
            <br />
            <Button primary onClick={() => onSentenceSubmit()}>
              Kaydet
            </Button>
            <br />
            <br />
            <Select
              placeholder="Şehir seçiniz.."
              options={dropdownData}
              onChange={(evenet, data) => dropdownDataChange(data)}
            />
            <Line data={dataGraph} />
          </Grid.Column>
          <Grid.Column>
            <CustomTable data={tableData} />
          </Grid.Column>
        </Grid>
      </Form>
    </div>
    
  );
};

export default App;
