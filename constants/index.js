const mutualsAddress = "0xb41fBe2e34700Eea625204c172d050dAF1EDc14D"
const achieverAddress = "0xCc9EFF5C3eA0F653f48349091d8ffE096fa341C0"
const wethAddress = "0xc778417E063141139Fce010982780140Aa0cD5Ab"

// const mutualsAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
// const achieverAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
// const wethAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

const mutualsAbi = require("./mutualsAbi.json")
const achieverAbi = require("./achieverAbi.json")
const wethAbi = require("./wethAbi.json")


module.exports = {
    mutualsAbi,
    achieverAbi,
    wethAbi,
    mutualsAddress,
    achieverAddress,
    wethAddress,
}