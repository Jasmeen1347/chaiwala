import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const accountStore = (set) => ({
    account: "",
    conncectWallet: (allData) => {
        set((state) => ({
            account: allData
        }))
      }
})

const useAccountStore = create(
   
        persist(accountStore, {
            name: "account"
        })
)

export default useAccountStore;