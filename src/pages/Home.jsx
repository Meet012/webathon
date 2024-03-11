import {motion,AnimatePresence} from 'framer-motion';
import {useSnapshot} from 'valtio';
import {headContainerAnimation,headContentAnimation,headTextAnimation,slideAnimation} from '../config/motion';
import state from '../store';
import { CustomButton } from '../component';
const Home = () => {
  
  // To set the value of the default state so that we have to not do it manually
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.into && (
        <motion.section className='home' {...slideAnimation('left')}>
          <motion.header>
            <img src='./threejs.png' alt='logo' className='w-8 h-8 object-contain'/>
          </motion.header>

          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div className='' {...headTextAnimation}>
              <h1 className='text-9xl text-white'>
                LET'S MAKE <br className="xl:block hidden" /> YOUR IDEA <br className="xl:block hidden" />REALITY
              </h1>
            </motion.div>
            <motion.div className='flex flex-col gap-5' {...headContentAnimation}>
              <p className='max-w-md font-normal text-white text-base'>
                Create your unique and exclusive shirt with our brand-new 3D customization tool.<strong>Unleash your imagination</strong>{" "} and define your own style
              </p>
              <CustomButton 
              type="filled"
              title="Customize it"
              handleClick={()=>{state.into = false}}
              customStyles = "w-fit px-4 py-2.5 font-bold text-sm" 
              />
            </motion.div>
          </motion.div>

        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home
