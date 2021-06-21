import React, {useState} from 'react';
import {IntlProvider, FormattedMessage} from 'react-intl';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Main from './components/main/Main.jsx';
import Details from './components/details/Details.jsx';
import messages_en from './translations/en.json';
import messages_es from './translations/es.json';
import {Container, Row, Col} from 'react-bootstrap';
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';

const messages = {
  'es': messages_es,
  'en': messages_en
};

function App() {
  const [language, setLanguage] = useState(navigator.language.split(/[-_]/)[0]);
  let changeLanguage = (lang) => {
    setLanguage(lang.value);
  }

  return (
    <IntlProvider locale={language} messages={messages[language]}>
        <header className="App-header">
          <Container>
            <Row>
              <Col xs={9} md={11} className="App-title">
                <FormattedMessage id="title" />
              </Col>
              <Col xs={1} className="box-lang-select">
                <Select className="lang-select"
                  defaultValue={{value: language, label: language.toUpperCase()}}
                  options={[{ value: 'es', label: 'ES' }, { value: 'en', label: 'EN' }]} 
                  onChange={value => changeLanguage(value)}
                />
              </Col>
            </Row>
          </Container>
        </header>  
        <Router>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/details/:charId/:charName">
              <Details />
            </Route>
          </Switch>
        </Router>
    </IntlProvider>
  );
}

export default App;
