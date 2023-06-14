import React,{useState,useEffect,useContext} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import {useHistory} from 'react-router-dom'
import { FirebaseContext } from '../../store/FirebaseContext';
import { PostContext } from '../../store/PostContext';
import { searchContext } from '../../store/SearchContext';


function Posts() {
  const {firebase} = useContext(FirebaseContext)
  const [products,setProducts] = useState([])
  const [newProducts,setnewProducts] = useState([])
  const {setPostDetails} = useContext(PostContext)
  const history = useHistory()
  // const [searchProducts,setSearchProducts]= useState([])
  const {SearchDetails}=useContext(searchContext)

   
 useEffect(() => {
  firebase.firestore()
    .collection("products")
    .get()
    .then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      setProducts(allPost);
    });
    firebase.firestore()
  .collection("products")
  .where("category", "==", "fresh")
  .get()
  .then((snapshot) => {
    const allPost = snapshot.docs.map((product) => {
      return {
        ...product.data(),
        id: product.id,
      };
    });
    console.log(allPost)
    setnewProducts(allPost);
  });
},[]);

  return (
    <div className="postParentDiv">
      {SearchDetails &&
              <div className="recommendations">
              <div className="heading">
                <span>Search recommendations</span>
              </div>
              <div className="cards">
                {SearchDetails && SearchDetails.map((product)=>{
                  console.log(SearchDetails)
                  return(
                    
                    <div className="card">
                    <div className="favorite">
                      <Heart></Heart>
                    </div>
                    <div className="image">
                      <img src={product.url} alt="" />
                    </div>
                    <div className="content">
                      <p className="rate">&#x20B9; {product.price}</p>
                      <span className="kilometer">{product.category}</span>
                      <p className="name"> {product.name}</p>
                    </div>
                    <div className="date">
                      <span>{product.createdAt}</span>
                    </div>
                  </div>
      
                  )
                })
      
                }
              </div>
            </div>
      }
      
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

        {products.map((product)=>{
            return(
              <div
              className="card"    
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div  onClick={()=>{
                setPostDetails(product)
                history.push('/view')
              }}>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
            </div>
            
            )
          })}


        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {newProducts && newProducts.map((product)=>{
            return(
              <div className="card">
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>

            )
          })

          }
        </div>
      </div>
    </div>
  );
}

export default Posts;
