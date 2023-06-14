import React, { useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { searchContext } from '../../store/SearchContext';
function Header() {
  const {user} =useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  const {SearchDetails,setSearchDetails}= useContext(searchContext)
  const history  = useHistory()
  const [searchVal,setSearch]=useState('')
  const searchHandler = ()=>{
    if(searchVal){
      firebase.firestore().collection("products")
      .where('name', '>=', searchVal)
      .where('name', '<', searchVal + '\uf8ff')
      .get()
  .then((querySnapshot) => {
    let product = []
     querySnapshot.forEach((doc) => {
         product.push(doc.data());
    });
    setSearchDetails(product)
    console.log(product)

  })
  .catch((error) => {
    console.log('Error getting products: ', error);
  });

    }else{
      setSearchDetails(null)
    }
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              value={searchVal}
              onChange={(e)=>{setSearch(e.target.value)}}
            />
          </div>
          <div onClick={searchHandler} className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ?(<span>Hello... {user.displayName }</span>) : (<Link to='/login'><button><span>Login</span></button></Link>)}</span>
          <hr />
        </div>
        {user && <button onClick={()=>{firebase.auth().signOut();
        history.push('/login')
        }}>Logout</button>}
        {user &&
                  <Link to="/create">
                  <div className="sellMenu">
                    <SellButton></SellButton>
                    <div className="sellMenuContent">
                      <SellButtonPlus></SellButtonPlus>
                      <span>SELL</span>
                    </div>
                  </div>
                  </Link>

        }

      </div>
    </div>
  );
}

export default Header;
