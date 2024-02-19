import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../helper/default";
import {getdata} from "../model/homepage";
import {GenericTable} from "../helper/table";

function Homepage () {
    const [anphatpcdata, setAnphatpcdata] = useState([]);
    const [trungtrandata, setTrungtrandata] = useState([]);
    const [laptopazdata, setLaptopazdata] = useState([]);

    const [query, setQuery] = useState('');
    const [page] = useState(1);

    const headers  = ['Danh sách laptop', 'AnphatPC', 'LaptopAZ', 'Trungtran'];
    const tableData = [
        ...anphatpcdata.map(item => [item.name, item.price, null, null]),
        ...laptopazdata.map(item => [item.name, null, item.price, null]),
        ...trungtrandata.map(item => [item.name, null, null, item.price])
    ];



    const getData = () => {
        try {
            const result = getdata(query, page);
            if (!result || typeof result.then !== 'function') {
                throw new Error('getdata is not returning a promise');
            }
            result.then(response => {
                if (response) {
                    setAnphatpcdata(response.data.anphatpc.data);
                    setTrungtrandata(response.data.trungtran.data);
                    setLaptopazdata(response.data.laptopaz.data);
                }
            }).catch(error => {
                console.error(error);
                window.makeAlert('error', 'Error', error);
            });
        } catch (error) {
            console.error(error);
            window.makeAlert('error', 'Error', error);
        }
    };
    

    return (
    <div className="search">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Laptop name</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter laptop name" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Button variant="primary"  onClick={getData}>
                Submit
            </Button>
        </Form>
        <div className="table">
            <GenericTable headers={headers} data={tableData}/>
        </div>
    </div>
    
    )
}

export default Homepage