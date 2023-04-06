import { useState } from "react"
import { ethers } from 'ethers';
import useAccountStore from "../store/store";

const Buy = ({ state, setRerender, rerender }) => {
	const { provider, signer, contract } = state
	const { account } = useAccountStore((state) => state.account)
	
    const [name, setName] = useState()
    const [message, setMessage] = useState()
    const buyChai = async (e) => {
        e.preventDefault()
        const amount = {value: ethers.utils.parseEther("0.001")}
        const transcation = await contract.buyChai(name, message, amount)
				await transcation.wait()
				setRerender(!rerender)
        console.log("transcation is done");
    }
    return (
			<>
				<form onSubmit={buyChai} className="container-md card w-50 p-3 mt-5">
					<div className="fs-2 text-center">Buy Chai</div>
					<p className="text-center">Please connect to Goerli Testnet to load data</p>
					<div className="mb-3">
						<label htmlFor="name" className="form-label">Name</label>
						<input type="text" id="name" onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="form-control"/>
					</div>
					<div className="mb-3">
						<label htmlFor="message" className="form-label"	>Message</label>
						<input type="text" id="message" onChange={(e) => setMessage(e.target.value)} placeholder="Enter your Message" className="form-control"/>
					</div>
					<button type="submit" className="btn btn-primary" disabled={!account}>Pay 0.001Eth</button>
				</form>
			</>
    )
}

export default Buy
