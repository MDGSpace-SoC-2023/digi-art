import { useEffect, useState } from "react"
// import { ethers } from "ethers"
const ethers = require("ethers")
// import {Row,Col,Card} from "react-bootstrap"
import { Row, Col, Card } from 'react-bootstrap'

export default function MyPurchase({marketplace,nft,account}){
    const[purchases,SetPurchases]=useState([])
    const[loading,setLoading]=useState([])
    const PurchaseList = async () => {
      console.log("entered PurchaseList")
        // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
        const filter =  marketplace.filters.token_sold(null,null,null,null,null,account)
        console.log("entered filter",filter)
        const results = await marketplace.queryFilter(filter)
        console.log("entered results",results)

        //Fetch metadata of each nft and add that to listedItem object.
        const purchases = await Promise.all(results.map(async i => {
          // fetch arguments from each result
          console.log("enetered purchase functions : ")
          i = i.args
          // get uri url from nft contract
          const uri = await nft.tokenURI(i.tokenID)
          // use uri to fetch the nft metadata stored on ipfs 
          const response = await fetch(uri)
          const metadata = await response.json()
          // get total price of item (item price + fee)
          // const totalPrice = await marketplace.getTotalPrice(i.itemId)
          // define listed item object
          let purchasedItem = {
            // totalPrice,
            price: i.price,
            itemId: i.itemId,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image
          }
          return purchasedItem
        }))
        setLoading(false)
        SetPurchases(purchases)
      }
    useEffect(()=>{
         PurchaseList()
    },[])
    if (loading){
        return "Loading ....."
    }
    return(
      <div className="flex justify-center">
      {purchases.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {purchases.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Footer>{ethers.utils.formatEther(item.price)} ETH</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No purchases...!. Go and Purchase some in the Home Page.</h2>
          </main>
        )}
    </div>
  );
}
//         <>
//         {purchases.length>0?
//         <>
//         <>My purchases are:</>
//         <div>{purchases.map((purchase,idx)=>{
//             <p key={idx}>{purchase.image}</p> //Add additional features to it
//         })}
//         </div>
//         </>
//         :<>No Nfts Purchased</>
//         }
//         </>
//     )
// }