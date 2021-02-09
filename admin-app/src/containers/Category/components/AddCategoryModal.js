import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';

const AddCategoryModal = (props) => {

    const {
        show, 
        handleClose,
        onSubmit,
        modalTitle, 
        categoryName, 
        setCategoryName, 
        parentCategoryId, 
        setParentCategoryId, 
        handleCategoryImage,
        categoryList
    } = props

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
        >

            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control-sm"
                    />
                </Col>
                <Col>
                    <select className="form-control form-control-sm" value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>Select Category</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input className="form-control-sm" type="file" name="categoryImage" onChange={handleCategoryImage}></input>
                </Col>
            </Row>

        </Modal>
    );
}

export default AddCategoryModal;