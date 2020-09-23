import React, { Component } from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import XLSX from "xlsx";
import { make_cols } from "./MakeColumns";
import { SheetJSFT } from "./types";

class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  }

  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws["!ref"]) }, () => {
        console.log(JSON.stringify(this.state.data, null, 2));
      });
    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
  }

  // openFile(event) {
  //   var input = event.target;
  //   var text = "";
  //   var reader = new FileReader();
  //   var onload = function (event) {
  //     text = reader.result;
  //     parseFile(text);
  //   };

  //   reader.onload = onload;
  //   reader.readAsText(input.files[0]);
  // }

  // parseFile(text) {
  //   var xmlDoc = $.parseXML(text),
  //     $xml = $(xmlDoc),
  //     $options = $xml.find("option");

  //   $.each($options, function () {
  //     $("#output").append("<li>" + $(this).text() + "</li >");
  //   });
  // }

  render() {
    return (
      <div>
        <h1>Upload an excel to Process Triggers</h1>

        <h2>Choose Excel file : </h2>

        <input
          type="file"
          className="form-control"
          id="file"
          accept={SheetJSFT}
          onChange={this.handleChange}
        />

        <h2>Choose xml file : </h2>

        <input type="file" />

        <br />
        <br />
        <input
          type="submit"
          value="Process Triggers"
          onClick={this.handleFile}
        />
        <ul id="output"></ul>
      </div>
    );
  }
}

export default ExcelReader;
