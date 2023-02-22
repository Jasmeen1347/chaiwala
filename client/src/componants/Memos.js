import { useState, useEffect } from "react"
import accountStore from '../store/store'

const Memos = ({state, rerender}) => {
    const [memos, setMemos] = useState([])
	const { contract } = state
	// const { provider, signer, contract } = accountStore((state) => ({ courses: state.wallateInfo }))
    
    useEffect(() => {
        const memosMessage = async() => {
            const allMemos = await contract.getMemos()
            setMemos(allMemos)
        }
        contract && memosMessage()
		}, [contract, rerender])  
    

    function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

    return (
        <div className="container-fluid w-100">
					<p style={{ textAlign: "center", marginTop: "20px" }}>Transaction List</p>
					<table className="table  table-striped table-hover table-bordered">
							<thead>
									<tr>
									<th scope="col">Name</th>
									<th scope="col">Message</th>
									<th scope="col">From</th>
									<th scope="col">Date</th>
									</tr>
							</thead>
							<tbody>
									{memos.length > 0 && memos.slice(0).reverse().map((memo, index) => (
											<tr key={index}>
													<td>{ memo.name }</td>
													<td>{ memo.message }</td>
													<td>{ memo.from }</td>
													<td>{ timeConverter(memo.timestamp) }</td>
											</tr>
									))}
							</tbody>
					</table>
        </div>
    )
}

export default Memos