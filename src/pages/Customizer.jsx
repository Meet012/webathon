import React,{useState,useEffect} from 'react'
import { AnimatePresence,motion } from 'framer-motion' 
import { useSnapshot } from 'valtio'
import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import {downloadCanvasToImage,reader} from '../config/helpers';
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants';
import {fadeAnimation,slideAnimation} from '../config/motion';
import { AIPicker,CustomButton,ColorPicker,FilePicker,Tabs } from '../component';
import LogoSettings from '../component/LogoSettings';
import axios from 'axios';

const Customizer = () => {

  const snap = useSnapshot(state);
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "Color Picker":
        return <ColorPicker />
      case "File Picker":
        return <FilePicker
          file = {file}
          setFile={setFile}
          readFile={readFile}
        />
      case "AI Picker":
        return <AIPicker
        prompt={prompt}
        setPrompt={setPrompt}
        generatingImg={generatingImg}
        handleSubmit={handleSubmit}
        />
      case "Position Picker":
        return <LogoSettings />
      default:
        return null;
    }
  }
  const handleRotate =()=>{
    if(snap.rotate){
        state.rotate=false;
    }else{
        state.rotate=true;
    }
};

const handleSubmit = async (type) => {
  if (!prompt) return alert("Please enter a prompt");

  try {
    setGeneratingImg(true);
    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/texttoimage',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '03b41000bcmsh133902713c59eedp1dcc65jsnbc9f0042715d',
        'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
      },
      data: { text: prompt }
    };
    const response = await axios.request(options);

    const photo = response.data.generated_image;
    console.log(photo)
    handleDecals(type, `${photo}`)
  } catch (error) {
    alert(error)
  } finally {
    setGeneratingImg(false);
    setActiveEditorTab("");
  }
}


  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "Logo Shirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "Stylish Shirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      case "Back Logo Shirt":
          state.isBackLogoTexture = !activeFilterTab[tabName];
          break;
      case "download":
        downloadCanvasToImage();
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        state.isBackLogoTexture = false;
        break;  
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;
    console.log(decalType);
    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }


  return (
    <AnimatePresence>
      {!snap.into && (
        <>
          <motion.div key="custom" className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab)=>(
                  <Tabs key={tab.name} tab={tab} handleClick={()=>{setActiveEditorTab(tab.name)}}/>
                )
                )}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className='absolute z-10 top-5 right-5 flex flex-row gap-5' {...fadeAnimation}>
            <CustomButton type="filled" title="Go Back" handleClick={()=>{state.into = true}} customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
            <CustomButton type="filled" title="Rotate" handleClick={handleRotate} customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
          </motion.div>
          
          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            {FilterTabs.map((t)=>(
              <Tabs key={t.name} tab={t} isFilterTab isActiveTab="" handleClick={()=>{handleActiveFilterTab(t.name)}}/>
            ))}
          </motion.div>

        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer;