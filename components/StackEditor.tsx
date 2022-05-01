import React from 'react';
import LogoImage from './LogoImage'
import Selector, {Option} from './Selector';


interface StackEditorProps {
}

interface StackEditorState {
}

import logosData from "../public/logos/logos.json"
import Canvas from './Canvas';
import { ActionMeta, MultiValue } from 'react-select';

export type LogoData = {
  name:string,
  shortname:string,
  url:string,
  files:string[],
}

const logos: Array<LogoData> = logosData;

const selectionOptions = logos.map(logo => ({
  label: logo.name,
  value: logo.name,
}))

const imageOfName = new Map(
  logos.map(logo => {
   return [logo.name, 
    '/logos/logos/' + logo.files[0]]
  })
);

export default class StackEditor extends React.Component<StackEditorProps, StackEditorState>  {
  state: any = {
    selectedOption: [{label: "Adyen", value: "Adyen"}],
  };
  handleChange = (newValue: MultiValue<Option>,  actionMeta: ActionMeta<Option>) => {
    this.setState({ selectedOption: newValue }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;
    const imageLIst = selectedOption.map(option => {
      return imageOfName.get(option.value);
    })
    console.log(imageLIst)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Selector
          value={selectedOption}
          onChange={this.handleChange}
          options={selectionOptions}
        />
        <Canvas imageList={imageLIst}/>
      </div>
    );
  }
}