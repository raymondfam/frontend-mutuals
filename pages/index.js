import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import MutualsDetails from "../components/MutualsDetails"
import MutualsSwapForm from "../components/MutualsSwapForm"
import MutualsStakeForm from "../components/MutualsStakeForm"

export default function Home() {
  return (
    <div className={styles.container}>
      <Header/>
      <MutualsDetails/>
      <MutualsSwapForm/>
      <MutualsStakeForm/>
    </div>
  )
}
