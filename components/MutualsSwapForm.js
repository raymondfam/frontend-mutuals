import { useWeb3Contract } from "react-moralis"
import { wethAbi, wethAddress, mutualsAbi, mutualsAddress,
         achieverAbi, achieverAddress } from "../constants"
import { Form } from "web3uikit" 
import { ethers } from "ethers"

export default function MutualsSwapForm() {
    const { runContractFunction } = useWeb3Contract()
    let approveOptions = {
        abi: achieverAbi, 
        contractAddress: achieverAddress,
        functionName: "approve",
    }

    let swapOptions = {
        abi: mutualsAbi,
        contractAddress: mutualsAddress,
        functionName: "swap",
    }

    async function handleSwapSubmit(data){
        const amountToApprove = data.data[0].inputResult
        approveOptions.params = {
            spender: ethers.utils.parseUnits(amountToApprove, "ether").toString(),
            amount: mutualsAddress,
        }
        console.log("Approving...")
        const tx = await runContractFunction({
            params: approveOptions,
            onError: (error) => console.log(error),
            onSuccess: () => {
                handleApproveSuccess(approveOptions.params.amount)
            },
        })
    }

    async function handleApproveSuccess(amountToSwapFormatted) {
        swapOptions.params = {
            _amountIn: amountToSwapFormatted,
            _tokenIn: achieverAddress,
        }
        console.log(`Swapping ${swapOptions.params._amountIn} mWETH...`)
        const tx = await runContractFunction({
            params: swapOptions,
            onError: (error) => console.log(error)
        })
        await tx.wait(1)
        console.log("Transaction has confirmed by 1 block")
    }

    return (
        <div>
            <Form
                onSubmit={handleSwapSubmit}
                data={
                    [
                        {
                            inputWidth: "50%",
                            name: "Amount to swap (in ACH)",
                            type: "number",
                            value: "",
                            key: "amountToSwap",
                        },
                    ]}
                    title="Let's swap!"    
            ></Form>
        </div>
    )
}