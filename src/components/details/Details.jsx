import React, {useState, useEffect} from 'react';
import { useHistory, useParams} from "react-router-dom";
import {Container, Col, Row, Button} from 'react-bootstrap';
import './details.css';
import {FormattedMessage, useIntl} from 'react-intl';
import svgLoading from '../../assets/loading.svg';

const Details = () => {
    const [data, setData] = useState(null);
    const [quote, setQuote] = useState(null);
    const [status, setStatus] = useState('loading');
    const history = useHistory();
    const { charId, charName} = useParams();
    const intl = useIntl()
    
    useEffect(() => {
        fetch(`https://breakingbadapi.com/api/characters/${charId}`).then(response => response.json()).then(data => {
            setData(data[0]);
            setStatus('success');
    }).catch(() => setStatus('error'));
        getRandomQuote();
    }, []);

    const getRandomQuote = () => {
        fetch(`https://breakingbadapi.com/api/quote/random?author=${charName}`).then(response => response.json()).then(data => setQuote(data[0]?.quote));
    }

    return (
        status === 'loading' ?
        <Container>
            <img src={svgLoading} alt='svg not found' className="svg-center"/>
        </Container>:
        status === 'success' ?
        <Container>
            <Row className="header-details">
                <Button variant="primary" onClick={() => {history.push('/')}}>
                    <FormattedMessage id='backToMain' />
                </Button>
            </Row>
            <Row>
                <Col md={6}>
                    <div className="box">
                        <img src={data.img} alt='svg not found' />
                    </div>
                    
                </Col>
                <Col md={6}>
                    <p><text className="label-details"><FormattedMessage id='name' /></text><text>{data.name}</text></p>
                    <p><text className="label-details"><FormattedMessage id='nickname' /></text><text>{data.nickname}</text></p>
                    <p><text className="label-details"><FormattedMessage id='status' /></text><text>{data.status}</text></p>
                    <p><text className="label-details"><FormattedMessage id='birthday' /></text><text>{data.birthday}</text></p>
                    <p><text className="label-details"><FormattedMessage id='occupation' /></text><text>{data.occupation}</text></p>
                    <p><text className="label-details"><FormattedMessage id='portrayed' /></text><text>{data.portrayed}</text></p>
                    <p><text className="label-details"><FormattedMessage id='appearance' /></text><text>{data.appearance}</text></p>
                    <p><text className="label-details"><FormattedMessage id='better_call_saul_appearance' /></text><text>{data.better_call_saul_appearance}</text></p>
                    <p><text className="label-details"><FormattedMessage id='category' /></text><text>{data.category}</text></p>
                    <p><text className="label-details"><FormattedMessage id='char_id' /></text><text>{data.char_id}</text></p>
                    <p>
                        <text>{quote? `-${charName}: ${quote}`: intl.formatMessage({id: 'quoteNotFound'})}</text>
                    </p>
                    <Button variant="info" onClick={() => {getRandomQuote()}}>
                        <FormattedMessage id='changeQuote' />
                    </Button>
                </Col>
            </Row>
        </Container>
        :<Container>
            <Button variant="primary" onClick={() => {history.push('/')}}>
                <FormattedMessage id='backToMain' />
            </Button>
            <h1><FormattedMessage id='charNotFound' /></h1>
        </Container>
    );

};

export default Details;