import { useEffect, useState } from "react";
// import { ethers } from "hardhat";
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'

export default function MyList({marketplace,nft,account}){
    const[items,SetItems]=useState([])
    const[loading,SetLoading]=useState(true)
 async   function handleItemsUpdate(){
        let items = []
        console.log("Mylist's item array is initialised")
        const token_listed_count =await marketplace.token_Listed_count()
        console.log("tokencount = ",token_listed_count)
        for (let i = 1; i <=token_listed_count; i++) {
            const item = await marketplace.Items(i);
            console.log("Entered for loop",item)
            console.log("account address is",account)
             if( item.seller.toLowerCase() === account){
                console.log("if condition satisfied")
                const uri = await nft.tokenURI(item.tokenID)
                const response = await fetch(uri)
                const metadata = await response.json()
                // const price=item.price
                console.log("fetching of data is finished")
                items.push({
                    // Totalprice:totalprice,
                    price: item.price,
                    itemID:item.itemID,
                    image:metadata.image,
                    name:metadata.name,
                    description:metadata.description
                })
             }
        }
        SetLoading(false)
        SetItems(items)
    }
useEffect(()=>{
    handleItemsUpdate()
},[])  
if (loading){
    return "Loading..."
}  
return(
    <div className="flex justify-center">
      {items.length > 0 ?
        <div className="px-5 py-3 container">
            <h2>Listed</h2>
          <Row xs={1} md={2} lg={4} className="g-4 py-3">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Footer>{ethers.utils.formatEther(item.price)} ETH</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
            {/* {soldItems.length > 0 && renderSoldItems(soldItems)} */}
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
  );
}
//     <>{items.length>0?
//         <>
//     <p>My Listed NFTs:</p>
//     <div >
//    {items.map((item,idx)=>{
    
//     <p key = {idx}>{item.image}</p>//also add name and decription
//    })}
//      </div></>
//      :
//      <p>You have not listed any Items </p>}
//     </>
// )
// }