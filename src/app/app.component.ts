import {AfterViewInit, Component} from '@angular/core';
import DmnModeler from 'dmn-js/lib/Modeler';
import ModdleDmn from 'dmn-moddle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  private modeler: any;

  private starterBPMN: string = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" id="definitions_14w34j2" name="definitions" namespace="http://camunda.org/schema/1.0/dmn" exporter="dmn-js (https://demo.bpmn.io/dmn)" exporterVersion="8.3.0">
  <decision id="decision_0g83p5u" name="">
    <decisionTable id="decisionTable_0qshvyr">
      <input id="input1" label="">
        <inputExpression id="inputExpression1" typeRef="string">
          <text></text>
        </inputExpression>
      </input>
      <output id="output1" label="" name="" typeRef="string" />
    </decisionTable>
  </decision>
</definitions>`;

  ngAfterViewInit(): void {
    this.modeler = new DmnModeler({
      container: '#canvas',
      moddleExtensions: {
        camunda: ModdleDmn,
      }
    });

    // TEST of event listener in web component and vscode... it works.
    this.modeler.on('element.click', (elementSelected: any) => {
      console.log("clicked element should show:");
      console.log(elementSelected);
    });

    this.modeler.importXML(this.starterBPMN, ((err) => {
      if (err) {
        return console.error('could not import BPMN 2.0 diagram', err);
      }
      var canvas = this.modeler.get('canvas');
      canvas.zoom('fit-viewport');
    }));
  }




}
