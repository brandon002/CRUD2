import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPost, deletePost } from "../action/PostActions.js";
import Loading from './../Loading';
import { Table, Dropdown, Button } from "react-bootstrap";
import {
  Link
} from "react-router-dom"
import { useNavigate } from "react-router-dom";
const Posts = props =>{
    console.log("P")
    const { 
        getPost,
        deletePost,
        PostReducer: {
            items,
            loading
        }
    } = props
    console.log(items);
    const navigate = useNavigate()
    useEffect(() => {
        getPost()
    },[])
    console.log(items)
    const [openAddItem, setOpenAddItem] = useState(false)
    const handleDelete = id =>{
        deletePost(id, navigate)
        console.log("dari handleDelete");
    }
    return items === null || loading ? 
    <Loading />
    :
    <React.Fragment>
        {items !== null && (
            <>
                <Link style={{textDecoration: 'none', color: 'white' }} to="/add">
                    <Button onClick={() => setOpenAddItem(true)}
                    variant="primary" size="sm" className="my-3 btn-block float-right w-50">
                    Add Item 
                    </Button> 
                </Link>
                <Table striped bordered hover  size="xl" >
                    <thead> 
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {items.map((item, index)=>(
                    <tbody>
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.body}</td>
                            <td>
                                 <Dropdown>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                        Action
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        
                                            <Dropdown.Item >
                                                <Link style={{textDecoration: 'none', color: 'black' }} to={`/edit/${item.id}`}>
                                                    <span className='ml-2'>
                                                        Edit Item
                                                    </span> 
                                                </Link>
                                            </Dropdown.Item>
                                        
                                        <Dropdown.Item onClick={()=>handleDelete(item.id)} >  
                                            
                                            <span className='ml-2' style={{textDecoration: 'none', color: 'black' }}>
                                                Delete Item 
                                            </span> 
                                            
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    </tbody>
                    ))}
                </Table>
                
            </>
        )}
    </React.Fragment>
}

const mapStateToProps = state => ({
   PostReducer: state.PostReducer
});

export default connect(mapStateToProps,{ getPost,deletePost })(Posts);
