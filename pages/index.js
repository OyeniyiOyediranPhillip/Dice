import Head from 'next/head'
import styles from "/styles/Home.module.css";
import { motion, AnimatePresence } from 'framer-motion';
import Button from '/components/Button';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceSix, faDiceFive, faDiceFour,
   faDiceThree, faDiceTwo, faDiceOne } from '@fortawesome/free-solid-svg-icons';

export default function Home() {

  const [Restart, setRestart] = useState(false);

  const [Rules, setRules] = useState(false);

  const [MyScore, setMyScore] = useState(0);

  const [ComputerScore, setComputerScore] = useState(0)

  const [ScoreModal, setScoreModal] = useState(false);

  const [RollDice, setRollDice] = useState(false);

  const [GameStatus, setGameStatus] = useState({});

  const [Alert, setAlert] = useState(false);

  const alertRef = useRef(null);

  const autoCloseAlert = ()=>{
    alertRef.current = setTimeout(() => {
      setAlert(false);
    }, 5000);
  }

  useEffect(() => {  
    return () => {
      clearTimeout(alertRef.current)
    }
  }, [])
  

  const hideAlert = ()=>{
    setAlert(false);
  }

  const showRules = ()=>{
    setRules(true);
  }

  const showRestart = ()=>{
    setRestart(true);
  }

  const hideRules = ()=>{
    setRules(false);
  }

  const hideRestart = ()=>{
    setRestart(false);
  }

  const clearScore = ()=>{
    setComputerScore(0);
    setMyScore(0);
    hideRestart();
    setAlert(true)
    autoCloseAlert();
  }


  const modalParentVariant = {
    initial:{
      y:"-100vh",
      opacity:0
    },
    animate:{    
      opacity:0.8,
      y:0,
      transition: {
        delay:0.2,
        duration:0.7,
        when:"beforeChildren"
      }
    },
    exit:{
      y:"-100vh",
      transition:{
        delay:0.1,
        duration:0.3,
        when:"afterChildren"
      }
    }
  }

  const scoreParentVariant = {
    initial:{
      y:"-100vh",
      opacity:0
    },
    animate:{    
      opacity:0.8,
      y:0,
      transition: {
        delay:1,
        duration:0.5,
        when:"beforeChildren"
      }
    },
    exit:{
      y:"-100vh",
      transition:{
        delay:0.1,
        duration:0.3,
        when:"afterChildren"
      }
    }
  }

  const rulesVariant = {
    initial:{
      x:"-100vw"
    },
    animate:{
      x:0,
      transition:{
        delay:0.2,
        duration:0.3,
        when:"beforeChildren"
      }
    },
    exit:{
      x:"120vw",
      duration:0.5
    }
  }

  const restartVariant = {
    initial:{
      x:"-110vw"
    },
    animate:{
      x:0,
      transition:{
        delay:0.2,
        duration:0.5
      }
    },
    exit:{
      x:"110vw",
      transition:{
        delay:0.2,
        duration:0.3
      }
    }
  }

  const scoreModalVariant = {
    initial:{
      x:"-110vw"
    },
    animate:{
      x:0,
      transition:{
        delay:0.3,
        duration:0.4
      }
    },
    exit:{
      x:"+110vw",
      transition:{
        delay:0.2,
        duration:0.3
      }
    }
  }

  const alertVariant = {
    initial:{
      opacity:0
    },
    animate:{
      opacity:1,
      transition:{
        delay:0.3,
        duration:0.7
      }
    },
      exit:{
        opacity:0,
        transition:{
        delay:0.1,
        duration:0.9
      }
    }
  }

  const diceVariant = {
    initial:{
      y:"-20px",
      x:0,
      scale:1
    },
    animate:{
      rotate: RollDice ? 360 : 0,
      y: RollDice ? "70px" : 0,
      x: RollDice ? 35 : 0,
      scale:0.6,
      transition:{
        type: RollDice && "spring",
        stiffness: RollDice && "200",        
        duration: RollDice && 0.3
      }
    }
  }

  const computerResult = ()=>{
    let result = Math.ceil(Math.random() * 8);
    if(result == 1)
      return 1;
    else if(result == 2)
      return 2;
    else if(result == 3)
      return 3;
    else if(result == 4)
      return 4;
    else if(result >= 5)
      return 5;
    else if(result >= 7)
      return 6;
    else
      return undefined;
  }

  const playerResult = ()=>{
    const result = Math.ceil(Math.random() * 6);
    if(result == 1)
      return 1;
    else if(result == 2)
      return 2;
    else if(result == 3)
      return 3;
    else if(result == 4)
      return 4;
    else if(result == 5)
      return 5;
    else if(result == 6)
      return 6;
    else
      return undefined;
  }

  const gamePlay = ()=>{
    const computer = computerResult();
    const player = playerResult();
    setRollDice(true)
    setScoreModal(true);
    if(computer == player){
      setGameStatus({
        result:"It's a stalemate",
        computer,
        player
      })
    }
    else if(computer > player){
      setComputerScore(ComputerScore + 1)
      setGameStatus({
        result:"you lost",
        computer,
        player
      })
    }
    else if(computer < player){
      setMyScore(MyScore + 1)
      setGameStatus({
        result:"you won",
        computer,
        player
      })
    }
    else 
      setGameStatus(undefined);    
  }


  const gameRule = ["Click on the dice icon to roll the dice",
  "Computer automatically rolls its own after yours",
   "the restart button wipes scoreline and restart the game",
  "Have Fun!"]

  const decodeIcon = (value)=>{
    if(value == 1)
      return faDiceOne;
    if(value == 2)
      return faDiceTwo;
    if(value == 3)
      return faDiceThree;
    if(value == 4)
      return faDiceFour;
    if(value == 5)
      return faDiceFive;
    if(value == 6)
      return faDiceSix;
  }

  const closeScoreModal = ()=>{
    setRollDice(false);
    setScoreModal(false);
  }

  return (
    <div>
      <Head>
        <title>Dice</title>
        <meta name="description" content="web based dice game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.root}`}>

        <AnimatePresence>
          {
            Alert &&
            <motion.section variants={alertVariant} exit="exit" animate="animate" initial="initial" className={`bg-danger rounded px-4 py-1 ${styles.alertSection} mx-auto mb-3`}>
              <span>Scoreline CLeared successfully</span>
              <span onClick={hideAlert} className={`bg-light text-danger fw-bold rounded ml-5 px-3 ${styles.alertClear}`}>x</span>
            </motion.section>
          }
        </AnimatePresence>

        <div className={`${styles.parent} mx-auto p-4`}>
          <motion.section className={`${styles.diceSection} mx-auto`} variants={diceVariant} initial="initial" animate="animate">
            <FontAwesomeIcon icon={decodeIcon(GameStatus.player) || faDiceSix} onClick={gamePlay} className={`mx-5 ${styles.diceIcon} mb-5 px-5 pb-5`}/>
          </motion.section>
          <section className={`${styles.buttonSection} mt-5`}>
            <Button text="restart" className={`${styles.restart} mx-5`} onClick={showRestart}/>
            <Button text="rules" className={`${styles.rules} mx-5`}  onClick={showRules}/>
          </section>
        </div>

        <AnimatePresence>
          {
            Rules &&
            <motion.section variants={modalParentVariant} className={`${styles.modalParent} w-100`} exit="exit" animate="animate" initial="initial">
                <motion.div variants={rulesVariant} className={`lead mx-auto ${styles.rulesModal}`}>
                {
                  gameRule.map((iterator, index) => {
                    return(
                      <motion.div  key={index}
                        initial={{x:"-150vw"}}
                        animate={{x:0}}
                        transition={{delay:index + 1.5, duration:0.3}}>
                          <ul className={`${styles.list}`}>
                            <li>{iterator}</li>
                          </ul>
                      </motion.div>
                    )
                  })
                }
                <Button text="close" onClick={hideRules} className={`bg-danger mx-auto mt-5 text-white rounded`}/>
                </motion.div>
            </motion.section>
          }
        </AnimatePresence>

        <AnimatePresence>
          {
            Restart &&
            <motion.section variants={modalParentVariant} className={`${styles.modalParent} w-100`} exit="exit" animate="animate" initial="initial">
              <motion.div variants={restartVariant} className={`lead mx-auto ${styles.restartModal}`}>
                  <h5 className={`${styles} text-danger px-2 fw-bold`}>Clear score line and restart game?</h5>
                  <div className={`${styles.scoreSection}  mx-auto my-3 fw-bold lead border border-light rounded`}>
                    <div className={`d-flex justify-content-between pb-1 ${styles.myScore}`}>
                      <span> You : </span>
                      <span>{MyScore}</span>
                    </div>
                    <span className={`${styles.computerScore} pt-1`}>Computer : {ComputerScore}</span>
                  </div>
                  <div className={`d-flex justify-content-between mt-4 mb-2`}>
                    <Button text="cancel" onClick={hideRestart} className={`bg-primary  text-white mr-5`}/>
                    <Button text="proceed" onClick={clearScore} className={`bg-danger text-white`}/>
                  </div>
              </motion.div>
            </motion.section>
          }
        </AnimatePresence>

        <AnimatePresence>
          {
            ScoreModal &&
            <motion.section variants={scoreParentVariant} className={`${styles.modalParent} w-100`} exit="exit" animate="animate" initial="initial">
              <motion.div variants={scoreModalVariant} className={`${styles.scoreModal} mx-auto`}>
                <div className={`${styles.scoreSection}  mx-auto my-3 fw-bold lead border border-light rounded`}>
                  <div className={`d-flex justify-content-between pb-1 ${styles.myScore}`}>
                    <span> You : </span>
                    <span>{MyScore}</span>
                  </div>
                  <span className={`${styles.computerScore} pt-1`}>Computer : {ComputerScore}</span>
                </div>
                <div className={`d-flex my-5 mx-4`}>
                  <FontAwesomeIcon icon={decodeIcon(GameStatus.player)} className={`${styles.diceW} ${GameStatus.result == "you won" && styles.winnerShadow}`}/>
                  <p className={`display-5 mx-4 fw-bold ${GameStatus.result == `you won` && `text-success`} ${GameStatus.result == `you lost` && `text-danger`} ${styles.remark}`}>{GameStatus.result}</p>
                  <FontAwesomeIcon icon={decodeIcon(GameStatus.computer)} className={`${styles.diceW} ${GameStatus.result == "you lost" && styles.winnerShadow}`}/>
                </div>
                <Button text="close" onClick={closeScoreModal} className={`mx-auto bg-danger border-danger text-white`}/>
              </motion.div>
            </motion.section>
          }
        </AnimatePresence>
      </main>
    </div>
  )
}
