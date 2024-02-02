import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { getdata } from "../model/homepage";

function Homepage () {
    return (
    <div className="search">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Laptop name</Form.Label>
                <Form.Control type="text" placeholder="Enter laptop name" />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        <div className="table">
            <Table>
                <thead>
                    
                </thead>
            </Table>
        </div>
    </div>
    
    )
}

export default Homepage