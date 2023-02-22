import './App.css';
import abi from './contract/ChaiWala.json'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import Memos from './componants/Memos';
import Buy from './componants/Buy';
import chai from "./assets/chai.png";
import useAccountStore from './store/store'

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const conncectWallet = useAccountStore((state) => state.conncectWallet)
  const {account} = useAccountStore((state) => state.account)
  const [rerender, setRerender] = useState(false)

    const connectWallet = async () => {
      try {
        const { ethereum } = window;
        let account;
        if (ethereum) {
          account = await ethereum.request({ method: 'eth_requestAccounts' })
          let temp = { account: account[0] }
          conncectWallet(temp)
          setAccountData()
        } else {
          alert("Please Install Metamask")
        }


      } catch (error) {
        console.log(error);
      }
    }
  
  useEffect(() => {
      setAccountData()
  }, [account])

  useEffect(() => {
    setAccountData()
    const { ethereum } = window;
    if (ethereum) {
      window.ethereum.on('accountsChanged', () => {
        connectWallet()
      })
    }
  }, [])
  
  const setAccountData = () => {
    const contractAddress = '0xba3aeBF2aF77722Fa5c03fB08beA5e6aA3c596f8'
    const contractAbi = abi.abi
    const { ethereum } = window;
    if (ethereum) { 
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractAbi, signer)
      setState({ provider, signer, contract })
    } else {
      alert('Install Metamask');
    }
  }
  
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand">Chai Wala</a>
          {account ? (
            <div className='d-flex'>
              <p className='text-primary me-5 mt-2'>{account.slice(0, 6) + '...' + account.slice(38, 42)}</p>
              <button className='btn btn-danger' onClick={() => {
                conncectWallet({ account: "" });
                setState({ provider: null, signer: null, contract:null })
              }}>LogOut</button>
            </div>
          ) : (
            <button className='btn btn-primary' onClick={() => connectWallet()}>Connect</button>
          )}
          
        </div>
      </nav>
    <img src={chai} className="img-fluid" alt=".." width="100%" />
    <div className="container">
        <Buy state={state} setRerender={setRerender} rerender={rerender} />
        <Memos state={state} rerender={rerender}/>
    </div>
  </div>
  );
}

export default App;
