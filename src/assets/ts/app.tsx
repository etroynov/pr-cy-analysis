import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PouchDB from 'pouchdb-browser';

interface IValuteList {
  Valute: {
    USD: {
      Name: string;
      Value: number;
    }
  }
}

interface IValuteListItem {
  CharCode: string;
  ID: string;
  Name: string;
  Nominal: number;
  NumCode: number;
  Previous: number;
  Value: number;
}

const db = new PouchDB('test');
console.info(db);

class HelloWorld extends React.Component<any, IValuteList> {

  constructor() {
    super();

    this.state = {
      Valute: {
        USD: {
          Name: 'Название валюты',
          Value: 0
        }
      }
    }
  }

  public async componentDidMount() {
    const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const valutesObj = await (res.json() as any);

    this.setState({
      ...valutesObj
    });
  }

  public render() {
    const valuteList = [];
    const ValuteMap = this.state.Valute;

    for (const valuteItem in ValuteMap) {
      if (ValuteMap.hasOwnProperty(valuteItem)) {
        const valute: IValuteListItem = (ValuteMap as any)[valuteItem];
        valuteList.push(<li>{valute.Name} ({valute.CharCode}) - {valute.Value}</li>);
      }
    }

    return (
      <header>
        <h1>Список валют</h1>
        <ul>{valuteList}</ul>
      </header>
    );
  }
}

ReactDOM.render(
	<HelloWorld />,
	document.getElementById('app-container'),
);