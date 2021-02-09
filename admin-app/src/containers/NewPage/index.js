import React, { useState, useEffect } from 'react'
import Modal from '../../components/UI/Modal'
import Layout from '../../components/Layout'
import { Row, Col, Container } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import linearCategories from '../../helpers/linearCategories';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions';

/**
* @author
* @function NewPage
**/

const NewPage = (props) => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('')
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [desc, setDesc] = useState('')
    const [type, setType] = useState('')
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])

    const dispatch = useDispatch();

    const category = useSelector(state => state.category);
    const page = useSelector(state => state.page);

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category])

    useEffect(() => {
        console.log('page: ', page);
        if(!page.loading){
            setCreateModal(false)

            setTitle('')
            setDesc('')
            setCategoryId('')
            setProducts([])
            setBanners([])
        }
    }, [page])

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.value == e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);
    }

    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]]);
    }

    const submitFormPage = (e) => {
        // e.target.preventDefault();

        if(title === ''){
            alert('Title is Required');
            setCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);

        banners.forEach((banner, index) => {
            form.append('banners', banner)
        });
        products.forEach((product, index) => {
            form.append('products', product)
        });

        // console.log({ title, desc, categoryId, type, banners, products });

        dispatch(createPage(form));
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle='Create New Page'
                handleClose={() => setCreateModal(false)}
                onSubmit={submitFormPage}
            >
                <Container>
                    <Row>
                        <Col>
                            {/* <select
                                className="form-control form-control-sm"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value="">Select Category</option>
                                {
                                    categories.map(cat => 
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }
                            </select> */}
                            <Input
                                type="select"
                                value={categoryId}
                                placeholder={'Select Category'}
                                onChange={onCategoryChange}
                                options={categories}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                                className="form-control-sm"
                            ></Input>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'Page Description'}
                                className="form-control-sm"
                            ></Input>
                        </Col>
                    </Row>

                    {
                        banners.length > 0 ? 
                        banners.map((banner, index) => 
                            <Row key={index}>
                                <Col>{banner.name}</Col>
                            </Row>
                        ) : null
                    }
                    Banners
                    <Row>
                        <Col>
                            <Input
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                            ></Input>
                        </Col>
                    </Row>

                    {
                        products.length > 0 ? 
                        products.map((product, index) => 
                            <Row key={index}>
                                <Col>{product.name}</Col>
                            </Row>
                        ) : null
                    }
                    Products
                    <Row>
                        <Col>
                            <Input
                                type="file"
                                name="products"
                                onChange={handleProductImages}
                            ></Input>
                        </Col>
                    </Row>

                </Container>
            </Modal>
        )
    }

    return (
        <Layout sidebar>
            {
                page.loading ? 
                <p>Creating Page...Please wait!</p>
                : 
                <>
                    { renderCreatePageModal() }
                    <button onClick={() => setCreateModal(true)}>Create Page</button>
                </> 
            }
        </Layout>
    )

}

export default NewPage