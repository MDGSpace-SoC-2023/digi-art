import { useState,useEffect } from "react";
// import { ethers } from "ethers"
const ethers = require("ethers")
import { Row, Col, Card, Button } from 'react-bootstrap'
// require('dotenv').config()
export default function Home ({marketplace,nft}){
    const[loading,setLoading] = useState(true)
    const[items,setItems]= useState([])
 async function LoadListedNfts_in_Marketplace(){
    // const items = []
    //  const tokenCount =await marketplace.token_Listed_count();
    //  for (let i = 0;i<=tokenCount;i++){
    //     let item =await marketplace.Items(i)
    //     if (!item.sold){
    //   //  let totalPrice 
    //     const uri =  await nft.tokenURI(item.tokenID)
    //     const response =  await fetch(uri)e1
    //     const metadata = await response.json()
    //  items.push({
    //     // TotalPrice:totalPrice,
    //     price:item.price,
    //     description:metadata.description,
    //     seller:item.seller,
    //     image:metadata.image,
    //     name:metadata.name
    //  })}}
    //  setLoading(!loading)
    //  setItems(items)
    //  }
    try {
      const items = [];
      console.log("created items arrray")
      const tokenCount = await marketplace.token_Listed_count();
      console.log("tokencount(Home) : " ,tokenCount )
      for (let i = 1; i <= tokenCount; i++) {
        console.log("i :", i)
          let item = await marketplace.Items(i);
          console.log("item : ",item)
          if (!item.sold) {
              const uri = await nft.tokenURI(item.tokenID,{
                gasLimit: 1000000,
              });
              console.log("URI is : ",uri)
              const response = await fetch(uri);
              console.log("response is :",response)
              const metadata = await response.json();
              console.log("metadata is : ",metadata)
              items.push({
                  price: item.price,
                  itemId: item.itemID,
                  description: metadata.description,
                  seller: item.seller,
                  image: metadata.image,
                  phone_number: metadata.phone_number,
                  name: metadata.name,
              });
          }
      }
      setLoading(false);
      setItems(items);
  } catch (error) {
      console.error('Error fetching or processing data:', error);
      // Handle the error or set state accordingly
  }}

  async function handlePurchase(item){
    try {
      
   
    await (await marketplace.BuyItem(item.itemId, { value: item.price })).wait()//Reason for extra bracket to be established
    console.log("bought the item")
    LoadListedNfts_in_Marketplace() } 
    catch (error) {
      console.log("error in handlePurchase : ",error)
    }
  }
  useEffect(()=>{
    
    LoadListedNfts_in_Marketplace()

  },[])
  if (loading){
    return(
    <>Loading.....</>)
  }
  return (
  <div className="flex justify-center">
  {items.length > 0 ?
    <div className="px-5 container">
      <Row xs={1} md={2} lg={4} className="g-4 py-5">
        {items.map((item, idx) => (
          <Col key={idx} className="overflow-hidden">
          <Card className="h-80 d-flex flex-column">
          <Card.Img variant="top" src={item.image} className="custom-img" />
              <Card.Body color="secondary">
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  {item.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <div className='d-grid'>
                  {/* {()=>{ try { */}
                  
                
                  <Button onClick={() => handlePurchase(item)} variant="primary" size="lg">
                    Buy for {ethers.utils.formatEther(item.price)} ETH
                  </Button>
                
                {/* //   console.error("error is in return:",error)
                //   }
                // }} */}
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    : (
      <main style={{ padding: "1rem 0" }}>
        <h2>No listed assets. Go to CREATE page and list NFTs in the marketspace</h2>
      </main>
    )}
</div>
);
}
//     <>{items.length>0 ?
//           <div > {items.map((item,id)=>{<>
      
//                <p key={id}>{item.image} </p>
//                <p onClick={()=>{handlePurchase(item)}}>Buy this NFT</p>
//                <p>Price:{item.price}</p>
//  </>})}
//           </div>
//         :<div>No NFT is listed in this marketPlace. Go to "Create" section </div>
//   }</>

//  )
// }