import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {FormattedMessage} from 'react-intl';
import svgLoading from '../../assets/loading.svg';
import {Container} from 'react-bootstrap';

const Main = () => {
    const [rowData, setRowData] = useState([]);
    const [status, setStatus] = useState('loading');
    const gridRef = useRef(null);
    const history = useHistory();
 
    useEffect(() => {
        fetch('https://breakingbadapi.com/api/characters').then(response => response.json()).then(data => {
            setRowData(data);
            setStatus('success');
        }).catch(() => setStatus('error'));
    }, []);

    const onSelectionChanged = e => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        if(selectedData && selectedData.length > 0) {
            history.push(`details/${selectedData?.[0].char_id}/${selectedData?.[0].name}`);
        } else {
            alert ("select character");
        }
    }
    
    return (
        status === 'loading' ?
        <Container  className="data-loading" >
            <img src={svgLoading} alt='svg not found'/>
        </Container>
        : status === 'success' ? 
        <Container className="ag-theme-alpine" style={{height: 800, width: 430}}>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                onSelectionChanged={onSelectionChanged}>
                <AgGridColumn field="name" sortable={ true } filter={ true } checkboxSelection={true}></AgGridColumn>
                <AgGridColumn field="nickname" sortable={ true } filter={ true }></AgGridColumn>
            </AgGridReact>
        </Container>:
        <Container>
            <h1><FormattedMessage id='charsNotFound' /></h1>
        </Container>
    
    );

};

export default Main;