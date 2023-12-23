import { useState } from "react"
import { create as ipfsHttpClient } from 'ipfs-http-client'
import {Row,Form,Button} from "react-bootstrap"
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
export default function Create ({marketplace,nft}){
    const[nftname,SetNftname] =  useState('')
    const[description,SetDescription] = useState('')
    const[price,SetPrice]=useState(null)
    const[image,SetIMage]=useState(``)
    const[pass,SetPass]=useState(true)
   async function ipfsfunction(event){
      let file = event.target.files[0]
      if (file !== undefined){
      result= await client.add(file)
      try {
        console.log(result)
      SetIMage(`https://ipfs.infura.io/ipfs/${result.path}`)
      } catch (error) {
       console.log("Error in uploading to IPFS",error)
      }
   }}
   async function ListNFT(){
    if (image&&description&&nftname&&price){
    try {
    const result = await client.add(JSON.stringify({image,nftname,description,price}))
    MintNFT(result)
    } catch (error) {
        console.log("ERROR IN COLLECTING URI OF THE IMAGE",error)
    }
    SetPass(true)

}
else{SetPass(false)}
    
   }
   async function MintNFT(result){
   const uri = `https://ipfs.infura.io/ipfs/${result.path}`
   await(await nft.mint(uri)).wait()
   await(await nft.setApprovalForAll(marketplace.address, true)).wait()
   const id = nft.tokenCount()
   await(await marketplace.ListItem(price,nft,id))  //Arguments passed according Marketplace.sol 
   }
    return(
        <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
            <div className="content mx-auto">
              <Row className="g-4">
                <Form.Control
                  type="file"
                  required
                  name="file"
                  onChange={ipfsfunction}
                />
                <Form.Control onChange={(e) => SetNftname(e.target.value)} size="lg" required type="text" placeholder="Name" />
                <Form.Control onChange={(e) => SetDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
                <Form.Control onChange={(e) => SetPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
                <div className="d-grid px-0">
                  <Button onClick={ListNFT} variant="primary" size="lg">
                    Create & List NFT!
                  </Button>
                </div>
              </Row>
            </div>
          </main>
        </div>
      </div>
    );
  }
